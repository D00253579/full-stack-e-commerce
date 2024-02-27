import React, {Component} from "react"
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";
import Navbar from "../NavBar"
import AdminUserView from "./AdminUserView";
import UserControls from "./UserControls";

export default class ViewUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    
    componentDidMount() {
        //Fetching users for the table
        axios.get(`${SERVER_HOST}/users`)
            .then((res) => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        res.json({errorMessage: `Users not found`})
                    } else {
                        console.log("Records read to Admin view of Users");
                        this.setState({users: res.data})
                    }

                } else {
                    console.log(`Record not found`)
                }

            })
    }

    render() {
        return (
            <div>
                <div className="admin-head-container">
                    <Navbar/>
                </div>
                <UserControls/>
                <div className="admin-body-container">
                    <div className="admin-table-container">
                        <AdminUserView
                            users={this.state.users}
                            handleRowClick={this.handleRowClick}
                        />
                    </div>
                </div>
                </div>
        )
    }
}