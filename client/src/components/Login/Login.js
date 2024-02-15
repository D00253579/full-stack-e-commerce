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
            isLoggedIn:false
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


    handleSubmit = (e) =>
    {
        axios.post(`${SERVER_HOST}/users/Login/login/${this.state.email}/${this.state.password}`)
            .then(res =>
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
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage)
                    }
                    else // user successfully logged in
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
                }
                else
                {
                    console.log("Login failed")
                }
            })
    }


    render()
    {
        return (
            <div className="register-container">
                <h2>Login</h2>
                <form className="login-form" noValidate = {true} id = "loginOrRegistrationForm">

                    {this.state.isLoggedIn ? <Redirect to="/DisplayProducts"/> : null}

                    <input
                        type = "email"
                        name = "email"
                        placeholder = "Email"
                        autoComplete="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    /><br/>

                    <input
                        type = "password"
                        name = "password"
                        placeholder = "Password"
                        autoComplete="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    /><br/><br/>
                    {/*<Link className="green-button" to={"/Login/login"}>Login</Link>*/}
                    {/*<Link className="blue-button" to={"/Login/Register"}>Register</Link>*/}
                    <LinkInClass value="Login" className="green-button" onClick={this.handleSubmit}/>
                    <Link className="red-button" to={"/TestingDirectory"}>Cancel</Link>
                </form>

                <div className="testing-return"><Link className="testing-red-button" to={"/TestingDirectory`"}>RETURN</Link></div>
            </div>

        )
    }
}