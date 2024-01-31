import React, {Component} from "react"
import CarTableRow from "./CarTableRow"


export default class CarTable extends Component 
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
                    {this.props.cars.map((car) => <CarTableRow key={car._id} car={car}/>)}
                </tbody>
            </table>      
        )
    }
}