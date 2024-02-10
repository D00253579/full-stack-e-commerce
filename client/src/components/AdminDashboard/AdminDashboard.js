import React, {Component} from "react";
import {SERVER_HOST} from "../../config/global_constants";
import axios from "axios";
import AdminProductView from "./AdminProductView";
import Filters from "./Filters";
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import AdminControls from "./AdminControls";

export default class AdminDashboard extends Component
{

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            defaultProducts: [], // If no filters are applied
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

                <AdminControls/>

                <div className="admin-body-container">



                    <div className="filter-container">
                        <Filters
                            updateProducts={this.updateProducts}
                            products={this.state.products}
                            defaultProducts={this.state.defaultProducts}
                        />
                    </div>
                    <div className="admin-table-container">
                        <AdminProductView
                            products={this.state.products}
                        />
                    </div>

                </div>

                <div className="testing-return"><Link className="red-button" to={"/TestingDirectory`"}>RETURN</Link></div>
            </div>



        )

    }

}