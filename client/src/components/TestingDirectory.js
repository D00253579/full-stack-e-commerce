import React, {Component} from "react";

import {Link} from "react-router-dom";
import {ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_GUEST, SERVER_HOST} from "../config/global_constants";
import Logout from "./Login/Logout";
import axios from "axios";
import router from "react-router-dom/es/Router";
export default class TestingDirectory extends Component
{
    constructor() {
        super();

        this.state = {
        }
    }
    componentDidMount() {
        if(localStorage.accessLevel === ACCESS_LEVEL_GUEST) {
            const email = localStorage.email
        }

    }

    loginAsAdminTEST() {
        axios.post(`${SERVER_HOST}/users/AccountPage/luke@admin.com/adminadmin1!`)
            .then(res =>
            {
                if(res.data)
                {
                    if (res.data.errorMessage) {
                    }
                    else // user successfully logged in
                    {
                        console.log("Logged in as ADMIN for testing")
                        localStorage.name=res.data.name
                        localStorage.accessLevel = ACCESS_LEVEL_ADMIN

                    }
                }
            })


    }

    render() {
        return (

            <div className="testing-body">

                <div className="testing-header">
                    <h1>Testing Directory</h1>
                    <p>This page is used to navigate to specific pages for testing purposes and <span className="red-text">SHOULD NOT</span>  be included in the final submission of this project</p>
                </div>

                <div className="testing-link-container">
                    {localStorage.accessLevel > ACCESS_LEVEL_GUEST ?
                        <div className="logout">
                            {localStorage.profilePhoto !=="null" ? <img id="profilePhoto" src={`data:;base64,${localStorage.profilePhoto}`} alt=""/>: null}
                            <Logout/>
                        </div>
                        :
                        <div>
                            <Link className="testing-green-button" to={"AccountPage/"}>Login</Link>
                            <Link className="testing-green-button" to={"Login/register/"}>Register</Link>
                            <button className="testing-green-button" onClick={this.loginAsAdminTEST}>Login as ADMIN</button>
                        </div>
                    }
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?
                        <div>
                            <Link className="testing-green-button" to={"AdminDashboard/AdminDashboard/"}>Admin Dashboard</Link>
                            <Link className="testing-green-button" to={"AddTShirt/"}>Add T-Shirt</Link>
                            <Link className="testing-green-button" to={"NavBar/"}>Nav Bar</Link>
                            <Link className="testing-green-button" to={"AddAddress/"}>Add Address</Link>
                        </div>:null
                    }


                </div>
            </div>
        )
    }
}