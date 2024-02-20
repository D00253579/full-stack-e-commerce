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
        )
    }
}