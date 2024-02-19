import React, {Component} from "react"
import {Link} from "react-router-dom"
import Filters from "./AdminDashboard/Filters";
import axios from "axios"

import NavBar from "./NavBar";
import ProductTable from "./ProductTable"

import {SERVER_HOST} from "../config/global_constants"
import Footer from "./Footer";
export default class MainPage extends Component {

render()
{
    return (
                   <div>
                       <NavBar/>
                       <div className="testing-return"><Link className="testing-red-button" to={"/TestingDirectory`"}>RETURN</Link></div>
                       <div className={"footer-container"}>
                           <Footer/>
                       </div>
                   </div>


    )

}
}