import React, {Component} from "react"
import NavBar from "../NavBar";
import {Redirect} from "react-router-dom";
import {SERVER_HOST} from "../../config/global_constants";
import axios from "axios";

export default class CreateProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultProduct: [],
            redirectToDashboard: false,
            inputsAreInvalid: false,
            nameIsInvalid: false,
            colourIsInvalid: false,
            sizeIsInvalid: false,
            priceIsInvalid: false,
            categoryIsInvalid: false,
            brandIsInvalid: false,
            stockIsInInvalid: false,
            product : {
                product_id: "",
                name: "",
                colour: "",
                size: [],
                price: "",
                gender: "",
                category: "",
                brand: "",
                current_stock: "",
            },

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
    validateInputs = () => {
        let isValid = true // true = valid
        const product = this.state.product

        //console.log("Product: ", product)
        if(!product.name.trim()) {              // name
            isValid = false
            document.getElementById("nameInput").classList.add("invalid-input")
            this.setState({nameIsInvalid: true})
        } else {
            document.getElementById("nameInput").classList.remove("invalid-input")
            this.setState({nameIsInvalid: false})
        }

        if(!product.colour.trim()) {            // colour
            isValid = false
            document.getElementById("colourInput").classList.add("invalid-input")
            this.setState({colourIsInvalid: true})
        } else {
            document.getElementById("colourInput").classList.remove("invalid-input")
            this.setState({colourIsInvalid: false})
        }

        if(product.size.length === 0) {         // size
            isValid = false
            document.getElementById("sizeSelector").classList.add("invalid-input")
            this.setState({sizeIsInvalid: true})

        } else {
            document.getElementById("sizeSelector").classList.remove("invalid-input")
            this.setState({sizeIsInvalid: false})
        }

        if(!product.price.trim()) {             // price
            isValid = false
            document.getElementById("priceInput").classList.add("invalid-input")
            this.setState({priceIsInvalid: true})

        } else {
            document.getElementById("priceInput").classList.remove("invalid-input")
            this.setState({priceIsInvalid: false})
        }

        if(!product.gender.trim()) {            // gender
            isValid = false
            document.getElementById("genderInput").classList.add("invalid-input")
            this.setState({genderIsInvalid: true})

        } else {
            document.getElementById("genderInput").classList.remove("invalid-input")
            this.setState({genderIsInvalid: false})
        }

        if(!product.category.trim()) {          // category
            isValid = false
            document.getElementById("categoryInput").classList.add("invalid-input")
            this.setState({categoryIsInvalid: true})

        } else {
            document.getElementById("categoryInput").classList.remove("invalid-input")
            this.setState({categoryIsInvalid: false})
        }

        if(!product.brand.trim()) {             // brand
            isValid = false
            document.getElementById("brandInput").classList.add("invalid-input")
            this.setState({brandIsInvalid: true})
        } else {
            document.getElementById("brandInput").classList.remove("invalid-input")
            this.setState({brandIsInvalid: false})
        }

        if(!product.current_stock.trim()) {     // current_stock
            isValid = false
            document.getElementById("stockInput").classList.add("invalid-input")
            this.setState({stockIsInvalid: true})
        } else {
            document.getElementById("stockInput").classList.remove("invalid-input")
            this.setState({stockIsInvalid: false})

        }
        if(!isValid) { // if inputs are invalid trigger visual response to let user know
            this.setState({inputsAreInvalid: true})
        } else {
            this.setState({inputsAreInvalid: false})
        }

        return isValid
    }

    handleCreateProduct = (e) => {
        e.preventDefault()
        // scroll back to the top of the form , take from https://www.w3schools.com/howto/howto_js_scroll_into_view.asp
        const topOfForm = document.getElementById('top-of-form')
        topOfForm.scrollIntoView()

        console.log("Product: ", this.state.product)
        console.log("Inputs are valid: ",this.validateInputs())
        if(this.validateInputs()){
            const createdProduct = this.state.product;
            axios.post(`${SERVER_HOST}/products`, {createdProduct}, {headers:{"authorization":localStorage.token}})
                .then(res =>
                {
                    if(res.data)
                    {
                        if(res.data.errorMessage) {
                            console.log("Product NOT created")
                        } else {
                            console.log("Product created: ", createdProduct)
                            this.handleReturn()
                        }


                    } else {
                        console.log("No response")
                    }
                })

        } else {
            console.log("Inputs are invalid")
        }
    }

    render() {

        return (
            <div>
                {this.state.redirectToDashboard ? <Redirect to={"/AdminDashboard/AdminDashboard"}/> : null }

                <div className="admin-head-container" id="top-of-form">
                    <NavBar/>
                </div>

                <div className="admin-create-product" >
                    <h1 >Create Product</h1>
                    <form className="create-form" >

                        {this.state.inputsAreInvalid ?
                            <div className="err-container">
                                <div>
                                    <span className="err">
                                        <p>One or more of the entries are empty. Please fill out all fields before publishing the product.</p>
                                    </span>
                                </div>
                            </div>
                            : null
                        }
                        <div className="create-input">
                            <label className="form-label" htmlFor="stockInput">
                                Inbound Stock {this.state.stockIsInvalid ? <span className="err">*</span> : null}
                                <input
                                    type="text"
                                    name="current_stock"
                                    id="stockInput"
                                    value={this.state.product.current_stock}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>

                        <div className="create-input">
                            <label className="form-label" htmlFor="nameInput">
                                Name {this.state.nameIsInvalid ? <span className="err">*</span> : null}
                                <input
                                    type="text"
                                    name="name"
                                    id="nameInput"
                                    value={this.state.product.name}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <div className="create-input">
                            <label className="form-label" htmlFor="colourInput">
                                Colour {this.state.colourIsInvalid ? <span className="err">*</span> : null}
                                <input
                                    type="text"
                                    name="colour"
                                    id="colourInput"
                                    value={this.state.product.colour}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>

                        <div className="create-input">
                            <fieldset className="size-selector" id="sizeSelector">
                                <legend  className="form-label">
                                    Available Sizes {this.state.sizeIsInvalid ? <span className="err">*</span> : null}
                                </legend>
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
                            <label className="form-label" htmlFor="priceInput">
                                Price {this.state.priceIsInvalid ? <span className="err">*</span> : null}
                                <input
                                    type="text"
                                    name="price"
                                    id="priceInput"
                                    value={this.state.product.price}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <div className="create-input">
                            <label className="form-label" htmlFor="genderInput">
                                Gender {this.state.genderIsInvalid ? <span className="err">*</span> : null}
                                <input
                                    type="text"
                                    name="gender"
                                    id="genderInput"
                                    value={this.state.product.gender}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <div className="create-input">
                            <label className="form-label" htmlFor="categoryInput">
                                Category {this.state.categoryIsInvalid ? <span className="err">*</span> : null}
                                <input
                                    type="text"
                                    name="category"
                                    id="categoryInput"
                                    value={this.state.product.category}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <div className="create-input">
                            <label className="form-label" htmlFor="brandInput">
                                Brand {this.state.brandIsInvalid ? <span className="err">*</span> : null}
                                <input
                                    type="text"
                                    name="brand"
                                    id="brandInput"
                                    value={this.state.product.brand}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>

                        <div className="form-controls">
                            <button onClick={this.handleClear}>Clear</button>
                            <button onClick={this.handleCreateProduct}>Create</button>
                            <button onClick={this.handleReturn}>Return</button>
                        </div>


                    </form>
                </div>


            </div>
        )
    }
}