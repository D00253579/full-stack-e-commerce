import React, {Component} from "react"
import AdminTableRow from "./AdminTableRow";

export default class AdminTable extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            nameIsAscending: false, // default name descending
            priceIsAscending: true,
            stockIsAscending: true,

        }
    }

    sortName = () => { // default descending
        let products = [...this.props.products] // soft copy of products to manipulate

        // sort ascending
        if(this.state.nameIsAscending) {
           let ascendingProducts = products.sort((a, b) => a.name < b.name?1:-1)
            this.props.updateProducts(ascendingProducts)
            //console.log("Name ACE: ", ascendingProducts)
        // sort descending
        } else {
            let descendingProducts = products.sort((a, b) => a.name < b.name?-1:1)
            this.props.updateProducts(descendingProducts)
            //console.log("Name DESC: ", descendingProducts)
        }

        // When the sort is clicked depending on what the previous order was this will set it to its opposite to change the direction of the arrow
        if(this.state.nameIsAscending) {
            this.setState({nameIsAscending: false})
        } else {
            this.setState({nameIsAscending: true})
        }
    }
    sortPrice = () => { // default ascending
        let products = [...this.props.products]

        // sort ascending
        if(this.state.priceIsAscending) {
            let ascendingProducts = products.sort((a, b) => a.price < b.price?1:-1)
            this.props.updateProducts(ascendingProducts)
            //console.log("Price ACE: ", ascendingProducts)
        // sort descending
        } else {
            let descendingProducts = products.sort((a, b) => a.price < b.price?-1:1)
            this.props.updateProducts(descendingProducts)
            //console.log("Price DESC: ",descendingProducts)
        }
       // Update arrow direction
        if(this.state.priceIsAscending) {
            this.setState({priceIsAscending: false})
        } else {
            this.setState({priceIsAscending: true})
        }
    }
    sortStock = () => { // default ascending
        let products = [...this.props.products]

        // sort ascending
        if(this.state.stockIsAscending) {
            let ascendingProducts = products.sort((a, b) => a.current_stock < b.current_stock?1:-1)
            this.props.updateProducts(ascendingProducts)
            //console.log("Stock ACE: ", ascendingProducts)
        // sort descending
        } else {
            let descendingProducts = products.sort((a, b) => a.current_stock < b.current_stock?-1:1)
            this.props.updateProducts(descendingProducts)
            //console.log("Stock DESC: ", descendingProducts)
        }

        // Update arrow direction
        if(this.state.stockIsAscending) {
            this.setState({stockIsAscending: false})
        } else {
            this.setState({stockIsAscending: true})
        }
    }


    render()
    {
        return (
            <table className="admin-table">
                <thead>
                <tr>
                    <th>Inventory Number</th>
                    <th>Name <label className="sortLabel" onClick={this.sortName}><span id="priceSort">{!this.state.nameIsAscending ? '\u25BE' : '\u25B4'} </span></label></th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price <label className="sortLabel" onClick={this.sortPrice}><span id="priceSort">{this.state.priceIsAscending ? '\u25B4' : '\u25BE'}</span></label></th>
                    <th>Stock <label className="sortLabel" onClick={this.sortStock}><span id="stockSort">{this.state.stockIsAscending ? '\u25B4' : '\u25BE'}</span></label></th>
                    <th>P. Code</th>
                </tr>
                </thead>

                <tbody>
                    {this.props.products.map((product, index) => (
                        <AdminTableRow
                            key={product._id}
                            product={product}
                            rowNum={index + 1}
                        />
                    ))}
                </tbody>

            </table>
        )
    }
}