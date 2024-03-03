import React, {Component} from "react"
import NavBar from "../NavBar";
import {Redirect} from "react-router-dom";
import {SERVER_HOST} from "../../config/global_constants";
import axios from "axios";
import Footer from "../Footer";
import MainPage from "../MainPage";


export default class CreateProduct extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.idInput = React.createRef()   // Create a reference to the input
        this.nameInput = React.createRef()   // using uncontrolled components within this form
        this.colourInput = React.createRef() // to bypass immutable states when changing the sizes displayed
        this.priceInput = React.createRef()
        this.genderInput = React.createRef()
        this.categoryInput = React.createRef()
        this.brandInput = React.createRef()
        this.stockInput = React.createRef()
        this.state = {
            defaultProduct: [],
            products: [],
            redirectToDashboard: false,
            inputsAreInvalid: false,
            idIsInvalid: false,
            idAlreadyAssigned: false,
            nameIsInvalid: false,
            colourIsInvalid: false,
            sizeIsInvalid: false,
            priceIsInvalid: false,
            categoryIsInvalid: false,
            brandIsInvalid: false,
            stockIsInInvalid: false,
            inputErrMessage: "",
            size: [],
            alternateSizes: false,
            sizeText: "Adult"
        }

    }


    componentDidMount() {
        // Fetch products in the parent component
        axios.get(`${SERVER_HOST}/products`)
            .then((res) => {
                if (res.data) {
                    if (res.data.errorMessage) {
                    } else {
                        console.log("Records read to Admin dashboard");
                        this.setState({
                            products: res.data});
                    }
                } else {
                    console.log("Record not found");
                }
            })
    }
    handleSizeChange = (e) => {
        e.preventDefault()
        if(!this.state.alternateSize) {
            this.setState({
                alternateSize: true,
                sizeText: "Child"
            })

        } else {
            this.setState({
                alternateSize: false,
                sizeText: "Adult"
            })
        }
        this.handleCheckboxClear()
    }
    handleCheckboxClear = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]')
        checkboxes.forEach((checkbox => { // uncheck all checkboxes
            checkbox.checked = false
        }))
        this.setState({size: []})
    }
    handleFileChange = (e) => {
        this.setState({selectedFiles: e.target.files})

    }

    handleCheckboxChange = (e) => {
        const { checked, value } = e.target;
        const { size } = this.state;
        if (checked) {
            // If checked, add the value to the size array
            this.setState({
                size: [...size, value]
            })
        } else {
            // If unchecked, remove the value from the size array
            this.setState({
                size: size.filter(item => item !== value)
            })
        }
    }

    handleReturn = () => {
        this.setState({redirectToDashboard: true})
    }
    handleClear = (e) => {
        e.preventDefault()
        const checkboxes = document.querySelectorAll('input[type="checkbox"]')
        checkboxes.forEach((checkbox => { // uncheck all checkboxes
            checkbox.checked = false
        }))
        this.setState({product: this.state.defaultProduct})
    }
    validateInputs = () => {
        let isValid = true // true = valid
        const product = {
            product_id: this.idInput.current.value,
            name: this.nameInput.current.value,
            colour: this.colourInput.current.value,
            price: this.priceInput.current.value,
            gender: this.genderInput.current.value,
            category: this.categoryInput.current.value,
            brand: this.brandInput.current.value,
            current_stock: this.stockInput.current.value
        }
        console.log("******-> ", product)


        const validationPatterns = {
            name: /^[a-zA-Z\s-]{1,}$/, // At least one letter or space required
            colour: /^[a-zA-Z\s]{1,}$/, // At least one letter or space required
            price: /^\d+(\.\d{1,2})?$/, // Positive number with up to 2 decimal places allowed
            gender: /^[a-zA-Z]{1,}$/, // At least one letter required
            category: /^[a-zA-Z\s]{1,}$/, // At least one letter or space required
            brand: /^[a-zA-Z\s-.&]{1,}$/, // At least one letter or space required
            current_stock: /^\d{1,}$/, // At least one digit required
            product_id: /^\d{1,}$/ // At least one digit required
        };
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
        const productSizes = this.state.size
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

        //console.log(this.state.products)
        /** Validate Product ID to check if it's already assigned to a product && if it is empty*/
        const isIdInvalid = this.state.products.some(p => p.product_id === parseInt(product.product_id))
        console.log(isIdInvalid)
        if(isIdInvalid) {
            console.log("here")
            document.getElementById("idInput").classList.add("invalid-input")
            this.setState({
                idIsInvalid: true,
                idAlreadyAssigned: true,
                inputErrMessage: `ID ${product.product_id} is already assigned to a product.`
            })
            isValid = false
        } else {
            if(!product.product_id) {
                document.getElementById("idInput").classList.add("invalid-input")
            } else {
                document.getElementById("idInput").classList.remove("invalid-input")
            }

            this.setState({
                idIsInvalid: !product.product_id,
                idAlreadyAssigned: false,
                inputErrMessage: ""
            })
        }

        if(!isValid) { // if inputs are invalid trigger visual response to let user know
            this.setState({inputsAreInvalid: true})
        } else {
            this.setState({inputsAreInvalid: false})
        }
        console.log(this.state.size)
        return isValid
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // scroll back to the top of the form , take from https://www.w3schools.com/howto/howto_js_scroll_into_view.asp
        const topOfForm = document.getElementById('top-of-form')
        topOfForm.scrollIntoView()

        console.log("Token: ",localStorage.token)
        console.log("Product: ", this.state.product)
        console.log("Inputs are valid: ",this.validateInputs())
        if(this.validateInputs()){
            let formData=new FormData()
            const product = {
                product_id: this.idInput.current.value,
                name: this.nameInput.current.value,
                colour: this.colourInput.current.value,
                price: this.priceInput.current.value,
                gender: this.genderInput.current.value,
                category: this.categoryInput.current.value,
                brand: this.brandInput.current.value,
                current_stock: this.stockInput.current.value,
                size: this.state.size
            }
            console.log(product.size)
            formData.append("name", product.name)
            formData.append("colour", product.colour)
            formData.append("size", product.size)
            formData.append("price", product.price)
            formData.append("gender", product.gender)
            formData.append("category", product.category)
            formData.append("brand", product.brand)
            formData.append("current_stock", product.current_stock)
            formData.append("product_id", product.product_id)
            if (this.state.selectedFiles){
                for (let i=0; i<this.state.selectedFiles.length; i++){
                    formData.append("photos", this.state.selectedFiles[i])
                }

            }
            // const createdProduct = this.state.product;


            axios.post(`${SERVER_HOST}/products`, formData, {headers:{"authorization":localStorage.token}})

                .then(res =>
                {
                    if(res.data)
                    {
                        if(res.data.errorMessage) {
                            console.log("Product NOT created")
                        } else {
                            console.log("Product created: ", formData)
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

        console.log("idIsInvalid: ", this.state.idIsInvalid)
        return (
            <div>

                {this.state.redirectToDashboard ? <Redirect to={"/AdminDashboard/AdminDashboard"}/> : null }

                <div className="admin-head-container" id="top-of-form">
                    <NavBar/>
                </div>

                <div className="admin-create-product">
                        <h1>Add Products</h1>
                        <form className="create-form" onSubmit={this.handleSubmit}>

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
                                    Enter Inbound Stock: {this.state.stockIsInvalid ? <span className="err">*</span> : null}
                                    <input
                                        type="text"
                                        name="current_stock"
                                        id="stockInput"
                                        ref={this.stockInput}
                                    />
                                </label>
                            </div>

                            <div className="create-input">
                                <label className="form-label" htmlFor="idInput">
                                    Enter Product ID: {this.state.idIsInvalid ? <span className="err">*</span> : null}
                                    <input
                                        type="text"
                                        name="product_id"
                                        id="idInput"
                                        ref={this.idInput}
                                    /> {this.state.idAlreadyAssigned ?
                                    <span className="err">{this.state.inputErrMessage}</span> : null}
                                </label>
                            </div>
                            <div className="create-input">
                                <label className="form-label" htmlFor="nameInput">
                                    Enter Name: {this.state.nameIsInvalid ? <span className="err">*</span> : null}
                                    <input
                                        type="text"
                                        name="name"
                                        id="nameInput"
                                        ref={this.nameInput}
                                    />
                                </label>
                            </div>
                            <div className="create-input">
                                <label className="form-label" htmlFor="colourInput">
                                    Enter Colour: {this.state.colourIsInvalid ? <span className="err">*</span> : null}
                                    <input
                                        type="text"
                                        name="colour"
                                        id="colourInput"
                                        ref={this.colourInput}
                                    />
                                </label>
                            </div>


                                         {/** SIZES CHECKBOXES GO BELOW HERE*/}


                            <button onClick={this.handleSizeChange}>Switch Size Range</button>
                            {!this.state.alternateSize ?
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










                            <div className="create-input">
                                <label className="form-label" htmlFor="priceInput">
                                   Enter Price: {this.state.priceIsInvalid ? <span className="err">*</span> : null}
                                    <input
                                        type="text"
                                        name="price"
                                        id="priceInput"
                                        ref={this.priceInput}
                                    />
                                </label>
                            </div>
                            <div className="create-input">
                                <label className="form-label" htmlFor="genderInput">
                                    Enter Gender: {this.state.genderIsInvalid ? <span className="err">*</span> : null}
                                    <input
                                        type="text"
                                        name="gender"
                                        id="genderInput"
                                        ref={this.genderInput}
                                    />
                                </label>
                            </div>
                            <div className="create-input">
                                <label className="form-label" htmlFor="categoryInput">
                                    Enter Category: {this.state.categoryIsInvalid ? <span className="err">*</span> : null}
                                    <input
                                        type="text"
                                        name="category"
                                        id="categoryInput"
                                        ref={this.categoryInput}
                                    />
                                </label>
                            </div>
                            <div className="create-input">
                                <label className="form-label" htmlFor="brandInput">
                                    Enter Brand: {this.state.brandIsInvalid ? <span className="err">*</span> : null}
                                    <input
                                        type="text"
                                        name="brand"
                                        id="brandInput"
                                        ref={this.brandInput}
                                    />
                                </label>
                            </div>
                            <div className="create-input">
                                <label className="form-label" htmlFor="brandInput">
                                    Upload Product Image:
                                    <input
                                        type="file" multiple onChange={this.handleFileChange} name="photos"
                                        id="photoInput"
                                    />
                                </label>
                                {/*<MainPage photos={this.state.selectedFiles}/>*/}
                            </div>

                            <div className="form-controls">
                                <button onClick={this.handleClear}>CLEAR</button>
                                <input className="submit-button" type="submit" value="Add"/>
                                {/*<button onClick={this.handleSubmit}>Add</button>*/}
                                <button onClick={this.handleReturn}>RETURN</button>
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