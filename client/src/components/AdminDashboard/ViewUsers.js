import React, {Component} from "react"
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";
import Navbar from "../NavBar"
import AdminUserView from "./AdminUserView";
import AdminMenu from "./AdminMenu";
import Footer from "../Footer";
import UserTable from "../../scss/UserTable.scss"

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

                        console.log("Records read to Admin view of Users");
                        this.setState({users: res.data})
                        this.sortName()

            })
            .catch(err =>{

            })
    }

    sortName = () => { // default descending
        let productNaturalOrderByName = [...this.state.users] // soft copy of products to manipulate

        let descendingProducts = productNaturalOrderByName.sort((a, b) => a.name < b.name ? -1 : 1)
        this.updateUsers(descendingProducts)
        console.log("Natural order set: product.name DESC")
    }
    updateUsers = (newUserState) => {
        this.setState({users: newUserState})
        console.log("State of Users updated ")
    }

    render() {
        return (
            <div>
                <div className="admin-container">
                    <div className="admin-head-container">
                        <Navbar/>
                    </div>
                    <div className="admin-body-container">
                            <AdminUserView
                                users={this.state.users}
                                updateUsers={this.updateUsers}
                            />
                    </div>
                </div>
                    <footer>
                        <Footer/>
                    </footer>

            </div>
        )
    }
}