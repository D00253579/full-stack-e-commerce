import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import ProductTable from "./ProductTable"

import {SERVER_HOST} from "../config/global_constants"


export default class DisplayProducts extends Component
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            products:[]
        }
    }
    
    
    componentDidMount() 
    {
        axios.get(`${SERVER_HOST}/products`)
        .then(res => 
        {
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {           
                    console.log("Records read")   
                    this.setState({products: res.data})
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })
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
                    <ProductTable products={this.state.products} />

                    <div className="add-new-TShirt">
                        <Link className="blue-button" to={"/AddTShirt"}>Add New Product</Link>
                    </div>
                </div>
            </div> 
        )
    }
}