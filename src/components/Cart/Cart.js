import React from "react"

import CartItem from "../CartItem/CartItem"
import "./Cart.css"

function Cart(props) {
    const className = props.cartShow ? "cart_display" : "cart_display_none"
    if(props.cartArray.length) {
        var cartItems = props.cartArray.map(cartItem => {
            return (
                <CartItem  key={cartItem.id} cartItem={cartItem}/>
            )
        })
    }
    return (
        <div className={className} style={{width: props.cartWidth}}>
        <button onClick={() => props.closeCart()}>X</button>
        {cartItems}
        <p>Subtotal: 0.00</p>
        <p>Total: 0.00</p>
        </div>
    )
}

export default Cart