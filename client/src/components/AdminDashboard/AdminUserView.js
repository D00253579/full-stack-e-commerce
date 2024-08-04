import React, {Component} from "react";
import UserTable from "./UserTable";
import AdminMenu from "./AdminMenu";
import Footer from "../Footer";
import Navbar from "../NavBar";
export default class AdminUserView extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        console.log("Displaying Admin view of Users")
        return (
            <div className="admin-container">
                <div className="side-menu">
                    <AdminMenu/>
                </div>
                <div className="admin-body-container">
                    <div className="admin-table-container">
                        <UserTable
                            users={this.props.users}
                            updateUsers={this.props.updateUsers}
                        />
                    </div>
                </div>
            </div>

        )
    }

}