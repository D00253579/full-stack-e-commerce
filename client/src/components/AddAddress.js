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
            },
            line1IsInvalid: false,
            line2IsInvalid: false,
            line3IsInvalid: false,
            cityIsInvalid: false,
            countryIsInvalid: false,
            postcodeIsInvalid: false,
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
    validateInput = () => {
        const currentInput = this.state.address
        let isValid = true

        // ADDRESS LINE ONE
        if(!currentInput.address_line_1.trim()) {
            this.setState({line1IsInvalid: true})
            document.getElementById("lineOneInput").classList.add("invalid-input")
            isValid = false
        } else {
            this.setState({line1IsInvalid: false})
            document.getElementById("lineOneInput").classList.remove("invalid-input")
        }

        // ADDRESS LINE TWO
        if(!currentInput.address_line_2.trim()) {
            this.setState({line2IsInvalid: true})
            document.getElementById("lineTwoInput").classList.add("invalid-input")
            isValid = false
        } else {
            this.setState({line2IsInvalid: false})
            document.getElementById("lineTwoInput").classList.remove("invalid-input")

        }

        // ADDRESS LINE THREE
        if(!currentInput.address_line_2.trim()) {
            this.setState({line2IsInvalid: true})
            document.getElementById("lineThreeInput").classList.add("invalid-input")

            isValid = false
        } else {
            this.setState({line2IsInvalid: false})
            document.getElementById("lineThreeInput").classList.remove("invalid-input")

        }

        // CITY
        if(!currentInput.city.trim()) {
            this.setState({cityIsInvalid: true})
            document.getElementById("cityInput").classList.add("invalid-input")
            isValid = false
        } else {
            this.setState({cityIsInvalid: false})
            document.getElementById("cityInput").classList.remove("invalid-input")
        }

        // COUNTRY
        if(!currentInput.country.trim()) {
            this.setState({countryIsInvalid: true})
            document.getElementById("countryInput").classList.add("invalid-input")
            isValid = false
        } else {
            this.setState({countryIsInvalid: false})
            document.getElementById("countryInput").classList.remove("invalid-input")

        }

        // POSTCODE
        if(!currentInput.post_code.trim()) {
            this.setState({postcodeIsInvalid: true})
            document.getElementById("postcodeInput").classList.add("invalid-input")
            isValid = false
        } else {
            this.setState({postcodeIsInvalid: false})
            document.getElementById("postcodeInput").classList.remove("invalid-input")

        }

        return isValid
    }


    handleSubmit=(e)=> {
        e.preventDefault()
        const newAddress = this.state.address
        const id = this.state.user._id

        if(this.validateInput()) {
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
        } else {
            console.log("inputs are invalid")
        }
    }
    render(){
        console.log("User: ",this.state.user)

        return(

            <div>
                <div className="admin-head-container">
                    <NavBar/>
                </div>
                <div className="create-address">
                    <h2>Address</h2>
                    <p>Anything marked <span className="red-text">*</span> is a <b>mandatory</b> field</p>

                    <form className="address-form" noValidate = {true} id = "loginOrRegistrationForm">

                        <div className="address-input-container">

                            <div className="left">
                                <div className="address-input">
                                    <label>
                                        <span className="red-text">*</span>Address Line 1 :
                                        <input
                                            name="address_line_1"
                                            type="text"
                                            id="lineOneInput"
                                            placeholder = "Line 1 "
                                            value = {this.state.address.address_line_1}
                                            onChange = {this.handleChange}
                                            ref = {(input) => { this.inputToFocus = input }}
                                        />
                                    </label>
                                </div>

                                <div className="address-input">
                                    <label htmlFor={"lineTwoInput"} >
                                        <span className="red-text">*</span>Address Line 2 :
                                        <input
                                            name="address_line_2"
                                            type="text"
                                            id="lineTwoInput"
                                            placeholder = "Line 2"
                                            value = {this.state.address.address_line_2}
                                            onChange = {this.handleChange}
                                        />
                                    </label>
                                </div>

                                <div className="address-input">
                                    <label htmlFor={"lineThreeInput"}>
                                        <span className="red-text">*</span>Address Line 3 :
                                        <input
                                            name="address_line_3"
                                            type="text"
                                            id="lineThreeInput"
                                            placeholder = "Line 3"
                                            autoComplete="address_line_3"
                                            value = {this.state.address.address_line_3}
                                            onChange = {this.handleChange}
                                        />
                                    </label>
                                </div>

                                <div className="address-input">
                                    <label htmlFor="cityInput">
                                        <span className="red-text">*</span>City :
                                        <input
                                            name="city"
                                            type="text"
                                            id="cityInput"
                                            placeholder = "City"
                                            autoComplete="city"
                                            value = {this.state.address.city}
                                            onChange = {this.handleChange}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="right">
                                <div className="address-input">
                                    <label htmlFor="countyInput">
                                        County:
                                        <input
                                            name="county"
                                            type="text"
                                            id="countyInput"
                                            placeholder = "County"
                                            autoComplete="county"
                                            value = {this.state.address.county}
                                            onChange = {this.handleChange}
                                        />
                                    </label>
                                </div>

                                <div className="address-input">
                                    <label htmlFor="countryInput">
                                        <span className="red-text">*</span>Country :
                                        <input
                                            name="country"
                                            type="text"
                                            id="countryInput"
                                            placeholder = "Country"
                                            autoComplete="country"
                                            value = {this.state.address.country}
                                            onChange = {this.handleChange}
                                        />
                                    </label>
                                </div>

                                <div className="address-input">
                                    <label htmlFor="postcodeInput">
                                        <span className="red-text">*</span>Postcode :
                                        <input
                                            name="post_code"
                                            type="text"
                                            id="postcodeInput"
                                            placeholder = "Postcode"
                                            autoComplete="postcode"
                                            value = {this.state.address.post_code}
                                            onChange = {this.handleChange}
                                        />
                                    </label>
                                </div>
                        </div>
                    </div>
                        <div className="buttons">
                            <LinkInClass value="Add Shipping Address" className="green-button" onClick={this.handleSubmit} /> <br/>
                            <Link className="red-button" to={"/TestingDirectory"}>Cancel</Link>
                        </div>
                </form>

            </div>
        </div>




    )}
}