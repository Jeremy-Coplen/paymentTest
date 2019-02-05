const stripe = require("stripe")(process.env.STRIPE_SECRET)
const nodemailer = require("nodemailer")
const smtpTransport = require("nodemailer-smtp-transport")

const products = [
    {
        id: 0,
        name: "Hershey's milk chocolate",
        img: "http://localhost:3010/images/HersheyMC.jpg",
        price: 1.09,
        sku: "sku_EPP6x7fJkMVGlM"
    },
    {
        id: 1,
        name: "Hershey's cookies and cream",
        img: "http://localhost:3010/images/HersheyCC.jpg",
        price: 1.09,
        sku: "sku_EPP8pbGApNX953"
    },
    {
        id: 2,
        name: "Kit Kat",
        img: "http://localhost:3010/images/KitKat.jpg",
        price: 1.11,
        sku: "sku_EPP9ZzKTXmIhwt"
    },
    {
        id: 3,
        name: "Snickers",
        img: "http://localhost:3010/images/Snickers.jpg",
        price: 1.16,
        sku: "sku_EPP4w6a4YulVGf"
    },
    {
        id: 4,
        name: "Hershey's milk chocolate KS",
        img: "http://localhost:3010/images/HersheyMC.jpg",
        price: 1.15,
        sku: "sku_EPP63mrJpMlNY8"
    },
    {
        id: 5,
        name: "Hershey's cookies and cream KS",
        img: "http://localhost:3010/images/HersheyCC.jpg",
        price: 1.15,
        sku: "sku_EPP8t9Nvhc0G7I"
    },
    {
        id: 6,
        name: "Kit Kat KS",
        img: "http://localhost:3010/images/KitKat.jpg",
        price: 1.17,
        sku: "sku_EPPAAmtm1POiP9"
    },
    {
        id: 7,
        name: "Snickers KS",
        img: "http://localhost:3010/imagessnickers.jpg",
        price: 1.22,
        sku: "sku_EPP5KTXYqb2N6O"
    }
]

// this order id should be stored in the database
let orderId = ""

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

    confirmOrder : (req, res) => {
        const { cart } = req.body

        try {
            const stripeCart = cart.map((elem) => {
                return {
                    type: "sku",
                    parent: elem.sku,
                    quantity: elem.quantity
                }
            })

            const order = stripe.orders.create({
                currency: "usd",
                email: "jeremy.coplen@example.com",
                items: stripeCart
            })

            orderId = order.id
            res.status(200).send(order)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    cancelOrder : (req, res) => {
        console.log("cancel order hit")
        try {
            if(orderId === "") {
                res.sendStatus(500)
            }
            else {
                stripe.orders.update(orderId, {
                    status: "canceled"
                })
                orderId = ""
                res.sendStatus(200)
            }
        }
        catch(err) {
            console.log(err)
        }
    },

    payment: async (req, res) => {
        const { token, amount, cart } = req.body

        const payment = stripe.orders.pay(orderId, {
            source: token.id
        })
        console.log(payment)

        // const cartOutput = cart.map((product) => {
        //     return `
        //     <p>${product.name}</p>
        //     <p>qty: ${product.qty}</p>
        //         <p>price per unit: $${product.price.toFixed(2)}</p>
        //         `
        // })
        // const output = `
        // <p>Thank you for ordering!<p>
        // ${cartOutput}
        // <h3>Total: $${amount.toFixed(2)}</h3>
        // `

        // let transporter = nodemailer.createTransport({
        //     service: "gmail",
        //     host: "smtp.gmail.com",
        //     ecure: false, // true for 465, false for other ports
        //     auth: {
        //         user: process.env.AEL, // generated ethereal user
        //         pass: process.env.AELP // generated ethereal password
        //     },
        //     tls: { rejectUnauthorized: false }
        //     });
                    
        // // setup email data with unicode symbols
        // let mailOptions = {
        // from: `"Jeremy Coplen" <${process.env.AEL}>`, // sender address
        // to: `${token.email}`, // list of receivers
        // subject: "Order Confirmation", // Subject line
        // html: output // html body
        // };
                    
        // // send mail with defined transport object
        // transporter.sendMail(mailOptions, (error, info) => {
        //     if(error) {
        //         console.log(error)
        //     }
        //     console.log("Message sent: %s", info.messageId);
        //     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // })
    }
}