import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class Sorts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showDropdown: false,
        }
    }

    sortHigh = () => {
        let products = [...this.state.props.products]
        let ascendingProducts = products.sort((a, b) => a.price < b.price?1:-1)
        this.props.updateProducts(ascendingProducts)
    }
    sortLow = () => {
        let products = [...this.state.props.products]
        let descendingProducts = products.sort((a, b) => a.price < b.price?-1:1)
        this.props.updateProducts(descendingProducts)
    }

    render() {
        return (

            <div className={`filter-dropdown ${this.state.showDropdown ? "open" : ""}`}>

                <div className="filter-dropdown-menu">

                    <label className="filter-checkboxes">
                        Price High > Low
                        <button onClick={this.sortHigh}>&#x2191;&#x2193;</button>
                    </label>
                    <label className="filter-checkboxes">
                        Price Low > High
                        <button onClick={this.sortLow}>&#x2193;&#x2191;</button>
                    </label>


                </div>
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