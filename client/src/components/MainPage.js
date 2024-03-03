import React, {Component} from "react"
import {Link} from "react-router-dom"
import NavBar from "./NavBar";
import Footer from "./Footer"

import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import MainPageData from "./MainPageData";
import Filters from "./AdminDashboard/Filters";
import Sorts from "./AdminDashboard/Sorts";
import FilterImage from "../Images/FilterImage.png";
import SortImage from "../Images/SortIcon.png";

export default class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            defaultProducts: [], // If no filters are applied
            displayFilters: false, //false until icon is clicked
            displaySort:false
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
                        this.setState({
                            products: res.data,       // This state of products when passed will have the filters applied
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
                <NavBar/>
                <div className="main-container">
                    <div className="main-page-content">
                        <div className="main-sort">
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
                            <div className="main-filter">
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
                            </div>
                        </div>
                        <MainPageData product={this.state.products}/>
                        {/*<div className="testing-return">*/}
                        {/*    <Link className="testing-red-button"*/}
                        {/*          to={"/TestingDirectory`"}>RETURN*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <footer>
                    <Footer/>
                </footer>
            </div>

        )

    }
}