import React, {Component} from "react"
import NavBar from "./NavBar";
import {Link} from "react-router-dom"


export default class ShoppingCart extends Component {
    constructor(props) {
        super(props);

    }

   changeComponent = e => {

   }

    //check if tshirts have been added to the bag if so - display the tshirt, price , size and quantity

    //if not then display bag is empty

    //option to add or remove for quantity

    //or remove tshirt completely from the bag

    //put a reserve time when a tshirt is in the bag

    //proceed to checkout button onclick will open up the payments component

    render() {
        return (
            <div className="bag-container">
                <div className={"shopping-bag-header"}>
                    <NavBar/>
                </div>
                <div className={"bag"}>
                    <h1>Your Bag</h1>
                    <h2>Product</h2>
                    <h2>Total</h2>
                    <div className={"tshirt-container"}>

                    </div>
                    <button id={"bag-checkout"}>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        )
    }

}
