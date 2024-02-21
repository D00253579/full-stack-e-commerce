import React, {Component} from "react"
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";
import {Redirect} from "react-router-dom";
import Navbar from "../NavBar";

export default class DeleteUsers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: [],
            redirectToUserDashboard: false
        }
    }
    componentDidMount() {
        const userID = this.props.match.params.id // get productID passed from redirect parameters
        // console.log(userID)

        // get the product with the matching id from database collection
        axios.get(`${SERVER_HOST}/users/${userID}`, {headers:{"authorization":localStorage.token}})
            .then(res => {
                if(res.data) {
                    if(res.data.errorMessage) {

                    } else {
                        console.log("User found and displaying in AdminUsers")
                        this.setState({user: res.data}) // set state of product to response data
                    }
                } else {
                    console.log("Product not found")
                }
            })
    }
    handleDeleteProduct = () => {
        const userID = this.props.match.params.id // get productID passed from redirect parameters
        // console.log(userID)
        axios.delete(`${SERVER_HOST}/users/${userID}`, {headers:{"authorization":localStorage.token}})
            .then (res =>
            {
                if(res.data) {
                    if(res.data.errorMessage) {

                    } else {
                        console.log("Product has been deleted")
                    }
                } else {
                    console.log("Product not deleted")
                }
            })
        this.setState({redirectToUserDashboard: true})
    }

    handleReturn = () => {
        this.setState({redirectToUserDashboard: true})
    }

    render() {
        return (
            <div>
                {this.state.redirectToUserDashboard ? <Redirect to={"/AdminDashboard/ViewUsers"}/> : null }


                <div className="admin-edit-product">
                    <h1>Are you sure you want to delete this user?</h1>

                        <button onClick={this.handleDeleteProduct}>Delete</button>
                        <button onClick={this.handleReturn}>Cancel</button>

                </div>
            </div>
        )
    }


}


