import React, {Component} from "react"
import NavBar from "./NavBar";
import pinkTshirt from "../tshirts-images/p10/front.png";
import {Link} from "react-router-dom";
import Footer from "./Footer";

export default class AccountPage extends Component {


    render() {
        return (
            <div>
                <div className="account-head-container">
                    <NavBar/>
                </div>
                <div className="account-container">
                    <div className="account-box">
                        <div className="login-box">
                            <h1>WELCOME BACK!</h1>
                            <h2> Email Address: </h2>
                            <input type="text" id="address"/>
                            <h2>Password:</h2>
                            <input type="text" id="postcode"/>
                            <div className="register-box">
                                <Link to={"/Login/login"}>
                                    <button className={"signIn-btn"}>SIGN IN</button>
                                </Link>
                            </div>
                        </div>
                            <div className="vl"></div>
                        <div className="register-box">
                        <h1>DON'T HAVE AN ACCOUNT?</h1>
                            <Link to={"/Login/Register"}>
                                <button className={"register-btn"}>REGISTER</button>
                            </Link>
                            <button className={"guest-btn"}>CONTINUE AS GUEST</button>
                        </div>
                    </div>
                </div>
                <footer>
                    <Footer/>
                </footer>
            </div>
        )
    }
}