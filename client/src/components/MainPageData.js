import React, {Component} from "react";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import MainPagePhotoData from "./MainPagePhotoData";
export default class MainPageData extends Component {

render(){
        return(
<div>
    {this.props.product.map((products)=> <MainPagePhotoData key={products._id} products={products}/>)}
</div>
        )

}
}