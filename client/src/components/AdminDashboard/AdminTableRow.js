import React, {Component} from "react"
import {Redirect} from "react-router-dom";

export default class AdminTableRow extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            rowIsClicked: false
        }
    }

    handleRowClick = () => {
        this.setState({rowIsClicked: true})
    }

    render() {
        const {
            product_id,
            name,
            price,
            category,
            brand,
            current_stock,
        } = this.props.product;

        return (
            this.state.rowIsClicked ? (<Redirect to={`/AdminDashboard/AdminEditProduct/${this.props.product._id}`} />
            ) : (
                /* let soldOrForSale = null
        if(localStorage.accessLevel <= ACCESS_LEVEL_GUEST)
        {
            if(this.props.car.sold !== true)
            {
                soldOrForSale = <BuyCar carID={this.props.car._id} price={this.props.car.price} />
            }
            else
            {
                soldOrForSale = "SOLD"
            }
        }
               */
                <tr onClick={this.handleRowClick}>
                    <td>{this.props.rowNum}</td>
                    <td>{name} </td>
                    <td>{category}</td>
                    <td>{brand}</td>
                    <td>{price}</td>
                    <td>{current_stock}</td>
                    <td>{product_id}</td>
                </tr>
            )
        )
    }
}