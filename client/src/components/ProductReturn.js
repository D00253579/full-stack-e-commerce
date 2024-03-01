import React, {Component} from "react";
import NavBar from "./NavBar";


export default class ProductReturn extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div>

                <div className="admin-head-container">
                    <NavBar/>
                </div>
                <div className="returns-body">
                    <div className="returns-container">
                        <h1>Returns</h1>

                        <div className="above-table">
                            <span>Select a product from your purchase history you want to return</span>
                        </div>
                        <div className="returns-table">

                                {/*TODO in here will be a table with the users orders displaying
                                    clickRow -> check if it was ordered within a certain date?? (this can be if theres time)
                                                show product details and ask for a reason as to why they want it returned
                                                save product and returns message to returns collection
                                                increase product stock count by 1
                                                show return in user profile maybe??
                                                */}
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>test</th>
                                        <th>test</th>
                                        <th>test</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>test</td><td>test</td><td>test</td><td>test</td><td>test</td><td>test</td></tr>
                                    <tr><td>test</td><td>test</td><td>test</td><td>test</td><td>test</td><td>test</td></tr>
                                    <tr><td>test</td><td>test</td><td>test</td><td>test</td><td>test</td><td>test</td></tr>
                                    <tr><td>test</td><td>test</td><td>test</td><td>test</td><td>test</td><td>test</td></tr>
                                    <tr><td>test</td><td>test</td><td>test</td><td>test</td><td>test</td><td>test</td></tr>
                                    <tr><td>test</td><td>test</td><td>test</td><td>test</td><td>test</td><td>test</td></tr>
                                </tbody>
                            </table>

                        </div>




                    </div>
                </div>

            </div>
        )
    }
}