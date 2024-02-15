import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_ADMIN,SERVER_HOST} from "../config/global_constants"


export default class AddTShirt extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            product_id:"",
            name:"",
            colour:"",
            size:"",
            price:"",
            gender:"",
            category:"",
            brand:"",
            current_stock:"",
            redirectToDisplayProducts:localStorage.accessLevel < ACCESS_LEVEL_ADMIN
        }
    }


    componentDidMount() 
    {     
        this.inputToFocus.focus()        
    }
 
 
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleSubmit = (e) => 
    {
        e.preventDefault()

        const tShirtObject = {
            product_id:this.state.product_id,
            name:this.state.name,
            colour:this.state.colour,
            size:this.state.size,
            price:this.state.name,
            gender:this.state.gender,
            category:this.state.category,
            brand:this.state.brand,
            current_stock:this.state.current_stock
        }

        axios.post(`${SERVER_HOST}/products`, tShirtObject, {headers:{"authorization":localStorage.token}})
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
                    console.log("Record added")
                    this.setState({redirectToDisplayProducts:true})
                } 
            }
            else
            {
                console.log("Record not added")
            }
        })
        //TODO Edit Validation when add is working (MongoDB with Validation in dereks notes)

    }


    render()
    { 
        return (
            <div className="form-container"> 
                {this.state.redirectToDisplayProducts ? <Redirect to="/DisplayProducts"/> : null}
                    
                <Form>               
                    <Form.Group controlId="product_id">
                        <Form.Label>Product_id</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="product_id" value={this.state.product_id} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="colour">
                        <Form.Label>Colour</Form.Label>
                        <Form.Control type="text" name="colour" value={this.state.colour} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="size">
                        <Form.Label>Size</Form.Label>
                        <Form.Control type="text" name="size" value={this.state.size} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control type="text" name="gender" value={this.state.gender} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" name="category" value={this.state.category} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" name="brand" value={this.state.brand} onChange={this.handleChange} />
                    </Form.Group>

                    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>            
            
                    <Link className="red-button" to={"/DisplayProducts"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}