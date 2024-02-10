import React, {Component} from "react";
import {SERVER_HOST} from "../../config/global_constants";
import axios from "axios";
import AdminProductView from "./AdminProductView";
import Filters from "./Filters";
import {Navbar} from "react-bootstrap";

export default class AdminDashboard extends Component
{

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            defaultProducts: [], // If no filters are applied
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
                                               defaultProducts: res.data
                        });
                    }
                } else {
                    console.log("Record not found");
                }
            });
    }

    updateProducts = (newProductState) => {
        this.setState({products: newProductState})
        console.log("State of products updated ")
    }
    render() {
        return (
            <div>
                <div className="nav-container">
                    <Navbar/>
                </div>

                <div className="admin-body-container">

                    <div className="filter-container">
                        <Filters
                            updateProducts={this.updateProducts}
                            products={this.state.products}
                            defaultProducts={this.state.defaultProducts}
                            filters={this.state.filters}
                        />
                    </div>
                    <div className="table-container">
                        <AdminProductView
                            products={this.state.products}
                        />
                    </div>

                </div>
            </div>

        )
    }
}