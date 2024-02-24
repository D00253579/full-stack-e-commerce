import React, {Component} from "react"
import NavBar from "../NavBar";
import {Redirect} from "react-router-dom";

export default class CreateProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultProduct: [],
            product : {
                name: "",
                colour: "",
                size: [],
                price: "",
                gender: "",
                category: "",
                current_stock: "",
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
    handleCheckboxChange = (e) => {
        const {checked, value} = e.target
        if(checked) { // if checkbox is checked add it to sizes array in product state
               this.setState(prevState => ({
                   product: {
                       ...prevState.product,
                       size: [...prevState.product.size, value]
                   }

               }))

        } else { // if unchecked remove the value from the array
            this.setState(prevState => ({
                product: {
                    ...prevState.product,
                    size: prevState.product.size.filter(size => size !== size)
                }
            }))
        }

    }
    handleReturn = () => {
        this.setState({redirectToDashboard: true})
    }
    handleClear = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]')
        checkboxes.forEach((checkbox => { // uncheck all checkboxes
            checkbox.checked = false
        }))
        this.setState({product: this.state.defaultProduct})
    }

    handleCreateProduct = (e) => {
        e.preventDefault()
        console.log("Product values: ", this.state.product)
    }

    render() {
        console.log(this.state.product)
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
                            <label>Inbound Stock</label>
                            <input
                                type="text"
                                name="current_stock"
                                value={this.state.product.current_stock}
                                onChange={this.handleChange}
                            />
                        </div>

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
                            <fieldset className="size-selector">
                                <legend>Available Sizes</legend>
                                <div className="size-option">
                                    <label htmlFor="small">
                                        Small
                                        <input
                                            type="checkbox"
                                            id="small"
                                            name="size"
                                            value="small"
                                            onChange={this.handleCheckboxChange}
                                        />
                                    </label>
                                </div>
                                <div className="size-option">
                                    <label htmlFor="medium">
                                        Medium
                                        <input
                                            type="checkbox"
                                            id="medium"
                                            name="size"
                                            value="medium"
                                            onChange={this.handleCheckboxChange}
                                        />
                                    </label>
                                </div>
                                <div className="size-option">
                                    <label htmlFor="large">
                                        Large
                                        <input
                                            type="checkbox"
                                            id="large"
                                            name="size"
                                            value="large"
                                            onChange={this.handleCheckboxChange}
                                        />
                                    </label>

                                </div>
                            </fieldset>
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

                        <button onClick={this.handleCreateProduct}>Create</button>
                        <button onClick={this.handleClear}>Clear</button>
                        <button onClick={this.handleReturn}>Return</button>

                    </form>
                </div>


            </div>
        )
    }
}