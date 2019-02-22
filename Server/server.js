require("dotenv").config()
const express = require("express")
const session = require("express-session")

const app = express()

const port = 3010

app.use(express.json())
app.use("/images", express.static(`${__dirname}/../public/Images`))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use((req, res, next) => {
    if(req.session.cart) {
        next()
    }
    else {
        req.session.cart = []
        next()
    }
})

const c = require("./controller")

app.get("/api/products", c.getProducts)
app.get("/api/cart", c.getCart)
app.put("/api/cart", c.updateCart)
app.post("/api/confirm", c.confirmOrder)
app.delete("/api/cancel", c.cancelOrder)
app.post("/api/payment", c.payment)
app.delete("/api/cart", c.resetCart)
app.put("/api/fulfill", c.fulfill)


app.listen(port, () => console.log(`listening on port ${port}`))