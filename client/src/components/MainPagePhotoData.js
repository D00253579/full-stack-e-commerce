import React, {Component} from "react"
import MainPage from "./MainPage";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import "../css/TShirtLayout.css";

export default class MainPagePhotoData extends Component {

    componentDidMount() {
        this.props.products.photos.map(photo => {
            return axios.get(`${SERVER_HOST}/products/photo/${photo.filename}`)
                .then(res => {
                    if (res.data) {
                        if (res.data.errorMessage) {
                            console.log(res.data.errorMessage)
                        } else {
                            document.getElementById(photo._id).src = `data:;base64,${res.data.image}`
                        }
                    } else {
                        console.log("Record not found")
                    }
                })
        })
    }

    render() {

        return (
            <div>
                <div className={"tshirts-rows"}>
                    {this.props.products.photos.map(photo => <img key={photo._id} id={photo._id} alt={""}
                                                                  className={"tshirt-image"}/>)}
                </div>
            </div>
        )
    }
}