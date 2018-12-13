import React from "react"

import "./Payment.css"

function Payment(props) {
    const className = props.paymentShow ? "payment" : "payment_none"
    return (
        <div className={className}>
            <div className="payment_content">
                    <button onClick={() => props.togglePaymentShow()}>X</button>
                    <p>payment</p>
            </div>
        </div>
    )
}

export default Payment