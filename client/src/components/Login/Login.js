import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../../components/LinkInClass"
import {ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_GUEST, SERVER_HOST} from "../../config/global_constants"


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


    handleChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleSubmit = (e) =>
    {
        axios.post(`${SERVER_HOST}/users/Login/login/${this.state.email}/${this.state.password}`)
            .then(res =>
            {
                if(res.data)
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
                        console.log("User logged in")
                        sessionStorage.name=res.data.name
                        sessionStorage.accessLevel=res.data.accessLevel

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

                    {this.state.isLoggedIn ? <Redirect to="/TestingDirectory"/> : null}

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