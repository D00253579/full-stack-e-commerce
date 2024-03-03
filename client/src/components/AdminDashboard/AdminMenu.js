import React, {Component} from "react";
import {SERVER_HOST} from "../../config/global_constants";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import MainPage from "../MainPage";


export default class AdminMenu extends Component {


    render() {
        return (
            <div>
                <div className="menu-container">
                    <h1>ADMIN</h1>
                    <div className="hl"></div>
                    <div className="sub-titles">
                        <Link className="controls-button" to={"/UserProfile"}>
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
                    <div className="admin-logout-btn-container">
                        <button className="admin-logout-btn">
                            LOG OUT
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}