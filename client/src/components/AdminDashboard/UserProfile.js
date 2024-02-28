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
        axios.get(`${SERVER_HOST}/users/${userID}`,{headers:{"authorization":localStorage.token}})
            .then(res => {
                if(res.data) {
                    if(res.data.errorMessage) {

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
            <div>
                {this.state.redirectToDashboard ? <Redirect to={"/AdminDashboard/ViewUsers/"}/> : null}
                <div className="admin-head-container">
                    <NavBar/>
                </div>

                <h1>User Profile</h1>
                <div  className="user-profile">

                    <div className="profile-container">

                        <div className="profile-left">
                            {/*TODO this is where the user profile will go*/}

                        </div>
                        <div className="profile-right">
                            <h2>Name: <span className="profile-span">{this.state.user.name}</span></h2>
                            <h2>Email: <span className="profile-span">{this.state.user.email}</span></h2>
                        </div>

                </div>
                </div>
                <button onClick={this.handleReturn}>Return</button>
            </div>
        )
    }
}