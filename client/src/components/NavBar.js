import React, {Component} from "react"
import {Link} from "react-router-dom"

export default class NavBar extends Component {

    render() {
        return (
            <div className="nav-container">
                <header>
                    <nav>
                        <div className="search-bar">
                            <div id="logo-container">

                            </div>
                            <input placeholder="Search" type="text" id="search"/>
                            <div className="search-btn">

                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
}