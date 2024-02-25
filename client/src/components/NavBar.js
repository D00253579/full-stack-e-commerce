import React, {Component} from "react"
import {Link} from "react-router-dom"
import Logo from "../Images/logo.png"
import AccountIcon from "../Images/AccountIcon.png"
import BagIcon from "../Images/BagIcon.png"
import SearchIcon from "../Images/SearchIcon.png"
import login from "./Login/Login";
import {SERVER_HOST} from "../config/global_constants";
import ShoppingCart from "./ShoppingCart";

export default class NavBar extends Component {


    render() {
        return (
            <div className="nav-container">
                <nav>
                    <div className={"container"}>
                        <div className={"search-container"}>
                            <div className="search-bar">
                                <input placeholder="Search" type="text" id="search"/>
                            </div>
                            <div className={"icons-container"}>
                                <i className={"searchIcon"}><img src={SearchIcon}/></i>
                            </div>
                        </div>
                        <div className={"icons-container"}>
                            <i className={"logo-image"}><img src={Logo} alt="logo"/></i>
                        </div>
                        <div className={"icons-container"}>
                            <Link to={"/AccountPage"}>
                                <i className={"account"}>
                                    <img src={AccountIcon} alt="Account Tab"/>
                                </i>
                            </Link>
                        </div>
                        <div className={"icons-container"}>
                            <Link to={"/ShoppingCart"}>
                                <i className={"shopping-bag"}>
                                    <img src={BagIcon} alt="Shopping Cart"/>
                                </i>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}