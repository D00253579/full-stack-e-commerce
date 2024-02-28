import React, {Component} from "react"
import {Redirect} from "react-router-dom";

export default class UserTableRow extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            rowIsClicked: false
        }
    }



    handleRowClick = () => {
        this.setState({rowIsClicked: true})
    }

    convertLevelToString = (accessLevel) => {
        let returnStr = ""
        if(accessLevel === 1) {
            returnStr = "Customer"
        } else if (accessLevel === 2) {
            returnStr = "Admin"
        } else {
            returnStr = "0"
        }
        return returnStr
    }

    render() {
        const {
            name,
            email,
            accessLevel
        } = this.props.users;

        return (
            this.state.rowIsClicked ? (<Redirect to={`/AdminDashboard/DeleteUsers/${this.props.users._id}`} />
            ) : (
                <tr onClick={this.handleRowClick}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{this.convertLevelToString(accessLevel)}</td>
                    <td>             </td>
                    <td>{this.props.rowNum}</td>

                </tr>
            )
        )
    }
}