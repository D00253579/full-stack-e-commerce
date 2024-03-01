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
                {localStorage.accessLevel === ACCESS_LEVEL_GUEST ?
                    <div className="account-container">
                        <div className="account-box">
                            <div className="login-box">
                                <h1>WELCOME BACK!</h1>
                                <label> Email Address:<span> *</span> </label>
                                <input type="text" id="email-input"/><br/><br/>
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
                        : <Redirect to={`/UserProfile/${localStorage.email}`}/>}
                        <footer>
                            <Footer/>
                        </footer>
                    </div>
                    )
                }
                }