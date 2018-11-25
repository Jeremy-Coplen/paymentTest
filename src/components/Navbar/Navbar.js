import React from "react"
import { Link } from "react-router-dom"

function Navbar(props) {
    return (
        <div>
            <Link to="/"><button>Shop</button></Link>
            <Link to="/cart"><button>Cart</button></Link>
            <Link to="/checkout"><button>Checkout</button></Link>
        </div>
    )
}

export default Navbar