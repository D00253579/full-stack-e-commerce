import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import "./css/App.css"
import "./css/Admin.css"
import "./css/Nav.css"
import "./css/Filters.css"
// import "./css/ShoppingCart.css"
import "./css/Shopping.css"
import Login from "./components/Login/Login";
import AddTShirt from "./components/AddTShirt"
import EditTShirt from "./components/EditTShirt"
import DeleteTShirt from "./components/DeleteTShirt"
import DisplayProducts from "./components/DisplayProducts"
import NavBar from "./components/NavBar";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AccountPage from "./components/AccountPage";
import Footer from "./components/Footer";
import TestingDirectory from "./components/TestingDirectory";
import MainPage from "./components/MainPage"
import ShoppingCart from "./components/ShoppingCart";
import LoggedRoute from "./components/LoggedRoute";
import ViewUsers from "./components/AdminDashboard/ViewUsers"
import Register from "./components/Login/Register";
import {ACCESS_LEVEL_GUEST} from "./config/global_constants";
if (typeof localStorage.accessLevel==="undefined"){
    localStorage.name="GUEST"
    localStorage.accessLevel=ACCESS_LEVEL_GUEST
}

export default class App extends Component
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>                 
                    <Route exact path="/" component={TestingDirectory} />
                    <LoggedRoute exact path="/AddTShirt" component={AddTShirt} />
                    <Route exact path="/Login/login" component={Login} />
                    <LoggedRoute exact path="/EditTShirt/:id" component={EditTShirt} />
                    <LoggedRoute exact path="/DeleteTShirt/:id" component={DeleteTShirt} />
                    <Route exact path="/DisplayProducts" component={DisplayProducts}/>
                    <Route exact path="/NavBar" component={NavBar}/>
                    <Route exact path="/AccountPage" component={AccountPage}/>
                    <Route exact path="/Footer" component={Footer}/>
                    <Route exact path="/MainPage" component={MainPage}/>
                    <Route exact path="/ShoppingCart" component={ShoppingCart}/>
                    <Route exact path="/Login/Register" component={Register} />
                    <LoggedRoute exact path="/AdminDashboard/AdminDashboard" component={AdminDashboard} />
                    <LoggedRoute exact path="/AdminDashboard/ViewUsers" component={ViewUsers}/>
                    <Route path="*" component={TestingDirectory}/>
                </Switch>
            </BrowserRouter>
        )
    }
}