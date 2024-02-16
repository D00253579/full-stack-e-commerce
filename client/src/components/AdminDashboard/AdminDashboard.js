import React, {Component} from "react";
import {SERVER_HOST} from "../../config/global_constants";
import axios from "axios";
import Navbar from"../NavBar"
import AdminProductView from "./AdminProductView";
import Filters from "./Filters";
import {Link} from "react-router-dom";
import AdminControls from "./AdminControls";
import AdminEditProduct from "./AdminEditProduct"


export default class AdminDashboard extends Component
{

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            defaultProducts: [], // If no filters are applied
            isEditingProduct: false,
            rowClickedID: 0
        }
    }
    componentDidMount() {
        // Fetch products in the parent component

        axios.get(`${SERVER_HOST}/products`)
            .then((res) => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        /* TODO
                            Display a message to the screen showing the products were not found */



                        console.log(res.data.errorMexssage);
                    } else {
                        console.log("Records read to Admin dashboard");
                        this.setState({ products: res.data,       // This state of products when passed will have the filters applied
                                               defaultProducts: res.data // keep a default view for filtering
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

    handleRowClick = (p_id) => {
        this.setState({isEditingProduct: true,
                                rowClickedID: p_id})
        console.log("Row is clicked, id=", p_id)
    }
    handleRowUnClick = () => {
        this.setState({isEditingProduct: false})
    }

    render() {

        if(this.state.isEditingProduct) {
            return (
                <div>
                    <div className="admin-head-container">
                        <Navbar/>
                    </div>

                        <AdminControls/>


                        <AdminEditProduct
                            handleRowUnClick={this.handleRowUnClick}
                            p_id={this.state.rowClickedID}
                        />


                </div>
            )
        } else {
            return (
                <div>

                    <div className="admin-head-container">
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
                                handleRowClick={this.handleRowClick}
                            />
                        </div>

                    </div>

                    <div className="testing-return"><Link className="testing-red-button" to={"/TestingDirectory"}>RETURN</Link></div>
                </div>
            )
        }


    }

}