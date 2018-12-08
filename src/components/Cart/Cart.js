import React from "react"

import CartItem from "../CartItem/CartItem"
import "./Cart.css"

function Cart(props) {
    const className = props.cartShow ? "cart_display" : "cart_display_none"
    if(props.cartArray.length) {
        var cartItems = props.cartArray.map(cartItem => {
            return (
                <CartItem  
                key={cartItem.id} 
                cartItem={cartItem} 
                addToCart={props.addToCart} 
                removeFromCart={props.removeFromCart}/>
            )
        })
    }
    return (
        <div className={className} style={{width: props.cartWidth}}>
        <button className="close_button" onClick={() => props.closeCart()}>X</button>
        {cartItems}
        <p>Subtotal: {props.subTotal.toFixed(2)}</p>
        <p>Total: {props.total.toFixed(2)}</p>
        </div>
    )
}

export default Cart