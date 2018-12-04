import React from "react"

function Product(props) {
    const {product} = props
    return (
        <div>
            <img src={product.img} alt=""/>
            <p>{product.name}</p>
            <p>${product.price}</p>
            <button onClick={() => props.addToCart(product)}>Add to cart</button>
        </div>
    )
}

export default Product