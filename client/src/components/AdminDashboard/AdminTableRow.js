import React, {Component} from "react"


export default class AdminTableRow extends Component
{
    constructor(props) {
        super(props)
    }


    handleRowClick = () => {
        this.props.handleRowClick(this.props.products._id)
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
            <tr onClick={this.handleRowClick}>
                <td>{this.props.rowNum}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>{category}</td>
                <td>{brand}</td>
                <td>{product_id}</td>
                <td>{current_stock}</td>
            </tr>
        )
    }
}