import React, {Component} from "react"
import NavBar from "../NavBar";
import {Redirect} from "react-router-dom";

export default class CreateProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product : {
                name: "",
            },
            redirectToDashboard: false
        }

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

    render() {
        return (
            <div>
                {this.state.redirectToDashboard ? <Redirect to={"/AdminDashboard/AdminDashboard"}/> : null }

                <div className="admin-head-container">
                    <NavBar/>
                </div>

                    <div className="admin-create-product">
                        <h1>Create Product</h1>
                        <form className="create-form" >

                            <div className="create-input">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={this.state.product.name}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="create-input">
                                <label>Colour</label>
                                <input
                                    type="text"
                                    name="colour"
                                    value={this.state.product.colour}
                                    onChange={this.handleChange}
                                />
                            </div>


                            <div className="create-input">
                                <div className="size-selector">
                                    <h5>Available Size's</h5>
                                    <label> Small
                                        <input
                                            type="checkbox"
                                            name="size"
                                            value="small"/>
                                    </label>
                                    <label> Medium
                                        <input
                                            type="checkbox"
                                            name="size"
                                            value="medium"/>
                                    </label>
                                    <label> Large
                                        <input
                                            type="checkbox"
                                            name="size"
                                            value="large"/>
                                    </label>
                                </div>
                            </div>


                            <div className="create-input">
                                <label>Price</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={this.state.product.price}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="create-input">
                                <label>Gender</label>
                                <input
                                    type="text"
                                    name="gender"
                                    value={this.state.product.gender}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="create-input">
                                <label>Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={this.state.product.category}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="create-input">
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


                <button onClick={this.handleReturn}>Return</button>

            </div>
        )
    }
}