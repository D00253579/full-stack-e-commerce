import React, {Component} from "react"
import {Link} from "react-router-dom"
import {ACCESS_LEVEL_ADMIN} from "../config/global_constants";


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
                    {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?<Link className="green-button" to={"/EditTShirt/" + this.props.products.product_id}>Edit</Link>:null}
                    {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?  <Link className="red-button" to={"/DeleteTShirt/" + this.props.products.product_id}>Delete</Link>:null}
                </td>
            </tr>
        )
    }
}