import React, {Component} from "react"
import {Link} from "react-router-dom"
import NavBar from "./NavBar";
import Footer from "./Footer"

import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import MainPageData from "./MainPageData";

export default class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
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

    render() {
        return (
            <div>
                <NavBar/>
                <MainPageData product={this.state.products}/>
                <div className="testing-return"><Link className="testing-red-button"
                                                      to={"/TestingDirectory`"}>RETURN</Link></div>
                <div className="main-container">

                </div>
                <footer>
                    <Footer/>
                </footer>
            </div>

        )

    }
}