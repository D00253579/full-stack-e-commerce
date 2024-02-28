import React, {Component} from "react"
import NavBar from "./NavBar";
import pinkTshirt from "../tshirts-images/p10/front.png";
import {Link, Redirect} from "react-router-dom";
import Footer from "./Footer";
import {ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_GUEST} from "../config/global_constants";

export default class AccountPage extends Component {
    constructor() {
        super();
        this.state = {
            userIsLoggedIn: localStorage.accessLevel > ACCESS_LEVEL_GUEST
        }
    }



    render() {
        return (
            <div>

                <div className="account-head-container">
                    <NavBar/>
                </div>
                {localStorage.accessLevel > ACCESS_LEVEL_GUEST ?
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
                : <Redirect to={"/UserProfile"}/>}
                <footer>
                    <Footer/>
                </footer>
            </div>
        )
    }
}