import React, {Component} from "react"
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";
import {Redirect} from "react-router-dom";

export default class DeleteUsers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirectToUserDashboard: false
        }
    }

    handleDeleteUser = () => {
        const userID = this.props.match.params.id // get productID passed from redirect parameters
         console.log(userID)
        axios.delete(`${SERVER_HOST}/users/${userID}`, {headers:{"authorization":localStorage.token}})
            .then (res =>
            {
                if(res.data) {
                    if(res.data.errorMessage) {
console.log(`ERROR`)
                    } else {
                        console.log("Product has been deleted")
                        this.setState({redirectToUserDashboard: true})
                    }
                } else {
                    console.log("Product not deleted")
                }
            })

    }

    handleReturn = () => {
        this.setState({redirectToUserDashboard: true})
    }

    render() {
        return (
            <div>
                {this.state.redirectToUserDashboard ? <Redirect to={"/AdminDashboard/ViewUsers"}/> : null }


                <div>
                    <h1>Are you sure you want to delete this user?</h1>

                        <button onClick={this.handleDeleteUser}>Delete</button>
                        <button onClick={this.handleReturn}>Cancel</button>

                </div>
            </div>
        )
    }


}


