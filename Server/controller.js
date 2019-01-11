const stripe = require("stripe")(process.env.STRIPE_SECRET)
const nodemailer = require("nodemailer")
const smtpTransport = require("nodemailer-smtp-transport")

const products = [
    {
        id: 0,
        name: "Hershey's milk chocolate",
        img: "http://localhost:3010/images/HersheyMC.jpg",
        price: 1.09
    },
    {
        id: 1,
        name: "Hershey's cookies and cream",
        img: "http://localhost:3010/images/HersheyCC.jpg",
        price: 1.09
    },
    {
        id: 2,
        name: "Kit Kat",
        img: "http://localhost:3010/images/KitKat.jpg",
        price: 1.11
    },
    {
        id: 3,
        name: "Snickers",
        img: "http://localhost:3010/images/Snickers.jpg",
        price: 1.16
    }
]

module.exports = {

    getProducts: (req, res) => {
        res.status(200).send(products)
    },

    getCart: (req, res) => {
        try {
            if (req.session.cart) {
                res.status(200).send(req.session.cart)
            }
            else {
                res.status(200).send([])
            }
        } catch(err) {
            console.log(err)
        }
    },

    updateCart: (req, res) => {
        const { cart } = req.body
        
        try {
            req.session.cart = cart
            res.sendStatus(200)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    resetCart: (req, res) => {
        try {
            req.session.cart = []
            res.sendStatus(200)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    payment: async (req, res) => {
        const { token, amount } = req.body

        stripe.charges.create({
            amount: Math.round(amount * 100),
            currency: "usd",
            source: token.id,
            description: "Test charge from stripeTest"
        },
        (err, charge) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            }
            else {
                console.log(token)
            const output = `
            <p>Thank you for ordering!<p>
            <h3>Total: $${amount.toFixed(2)}</h3>
            `

            let transporter = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.AEL, // generated ethereal user
                    pass: process.env.AELP // generated ethereal password
                },
                tls: { rejectUnauthorized: false }
                });
                    
                // setup email data with unicode symbols
                let mailOptions = {
                from: `"Jeremy Coplen" <${process.env.AEL}>`, // sender address
                to: `${token.email}`, // list of receivers
                subject: "Order Confirmation", // Subject line
                html: output // html body
                };
                    
                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if(error) {
                        console.log(error)
                    }
                    console.log("Message sent: %s", info.messageId);
                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                })

                return res.status(200).send(charge)
            }
        })
    }
}