import React, {Component} from "react"
import {Link} from "react-router-dom"
import NavBar from "./NavBar";
import Footer from "./Footer"
export default class MainPage extends Component {

render()
{
    return (
                   <div>
                       <NavBar/>
                       <div className="testing-return"><Link className="testing-red-button" to={"/TestingDirectory`"}>RETURN</Link></div>
                       <div className="main-container">

                       </div>
                       <footer>
                           <Footer/>
                       </footer>
                   </div>

    )

}
}