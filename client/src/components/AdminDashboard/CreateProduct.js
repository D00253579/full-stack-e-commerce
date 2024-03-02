import React, {Component} from "react"
import NavBar from "../NavBar";
import {Redirect} from "react-router-dom";
import {SERVER_HOST} from "../../config/global_constants";
import axios from "axios";
import MainPage from "../MainPage";

export default class CreateProduct extends Component {

    constructor(props) {
        super(props);
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
                selectedFiles:null
            },
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
                        console.log("Records read to CreateProduct");
                        this.setState({products: res.data});
                    }
                } else {
                    console.log("Record not found");
                }
            });
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
                    size: prevState.product.size.filter(item => item !== this.state.product.size)
                }
            }))
        }

    }

    handleFileChange=(e)=>{
        this.setState({selectedFiles:e.target.files})
    }

    handleReturn = () => {
        this.setState({redirectToDashboard: true})
    }

    handleClear = () => {
        this.handleCheckboxClear()
        this.setState({product: this.state.defaultProduct})
    }

    handleCheckboxClear = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]')
        checkboxes.forEach((checkbox => { // uncheck all checkboxes
            checkbox.checked = false
        }))
        this.setState({product: {
                size: []
            }
        })
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

        //console.log(this.state.products)
        // Validate Product ID to check if it's already assigned to a product
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
            if(!product.product_id.trim()) {
                document.getElementById("idInput").classList.add("invalid-input")
            } else {
                document.getElementById("idInput").classList.remove("invalid-input")
            }

            this.setState({
                idIsInvalid: !product.product_id.trim(),
                idAlreadyAssigned: false,
                inputErrMessage: ""
            })
        }

        if(!isValid) { // if inputs are invalid trigger visual response to let user know
            this.setState({inputsAreInvalid: true})
        } else {
            this.setState({inputsAreInvalid: false})
        }

        return isValid
    }

    validateCheckboxes = () => {
        let isValid = true;
        const checkboxes = document.querySelectorAll('input[type="checkbox"]')
        checkboxes.forEach((checkbox => { // uncheck all checkboxes
            if(!checkbox.checked){
                isValid = false
            }
        }))

        if(!isValid) {

        }

        return isValid
    }
    handleCreateProduct = (e) => {
        e.preventDefault()
        // scroll back to the top of the form , take from https://www.w3schools.com/howto/howto_js_scroll_into_view.asp
        const topOfForm = document.getElementById('top-of-form')
        topOfForm.scrollIntoView()
        console.log("Token: ",localStorage.token)
        console.log("Product: ", this.state.product)
        console.log("Inputs are valid: ",this.validateInputs())
        if(this.validateInputs() && this.validateCheckboxes()){
            let formData=new FormData()
            formData.append("name",this.state.product.name)
            formData.append("colour",this.state.product.colour)
            formData.append("size",this.state.product.size)
            formData.append("price",this.state.product.price)
            formData.append("gender",this.state.product.gender)
            formData.append("category",this.state.product.category)
            formData.append("brand",this.state.product.brand)
            formData.append("current_stock",this.state.product.current_stock)
            formData.append("product_id",this.state.product.product_id)
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
        console.log(this.state.product.size)
        return (
            <div>
                {this.state.redirectToDashboard ? <Redirect to={"/AdminDashboard/AdminDashboard"}/> : null }

                <div className="admin-head-container" id="top-of-form">
                    <NavBar/>
                </div>

                <div className="create-product-container" >
                    <h1>Create Product</h1>
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
                            <label htmlFor="stockInput">
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
                            <label htmlFor="idInput">
                                Product ID {this.state.idIsInvalid ? <span className="err">*</span> : null}
                                <input
                                    type="text"
                                    name="product_id"
                                    id="idInput"
                                    value={this.state.product.product_id}
                                    onChange={this.handleChange}
                                /> {this.state.idAlreadyAssigned ? <span className="err">{this.state.inputErrMessage}</span> : null}
                            </label>
                        </div>
                        <div className="create-input">
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
                        <div className="create-input">
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
                                            <label htmlFor="x-small">
                                                XS
                                                <input
                                                    type="checkbox"
                                                    id="x-small"
                                                    name="size"
                                                    value="xs"
                                                    onChange={this.handleCheckboxChange}
                                                />
                                            </label>
                                        </div>
                                        <div className="size-option">
                                            <label htmlFor="small">
                                                S
                                                <input
                                                    type="checkbox"
                                                    id="small"
                                                    name="size"
                                                    value="s"
                                                    onChange={this.handleCheckboxChange}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="size-option">
                                            <label htmlFor="large">
                                                M
                                                <input
                                                    type="checkbox"
                                                    id="medium"
                                                    name="size"
                                                    value="m"
                                                    onChange={this.handleCheckboxChange}
                                                />
                                            </label>
                                        </div>
                                        <div className="size-option">
                                            <label htmlFor="large">
                                                L
                                                <input
                                                    type="checkbox"
                                                    id="large"
                                                    name="size"
                                                    value="l"
                                                    onChange={this.handleCheckboxChange}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="size-option">
                                            <label htmlFor="large">
                                                XL
                                                <input
                                                    type="checkbox"
                                                    id="x-large"
                                                    name="size"
                                                    value="xl"
                                                    onChange={this.handleCheckboxChange}
                                                />
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
                                                <label htmlFor="x-small">
                                                    6-7Y
                                                    <input
                                                        type="checkbox"
                                                        id="kid-range-1"
                                                        name="size"
                                                        value="6-7Y"
                                                        onChange={this.handleCheckboxChange}
                                                    />
                                                </label>
                                            </div>
                                            <div className="size-option">
                                                <label htmlFor="small">
                                                    7-8Y
                                                    <input
                                                        type="checkbox"
                                                        id="kid-range-2"
                                                        name="size"
                                                        value="7-8Y"
                                                        onChange={this.handleCheckboxChange}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="size-option">
                                                <label htmlFor="large">
                                                    8-9Y
                                                    <input
                                                        type="checkbox"
                                                        id="kid-range-3"
                                                        name="size"
                                                        value="8-9Y"
                                                        onChange={this.handleCheckboxChange}
                                                    />
                                                </label>
                                            </div>
                                            <div className="size-option">
                                                <label htmlFor="large">
                                                    9-10y
                                                    <input
                                                        type="checkbox"
                                                        id="kid-range-4"
                                                        name="size"
                                                        value="9-10Y"
                                                        onChange={this.handleCheckboxChange}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="size-option">
                                                <label htmlFor="large">
                                                    10-11Y
                                                    <input
                                                        type="checkbox"
                                                        id="kid-range-5"
                                                        name="size"
                                                        value="10-11Y"
                                                        onChange={this.handleCheckboxChange}
                                                    />
                                                </label>
                                            </div>
                                            <div className="size-option">
                                                <label htmlFor="large">
                                                    11-12Y
                                                    <input
                                                        type="checkbox"
                                                        id="kid-range-6"
                                                        name="size"
                                                        value="11-12Y"
                                                        onChange={this.handleCheckboxChange}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>

                        }

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
                        <div className="create-input">
                            <label className="form-label" htmlFor="brandInput">
                                Image
                                <input
                                    type="file" multiple onChange={this.handleFileChange} name="photos" id="photoInput"
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