const images = {
    hersheyMC: require("./Images/GUEST_17a6a8dc-13b9-4efc-a069-4a8b7a26d48e.jpg"),
    hersheyCC: require("./Images/GUEST_671acefa-4ab2-46ce-8313-e78994d7eef8.jpg"),
    kitKat: require("./Images/GUEST_9766bfa7-3fcb-4f4c-9576-15e17ccc1044.jpg"),
    snickers: require("./Images/GUEST_2cab6360-996f-4468-b316-2636c09999d2.jpg")
}

const products = [
    {
        name: "Hershey's milk chocolate",
        img: images.hersheyMC,
        price: 1.09
    },
    {
        name: "Hershey's cookies and cream",
        img: images.hersheyCC,
        price: 1.09
    },
    {
        name: "Kit Kat",
        img: images.kitKat,
        price: 1.11
    },
    {
        name: "Snickers",
        img: images.snickers,
        price: 1.16
    }
]

module.exports = {
    getProducts: (req, res) => {
        res.status(200).send(products)
    }
}