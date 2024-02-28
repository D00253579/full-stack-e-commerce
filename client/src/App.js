import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import "./css/App.css"
import "./css/Admin.css"
import "./css/NavBar.css"
import "./css/ShoppingCart.css"
import "./css/Footer.css"
import "./css/AccountPage.css"
import Login from "./components/Login/Login";
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
import AdminEditProduct from "./components/AdminDashboard/AdminEditProduct";
import CreateProduct from "./components/AdminDashboard/CreateProduct";
import DeleteUsers from"./components/AdminDashboard/DeleteUsers";
import Payments from "./components/Payments"
import BuyProduct from "./components/BuyProduct";
import PaymentMessage from "./components/PaymentMessage"

if (typeof localStorage.accessLevel==="undefined"){
    localStorage.name="GUEST"
    localStorage.accessLevel=ACCESS_LEVEL_GUEST
    localStorage.token=null
    localStorage.profilePhoto=null
}

export default class App extends Component
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>                 
                    <Route exact path="/" component={TestingDirectory} />
                    <Route exact path="/Login/login" component={Login} />
                    <Route exact path="/NavBar" component={NavBar}/>
                    <Route exact path="/AccountPage" component={AccountPage}/>
                    <Route exact path="/Footer" component={Footer}/>
                    <Route exact path="/MainPage" component={MainPage}/>
                    <Route exact path="/ShoppingCart" component={ShoppingCart}/>
                    <Route exact path="/Payments" component={Payments}/>
                    <Route exact path="/BuyProduct" component={BuyProduct}/>
                    <Route exact path="/PaymentMessage" component={PaymentMessage}/>

                    <Route exact path="/Login/Register" component={Register} />
                    <LoggedRoute exact path="/AdminDashboard/AdminDashboard" component={AdminDashboard} />
                    <LoggedRoute exact path="/AdminDashboard/ViewUsers" component={ViewUsers}/>
                    <Route exact path={"/AdminDashboard/AdminEditProduct/:id"} component={AdminEditProduct}/>
                    <Route exact path={"/AdminDashboard/CreateProduct/"} component={CreateProduct}/>
                    <Route exact path={"/AdminDashboard/DeleteUsers/:id"} component={DeleteUsers}/>
                    <Route path="*" component={TestingDirectory}/>
                </Switch>
            </BrowserRouter>
        )
    }
}