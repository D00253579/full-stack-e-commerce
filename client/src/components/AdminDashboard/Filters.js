import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class Filters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showDropdowns: {
                gender: false,
                size: false,
                category: false,
                colour: false,
            },
            price: 0.00,
            current_stock: 0
        }
    }

    handleApplyFilters = () => {
        // Get filters using helper method getCheckedValues for each entry to populate
        // filters[] with the selected values
        let filters = {
            gender: this.getCheckedValues("gender"),
            size: this.getCheckedValues("size"),
            category: this.getCheckedValues("category"),
            colour: this.getCheckedValues("colour"),
        }
        let filteredProducts = []

        if (filters.gender.length === 0 && // if there are no filters selected
            filters.size.length === 0 &&
            filters.category.length === 0 &&
            filters.colour.length === 0) {
            console.log("There are no filters selected")
            this.props.updateProducts(this.props.defaultProducts) // show all products
        } else {
            console.log("Filters ->  ", filters)

            // check the values from filters[] against the values from products[]
            // if true push to filteredProducts, if a matching product_id is found in both is wont be pushed

            this.props.defaultProducts.forEach(product => {
                if ((filters.gender.length === 0 || filters.gender.includes(product.gender)) &&
                    (filters.size.length === 0 || filters.size.some(size => product.size.includes(size))) &&
                    (filters.category.length === 0 || filters.category.includes(product.category)) &&
                    (filters.colour.length === 0 || filters.colour.includes(product.colour)) &&

                    !filteredProducts.find(p => p.product_id === product.product_id)) {
                    filteredProducts.push(product)
                }
            })
            console.log("Products Matching -> ", filteredProducts)
            this.setState({filteredProducts})

            // using a call back function passed from AdminDashboard to update the state
            // and show the results from the selected filters
            this.props.updateProducts(filteredProducts)
        }
    }

    // Helper function to get the values from a checkbox group and add them
    // to their respective arrays
    getCheckedValues = (filterName) => {
        let checkboxes = document.getElementsByName(filterName)
        let checkedValues = []

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked)
                checkedValues.push(checkbox.value)
        })
        return checkedValues
    }

    toggleDropdown = (filterName) => {
        this.setState((prevState) => ({
            showDropdowns: {
                ...prevState.showDropdowns,
                [filterName]: !prevState.showDropdowns[filterName],
            },
        }));
    };
    handlePriceChange = (e) => {
        this.setState({price: e.target.value});
        let filteredProducts = []
        this.props.defaultProducts.forEach(product => {
            if (this.state.price <= product.price) {
                filteredProducts.push(product)
            }
        })
        this.props.updateProducts(filteredProducts)
    }

    handleStockChange = (e) => {
        this.setState({current_stock: e.target.value});
        let filteredProducts = []
        this.props.defaultProducts.forEach(product => {
            if (this.state.current_stock <= product.current_stock) {
                filteredProducts.push(product)
            }
        })
        this.props.updateProducts(filteredProducts)
    }

    handleReset = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]')
        checkboxes.forEach((checkbox => { // uncheck all checkboxes
            checkbox.checked = false
        }))
        this.setState({price: 0.00}) // set price back to 0
        this.setState({current_stock: 0})
        this.props.updateProducts(this.props.defaultProducts) // display default products
    }

    render() {
        return (

                <fieldset>
                    <div className={`filter-dropdown ${this.state.showDropdowns.gender ? "open" : ""}`}>
                        <button
                            className="filter-dropdown-toggle"
                            onClick={() => this.toggleDropdown("gender")}
                        >
                            GENDER
                        </button>
                        <div className="filter-dropdown-menu">

                            <label className="filter-checkboxes">                                M
                                <input type="checkbox" name="gender" value="Male"/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="filter-checkboxes">                                F
                                <input type="checkbox" name="gender" value="Female"/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="filter-checkboxes">                                O
                                <input type="checkbox" name="gender" value="Other"/>
                                <span className="checkmark"></span>
                            </label>

                        </div>
                    </div>


                    <div className={`filter-dropdown ${this.state.showDropdowns.size ? "open" : ""}`}>
                        <button
                            className="filter-dropdown-toggle"
                            onClick={() => this.toggleDropdown("size")}
                        >
                            SIZE
                        </button>
                        <div className="filter-dropdown-menu">
                            <label className="filter-checkboxes"> S
                                <input
                                    type="checkbox"
                                    name="size"
                                    value="small"/>
                                <span className="checkmark"></span>
                            </label>

                            <label className="filter-checkboxes"> M
                                <input
                                    type="checkbox"
                                    name="size"
                                    value="medium"/>
                                <span className="checkmark"></span>
                            </label>

                            <label className="filter-checkboxes"> L
                                <input
                                    type="checkbox"
                                    name="size"
                                    value="large"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>


                    <div className={`filter-dropdown ${this.state.showDropdowns.category ? "open" : ""}`}>
                        <button
                            className="filter-dropdown-toggle"
                            onClick={() => this.toggleDropdown("category")}
                        >
                            CATEGORY
                        </button>
                        <div className="filter-dropdown-menu">
                            <label className="filter-checkboxes"> Sports
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Sports"/>
                                <span className="checkmark"></span>
                            </label>

                            <label className="filter-checkboxes"> Casual
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Casual"/>
                                <span className="checkmark"></span>
                            </label>

                            <label className="filter-checkboxes"> Summer
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Summer"/>
                                <span className="checkmark"></span>
                            </label>

                            <label className="filter-checkboxes">Spooky
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Spooky"/>
                                <span className="checkmark"></span>
                            </label>

                            <label className="filter-checkboxes"> Graphic
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Graphic"/>
                                <span className="checkmark"></span>
                            </label>

                            <label className="filter-checkboxes">Smart
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Smart"/>
                                <span className="checkmark"></span>
                            </label>

                            <label className="filter-checkboxes"> Marvel
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Superhero"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>


                    <div className={`filter-dropdown ${this.state.showDropdowns.colour ? "open" : ""}`}>
                        <button
                            className="filter-dropdown-toggle"
                            onClick={() => this.toggleDropdown("colour")}
                        >
                            COLOUR
                        </button>

                        <div className="filter-dropdown-menu">
                            <label className="filter-checkboxes">Red
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Red"/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="filter-checkboxes"> Green
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Green"/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="filter-checkboxes"> Blue
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Blue"/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="filter-checkboxes"> Grey
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Grey"/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="filter-checkboxes"> Purple
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Purple"/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="filter-checkboxes"> White
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="White"/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="filter-checkboxes"> Pink
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Pink"/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="filter-checkboxes"> Yellow
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Yellow"/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>


                    <div className="price-filter">
                        <h4>Price: €{this.state.price}</h4>
                        <input
                            type="range"
                            id="price-filter"
                            className="price-slider"
                            min="0.00" max="50"
                            value={this.state.price}
                            onChange={this.handlePriceChange}
                        />
                    </div>

                    <div className="stock-filter">
                        <h4>Stock > {this.state.current_stock}</h4>
                        <input
                            type="range"
                            id="stock-filter"
                            className="stock-slider"
                            min="0" max="40"
                            value={this.state.current_stock}
                            onChange={this.handleStockChange}
                        />
                    </div>


                    <div className="filter-buttons">
                        <button type="button" onClick={this.handleApplyFilters} id={"applyBtn"}>Apply</button>
                        <button type="button" onClick={this.handleReset} id={"resetBtn"}>Reset</button>
                    </div>

                </fieldset>
        )
    }
}


//      Solution 2
//      catches any duplicates
//
// if(filters.gender.length > 0) {
//     filters.gender.forEach(gender => {
//         this.props.products.forEach(product => {
//             if(product.gender === gender && !filteredProducts.find(p => p.product_id === product.product_id)) {
//                 filteredProducts.push(product)
//             }
//         })
//     })
// }
//
// if(filters.size.length > 0) {
//     filters.size.forEach(size => {
//         this.props.products.forEach(product => {
//             if(product.size.includes(size) && !filteredProducts.find(p => p.product_id === product.product_id)) {
//                 filteredProducts.push(product)
//             }
//         })
//     })
// }