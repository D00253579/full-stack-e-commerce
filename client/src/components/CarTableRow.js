import React, {Component} from "react"
import {Link} from "react-router-dom"


export default class CarTableRow extends Component 
{    
    render() 
    {
        return (
            <tr>
                <td>{this.props.car.product_id}</td>
                <td>{this.props.car.name}</td>
                <td>{this.props.car.colour}</td>
                <td>{this.props.car.size}</td>
                <td>{this.props.car.price}</td>
                <td>{this.props.car.gender}</td>
                <td>{this.props.car.category}</td>
                <td>{this.props.car.brand}</td>
                <td>{this.props.car.current_stock}</td>
                <td>
                    <Link className="green-button" to={"/EditCar/" + this.props.car._id}>Edit</Link>                    
                    <Link className="red-button" to={"/DeleteCar/" + this.props.car._id}>Delete</Link>   
                </td>
            </tr>
        )
    }
}