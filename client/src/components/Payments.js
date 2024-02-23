import React, {Component} from "react"
import NavBar from "./NavBar";
import pinkTshirt from "../tshirts-images/p10/front.png";
import {Link} from "react-router-dom";
import Footer from "./Footer";

export default class Payments extends Component {
constructor(props) {
    super(props);
}
    /*
        Include inputs for:
        Email
        first and last name
        mobile number
        dob
        country
     */

    render() {
        return (
            <div>
                <NavBar/>
                <div className="payments-container">
                    <div>
                        <div className="shopping-bag-head-container">
                            <NavBar/>
                        </div>
                        <div className="bag-container">
                            <div className="bag-box">
                                <div className="bag-title">
                                    <h1>Billing Information</h1>
                                </div>
                                {/*<div className="product">*/}
                                <div className="titles">
                                    Address:
                                    <input type="text" id="address"/><br></br>
                                    Postcode:
                                    <input type="text" id="postcode"/>
                                </div>
                                <div className="payment-details">
                                    <h1>Payment Details</h1>
                                </div>
                                <div className="checkout-buttons">
                                    {/*<BuyProduct productID={this.state.products._id} price={this.state.products.price}/>*/}
                                </div>
                            </div>
                        </div>
                        <div className="footer-container">
                            <Footer/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}