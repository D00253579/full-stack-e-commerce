import React, {Component} from "react";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import MainPagePhotoData from "./MainPagePhotoData";
import "../css/TShirtLayout.css";

export default class MainPageData extends Component {



    render() {
        return (
            <div>
                <div className={"tshirt-container"}>
                    {this.props.product.map((products) => <MainPagePhotoData key={products._id} products={products}/>)}
                </div>
            </div>
        )

    }

}