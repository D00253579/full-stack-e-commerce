import React, {Component} from "react"


import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"

export default class AddTShirt extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product_id: "",
            name: "",
            colour: "",
            size: "",
            price: "",
            gender: "",
            category: "",
            brand: "",
            current_stock: "",
            redirectToDisplayProducts: sessionStorage.accessLevel < ACCESS_LEVEL_ADMIN
        }
    }

    render() {
        return (
            <button value="Cancel" className="red-button" onClick={this.props.handleRowUnClick}>Cancel</button>
        )
    }


}


