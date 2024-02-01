import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"
import "./css/FilterContainerCss.css"
import "./css/NavBar.css"

import AddTShirt from "./components/AddTShirt"
import EditProduct from "./components/EditProduct"
import DeleteProduct from "./components/DeleteProduct"
import DisplayProducts from "./components/DisplayProducts"
import NavBar from "./components/NavBar";
import {Nav} from "react-bootstrap";
    
export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>                 
                    <Route exact path="/" component={DisplayProducts} />
                    <Route exact path="/AddTShirt" component={AddTShirt} />
                    <Route exact path="/EditProduct/:id" component={EditProduct} />
                    <Route exact path="/DeleteProduct/:id" component={DeleteProduct} />
                    <Route exact path="/DisplayProducts" component={DisplayProducts}/>
                    <Route exact path="/NavBar" component={NavBar}/>
                    <Route path="*" component={DisplayProducts}/>
                </Switch>
            </BrowserRouter>
        )
    }
}