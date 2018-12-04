import React, { Component } from "react"
import axios from "axios"

import Product from "../Product/Product"

class Shop extends Component{
    constructor() {
        super()

        this.state = {
            products: [],
            cart: []
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
        if(index === -1) {
            let newProduct = {...product}
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

    render() {
        console.log(this.state.cart)
        if(this.state.products.length) {
            var products = this.state.products.map(product => {
                return (
                    <Product key={product.id} product={product} addToCart={this.addToCart}/>
                )
            })
        }
        return (
            <div>
                {products}
            </div>
        )
    }
}

export default Shop