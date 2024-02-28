import React, {Component} from "react"
import NavBar from "./NavBar";
import Footer from "./Footer";
import PinkTShirt from "../Images/front.png";
import anotherTshirt from "../../src/tshirts-images/p13/back.png";
import AddIcon from "../Images/AddIcon.png";
import MinusIcon from "../Images/MinusIcon.png";
import {Link} from "react-router-dom"


export default class ShoppingCart extends Component {

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
                    <div className="bag-box">
                        <div className="bag-title">
                            <h1>Your Bag</h1>
                        </div>

                        <div className="sub-container">
                            <div className={"tshirt-container"}>
                                <div className="titles">
                                    <h2>PRODUCT</h2>
                                </div>
                                <img src={PinkTShirt} alt="test-image"/>
                                {/*testing the scroll*/}
                                {/*<img src={anotherTshirt}/>*/}
                            </div>
                            <div className="tshirt-details">
                                <h2>DETAILS</h2>
                                {/*Change to the actual name of the selected tshirt*/}
                                <h3>1985 Collection Slim Fit t-shirt</h3>
                                <h3>S</h3>
                                {/*Green in stock, yellow low in stock, red out of stock*/}
                                <div className={"stock-container"}>
                                    <h3>In stock</h3>
                                </div>
                            </div>
                            <div className="edit-bag">
                                <div className="titles">
                                    <h2>EDIT</h2>
                                    <div className="edit-quantity">
                                        {/*    edit quantity in here */}
                                        <button className="minus-btn" type="button">
                                            <img src={MinusIcon} alt="subtract quantity"/>
                                        </button>
                                        <input type="text" value="1"/>
                                        <button className="add-btn" type="button">
                                            <img src={AddIcon} alt="add quantity"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="total-container">
                                <div className="titles">
                                    <h2>TOTAL</h2>
                                </div>
                                <h3>€25.00</h3>
                            </div>
                        </div>
                        <Link to={"/Payments"}>
                            <div className="checkout-buttons">
                                <button type="button" id={"bag-checkout"}>PROCEED TO CHECKOUT</button>
                                </div>
                            </Link>
                    </div>
                </div>
                <footer>
                    <Footer/>
                </footer>
            </div>
        )
    }

}
