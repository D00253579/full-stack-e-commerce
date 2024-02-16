import React, {Component} from "react"
import {Link} from "react-router-dom"
import logo from "../nav-Images/logo.png"
import AccountIcon from "../nav-Images/AccountIcon.jpg"
import BagIcon from "../nav-Images/BagIcon.png"
import SearchIcon from "../nav-Images/SearchIcon.png"
import login from "./Login/login";

import {SERVER_HOST} from "../config/global_constants";
import ShoppingCart from "./ShoppingCart";

export default class NavBar extends Component {


    render() {
        return (
            <div className="nav-container">
                <nav>
                    <div className={"container"}>
                    <div className="logo-container">
                        <img src={logo} alt="logo"/>
                    </div>
                        <div className={"search-container"}>
                    <div className={"icons-container"}>
                        <div className="search-bar">
                            <input placeholder="Search" type="text" id="search"/>
                        </div>
                    </div>
                    <div className={"icons-container"}>
                        <i className={"searchIcon"}><img src={SearchIcon}/></i>
                    </div>
                        </div>
                        <div className={"icons-container"}>
                          <i className={"account"} onClick={login}><img src={AccountIcon}/>
                            </i>
                            <div className={"icons-container"}>
                                <i className={"shopping-bag"} title={"bag"} onClick={this.props.changeComponent}><img src={BagIcon}/> </i>
                            </div>
                    </div>
                    </div>
                </nav>
            </div>
        )
    }
    }