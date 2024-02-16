import React, {Component} from "react";
import {Link} from "react-router-dom";
import AdminTable from "./AdminTable";

export default class AdminProductView extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        console.log("Displaying Admin view of Products")
        return (
                <div className="admin-table-container">
                    <AdminTable products={this.props.products}
                                handleRowClick={this.props.handleRowClick}
                    />
                </div>

        )
    }

}