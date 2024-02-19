import React, {Component} from "react"
import NavBar from "./NavBar";
import Footer from "./Footer";
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
            <div>
                <div className="shopping-bag-head-container">
                    <NavBar/>
                </div>
            <div className="bag-container">
                <div className="bag-title">
                    <h1>Your Bag</h1>
                </div>
                <div className="product-title">
                    <h2>Product</h2>
                </div>
                <div className={"tshirt-container"}>
                    {/*selected tshirt displayed in here*/}
                </div>
                <div className="edit-bag">
                    <h2>Edit</h2>
                </div>
                <div className="total-container">
                    <h2>Total</h2>
                </div>
                <div className="checkout-buttons">
                    <button type="button" id={"bag-checkout"}>PROCEED TO CHECKOUT</button>
                </div>
            </div>
                <div className="footer-container">
                    <Footer/>
                </div>
            </div>
        )
    }

}
