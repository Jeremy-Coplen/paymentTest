const express = require("express")

const app = express()
app.use(express.json())
app.use("/images", express.static(`${__dirname}/../public/Images`))

const port = 3005

const c = require("./controller")

app.get("/api/products", c.getProducts)

app.listen(port, () => console.log(`listening on port ${port}`))