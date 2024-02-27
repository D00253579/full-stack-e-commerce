import React, {Component} from "react";
import UserTable from "./UserTable";

export default class AdminUserView extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        console.log("Displaying Admin view of Users")
        return (
            <div className="admin-table-container">
                <UserTable users={this.props.users} handleRowClick={this.props.handleRowClick}
                />
            </div>

        )
    }

}