import React from 'react'
import {Route, Redirect } from "react-router-dom"

import {ACCESS_LEVEL_GUEST} from "../config/global_constants"

//This code checks if the accessLevel is greater than GUEST level, if it is guest level then they get redirected to the main page
const LoggedRoute = ({component: Component, exact, path, ...rest }) =>
    (
        <Route
            exact={exact}
            path={path}
            //Display products is temporary here
            render = {props => localStorage.accessLevel > ACCESS_LEVEL_GUEST ? <Component {...props} {...rest} /> : <Redirect to="/TestingDirectory"/> }
        />
    )

            export default LoggedRoute