import React, { Component } from "react"
import { CardElement, injectStripe } from "react-stripe-elements"
import axios from "axios"

import "./Payment.css"

class Payment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            complete: false
        }
    }

    submit = async () => {
        let {token} = await this.props.stripe.createToken({name: "Name"})
        let res = await axios.post("/api/payment", {token: token.id})

        if(res.ok) {
            console.log("Purchase complete")
        }
    }

    render() {
        const className = this.props.paymentShow ? "payment" : "payment_none"
        return (
            <div className={className}>
                <div className="payment_content">
                    <button onClick={() => this.props.togglePaymentShow()}>X</button>
                    <div>
                        <CardElement />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default injectStripe(Payment)