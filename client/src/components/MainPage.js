import React, {Component} from "react"
import {Link} from "react-router-dom"
import NavBar from "./NavBar";
export default class MainPage extends Component {

render()
{
    return (
                   <div>
                       <NavBar/>
                       <div className="testing-return"><Link className="testing-red-button" to={"/TestingDirectory`"}>RETURN</Link></div>

                   </div>


    )

}
}