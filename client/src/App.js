import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import "./css/App.css"
import "./css/Admin.css"
import "./css/NavBar.css"
import "./css/ShoppingCart.css"
import "./css/Footer.css"
import "./css/AccountPage.css"
import "./css/UserProfile.css"
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AccountPage from "./components/AccountPage";
import Footer from "./components/Footer";
import TestingDirectory from "./components/TestingDirectory";
import MainPage from "./components/MainPage"
import MainPageData from "./components/MainPageData";
import ShoppingCart from "./components/ShoppingCart";
import LoggedRoute from "./components/LoggedRoute";
import ViewUsers from "./components/AdminDashboard/ViewUsers"
import Register from "./components/Login/Register";
import {ACCESS_LEVEL_GUEST} from "./config/global_constants";
import EditProduct from "./components/AdminDashboard/EditProduct";
import CreateProduct from "./components/AdminDashboard/CreateProduct";
import DeleteUsers from"./components/AdminDashboard/DeleteUsers";
import Payments from "./components/Payments"
import BuyProduct from "./components/BuyProduct";
import PaymentMessage from "./components/PaymentMessage"
import UserProfile from "./components/UserProfile";
import AddAddress from "./components/AddAddress";

if (typeof localStorage.accessLevel==="undefined"){
    localStorage.name="GUEST"
    localStorage.accessLevel=ACCESS_LEVEL_GUEST
    localStorage.token=null
    localStorage.profilePhoto=null
    localStorage.email=null
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
                    <Route exact path={"/AdminDashboard/EditProduct/:id"} component={EditProduct}/>
                    <Route exact path={"/AdminDashboard/CreateProduct/"} component={CreateProduct}/>
                    <Route exact path={"/AdminDashboard/DeleteUsers/:id"} component={DeleteUsers}/>
                    <Route exact path={"/UserProfile/:id"} component={UserProfile}/>
                    <Route exact path={"/MainPageData"} component={MainPageData}/>
                    <Route exact path={"/AddAddress"} component={AddAddress}/>
                    <Route path="*" component={TestingDirectory}/>
                </Switch>
            </BrowserRouter>
        )
    }
}