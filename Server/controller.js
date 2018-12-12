const products = [
    {
        id: 0,
        name: "Hershey's milk chocolate",
        img: "http://localhost:3005/images/HersheyMC.jpg",
        price: 1.09
    },
    {
        id: 1,
        name: "Hershey's cookies and cream",
        img: "http://localhost:3005/images/HersheyCC.jpg",
        price: 1.09
    },
    {
        id: 2,
        name: "Kit Kat",
        img: "http://localhost:3005/images/KitKat.jpg",
        price: 1.11
    },
    {
        id: 3,
        name: "Snickers",
        img: "http://localhost:3005/images/Snickers.jpg",
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
        }
    }
}