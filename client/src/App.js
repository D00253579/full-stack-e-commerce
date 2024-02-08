import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

//import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"
import "./css/FilterContainerCss.css"
import "./css/NavBar.css"
import Login from "./components/Login/login";
import AddTShirt from "./components/AddTShirt"
import EditTShirt from "./components/EditTShirt"
import DeleteTShirt from "./components/DeleteTShirt"
import DisplayProducts from "./components/DisplayProducts"
import NavBar from "./components/NavBar";
import AdminDashboard from "./components/AdminDashboard";
import Register from "./components/Login/Register";

export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>                 
                    <Route exact path="/" component={DisplayProducts} />
                    <Route exact path="/AddTShirt" component={AddTShirt} />
                    <Route exact path="/Login/login" component={Login} />
                    <Route exact path="/EditTShirt/:id" component={EditTShirt} />
                    <Route exact path="/DeleteTShirt/:id" component={DeleteTShirt} />
                    <Route exact path="/DisplayProducts" component={DisplayProducts}/>
                    <Route exact path="/NavBar" component={NavBar}/>
                    <Route exact path="/Login/Register" component={Register} />
                    <Route exact path="/AdminDashboard" component={AdminDashboard} />

                    <Route path="*" component={DisplayProducts}/>
                </Switch>
            </BrowserRouter>
        )
    }
}