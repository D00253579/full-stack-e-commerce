import React, {Component} from "react"
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";
import {Redirect} from "react-router-dom";
import Navbar from "../NavBar";

export default class EditProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            defaultProduct : [],
            redirectToDashboard: false,
            inputsAreInvalid: false,
            nameIsInvalid: false,
            colourIsInvalid: false,
            sizeIsInvalid: false,
            priceIsInvalid: false,
            categoryIsInvalid: false,
            brandIsInInvalid: false,
            stockIsInInvalid: false,
            product : {
                name: "",
                colour: "",
                size: [],
                price: "",
                gender: "",
                category: "",
                brand: "",
                current_stock: "",
                image_1: "",
                image_2: "",
                image_3: ""
            },
            alternateSizes: true // true -> adult, false -> kids
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
                        console.log("Product found and displaying in EditProduct")
                        this.setState({product: res.data,
                                              defaultProduct: res.data}) // set state of product to response data
                    }
                } else {
                    console.log("Product not found")
                }
            })
        console.log(this.handleSizeInputChange())
    }

    handleSizeInputChange = () => {
        const size = this.state.product.size
        const sizesToCheck = ["xs","small","m","l","xl"]

        // returns true if this product is for adults and false for kids
        return sizesToCheck.some(sizesToCheck => size.includes(sizesToCheck))

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
    validateInputs = (product) => {
        let isValid = true // true = valid
        console.log(product.price)
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

        if(!String(product.price).trim()) {             // price
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

        if(!isValid) { // if inputs are invalid trigger visual response to let user know
            this.setState({inputsAreInvalid: true})
        } else {
            this.setState({inputsAreInvalid: false})
        }

        return isValid
    }
    handleReset = () => {
        this.setState({product: this.state.defaultProduct})
    }
    handleReturn = () => {
        this.setState({redirectToDashboard: true})
    }
    handleUpdateProduct = (e) => {
        e.preventDefault()
        // scroll back to the top of the form , take from https://www.w3schools.com/howto/howto_js_scroll_into_view.asp
        const topOfForm = document.getElementById('top-of-form')
        topOfForm.scrollIntoView()
        let updatedProduct = {
            name: this.state.product.name,
            colour: this.state.product.colour,
            size: this.state.product.size,
            price: this.state.product.price,
            gender: this.state.product.gender,
            category: this.state.product.category,
            brand: this.state.product.brand,
        }

        // if function returns false then one or more inputs are empty, if true send updated product to server
        if(!this.validateInputs(updatedProduct)) {
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
        console.log(this.state.product)
        return (

            <div>
                {this.state.redirectToDashboard ? <Redirect to={"/AdminDashboard/AdminDashboard"}/> : null }

                <div className="admin-head-container" id="top-of-form">
                    <Navbar/>
                </div>
                <div className="edit-product-container">
                    <h1>Update Product</h1>
                    <form className="edit-form" >

                        {this.state.inputsAreInvalid ?
                            <div className="err-container">
                                <div>
                                    <span className="err">
                                        <p>One or more of the entries are empty. Please fill out all fields before updating the product.</p>
                                    </span>
                                </div>
                            </div>
                            : null
                        }
                        <div className="edit-input">
                            <label htmlFor="nameInput">
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

                        <div className="edit-input">
                            <label htmlFor="colourInput">
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
                        <div className="edit-input">
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
                        <div className="edit-input">
                            <label htmlFor="priceInput">
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
                        <div className="edit-input">
                            <label htmlFor="genderInput">
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
                        <div className="edit-input">
                            <label htmlFor="categoryInput">
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
                        <div className="edit-input">
                            <label htmlFor="brandInput">
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
                            <button onClick={this.handleDeleteProduct}>Delete</button>
                            <button onClick={this.handleUpdateProduct}>Update</button>
                            <button onClick={this.handleReset}>Reset</button>
                            <button onClick={this.handleReturn}>Return</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }


}


