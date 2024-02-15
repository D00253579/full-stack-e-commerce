import React, {Component} from "react";

import {Link} from "react-router-dom";
import {ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_GUEST} from "../config/global_constants";
import Logout from "./Login/Logout";
export default class TestingDirectory extends Component
{
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
                            <Logout/>
                        </div>
                        :
                        <div>
                            <Link className="testing-green-button" to={"Login/login/"}>Login</Link>
                            <Link className="testing-green-button" to={"Login/register/"}>Register</Link>
                        </div>
                    }
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?
                        <div>
                            <Link className="testing-green-button" to={"AdminDashboard/AdminDashboard/"}>Admin Dashboard</Link>
                            <Link className="testing-green-button" to={"AddTShirt/"}>Add T-Shirt</Link>
                        </div>:null
                    }
                    <Link className="testing-green-button" to={"NavBar/"}>Nav Bar</Link>

                </div>
            </div>
        )
    }
}