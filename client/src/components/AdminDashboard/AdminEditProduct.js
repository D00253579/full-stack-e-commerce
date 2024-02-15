import React, {Component} from "react"
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";

export default class AdminEditProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            p_id: this.props.p_id,
            product: {
                name: "",
                colour: "",
                size: "",
                price: "",
                gender: "",
                category: "",
                brand: ""
            }



        }
    }
    componentDidMount() {
        axios.get(`${SERVER_HOST}/products/${this.state.p_id}`)
            .then((res) => {
                if(res.data) {
                    if(res.data.errorMessage) {

                    } else {
                        console.log("Product found from collection")
                        this.setState({product: res.data})

                    }
                } else {
                    console.log("Product not found when readying product from collection")
                }
            })
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

        console.log("Updated product: ",updatedProduct)
        axios.put(`${SERVER_HOST}/products/${this.state.p_id}`, {product: updatedProduct})
            .then((res) => {
                if (!res.data) {
                    console.log("Product not found when updating product")
                } else {

                }
            })

    }
    handleDeleteProduct() {

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
        this.setState({product: []})
        this.props.handleRowUnClick()
    }

    render() {
        console.log("Selected Product: ",this.state.product)
        //console.log("ObjectID of Product: ", this.state.p_id)
        return (

            <div>

                <div className="admin-edit-product">
                    <h1>Update Product</h1>
                    <form className="edit-form">

                        <div className="edit-input">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={this.state.product.name}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="edit-input">
                            <label>Colour</label>
                            <input
                                type="text"
                                name="colour"
                                defaultValue={this.state.product.colour}
                            />
                        </div>

                        <div className="edit-input">
                            <label>Price</label>
                            <input
                                type="text"
                                name="price"
                                defaultValue={this.state.product.price}
                            />
                        </div>

                        <div className="edit-input">
                            <label>Gender</label>
                            <input
                                type="text"
                                name="gender"
                                defaultValue={this.state.product.gender}
                            />
                        </div>

                        <div className="edit-input">
                            <label>Category</label>
                            <input
                                type="text"
                                name="category"
                                defaultValue={this.state.product.category}
                            />
                        </div>

                        <div className="edit-input">
                            <label>Brand</label>
                            <input
                                type="text"
                                name="brand"
                                defaultValue={this.state.product.brand}
                            />
                        </div>

                        <button onClick={this.handleUpdateProduct}>Update</button>
                        <button>Delete</button>
                        <button onClick={this.handleReturn}>Return</button>
                    </form>
                </div>
                <button value="Cancel" className="red-button" onClick={this.handleReturn}>Cancel</button>
            </div>
        )
    }


}


