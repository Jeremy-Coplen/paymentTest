import React from "react"
import { Switch, Route } from "react-router-dom"

import Shop from "./components/Shop/Shop"
import Checkout from "./components/Checkout/Checkout"

export default <Switch>
    <Route exact path="/" component={Shop}/>
    <Route path="/checkout" component={Checkout}/>
</Switch>