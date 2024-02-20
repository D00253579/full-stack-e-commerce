import React, {Component} from "react"

export default class UserTableRow extends Component
{
    constructor(props) {
        super(props)
    }


    handleRowClick = () => {
        this.props.handleRowClick(this.props.users.id)
    }

    render() {
        const {
            name,
            email,
            accessLevel
        } = this.props.users;

        return (
            <tr onClick={this.handleRowClick}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{accessLevel}</td>
                <td>            </td>
                <td>{this.props.rowNum}</td>
            </tr>
        )
    }
}