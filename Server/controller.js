const stripe = require("stripe")(process.env.STRIPE_SECRET)
const nodemailer = require("nodemailer")

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
        const { token: {id}, amount } = req.body

        try {
            stripe.charges.create({
                amount,
                currency: "usd",
                source: id,
                description: "Test charge from stripeTest"
            },
            (err, charge) => {
                if(err) {
                    console.log(err)
                    return res.status(500).send(err)
                }
                else {
                    return res.status(200).send(charge)
                }
            })
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    customerConfirmation: (req, res) => {
        const cartOutput = req.body.cart.map((product) => {
            return `
                <p>x${product.qty} ${product.name} $${product.price.toFixed(2)}</p>
            `
        })
        const output = `
            <p>Thank you for ordering!<p>
            ${cartOutput}
            <h3>Total: $${req.body.total.toFixed(2)}</h3>
        `
    }
}