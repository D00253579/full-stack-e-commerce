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
                        this.setState({ products: res.data });
                    }
                } else {
                    console.log("Record not found");
                }
            });
    }
    getFilters = (filters) => {
        console.log("Callback - getFilters()")
        this.setState({ filters });
    };

    render() {
        return (
            <div>
                <div className="nav-container">
                    <Navbar/>
                </div>

                <div className="body-container">
                    <div><FilterContainer getFilters={this.getFilters} products={this.state.products}/></div>
                         <DisplayProducts products={this.state.products} filters={this.state.filters}/>
                </div>
            </div>

        )
    }
}