import React, {Component} from "react"
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {Link} from "react-router-dom";

export default class TShirtView extends Component {
    constructor(props) {
        super(props);
        this.state={
            products:[]
        }
    }
    componentDidMount() {
        const tShirtID = this.props.match.params.id // get productID passed from redirect parameters
        // console.log(productID)

        // get the product with the matching id from database collection
        axios.get(`${SERVER_HOST}/products/${tShirtID}`, {headers: {"authorization": localStorage.token}})
            .then(res => {

                console.log("Product found")
                this.setState({products: res.data}) // set state of product to response data


            })
            .catch(err=>{

            })
    }
    render()
    {
        console.log(this.state.products)

        return (
            <div>
                <NavBar/>
                <div className="testing-return"><Link className="testing-red-button" to={"/MainPage`"}>RETURN</Link></div>
                <div className="main-container">
                </div>
                <footer>
                    <Footer/>
                </footer>
            </div>

        )

    }
}