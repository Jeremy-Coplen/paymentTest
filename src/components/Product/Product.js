import React from "react"

import "./Product.css"

function Product(props) {
    const {product} = props
    return (
        <div className="product">
            <img src={product.img} alt="product"/>
            <p>{product.name}</p>
            <p>${product.price}</p>
            <button onClick={() => props.addToCart(product)}>Add to cart</button>
        </div>
    )
}

export default Product