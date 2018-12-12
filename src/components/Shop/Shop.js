import React, { Component } from "react"
import axios from "axios"

import Product from "../Product/Product"
import Cart from "../Cart/Cart"
import cartIcon from "../../Images/cart.png"

import "./Shop.css"

class Shop extends Component {
    constructor() {
        super()

        this.state = {
            products: [],
            cart: [],
            cartShow: false,
            subTotal: 0.00,
            total: 0.00
        }
    }

    componentDidMount() {
        axios.get("/api/products")
        .then(res => {
            this.setState({
                products: res.data
            })
        })

        axios.get("/api/cart")
        .then(res => {
            this.setState({
                cart: res.data
            }, this.cacluateSubTotal)
        })
    }

    addToCart = (product) => {
        let arr = [...this.state.cart]
        const index = arr.findIndex(elem => elem.id === product.id)
        if (index === -1) {
            let newProduct = { ...product }
            newProduct.qty = 1
            arr.push(newProduct)
            this.setState({
                cart: arr
            }, this.cacluateSubTotal)
        }
        else {
            let newProduct = arr[index]
            newProduct.qty++
            arr[index] = newProduct
            this.setState({
                cart: arr
            }, this.cacluateSubTotal)
        }
        axios.put("/api/cart", {cart: arr})
    }

    toggleShow = () => {
        this.setState({
            cartShow: true
        })
        document.getElementById("cart_container").style.width = "30vw"
    }

    closeCart = () => {
        this.setState({
            cartShow: false
        })
        document.getElementById("cart_container").style.width = "0"
    }

    cacluateSubTotal = () => {
        console.log("hi")
        const reducer = (total, current) => total + (current.price * current.qty)
        const subTotal = this.state.cart.reduce(reducer, 0)
        const total = subTotal * 1.047

        this.setState({
            subTotal,
            total
        })
    }

    removeFromCart = (product) => {
        let arr = [...this.state.cart]
        let index = arr.findIndex((elem) => elem.id === product.id)
        if (arr[index].qty === 1) {
            arr.splice(index, 1)
            this.setState({
                cart: arr
            }, this.cacluateSubTotal)
        }
        else {
            let productCopy = { ...arr[index] }
            productCopy.qty = productCopy.qty - 1
            arr[index] = productCopy
            this.setState({
                cart: arr
            }, this.cacluateSubTotal)
        }
        axios.put("/api/cart", {cart: arr})
    }

    render() {
        console.log("cart", this.state.cart, "sub", this.state.subTotal, "tot", this.state.total)
        const className = this.state.cartShow ? "icon_total_container_none" : "icon_total_container"
        if (this.state.products.length) {
            var products = this.state.products.map(product => {
                return (
                    <Product key={product.id} product={product} addToCart={this.addToCart} />
                )
            })
        }
        return (
            <div className="shop">
                <div className={className}>
                    <img id="cart_img" onClick={this.toggleShow} src={cartIcon} alt="" />
                    <p>${this.state.total.toFixed(2)}</p>
                </div>
                <div className="product_cart_container">
                    <div>
                        {products}
                    </div>
                    <div id="cart_container">
                        <Cart
                            cartShow={this.state.cartShow}
                            cartArray={this.state.cart}
                            subTotal={this.state.subTotal}
                            total={this.state.total}
                            closeCart={this.closeCart}
                            addToCart={this.addToCart}
                            removeFromCart={this.removeFromCart} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Shop