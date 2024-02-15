 import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../../components/LinkInClass"
import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../../config/global_constants"


export default class login extends Component
{
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

            axios.post(`${SERVER_HOST}/users/Login/Login/${this.state.email}/${this.state.password}`)
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
                            if (res.data.email==="admin@admin.com"){
                                res.data.accessLevel=ACCESS_LEVEL_ADMIN
                            }
                            console.log("User logged in")
                            sessionStorage.name=res.data.name
                            sessionStorage.accessLevel=res.data.accessLevel

                            this.setState({isLoggedIn:true})
                        }
                    }
                    else
                    {

                        if (res.data.email==="admin@admin.com"){
                            res.data.accessLevel=ACCESS_LEVEL_ADMIN
                        }

                        else // user successfully logged in
                        {
                            this.state.isPasswordWrong = false
                            if (this.state.email==="admin@admin.com"){
                                res.data.accessLevel=ACCESS_LEVEL_ADMIN
                            }
                            console.log("User logged in")
                            localStorage.name=res.data.name
                            localStorage.accessLevel=res.data.accessLevel
                            localStorage.token=res.data.token


                        this.setState({isLoggedIn:true})

                    }
                })
        } else {
            console.log("login denied invalid credentials")
            // loginErrors.push("Entered email and/or password is incorrect")
            //
            // this.setState(prevState => ({
            //     errors: {
            //         ...prevState.errors,
            //         password: loginErrors
            //     }
            // }))
            // this.setState(prevState => ({ // empty email errors so only the above error is displayed
            //     errors: {
            //         ...prevState.errors,
            //         email: []
            //     }
            // }))
        }
    }





    render()
    {
        return (

            <div className="register-container">
                <h2>Login</h2>
                <form className="login-form" noValidate = {true} id = "loginOrRegistrationForm">

                    {this.state.isLoggedIn ? <Redirect to="/TestingDirectory"/> : null}

                    <input
                        type = "email"
                        name = "email"
                        placeholder = "Email"
                        autoComplete="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    {this.state.errors.email.length > 0 && this.state.errors.email.map((error, index) => (
                        <div key={index} className="error-message">
                            &#x2022; {error}
                        </div>
                    ))}
                    <br/>

                    <input
                        type = "password"
                        name = "password"
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
                    <br/>

                    <LinkInClass value="Login" className="green-button" onClick={this.handleSubmit}/><br/>
                    <Link className="red-button" to={"/TestingDirectory"}>Cancel</Link>
                </form>

                <div className="testing-return"><Link className="testing-red-button" to={"/TestingDirectory`"}>RETURN</Link></div>
            </div>

        )
    }
}