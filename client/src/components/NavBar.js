import React, {Component} from "react"
import {Link} from "react-router-dom"
import Logo from "../Images/logo.png"
import AccountIcon from "../Images/AccountIcon.png"
import BagIcon from "../Images/BagIcon.png"
import SearchIcon from "../Images/SearchIcon.png"
import login from "./Login/Login";
import {SERVER_HOST} from "../config/global_constants";
import ShoppingCart from "./ShoppingCart";
import SearchDropdown from "./SearchDropdown";
import axios from "axios";

export default class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            searchResults: [],
            searchInput: "",
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
                            products: res.data,
                        });
                    }
                } else {
                    console.log("Record not found");
                }
            });
    }

    handleSearchChange = (e) => {
        this.setState({searchInput: e.target.value})
        if(this.state.searchInput.length > 0) {
            this.handleProductSearch()
        } else {
            this.setState({searchResults: []})
        }
    }

    handleProductSearch = () => {
        let matchingProducts = this.state.products.filter((product) =>
            (product.name.toLowerCase().includes(this.state.searchInput.toLowerCase()) ||
            product.brand.toLowerCase().includes(this.state.searchInput.toLowerCase()))
        )

        matchingProducts.sort((a, b) => a.name < b.name?-1:1)
        this.setState({searchResults: matchingProducts})
        console.log("Found Products: ",matchingProducts)
    }

    render() {
        //console.log("Search results in NavBar: ",this.state.searchResults)
        return (
            <div className="nav-container">
                <nav>
                    <div className={"container"}>
                        <div className={"search-container"}>
                            <div className="search-bar">
                                <input        
                                    type="text"
                                    id="search"
                                    placeholder="Search for names and brands"
                                    onChange={this.handleSearchChange}
                                />
                                {this.state.searchInput.length > 0 ?
                                    <SearchDropdown
                                        searchResults={this.state.searchResults}
                                    />
                                    : null
                                }
                            </div>
                            <div className={"icons-container"}>
                                <i className={"searchIcon"} onClick={this.handleProductSearch}>
                                    <img src={SearchIcon}/>
                                </i>
                            </div>
                        </div>

                        <div className={"icons-container"}>
                            <i className={"logo-image"}>
                                <img src={Logo} alt="logo"/>
                            </i>
                        </div>

                        <div className={"icons-container"}>
                            <Link to={"/AccountPage"}>
                                <i className={"account"}>
                                    <img src={AccountIcon} alt="Account Tab"/>
                                </i>
                            </Link>
                        </div>
                        <div className={"icons-container"}>
                            <Link to={"/ShoppingCart"}>
                                <i className={"shopping-bag"}>
                                    <img src={BagIcon} alt="Shopping Cart"/>
                                </i>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}