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
            })
        }
        else {
            let newProduct = arr[index]
            newProduct.qty++
            arr[index] = newProduct
            this.setState({
                cart: arr
            })
        }
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

    render() {
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
                            total={this.state.total}
                            closeCart={this.closeCart} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Shop