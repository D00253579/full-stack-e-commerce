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
    handleChange = (e) => {
        this.setState(prevState => ({
            address: {
                ...prevState.address,
                [e.target.name]: e.target.value
            }
        }));
    }


    // Client side validation for Registration page
    // if all of these return true the data will be posted
    validateName()
    {
        const name = this.state.name
        const errors = [];


        if(/\d/.test(name)) {
            errors.push("Name cannot contain numbers")
        }
        if(/[!"£_'$*^&()+=#.-]/.test(name)) {
            errors.push("Name cannot contain special characters")
        }
        if(!name.trim()) {
            errors.push("Name cannot be empty")
        }

        // update the state of name within errors with the current errors
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                name: errors
            }
        }))
        //console.log("Errors for name: ", errors)
        return errors.length !== 0
    }
    validateEmail()
    {
        const pattern = /^[a-zA-Z0-9_.-]+@[a-zA-Z]+.[a-zA-Z]+$/
        const email = this.state.email
        const errors = []


        if(!email.trim()) {
            errors.push("Email cannot be empty")
        }
        if(!pattern.test(email) && email.trim()) {
            errors.push("Invalid email format")
        }

        // update the state of email within errors with the current errors
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                email: errors
            }
        }))
        //console.log("Errors for email: ", errors)
        return errors.length !== 0
    }
    validatePassword()
    {
        const specialCharPattern = /[!£_"$*^&()+=#.-]/
        const password = this.state.password
        const errors = []


        if(password.length < 8) {
            errors.push("Password must be > 8 characters long")
        }
        if(!/[0-9]/.test(password)) {
            errors.push("Password must contain at least 1 number ")
        }
        if(!specialCharPattern.test(password)) {
            errors.push("Password must contain at least 1 special character !£_$*^&()+=#.-")
        }

        // update the state of password within errors with the current errors
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                password: errors
            }
        }))
        //console.log("Errors for password: ", errors)
        return errors.length !== 0
    }
    validateConfirmPassword()
    {
        const errors = []


        if(this.state.password !== this.state.confirmPassword) {
            errors.push("Passwords do not match")
        }

        // update the state of confirmPassword within errors with current errors
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                confirmPassword: errors
            }
        }))

        //console.log("Errors for confirmPassword: ", errors)
        return errors.length !== 0
    }

    handleSubmit=(e)=> {
            e.preventDefault()
            const newAddress = this.state.address

            axios.post(`${SERVER_HOST}/address/${localStorage.email}`, newAddress)
                .then(res =>
                {
                    if(res.data)
                    {
                        if (res.data.errorMessage)
                        {
                            console.log("error")

                        }
                        else
                        {
                            console.log("address created")
                        }

                    }else{
                        console.log("failed to create an address")
                    }
                })
    }
    render(){
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
                            name = "postcode"
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