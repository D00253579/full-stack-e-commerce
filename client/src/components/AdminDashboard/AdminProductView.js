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
            <div className="admin-product-view">
                <div className="table-container">
                    <AdminTable products={this.props.products}/>

                    <div className="add-new-product">
                        <Link className="blue-button" to={"/AddTShirt"}>
                            Add New Product
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

}