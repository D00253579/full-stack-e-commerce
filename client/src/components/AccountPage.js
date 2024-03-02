import React, {Component} from "react"
import NavBar from "./NavBar";
import {Link, Redirect} from "react-router-dom";
import axios from "axios"
import LinkInClass from "./LinkInClass";
import Footer from "./Footer";
import {SERVER_HOST} from "../config/global_constants";



export default class AccountPage extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            email:"",
            password:"",
            isLoggedIn:false,
            users: [],
            errors: { // used to keep track of current validation errors
                email: [],
                password: []
            }
        }
    }
    componentDidMount() {

        axios.get(`${SERVER_HOST}/users`)
            .then(res =>
            {
                if(res.data)
                {
                    if(res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        console.log("Users read to Login page")
                        this.setState({users: res.data})
                        //console.log("users: ",this.state.users)
                    }
                } else {
                    console.log("Users not found")
                }
            })

    }

    handleChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value})

    }


    validateUserLogin() {
        let canLogin = false;
        let emailErrors = []
        let pwErrors = []
        let email = this.state.email
        let pw = this.state.password
        if(!email.trim())
        {
            emailErrors.push("Email cannot be empty")
        }
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                email: emailErrors
            }
        }))
        if(!pw.trim())
        {
            pwErrors.push("Password cannot be empty")
        }
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                password: pwErrors
            }
        }))

        if (emailErrors.length === 0 && pwErrors.length === 0)
        { // if there are no errors
            {
                canLogin = true
                this.setState(prevState => ({ // else set the state of errors.email to an empty array
                    errors: {
                        ...prevState.errors,
                        email: []
                    }
                }))
                this.setState(prevState => ({ // else set the state of errors.email to an empty array
                    errors: {
                        ...prevState.errors,
                        password: []
                    }
                }))
            }

        }
        console.log("canLogin = ", canLogin)
        return canLogin;
    }


    handleSubmit = (e) => {
        let loginErrors = []
        e.preventDefault()

        if(this.validateUserLogin()) { //if this returns true, user details passed validation, login user

            axios.post(`${SERVER_HOST}/users/AccountPage/${this.state.email}/${this.state.password}`)

                .then(res =>
                {
                    if(res.data)
                    {
                        if (res.data.errorMessage)
                        {
                            this.state.isPasswordWrong = true
                        }
                        else // user successfully logged in
                        {
                            this.state.isPasswordWrong = false

                            console.log("User logged in")
                            localStorage.name = res.data.name
                            localStorage.email = this.state.email
                            localStorage.accessLevel = res.data.accessLevel
                            localStorage.profilePhoto=res.data.profilePhoto
                            localStorage.token = res.data.token

                            this.setState({isLoggedIn: true})
                        }
                    } else {
                        console.log("Error logging in")
                    }
                })
        } else {
            console.log("login denied invalid credentials")
        }
    }


    render() {
        return (
            <div>

                <div className="account-head-container">
                    <NavBar/>
                </div>

                    <div className="account-container">
                        <div className="account-box">
                            <div className="login-box">
                                <h1>WELCOME BACK!</h1>
                                <label> Email Address:<span> *</span> </label>
                                {this.state.isLoggedIn ? <Redirect to="/MainPage"/> : null}

                                <input type = "email" name="email" id = "email-input" placeholder = "Email" autoComplete="email" value={this.state.email} onChange={this.handleChange}/>
                                {this.state.errors.email.length > 0 && this.state.errors.email.map((error, index) => (
                                    <div key={index} className="error-message">
                                        &#x2022; {error}
                                    </div>
                                ))}
                                <br/><br/>
                                <label>Password:<span> *</span></label>
                                <input
                                    type = "password"
                                    name="password"
                                    id = "password-input"
                                    placeholder = "Password"
                                    autoComplete="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                {this.state.errors.password.length > 0 && this.state.errors.password.map((error, index) => (
                                    <div key={index} className="error-message">
                                        &#x2022; {error}
                                    </div>
                                ))}

                                <div className="register-box">
                                    <LinkInClass value="SIGN IN" className={"signIn-btn"} onClick={this.handleSubmit}/><br/>

                                </div>
                            </div>
                                <div className="vl"></div>
                            <div className="register-box">
                            <h1>DON'T HAVE AN ACCOUNT?</h1>
                                <Link to={"/Login/Register"}>
                                    <button className={"register-btn"}>REGISTER</button>
                                </Link>
                                <button className={"guest-btn"}>CONTINUE AS GUEST</button>
                            </div>
                        </div>
                    </div>

                        <footer>
                            <Footer/>
                        </footer>
                    </div>
                    )
                }
                }

