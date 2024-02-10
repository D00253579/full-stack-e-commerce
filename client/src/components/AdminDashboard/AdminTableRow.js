import React, {Component} from "react"
import ActionDropdown from "./ActionDropdown";


export default class AdminTableRow extends Component
{
    constructor(props) {
        super(props)
    }


    render() {
        const {
            product_id,
            name,
            price,
            category,
            brand,
            current_stock,
        } = this.props.products;
        return (
            <tr>
                <td>{this.props.rowNum}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>{category}</td>
                <td>{brand}</td>
                <td>{product_id}</td>
                <td>{current_stock}</td>
                <td>
                    <ActionDropdown id={this.props.products.product_id} />
                </td>
            </tr>
        )
    }
}