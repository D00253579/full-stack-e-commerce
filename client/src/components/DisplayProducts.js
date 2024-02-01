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
            cars:[]
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
                    this.setState({cars: res.data}) 
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
                <div className="table-container">
                    <ProductTable cars={this.state.cars} />

                    <div className="add-new-car">
                        <Link className="blue-button" to={"/AddTShirt"}>Add New Car</Link>
                    </div>
                </div>
            </div> 
        )
    }
}