import React, {Component} from "react"
import {Link} from "react-router-dom"


export default class ProductsTableRow extends Component
{    
    render() 
    {
        return (
            <tr>
                <td>{this.props.products.product_id}</td>
                <td>{this.props.products.name}</td>
                <td>{this.props.products.colour}</td>
                <td>{this.props.products.size}</td>
                <td>{this.props.products.price}</td>
                <td>{this.props.products.gender}</td>
                <td>{this.props.products.category}</td>
                <td>{this.props.products.brand}</td>
                <td>{this.props.products.current_stock}</td>
                <td>
                    <Link className="green-button" to={"/EditTShirt/" + this.props.products.product_id}>Edit</Link>
                    <Link className="red-button" to={"/DeleteTShirt/" + this.props.products.product_id}>Delete</Link>
                </td>
            </tr>
        )
    }
}