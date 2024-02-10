import React, {Component} from "react";

import {Link} from "react-router-dom";

export default class TestingDirectory extends Component
{
    render() {
        return (
            <div className="testing-container">

                <Link className="green-button" to={"AdminDashboard/AdminDashboard/"}>Admin Dashboard</Link>
                <Link className="green-button" to={"Login/login/"}>Login</Link>

            </div>
        )
    }
}