import React, {Component} from "react"
import UserTableRow from "./UserTableRow";

export default class UserTable extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            nameIsAscending: false, // default name descending
            accessIsAscending: true,

        }
    }
    sortName = () => { // default descending
        let users = [...this.props.users] // soft copy of products to manipulate

        // sort ascending
        if(!this.state.nameIsAscending) {
            let ascendingProducts = users.sort((a, b) => a.name < b.name?1:-1)
            this.props.updateUsers(ascendingProducts)
            console.log("Name ACE: ", ascendingProducts)
        // sort descending
        } else {
            let descendingProducts = users.sort((a, b) => a.name < b.name?-1:1)
            this.props.updateUsers(descendingProducts)
            console.log("Name DESC: ", descendingProducts)
        }

        // When the sort is clicked depending on what the previous order was this will set it to its opposite to change the direction of the arrow
        if(!this.state.nameIsAscending) {
            this.setState({nameIsAscending: true})
        } else {
            this.setState({nameIsAscending: false})
        }

        // reset other arrows to default
        if(!this.state.accessIsAscending) {
            this.setState({accessIsAscending: true})
        }
    }
    sortAccess = () => { // default ascending
        let users = [...this.props.users]

        // sort ascending
        if(!this.state.accessIsAscending) {
            let ascendingProducts = users.sort((a, b) => a.accessLevel < b.accessLevel?1:-1)
            this.props.updateUsers(ascendingProducts)
            //console.log("Stock ACE: ", ascendingProducts)
        // sort descending
        } else {
            let descendingProducts = users.sort((a, b) => a.accessLevel < b.accessLevel?-1:1)
            this.props.updateUsers(descendingProducts)
            //console.log("Stock DESC: ", descendingProducts)
        }

        // Update arrow direction
        if(this.state.accessIsAscending) {
            this.setState({accessIsAscending: false})
        } else {
            this.setState({accessIsAscending: true})
        }

        // reset other arrow to default
        if(this.state.nameIsAscending) {
            this.setState({nameIsAscending: false})

        }
    }
    render()
    {
        return (
            <table className="user-table">
                <thead>
                <tr>
                    <th>Name <label className="sortLabel" onClick={this.sortName}><span id="nameSort">{!this.state.nameIsAscending ? '\u25B4' : '\u25BE'} </span></label></th>
                    <th>Email</th>
                    <th>AccessLevel <label className="sortLabel" onClick={this.sortAccess}><span id="accessSort">{!this.state.accessIsAscending ? '\u25B4' : '\u25BE'} </span></label></th>
                    <th>Country</th>
                    <th>U. Code</th>
                </tr>
                </thead>

                <tbody>
                {this.props.users.map((users, index) => (
                    <UserTableRow
                        key={users._id}
                        users={users}
                        rowNum={index + 1}
                    />
                ))}
                </tbody>
            </table>
        )
    }
}