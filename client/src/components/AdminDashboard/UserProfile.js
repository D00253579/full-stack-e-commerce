import React, {Component} from "react"

export default class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userID: this.props.match.params,
            redirectToDashboard: false,
        }
    }


    handleReturn = () => {
        this.setState({redirectToDashboard: true})
    }

    render() {
        return (
            <div className="user-profile">

            </div>
        )
    }
}