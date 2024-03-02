import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import "./css/App.css"
import "./css/Admin.css"
import "./css/NavBar.css"
import "./css/ShoppingCart.css"
import "./css/Footer.css"
import "./css/AccountPage.css"
import "./css/RegisterPage.css"
import "./css/Filters.css"
import "./css/Main.css"
import "./css/TShirtLayout.css"
import "./css/CreateProduct.css"
import "./css/EditProduct.css"
import "./AdminMenu.scss"
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
import DeleteUsers from"./components/AdminDashboard/DeleteUsers";
import AdminMenu from "./components/AdminDashboard/AdminMenu";
import Payments from "./components/Payments"
import EditProduct from "./components/AdminDashboard/EditProduct";
import CreateProduct from "./components/AdminDashboard/CreateProduct";
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
                    <Route exact path="/Login/login" component={Login} />
                    <Route exact path="/NavBar" component={NavBar}/>
                    <Route exact path="/AccountPage" component={AccountPage}/>
                    <Route exact path="/Footer" component={Footer}/>
                    <Route exact path="/MainPage" component={MainPage}/>
                    <Route exact path="/ShoppingCart" component={ShoppingCart}/>
                    <Route exact path="/Payments" component={Payments}/>
                    <Route exact path="/Login/Register" component={Register} />
                    <LoggedRoute exact path="/AdminDashboard/AdminDashboard" component={AdminDashboard} />
                    <LoggedRoute exact path="/AdminDashboard/ViewUsers" component={ViewUsers}/>
                    <Route exact path={"/AdminDashboard/AdminEditProduct/:id"} component={AdminEditProduct}/>
                    <Route exact path={"/AdminDashboard/DeleteUsers/:id"} component={DeleteUsers}/>
                    <Route exact path={"/UserProfile/:id"} component={UserProfile}/>
                    <Route exact path={"/MainPageData"} component={MainPageData}/>
                    <Route exact path={"/AddAddress"} component={AddAddress}/>
                    <Route exact path={"/AdminDashboard/AdminMenu"} component={AdminMenu}/>
                    <Route exact path={"/AdminDashboard/CreateProduct"} component={CreateProduct}/>
                    <Route exact path={"/AdminDashboard/EditProduct"} component={EditProduct}/>
                    <Route path="*" component={TestingDirectory}/>
                </Switch>
            </BrowserRouter>
        )
    }
}