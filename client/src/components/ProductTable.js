import React, {Component} from "react"
import ProductsTableRow from "./ProductsTableRow"


export default class ProductTable extends Component
{
    render() 
    {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Product_id</th>
                        <th>Name</th>
                        <th>Colour</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Gender</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Current_stock</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {this.props.products.map((products) => <ProductsTableRow key={products._id} products={products}/>)}
                </tbody>
            </table>      
        )
    }
}