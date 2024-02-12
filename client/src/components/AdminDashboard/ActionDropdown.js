import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class ActionDropdown extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="actions-dropdown">
                <h1>&#x1F50D;</h1>
                <div className="actions-dropdown-content">
                    <Link className="green-button" to={"/EditTShirt/" + this.props.id}>Edit</Link>
                    <Link className="red-button" to={"/DeleteTShirt/" + this.props.id}>Delete</Link>
                </div>
            </div>
        )
    }
}