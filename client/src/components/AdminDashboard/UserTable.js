import React, {Component} from "react"
import UserTableRow from "./UserTableRow";
export default class UserTable extends Component
{
    render()
    {
        return (
            <table className="admin-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>AccessLevel</th>
                    <th>Address</th>
                    <th>U. Code</th>
                </tr>
                </thead>

                <tbody>
                {this.props.users.map((users, index) => (
                    <UserTableRow
                        key={users.name}
                        users={users}
                        rowNum={index + 1}
                        handleRowClick={this.props.handleRowClick}
                    />
                ))}
                </tbody>
            </table>
        )
    }
}