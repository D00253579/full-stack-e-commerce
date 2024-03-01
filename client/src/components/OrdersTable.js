import React, {Component} from "react"
import OrdersTableRow from "./OrdersTableRow";

export default class OrdersTable extends Component
{
    constructor(props) {
        super(props);
        this.state = {


        }
    }



    render()
    {
        return (
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Order Number</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Sent To</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                {this.props.products.map((product, index) => (
                    <OrdersTableRow
                        key={product._id}
                        product={product}
                    />
                ))}
                </tbody>

            </table>
        )
    }
}