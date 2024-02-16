import React, {Component} from "react"
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";
import Navbar from "../NavBar"
import AdminControls from "./AdminControls";

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
    .then((res)=> {
if (res.data){
    res.json({errorMessage:``})
}
    })
}

    render() {
        return (
            <div>
                <div className="admin-head-container">
                    <Navbar/>
                </div>
            </div>
        )
    }
}