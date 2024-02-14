import React, {Component} from "react"
import Form from "react-bootstrap/Form"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"

export default class EditTShirt extends Component
{
    constructor(props) 
    {
        super(props)

        this.state = {
            product_id: 0,
            name: ``,
            colour: ``,
            size: [],
            price: 0,
            gender: ``,
            category: ``,
            brand: ``,
            current_stock: 0,
            redirectToDisplayProducts:sessionStorage.accessLevel < ACCESS_LEVEL_ADMIN
        }
    }

    componentDidMount() 
    {      
        this.inputToFocus.focus()
  
        axios.get(`${SERVER_HOST}/products/${this.props.match.params.product_id}`)
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
                    this.setState({
                        product_id: res.data.product_id,
                        name: res.data.name,
                        colour: res.data.colour,
                        size: res.data.size,
                        price: res.data.price,
                        gender: res.data.gender,
                        category: res.data.category,
                        brand: res.data.brand,
                        current_stock: res.data.current_stock,
                        redirectToDisplayProducts:false
                    })
                }
            }
            else
            {
                console.log(`Record not found`)
            }
        })
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
            price:this.state.price,
            gender:this.state.gender,
            category:this.state.category,
            brand:this.state.brand,
            current_stock:this.state.current_stock
        }

        axios.put(`${SERVER_HOST}/products/${this.props.match.params.id}`, tShirtObject)
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
                    console.log(`Record updated`)
                    this.setState({redirectToDisplayProducts:true})
                }
            }
            else
            {
                console.log(`Record not updated`)
            }
        })
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
                        <Form.Control type="text" name="Brand" value={this.state.brand} onChange={this.handleChange} />
                    </Form.Group>

                    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>

                    <Link className="red-button" to={"/DisplayProducts"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}