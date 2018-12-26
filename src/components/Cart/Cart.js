import React from "react"
import { Elements, StripeProvider } from "react-stripe-elements"

import CartItem from "../CartItem/CartItem"
import Payment from "../Payment/Payment"

import "./Cart.css"

function Cart(props) {
    const className = props.cartShow ? "cart_display" : "cart_display_none"
    const buttonClass = props.cartArray.length ? "purchase_button" : "purchase_button_none"
    if (props.cartArray.length) {
        var cartItems = props.cartArray.map(cartItem => {
            return (
                <CartItem
                    key={cartItem.id}
                    cartItem={cartItem}
                    addToCart={props.addToCart}
                    removeFromCart={props.removeFromCart} />
            )
        })
    }
    return (
        <div className={className} style={{ width: props.cartWidth }}>
            <button className="close_button" onClick={() => props.closeCart()}>X</button>
            {cartItems}
            <p>Subtotal: {props.subTotal.toFixed(2)}</p>
            <p>Total: {props.total.toFixed(2)}</p>
            <button className={buttonClass}
                onClick={() => props.togglePaymentShow()}>Confirm Purchase</button>
            <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                <Elements>
                    <Payment
                        paymentShow={props.paymentShow}
                        togglePaymentShow={props.togglePaymentShow} />
                </Elements>
            </StripeProvider>
        </div>
    )
}

export default Cart