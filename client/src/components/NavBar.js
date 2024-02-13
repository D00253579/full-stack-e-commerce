import React, {Component} from "react"
import {Link} from "react-router-dom"
import logo from "../nav-Images/logo.png"
import AccountIcon from "../nav-Images/AccountIcon.jpg"
import BagIcon from "../nav-Images/BagIcon.png"
import SearchIcon from "../nav-Images/SearchIcon.png"
import login from "./Login/login";
import {SERVER_HOST} from "../config/global_constants";

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
                                    {/*<button type="submit" id="Search" >*/}
                                </div>
                            </div>
                            <div className={"icons-container"}>
                                <i className={"searchIcon"}><img src={SearchIcon}/></i>
                                {/*</button>*/}
                            </div>
                        </div>
                        <div className={"icons-container"}>
                            {/*<button type="submit" id="account">*/}
                          <i className={"account"} onClick={login}><img src={AccountIcon}/>
                            </i>
                            {/*</button>*!/*/}
                            <div className={"icons-container"}>
                                {/*<button type="submit" id="bag">*/}
                                <i className={"shopping-bag"}><img src={BagIcon}/> </i>
                                {/*</button>*/}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}