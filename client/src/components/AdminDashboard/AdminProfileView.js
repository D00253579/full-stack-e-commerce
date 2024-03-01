import React, {Component} from "react"
import NavBar from "../NavBar";
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";
import {Link, Redirect} from "react-router-dom";

export default class AdminProfileView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            redirectToDashboard: false,
            hasAddress: false
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id // get user id passed from redirect parameters

        axios.get(`${SERVER_HOST}/users/${id}`, {headers: {"authorization": localStorage.token}})
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
       // const firstName = this.state.user.name.substring(0, this.state.user.name.indexOf(" "))
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
                                <h3>Details</h3>
                                <h4>Name: <span>{this.state.user.name}</span></h4>
                                <h4>Email: <span>{this.state.user.email}</span></h4>

                            </div>
                            {this.state.hasAddress ?
                                <div className="right">
                                    <h3>Address</h3>
                                    <h4>Line 1: <span>{this.state.user.address.address_line_1}</span></h4>
                                    <h4>Line 2: <span>{this.state.user.address.address_line_2}</span></h4>
                                    {this.state.user.address.address_line_3 ? <h4>Line 3: <span>{this.state.user.address.address_line_3}</span></h4> : null}
                                    <h4>City: <span>{this.state.user.address.city}</span></h4>
                                    {this.state.user.address.county ? <h4>County: <span>{this.state.user.address.county}</span></h4> : null}
                                    <h4>Country: <span>{this.state.user.address.country}</span></h4>
                                    <h4>Post Code: <span>{this.state.user.address.post_code}</span></h4>
                                    <br/>
                                    {/*<Link className="testing-green-button" to={`/UpdateAddress/${localStorage.email}`}>Update Address</Link>*/}
                                    <button>Update Address</button>
                                </div>

                                :
                                <div className="right">
                                    <h3>{this.state.user.name} has no address saved</h3>
                                </div>
                            }

                        </div>

                        <div className="profile-history">
                            <h2>Purchase History</h2>
                            {/*TODO Display a table with minimum information about users 5 most recent purchases*/}


                        </div>
                        <button onClick={this.handleReturn}>Return</button>

                    </div>
                </div>
            </div>
        )
    }
}

