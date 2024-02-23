import React, {Component} from "react"
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";
import {Redirect} from "react-router-dom";
import Navbar from "../NavBar";

export default class AdminEditProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: [],
            redirectToDashboard: false
        }
    }
    componentDidMount() {
        const productID = this.props.match.params.id // get productID passed from redirect parameters
        // console.log(productID)

        // get the product with the matching id from database collection
        axios.get(`${SERVER_HOST}/products/${productID}`,{headers:{"authorization":localStorage.token}})
            .then(res => {
                if(res.data) {
                    if(res.data.errorMessage) {

                    } else {
                        console.log("Product found and displaying in AdminEditProduct")
                        this.setState({product: res.data}) // set state of product to response data
                    }
                } else {
                    console.log("Product not found")
                }
            })
    }


    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState((prevState) => ({
            product: {
                ...prevState.product,
                [name]: value,
            }
        }))
    }
    handleReturn = () => {
        this.setState({redirectToDashboard: true})
    }
    validateUpdate = (p) => {
        let inputIsValid = true;

        // if one or more of the inputs are empty they are invalid
        if((!p.name.trim() || !p.colour.trim() || !p.gender.trim() || !p.brand.trim() )) {
            inputIsValid = false;
            console.log("String inputs are empty")
        }

        if(p.price.toString().length === 0) {
            inputIsValid = false
            console.log("Number inputs are empty")
        }
        console.log("inputIsValid: ", inputIsValid)
        return inputIsValid; // Return true if all inputs are non-empty
    }


    handleUpdateProduct = (e) => {
        e.preventDefault()
        let updatedProduct = {
            name: this.state.product.name,
            colour: this.state.product.colour,
            price: this.state.product.price,
            gender: this.state.product.gender,
            category: this.state.product.category,
            brand: this.state.product.brand
        }

        // if function returns false then one or more inputs are empty, if true send updated product to server
        if(!this.validateUpdate(updatedProduct)) {
            console.log("TODO   Some inputs are invalid ")
        } else {
            axios.put(`${SERVER_HOST}/products/${this.state.product._id}`, {updatedProduct}, {headers:{"authorization":localStorage.token}})
                .then((res) => {
                    if (res.data) {
                        if(res.data.errorMessage) {

                        } else {
                            console.log("Updated product: ",updatedProduct)
                            this.setState({redirectToDashboard: true}) // after the update is complete redirect back to AdminDashboard
                        }
                    } else {
                        console.log("Product not updated")
                    }
                })
        }

    }

    handleDeleteProduct = (e) => {
        e.preventDefault()
        const productID = this.props.match.params.id
        //console.log(productID)
        axios.delete(`${SERVER_HOST}/products/${productID}`, {headers:{"authorization":localStorage.token}})
            .then (res =>
            {
                if(res.data) {
                    if(res.data.errorMessage) {

                    } else {
                        console.log("Product has been deleted")
                    }
                } else {
                    console.log("Product not deleted")
                }
            })
        this.setState({redirectToDashboard: true})
    }



    render() {
        return (
            <div>
                {this.state.redirectToDashboard ? <Redirect to={"/AdminDashboard/AdminDashboard"}/> : null }

                <div className="admin-head-container">
                    <Navbar/>
                </div>
                <div className="admin-edit-product">
                    <h1>Update Product</h1>
                    <form className="edit-form" >

                        <div className="edit-input">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={this.state.product.name}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="edit-input">
                            <label>Colour</label>
                            <input
                                type="text"
                                name="colour"
                                value={this.state.product.colour}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="edit-input">
                            <label>Price</label>
                            <input
                                type="text"
                                name="price"
                                value={this.state.product.price}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="edit-input">
                            <label>Gender</label>
                            <input
                                type="text"
                                name="gender"
                                value={this.state.product.gender}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="edit-input">
                            <label>Category</label>
                            <input
                                type="text"
                                name="category"
                                value={this.state.product.category}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="edit-input">
                            <label>Brand</label>
                            <input
                                type="text"
                                name="brand"
                                value={this.state.product.brand}
                                onChange={this.handleChange}
                            />
                        </div>

                        <button onClick={this.handleUpdateProduct}>Update</button>
                        <button onClick={this.handleDeleteProduct}>Delete</button>
                        <button onClick={this.handleReturn}>Return</button>

                    </form>
                </div>
            </div>
        )
    }


}


