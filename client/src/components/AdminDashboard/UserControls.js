import React, {Component} from "react";
import {Link} from "react-router-dom";


export default class UserControls extends Component
{
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div className="controls-container">
                <Link className="controls-button" to={"/AdminDashboard/Dashboard"}>Admin Dashboard</Link>
                <Link className="controls-button" to={"/"}>Sales</Link>
                <Link className="controls-button" to={"/AdminDashboard/Dashboard"}>Products</Link>
                <Link className="controls-button" to={"/AdminDashboard/CreateProduct"}>Create Product</Link>
                {/*<Link className="controls-button" to={"/"}>TODO</Link>*/}
            </div>

        )

    }


}

