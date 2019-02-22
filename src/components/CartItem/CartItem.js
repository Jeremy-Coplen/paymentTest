import React from "react"

import "./CartItem.css"

function CartItem(props) {
    const { cartItem } = props
    return (
        <div className="cart_item">
            <div>
                <img className="cart_item_img" src={cartItem.img} alt="" />
            </div>
            <div className="cart_item_info">
                <div className="qty_price">
                    <p>{cartItem.name}</p>
                    <p>${cartItem.price}</p>
                    <p>Qty: {cartItem.qty}</p>
                </div>
                <div className="cart_buttons">
                    <button onClick={() => props.removeFromCart(cartItem)}>-</button>
                    <button onClick={() => props.addToCart(cartItem)}>+</button>
                </div>

            </div>
        </div>
    )
}

export default CartItem