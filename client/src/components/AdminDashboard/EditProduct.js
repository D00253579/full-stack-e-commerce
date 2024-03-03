import React, {Component} from "react"
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";
import {Redirect} from "react-router-dom";
import Navbar from "../NavBar";
import Footer from "../Footer";


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
            stock: 0,
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
            alternateSizes: false, // false = adult size, true = kids size
            sizeText: "Adult"
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
                        this.setState({product: res.data,// set state of product to response data
                                              defaultProduct: res.data,
                                              stock: res.data.current_stock,
                                              size: res.data.size  })
                    }

                } else {
                    console.log("Product not found")
                }
                console.log("hasAdultSizes: ", this.handleSizeInputChange())
                this.setPresetCheckboxes()
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

    /** Checks if the current product contains 'adult' sizes
     *  true -> show adult sizes
     *  false -> show kids sizes
     **/
    handleSizeInputChange = (e) => {
        const sizesToCheck = ["xs", "s", "m", "l", "xl"];
        const sizeArray = this.state.product.size.toString().split(",");
        const hasAdultSizes = sizesToCheck.some(size => sizeArray.includes(size));

        // Change sizes displayed
        if(!hasAdultSizes)
            this.setState({alternateSizes: true}) // show kids
         else
             this.setState({alternateSizes: false}) // show adult
        return hasAdultSizes
    }

    /**
     *   Checks the sizes array in the product for each size
     *   if size in array, set that checkbox -> checked
     */
    setPresetCheckboxes = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]')

        let passedSizes = this.state.product.size
        passedSizes = passedSizes.map(item => item.split(','))
        console.log(passedSizes)
        checkboxes.forEach((checkbox => {
            console.log("here")
            for(let i =0; i < passedSizes.length; i++) {
                //console.log("array:", passedSizes[i])
                //console.log("checkbox:", checkbox.value)
                if(passedSizes[i][0] === checkbox.value) {
                    // console.log("MATCHED")
                    checkbox.checked = true;
                }
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
    handleStockChange = (e) => {
        this.setState({stock: e.target.value})
    }
    handleReset = () => {
        this.setState({product: this.state.defaultProduct})
    }
    handleReturn = () => {
        this.setState({redirectToDashboard: true})
    }
    validateInputs = () => {
        let isValid = true // true = valid
        const product = this.state.product
        console.log("******-> ", product)


        const validationPatterns = {
            name: /^[a-zA-Z\s-]{1,}$/, // At least one letter or space required
            colour: /^[a-zA-Z\s]{1,}$/, // At least one letter or space required
            price: /^\d+(\.\d{1,2})?$/, // Positive number with up to 2 decimal places allowed
            gender: /^[a-zA-Z]{1,}$/, // At least one letter required
            category: /^[a-zA-Z\s]{1,}$/, // At least one letter or space required
            brand: /^[a-zA-Z\s-.&]{1,}$/, // At least one letter or space required
            current_stock: /^\d{1,}$/ // At least one digit required
        }
        const isInputValid = (input, pattern) => {
            return pattern.test(input)
        }

        /** Validate product STOCK input */
        if(!isInputValid(product.current_stock, validationPatterns.current_stock)) {
            isValid = false
            document.getElementById("stockInput").classList.add("invalid-input")
            this.setState({stockIsInvalid: true})
        }
        else
        {
            document.getElementById("stockInput").classList.remove("invalid-input")
            this.setState({stockIsInvalid: false})
        }

        /** Validate product NAME input */
        if(!isInputValid(product.name, validationPatterns.name)) {
            isValid = false
            document.getElementById("nameInput").classList.add("invalid-input")
            this.setState({nameIsInvalid: true})
        }
        else
        {
            document.getElementById("nameInput").classList.remove("invalid-input")
            this.setState({nameIsInvalid: false})
        }

        /** Validate product COLOUR input  */
        if(!isInputValid(product.colour, validationPatterns.colour)) {
            isValid = false
            document.getElementById("colourInput").classList.add("invalid-input")
            this.setState({colourIsInvalid: true})
        } else {
            document.getElementById("colourInput").classList.remove("invalid-input")
            this.setState({colourIsInvalid: false})
        }

        /** Validate product SIZE input */
        const productSizes = this.state.product.size
        if(productSizes.length === 0) {
            isValid = false
            document.getElementById("sizeSelector").classList.add("invalid-input")
            this.setState({sizeIsInvalid: true})
        }
        else
        {
            document.getElementById("sizeSelector").classList.remove("invalid-input")
            this.setState({sizeIsInvalid: false})
        }

        /** Validate product PRICE input  */
        if(!isInputValid(product.price, validationPatterns.price)) {
            isValid = false
            document.getElementById("priceInput").classList.add("invalid-input")
            this.setState({priceIsInvalid: true})
        } else {
            document.getElementById("priceInput").classList.remove("invalid-input")
            this.setState({priceIsInvalid: false})
        }

        /** Validate product GENDER input */
        if(!isInputValid(product.gender, validationPatterns.gender)) {
            isValid = false
            document.getElementById("genderInput").classList.add("invalid-input")
            this.setState({genderIsInvalid: true})
        } else {
            document.getElementById("genderInput").classList.remove("invalid-input")
            this.setState({genderIsInvalid: false})
        }

        /** Validate product CATEGORY input */
        if(!isInputValid(product.category, validationPatterns.category)) {
            isValid = false
            document.getElementById("categoryInput").classList.add("invalid-input")
            this.setState({categoryIsInvalid: true})
        } else {
            document.getElementById("categoryInput").classList.remove("invalid-input")
            this.setState({categoryIsInvalid: false})
        }

        /** Validate product BRAND input */
        if(!isInputValid(product.brand, validationPatterns.brand)) {
            isValid = false
            document.getElementById("brandInput").classList.add("invalid-input")
            this.setState({brandIsInvalid: true})
        } else {
            document.getElementById("brandInput").classList.remove("invalid-input")
            this.setState({brandIsInvalid: false})
        }

        // if inputs are invalid trigger visual response to let user know
        if(!isValid) {
            this.setState({inputsAreInvalid: true})
        } else {
            this.setState({inputsAreInvalid: false})
        }

        return isValid
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
            current_stock: this.state.stock
        }
        console.log(updatedProduct)

        // if function returns false then one or more inputs are empty, if true send updated product to server
        if(this.validateInputs()) {
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
        } else {
            console.log("Inputs are invalid")
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
        //console.log(this.state.product)
        //console.log(this.validateInputs())
        return (
            <div>
                {this.state.redirectToDashboard ? <Redirect to={"/AdminDashboard/AdminDashboard"}/> : null }

                <div className="admin-head-container" id="top-of-form">
                    <Navbar/>
                </div>
                <div className="admin-edit-product">
                    <h1>Update Products</h1>
                    <form className="edit-form">


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
                            <label className="form-label" htmlFor="nameInput">
                                Enter Name: {this.state.nameIsInvalid ? <span className="err">*</span> : null}

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
                            <label className="form-label" htmlFor="colourInput">
                                Enter Colour: {this.state.colourIsInvalid ? <span className="err">*</span> : null}

                                <input
                                    type="text"
                                    name="colour"
                                    id="colourInput"
                                    value={this.state.product.colour}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>

                        {!this.state.alternateSizes ?
                            <div className="create-input">
                                <fieldset className="size-selector" id="sizeSelector">
                                    <legend>
                                        Adult Sizes {this.state.sizeIsInvalid ? <span className="err">*</span> : null}
                                    </legend>

                                    <div className="size-container">

                                        <div className="item">

                                            <div className="size-option">
                                                <label className="filter-checkboxes">
                                                    <label htmlFor="x-small">
                                                        XS
                                                        <input
                                                            type="checkbox"
                                                            id="x-small"
                                                            name="size"
                                                            value="xs"
                                                            onChange={this.handleCheckboxChange}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </label>
                                            </div>
                                            <div className="size-option">
                                                <label className="filter-checkboxes">
                                                    <label htmlFor="small">
                                                        S
                                                        <input
                                                            type="checkbox"
                                                            id="small"
                                                            name="size"
                                                            value="s"
                                                            onChange={this.handleCheckboxChange}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="item">
                                            <div className="size-option">
                                                <label className="filter-checkboxes">
                                                    <label htmlFor="medium">
                                                        M
                                                        <input
                                                            type="checkbox"
                                                            id="medium"
                                                            name="size"
                                                            value="m"
                                                            onChange={this.handleCheckboxChange}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </label>
                                            </div>
                                            <div className="size-option">
                                                <label className="filter-checkboxes">
                                                    <label htmlFor="large">
                                                        L
                                                        <input
                                                            type="checkbox"
                                                            id="large"
                                                            name="size"
                                                            value="l"
                                                            onChange={this.handleCheckboxChange}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="item">
                                            <div className="size-option">
                                                <label className="filter-checkboxes">
                                                    <label htmlFor="x-large">
                                                        XL
                                                        <input
                                                            type="checkbox"
                                                            id="x-large"
                                                            name="size"
                                                            value="xl"
                                                            onChange={this.handleCheckboxChange}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            :
                            <div className="create-input">
                                <fieldset className="size-selector" id="sizeSelector">
                                    <legend>
                                        Children Sizes {this.state.sizeIsInvalid ? <span className="err">*</span> : null}
                                    </legend>

                                    <div className="size-container">
                                        <div className="item">

                                            <div className="size-option">
                                                <label className="filter-checkboxes">
                                                    <label htmlFor="kid-range-1">
                                                        6-7Y
                                                        <input
                                                            type="checkbox"
                                                            id="kid-range-1"
                                                            name="size"
                                                            value="6-7Y"
                                                            onChange={this.handleCheckboxChange}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </label>
                                            </div>
                                            <div className="size-option">
                                                <label className="filter-checkboxes">
                                                    <label htmlFor="kid-range-2">
                                                        7-8Y
                                                        <input
                                                            type="checkbox"
                                                            id="kid-range-2"
                                                            name="size"
                                                            value="7-8Y"
                                                            onChange={this.handleCheckboxChange}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="size-option">
                                                <label className="filter-checkboxes">
                                                    <label htmlFor="kid-range-3">
                                                        8-9Y
                                                        <input
                                                            type="checkbox"
                                                            id="kid-range-3"
                                                            name="size"
                                                            value="8-9Y"
                                                            onChange={this.handleCheckboxChange}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </label>
                                            </div>
                                            <div className="size-option">
                                                <label className="filter-checkboxes">
                                                    <label htmlFor="kid-range-4">
                                                        9-10y
                                                        <input
                                                            type="checkbox"
                                                            id="kid-range-4"
                                                            name="size"
                                                            value="9-10Y"
                                                            onChange={this.handleCheckboxChange}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="size-option">
                                                <label className="filter-checkboxes">
                                                    <label htmlFor="kid-range-5">
                                                        10-11Y
                                                        <input
                                                            type="checkbox"
                                                            id="kid-range-5"
                                                            name="size"
                                                            value="10-11Y"
                                                            onChange={this.handleCheckboxChange}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </label>
                                            </div>
                                            <div className="size-option">
                                                <label className="filter-checkboxes">
                                                    <label htmlFor="kid-range-6">
                                                        11-12Y
                                                        <input
                                                            type="checkbox"
                                                            id="kid-range-6"
                                                            name="size"
                                                            value="11-12Y"
                                                            onChange={this.handleCheckboxChange}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        }

                        <div className="edit-input">
                            <label className="form-label" htmlFor="priceInput">
                                Enter Price: {this.state.priceIsInvalid ? <span className="err">*</span> : null}

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
                            <label className="form-label" htmlFor="genderInput">
                                Enter Gender: {this.state.genderIsInvalid ? <span className="err">*</span> : null}

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
                            <label className="form-label" htmlFor="categoryInput">
                                Enter Category: {this.state.categoryIsInvalid ? <span className="err">*</span> : null}

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
                            <label className="form-label" htmlFor="brandInput">
                                Enter Brand: {this.state.brandIsInvalid ? <span className="err">*</span> : null}

                                <input
                                    type="text"
                                    name="brand"
                                    id="brandInput"
                                    value={this.state.product.brand}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>

                            <div className="stock-container">

                                    <div className="item">
                                        <h4>Current Stock: <span className="stock-level">{this.state.product.current_stock}</span></h4>
                                    </div>
                                    <div className="item">
                                        <label className="form-label" htmlFor="stockInput">
                                            New Stock: {this.state.stockIsInvalid ? <span className="err">*</span> : null}

                                            <input
                                                type="number"
                                                name="current_stock"
                                                id="stockInput"
                                                value={this.state.stock}
                                                onChange={this.handleStockChange}
                                            />
                                        </label>
                                    </div>

                        </div>

                        <div className="form-controls">
                            <button onClick={this.handleDeleteProduct}>Delete</button>
                            <button onClick={this.handleUpdateProduct}>Update</button>
                            <button onClick={this.handleReset}>Reset</button>
                            <button onClick={this.handleReturn}>Return</button>
                        </div>
                    </form>
                </div>
                <footer>
                    <Footer/>
                </footer>

            </div>
        )
    }


}


