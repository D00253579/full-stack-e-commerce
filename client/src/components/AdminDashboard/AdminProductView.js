import React, {Component} from "react";
import AdminTable from "./AdminTable";

export default class AdminProductView extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div className="admin-table-container">
                    <AdminTable
                        products={this.props.products}
                        updateProducts={this.props.updateProducts}
                    />
                </div>

        )
    }

}