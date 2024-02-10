import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class Filters extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            showDropdowns: {
                gender: false,
                size: false,
                category: false,
                colour: false,
            },
        }
    }
    componentDidMount() {
        console.log("filters as props ")
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

        if(filters.gender.length === 0 && // if there are no filters selected
           filters.size.length === 0 &&
           filters.category.length === 0 &&
           filters.colour.length === 0)
        {
            console.log("There are no filters selected")
            this.props.updateProducts(this.props.defaultProducts) // show all products
        } else {
            console.log("Filters ->  ", filters)

            // check the values from filters[] against the values from products[]
            // if true push to filteredProducts, if a matching product_id is found in both is wont be pushed

            this.props.defaultProducts.forEach(product => {
                if((filters.gender.length === 0 || filters.gender.includes(product.gender)) &&
                    (filters.size.length === 0 || filters.size.some(size => product.size.includes(size))) &&
                    (filters.category.length === 0 || filters.category.includes(product.category)) &&
                    (filters.colour.length === 0 || filters.colour.includes(product.colour)) &&
                    !filteredProducts.find(p => p.product_id === product.product_id))
                {
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
            if(checkbox.checked)
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

    render() {
        return (
                <fieldset>

                    <div className={`filter-dropdown ${this.state.showDropdowns.gender ? "open" : ""}`}>
                        <button
                            className="filter-dropdown-toggle"
                            onClick={() => this.toggleDropdown("gender")}
                        >
                            Gender
                        </button>
                        <div className="filter-dropdown-menu">
                            <label>
                                M
                                <input type="checkbox" name="gender" value="Male" />
                            </label>
                            <label>
                                F
                                <input type="checkbox" name="gender" value="Female" />
                            </label>
                            <label>
                                O
                                <input type="checkbox" name="gender" value="Other" />
                            </label>
                        </div>
                    </div>


                    <div className={`filter-dropdown ${this.state.showDropdowns.size ? "open" : ""}`}>
                        <button
                            className="filter-dropdown-toggle"
                            onClick={() => this.toggleDropdown("size")}
                            >
                            Size
                        </button>
                        <div className="filter-dropdown-menu">
                            <label> S
                                <input
                                    type="checkbox"
                                    name="size"
                                    value="small"/>
                            </label>

                            <label> M
                                <input
                                    type="checkbox"
                                    name="size"
                                    value="medium"/>
                            </label>

                            <label> L
                                <input
                                    type="checkbox"
                                    name="size"
                                    value="large"/>
                            </label>
                        </div>
                    </div>



                    <div className={`filter-dropdown ${this.state.showDropdowns.category ? "open" : ""}`}>
                        <button
                            className="filter-dropdown-toggle"
                            onClick={() => this.toggleDropdown("category")}
                        >
                            Category
                        </button>
                        <div className="filter-dropdown-menu">
                            <label> Sports
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Sports"/>
                            </label>

                            <label> Casual
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Casual"/>
                            </label>

                            <label> Summer
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Summer"/>
                            </label>

                            <label> Spooky
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Spooky"/>
                            </label>

                            <label> Graphic
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Graphic"/>
                            </label>

                            <label> Smart
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Smart"/>
                            </label>

                            <label> Marvel
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Superhero"/>
                            </label>
                        </div>
                   </div>


                    <div className={`filter-dropdown ${this.state.showDropdowns.colour ? "open" : ""}`}>
                        <button
                            className="filter-dropdown-toggle"
                            onClick={() => this.toggleDropdown("colour")}
                        >
                            Colour
                        </button>

                        <div className="filter-dropdown-menu">
                            <label>Red
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Red"/>
                            </label>
                            <label> Green
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Green"/>
                            </label>
                            <label> Blue
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Blue"/>
                            </label>
                            <label> Grey
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Grey"/>
                            </label>
                            <label> Purple
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Purple"/>
                            </label>
                            <label> White
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="White"/>
                            </label>
                            <label> Pink
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Pink"/>
                            </label>
                            <label> Yellow
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Yellow"/>
                            </label>
                        </div>
                    </div>

                    <h4>Price</h4>
                    <div className="checkbox-filters">
                            <input
                                type="range"
                                id="price-filter"
                                min="0.00" max="99.99"
                                defaultValue={0}
                            />
                    </div>

                    <div className="checkbox-button">
                       <button type="button" onClick={this.handleApplyFilters}>Apply</button>
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