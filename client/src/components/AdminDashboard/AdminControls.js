import React, {Component} from "react";
import {Link} from "react-router-dom";


export default class AdminControls extends Component
{
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div className="controls-container">
                <Link className="controls-button" to={"/"}>Users</Link>
                <Link className="controls-button" to={"/"}>Sales</Link>
                <Link className="controls-button" to={"/AdminDashboard/AdminDashboard"}>Products</Link>
                <Link className="controls-button" to={"/"}>TODO</Link>
                <Link className="controls-button" to={"/"}>TODO</Link>
            </div>

        )

    }


}
