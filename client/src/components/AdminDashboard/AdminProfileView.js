import React, {Component} from "react"
import NavBar from "../NavBar";
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";
import {Redirect} from "react-router-dom";
import DeleteUsers from "./DeleteUsers";

export default class AdminProfileView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            redirectToDashboard: false,
            hasAddress: false,
            redirectToDeleteUser:false
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id // get user id passed from redirect parameters

        axios.get(`${SERVER_HOST}/users/${id}`, {headers: {"authorization": localStorage.token}})
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {

                    } else {
                        console.log("User found, displaying profile")
                        this.setState({user: res.data})

                        if(!res.data.address.address_line_1) { // check if the user has an address saved already
                            this.setState({hasAddress: false}) // change states to show saved address or ability to add a new one
                        } else {
                            this.setState({hasAddress: true})
                        }
                    }
                } else {
                    console.log("User not found")
                }
            })
    }

    // TODO change to the redirect to maybe the main page??
    handleReturn = () => {
        this.setState({redirectToDashboard: true})
    }
handleDelete=()=>{
        this.setState({redirectToDeleteUser:true})
}

render() {
        return (
            <div className="profile-view">
                {this.state.redirectToDashboard ? <Redirect to={"/AdminDashboard/ViewUsers/"}/> : null}
                {this.state.redirectToDeleteUser ?<Redirect to={`/AdminDashboard/DeleteUsers/${this.state.user._id}`}/> : null}
                <div className="admin-head-container">
                    <NavBar/>
                </div>

                <h1>User Profile</h1>

                <div className="user-profile">

                    <div className="profile-container">
                        <div className="profile-photo">
                            {localStorage.profilePhoto !== "null" ?
                                <img id="profilePhoto" src={`data:;base64,${this.state.user.profilePhoto}`}
                                     alt="Your profile picture"/> : null}
                        </div>

                        <div className="profile-details">
                            <div className="left">
                                {this.state.user.email !== localStorage.email ? <h3>Details</h3> : <h3>Your Details</h3>}
                                <h4>Name: <span>{this.state.user.name}</span></h4>
                                <h4>Email: <span>{this.state.user.email}</span></h4>

                            </div>


                            {this.state.hasAddress ?
                                // if there is an address saved
                                <div className="right">
                                    {this.state.user.email !== localStorage.email ? <h3>Address</h3> : <h3>Your Address</h3>}
                                    <h4>Line 1: <span>{this.state.user.address.address_line_1}</span></h4>
                                    <h4>Line 2: <span>{this.state.user.address.address_line_2}</span></h4>
                                    {this.state.user.address.address_line_3 ? <h4>Line 3: <span>{this.state.user.address.address_line_3}</span></h4> : null}
                                    <h4>City: <span>{this.state.user.address.city}</span></h4>
                                    {this.state.user.address.county ? <h4>County: <span>{this.state.user.address.county}</span></h4> : null}
                                    <h4>Country: <span>{this.state.user.address.country}</span></h4>
                                    <h4>Post Code: <span>{this.state.user.address.post_code}</span></h4>
                                    <br/>

                                </div>

                                :
                                // if there is no address saved
                                <div className="right">
                                    <h3>{this.state.user.name} <span className="lighter-text">has no saved address</span></h3>
                                </div>
                            }
                        </div>

                        <div className="profile-history">
                            <h2>Purchase History</h2>
                            {/*TODO Display a table with minimum information about users 5 most recent purchases*/}


                        </div>
                        
                        <button onClick={this.handleReturn} className={"user-profile-return-btn"}>Return</button>
                        <button onClick={this.handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}