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
                            <label> Email Address:<span> *</span> </label>
                            <input type="text" id="email-input"/><br/>
                            <label>Password:<span> *</span></label>
                            <input type="password" id="password-input"/>
                            <div className="register-box">
                                    <Link to={"/Login/login"}>
                                        <button className={"signIn-btn"}>SIGN IN</button>
                                    </Link>
                            </div>
                        </div>
                            <div className="vl"></div>
                        <div className="register-box">
                            <div className={"no-account-container"}>
                            <h1>DON'T HAVE AN ACCOUNT?</h1>
                                <Link to={"/Login/Register"}>
                                    <button className={"register-btn"}>CREATE AN ACCOUNT</button>
                                </Link>
                                {/*Continue as guest would take you back to the main page - using the guest features*/}
                                <Link to={"/MainPage"}>
                                    <button className={"guest-btn"}>CONTINUE AS GUEST</button>
                                </Link>
                            </div>
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