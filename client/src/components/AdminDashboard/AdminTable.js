import React, {Component} from "react"
import AdminTableRow from "./AdminTableRow";



export default class AdminTable extends Component
{
    render()
    {
        return (
            <table className="admin-table">
                <thead>
                <tr>
                    <th>Inventory Number</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>P. Code</th>
                    <th>Stock</th>
                </tr>
                </thead>

                <tbody>
                    {this.props.products.map((product, index) => (
                        <AdminTableRow
                            key={product._id}
                            products={product}
                            rowNum={index + 1}
                            handleRowClick={this.props.handleRowClick}
                        />
                    ))}
                </tbody>
            </table>
        )
    }
}