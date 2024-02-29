import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import NavBar from "./NavBar";
import LinkInClass from "./LinkInClass";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";

export default class AddAddress extends Component {

    constructor(props) {
        super(props);
        this.state={

            user: [],
            address: {
                address_line_1: "",
                address_line_2: "",
                address_line_3: "",
                city: "",
                county: "",
                country: "",
                post_code: ""
            }
        }
    }

    // Get specific user details to add their address
    componentDidMount() {
        axios.get(`${SERVER_HOST}/AddAddress/users/${localStorage.email}`, {headers:{"authorization":localStorage.token}})
            .then((res => {
                if(res.data){
                    if(res.data.errorMessage) {
                        console.log("Error fetching user profile")
                    } else {
                        console.log("User fetched: ", res.data)
                        this.setState({user: res.data})
                    }
                }
            }))
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState(prevState => ({
            address: {
                ...prevState.address,
                [name]: value
            }
        }));
    }


    handleSubmit=(e)=> {
        e.preventDefault()
        const newAddress = this.state.address
        const id = this.state.user._id

        axios.put(`${SERVER_HOST}/AddAddress/users/${id}`, {newAddress})
            .then(res => {
                if(res.data) {
                    if(res.data.errorMessage) {
                        console.log("Error finding user profile")
                    } else {
                        console.log("Address added to profile")
                        console.log("Address: ", res.data)
                    }
                }
            })
    }
    render(){
        console.log("User: ",this.state.user)

        return(
            <div className="add-address">
                <div className="admin-head-container">
                    <NavBar/>
                </div>
                <div className="register-container">
                    <h2>Address</h2>

                    <form className="register-form" noValidate = {true} id = "loginOrRegistrationForm">
                        <input
                            name = "address_line_1"
                            type = "text"
                            placeholder = "Address Line 1"
                            value = {this.state.address.address_line_1}
                            onChange = {this.handleChange}
                            ref = {(input) => { this.inputToFocus = input }}
                        />
                        <br/>

                        <input
                            name = "address_line_2"
                            type = "text"
                            placeholder = "Address Line 2"
                            value = {this.state.address.address_line_2}
                            onChange = {this.handleChange}
                        />
                        <br/>

                        <input
                            name = "address_line_3"
                            type = "text"
                            placeholder = "Address Line 3"
                            autoComplete="address_line_3"
                            value = {this.state.address.address_line_3}
                            onChange = {this.handleChange}
                        />
                        <br/>

                        <input
                            name = "city"
                            type = "text"
                            placeholder = "City"
                            autoComplete="city"
                            value = {this.state.address.city}
                            onChange = {this.handleChange}
                        />
                        <input
                            name = "county"
                            type = "text"
                            placeholder = "County"
                            autoComplete="county"
                            value = {this.state.address.county}
                            onChange = {this.handleChange}
                        />
                        <br/>
                        <input
                            name = "country"
                            type = "text"
                            placeholder = "Country"
                            autoComplete="country"
                            value = {this.state.address.country}
                            onChange = {this.handleChange}
                        />
                        <br/>
                        <input
                            name = "post_code"
                            type = "text"
                            placeholder = "Postcode"
                            autoComplete="postcode"
                            value = {this.state.address.post_code}
                            onChange = {this.handleChange}
                        />
                        <br/>
                        
                        <br/><br/>


                    </form>
                    <div className="register-buttons">
                        <LinkInClass value="Add Shipping Address" className="green-button" onClick={this.handleSubmit} /> <br/>
                        <Link className="red-button" to={"/TestingDirectory"}>Cancel</Link>
                    </div>
                </div>
            </div>



        )}
}