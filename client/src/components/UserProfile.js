import React, {Component} from "react"
import NavBar from "./NavBar";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import {Link, Redirect} from "react-router-dom";

export default class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            address: {
                address_line_1: "",
                address_line_2: "",
                address_line_3: "",
                city: "",
                county: "",
                country: "",
                post_code: ""
            },
            redirectToDashboard: false,
            hasAddress: false
        }
    }

    componentDidMount() {
        // get user email
        const email = this.props.match.params.email


        // get the user with the matching id from database collection
        axios.get(`${SERVER_HOST}/AddAddress/users/${email}`, {headers: {"authorization": localStorage.token}})
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {

                    } else {
                        console.log("User found and displaying in UserProfile")
                        this.setState({user: res.data})
                        if(!res.data.address.address_line_1) { // check if the user has an address saved already
                            this.setState({hasAddress: false})

                        } else {
                            this.setState({hasAddress: true})
                            this.setState({address: res.data.address})
                            console.log("address from response: ", this.state.address)
                        }
                    }
                } else {
                    console.log("User not found")
                }
            })
    }

    handleReturn = () => {
        this.setState({redirectToDashboard: true})
    }

    render() {
        console.log("hasAddress: ",this.state.hasAddress)
        console.log("Address: ",this.state.user.address)
        return (
            <div className="profile-view">
                {this.state.redirectToDashboard ? <Redirect to={"/AdminDashboard/ViewUsers/"}/> : null}
                <div className="admin-head-container">
                    <NavBar/>
                </div>

                <h1>User Profile</h1>

                <div className="user-profile">

                    <div className="profile-container">
                        <div className="profile-photo">
                            {localStorage.profilePhoto !== "null" ?
                                <img id="profilePhoto" src={`data:;base64,${localStorage.profilePhoto}`}
                                     alt="Your profile picture"/> : null}
                        </div>

                        <div className="profile-details">
                            <div className="left">
                                <h3>Your Details</h3>
                                <h4>Name: <span>{this.state.user.name}</span></h4>
                                <h4>Email: <span>{this.state.user.email}</span></h4>

                            </div>
                            {this.state.hasAddress?
                                <div className="right">
                                    <h3>Your Address</h3>
                                    <h4>Line 1: <span>{this.state.user.address.address_line_1}</span></h4>
                                    <h4>Line 2: <span>{this.state.user.address.address_line_2}</span></h4>
                                    {this.state.user.address.address_line_3 ? <h4>Line 3: <span>{this.state.user.address.address_line_3}</span></h4> : null}
                                    <h4>City: <span>{this.state.user.address.city}</span></h4>
                                    {this.state.user.address.county ? <h4>County: <span>{this.state.user.address.county}</span></h4> : null}
                                    <h4>Country: <span>{this.state.user.address.country}</span></h4>
                                    <h4>Post Code: <span>{this.state.user.address.post_code}</span></h4>
                                    <br/>
                                    <Link className="testing-green-button" to={`/AddAddress/${localStorage.email}/`}>Update</Link>
                                </div>

                                :
                                <div className="right">
                                    <h3>Want to store your address for a faster checkout?</h3>
                                    <Link className="testing-green-button" to={"/AddAddress"}>Add Address</Link>
                                </div>
                            }

                        </div>
                        <button onClick={this.handleReturn}>Return</button>

                    </div>
                </div>
            </div>
        )
    }
}