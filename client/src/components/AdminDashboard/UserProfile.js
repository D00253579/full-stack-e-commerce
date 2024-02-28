import React, {Component} from "react"
import NavBar from "../NavBar";
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";
import {Redirect} from "react-router-dom";

export default class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: [],
            redirectToDashboard: false,
        }
    }

    componentDidMount() {
        const userID = this.props.match.params.id // get productID passed from redirect parameters
        // console.log(productID)

        // get the product with the matching id from database collection
        axios.get(`${SERVER_HOST}/users/${userID}`, {headers: {"authorization": localStorage.token}})
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {

                    } else {
                        console.log("User found and displaying in UserProfile")
                        this.setState({user: res.data})
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
                                     alt=""/> : null}
                        </div>

                        <div className="profile-details">
                            <div className="left">
                                <h3>Your Details</h3>
                                <h4>Name: <span>{this.state.user.name}</span></h4>
                                <h4>Email: <span>{this.state.user.email}</span></h4>

                            </div>
                            <div className="right">
                                <h3>Address</h3>
                                <h4>Line 1: <span>{this.state.user.name}</span></h4>
                                <h4>Line 2: <span>{this.state.user.name}</span></h4>
                                <h4>Line 3: <span>{this.state.user.name}</span></h4>
                                <h4>City: <span>{this.state.user.name}</span></h4>
                                <h4>County: <span>{this.state.user.name}</span></h4>
                                <h4>Country: <span>{this.state.user.name}</span></h4>
                                <h4>Post Code: <span>{this.state.user.name}</span></h4>
                            </div>
                        </div>
                        <button onClick={this.handleReturn}>Return</button>

                    </div>
                </div>
            </div>
        )
    }
}

            