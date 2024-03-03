import React, {Component} from "react";
import {ACCESS_LEVEL_GUEST, SERVER_HOST} from "../../config/global_constants";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";


export default class AdminMenu extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            isLoggedIn:true
        }
    }
    handleLogout = (e) =>
    {
        e.preventDefault()

        axios.post(`${SERVER_HOST}/users/AdminMenu`)
            .then(res =>
            {
                if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage)
                    }
                    else
                    {
                        console.log("User logged out")
                        localStorage.clear()

                        localStorage.name = "GUEST"
                        localStorage.accessLevel = ACCESS_LEVEL_GUEST
                        this.setState({isLoggedIn:false})
                    }
                }
                else
                {
                    console.log("Logout failed")
                }
            })
    }
    render() {
        return (
            <div>
                <div className="menu-container">
                    <h1>ADMIN</h1>
                    <div className="hl"></div>
                    <div className="sub-titles">
                        <Link className="controls-button" to={"/AdminDashboard/AdminProfileView"}>
                            <h2>PROFILE</h2>
                        </Link>
                        <Link className="controls-button" to={"/AdminDashboard/AdminDashboard"}>
                            <h2>PRODUCTS</h2>
                        </Link>
                        <Link className="controls-button" to={"/AdminDashboard/CreateProduct"}>
                            <h2>CREATE PRODUCTS</h2>
                        </Link>
                        <Link className="controls-button" to={"/AdminDashboard/ViewUsers"}>
                            <h2>CUSTOMERS</h2>
                        </Link>
                        <h2>PURCHASE HISTORY</h2>
                        <Link className="controls-button" to={"/MainPage"}>
                            <h2>VIEW MAIN PAGE</h2>
                        </Link>
                    </div>
                    {!this.state.isLoggedIn ? <Redirect to="/MainPage"/> : null}
                    <div className="admin-logout-btn-container">
                        <button onClick={this.handleLogout} className="admin-logout-btn">
                            LOG OUT
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}