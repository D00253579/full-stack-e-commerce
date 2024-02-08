import React, {Component} from "react"
import {Link} from "react-router-dom"
import ProductTable from "./ProductTable"

export default class DisplayProducts extends Component
{
    constructor(props) 
    {
        super(props)
    }

    render() 
    {   
        return (           
            <div className="form-container">
                <div>
                    <Link className="green-button" to={"/Login/login"}>Login</Link>
                    <Link className="blue-button" to={"/Login/Register"}>Register</Link>
                </div>
                <div className="table-container">
                    <ProductTable products={this.props.products} />

                    <div className="add-new-TShirt">
                        <Link className="blue-button" to={"/AddTShirt"}>Add New Product</Link>
                    </div>
                </div>
            </div> 
        )
    }
}