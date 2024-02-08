import React, {Component} from "react";

export default class FilterContainer extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            filteredProducts: []
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


        console.log("Filters ->  ", filters)

        // check the values from filters[] against the values from products[]
        // if true push to filteredProducts, if a matching product_id is found in both is wont be pushed

        this.props.products.forEach(product => {
            if( (filters.gender.length === 0 || filters.gender.includes(product.gender)) &&
                (filters.size.length === 0 || filters.size.some(size => product.size.includes(size))) &&
                (filters.category.length === 0 || filters.category.includes(product.category)) &&
                (filters.colour.length === 0 || filters.colour.includes(product.colour)) &&
                !this.state.filteredProducts.find(p => p.product_id === product.product_id))
            {
                this.state.filteredProducts.push(product)
            }
        })
        console.log("Products Matching -> ", this.state.filteredProducts)

        // using a call back function passed from AdminDashboard to update the state
        // and show the results from the selected filters
        this.props.updateProducts(this.state.filteredProducts)
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


    render() {
        return (
            <div className = "filter-container" >
                <fieldset>

                    <h4>Gender</h4>
                    <div className="checkbox-filters">
                        <label> M
                            <input
                                type="checkbox"
                                name="gender"
                                value="Male"/>
                        </label>

                        <label> F
                            <input
                                type="checkbox"
                                name="gender"
                                value="Female"/>
                        </label>

                        <labelx> O
                            <input
                                type="checkbox"
                                name="gender"
                                value="Other"/>
                        </labelx>
                    </div>

                    <h4>Size</h4>
                    <div>
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


                    <h4>Category</h4>
                    <div >
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
                    </div>
                    <div className="category">
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



                    <h4>Colour</h4>
                    <div className="checkbox-filters">
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
                    </div>
                    <div className="checkbox-filters">
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
            </div>
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