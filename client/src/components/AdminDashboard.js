import React, {Component} from "react";
import {Navbar} from "react-bootstrap";
import DisplayProducts from "./DisplayProducts";
import FilterContainer from "./FilterContainer";
import {SERVER_HOST} from "../config/global_constants";
import axios from "axios";

export default class AdminDashboard extends Component
{

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            originalProducts: [], // If no filters are applied
            filters: {
                gender: [],
                size: [],
                category: [],
                colour: [],
                price: 0.00
            }
        }
    }
    componentDidMount() {
        // Fetch products in the parent component
        axios.get(`${SERVER_HOST}/products`)
            .then((res) => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage);
                    } else {
                        console.log("Records read to Admin dashboard");
                        this.setState({ products: res.data,
                                               originalProducts: res.data
                        });
                    }
                } else {
                    console.log("Record not found");
                }
            });
    }

    updateProducts = (filteredProducts) => {
        this.setState({products:filteredProducts})
        console.log("State of products updated ")
    }
    render() {
        return (
            <div>
                <div className="nav-container">
                    <Navbar/>
                </div>

                <div className="body-container">
                    <div><FilterContainer
                        updateProducts={this.updateProducts}
                        products={this.state.originalProducts}
                        filters={this.state.filters}
                    />
                    </div>
                         <DisplayProducts
                             products={this.state.products}
                         />
                </div>
            </div>

        )
    }
}