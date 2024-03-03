import React, {Component} from "react";
import {SERVER_HOST} from "../../config/global_constants";
import axios from "axios";
import Navbar from "../NavBar"
import Footer from "../Footer";
import AdminProductView from "./AdminProductView";
import Filters from "./Filters";
import Sorts from "./Sorts";
import {Link, Redirect} from "react-router-dom";
import AdminControls from "./AdminControls";
import FilterImage from "../../Images/FilterImage.png";
import SortImage from "../../Images/SortIcon.png";
import AdminMenu from "./AdminMenu";

export default class AdminDashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            defaultProducts: [], // If no filters are applied
            rowClickedID: 0,
            displayFilters: false, //false until icon is clicked
            displaySort: false
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


                        console.log(res.data.errorMessage);
                    } else {
                        console.log("Records read to Admin dashboard");
                        this.setState({
                            products: res.data,       // This state of products when passed will have the filters applied
                            defaultProducts: res.data // keep a default view for filtering

                        });
                        this.sortName()
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

    // Set natural ordering of products
    sortName = () => { // default descending
        let productNaturalOrderByName = [...this.state.products] // soft copy of products to manipulate


            let descendingProducts = productNaturalOrderByName.sort((a, b) => a.name < b.name?-1:1)
            this.updateProducts(descendingProducts)
            console.log("Natural order set: product.name DESC")
    }

    showFilters = (e) => {
        if(!this.state.displayFilters){
            this.setState({displayFilters: true})
        }else{
            this.setState({displayFilters: false})
        }
    }

    showSort = (e) => {
        if(!this.state.displaySort) {
            this.setState({displaySort : true})
        } else {
            this.setState({displaySort : false})
        }
        //console.log(his.state.displaySort)
    }

    render() {

        return (
            <div>
                <div className="admin-container">
                    <div className="admin-head-container">
                        <Navbar/>
                    </div>
                    <div className="side-menu">
                        <AdminMenu/>
                    </div>
                    <div className={"sort-box"}>
                        <div className={"sort-button"}>
                            <h1>SORT</h1>
                            <i className={"sort-icon"}>
                                <img src={SortImage} alt="sort" onClick={this.showSort}/>
                            </i>
                            {this.state.displaySort ?
                                <div className="sort-container">
                                    <Sorts
                                        updateProducts={this.updateProducts}
                                        products={this.state.products}
                                        defaultProducts={this.state.defaultProducts}
                                    />
                                </div>
                                : null
                            }
                        </div>
                    </div>
                    <div className={"filter-box"}>
                        <div className={"filter-button"}>
                            <h1>FILTER</h1>
                            <i className={"filter-icon"}>
                                <img src={FilterImage} alt="filter" onClick={this.showFilters}/>
                            </i>
                            {this.state.displayFilters && (
                                <div className="filter-container">
                                    <Filters
                                        updateProducts={this.updateProducts}
                                        products={this.state.products}
                                        defaultProducts={this.state.defaultProducts}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    {/*<AdminControls/>*/}
                    <div className="admin-body-container">
                        <div className="admin-table-container">
                            <AdminProductView
                                products={this.state.products}
                                updateProducts={this.updateProducts}
                            />
                        </div>
                        <div className="testing-return"><Link className="testing-red-button"
                                                              to={"/TestingDirectory"}>RETURN</Link></div>
                    </div>
                </div>
                <footer>
                    <Footer/>
                </footer>
            </div>
        )
    }

}