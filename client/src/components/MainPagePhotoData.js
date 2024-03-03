import React, {Component} from "react"
import {Redirect} from "react-router-dom";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import "../css/TShirtLayout.css";

export default class MainPagePhotoData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectToTShirtView: false
        }
    }

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

    handleReturn = () => {
        this.setState({redirectToTShirtView: true})
    }

    render() {
        return (
                <div className="tshirts-container">
                    {/*Used ChatGPT to troubleshoot because I didn't know how to give each individual photo a className by the photo id and was getting an error due to the photoID starting with an integer*/}
                    {this.props.products.photos.map(photo => <img className={`photo-${photo._id}`}
                                                                  key={photo._id}
                                                                  id={photo._id} alt={""}
                                                                  onClick={this.handleReturn}/>)}
                    {this.state.redirectToTShirtView ? <Redirect to={`/TShirtView/${this.props.products._id}`}/> : null}
                </div>
        )
    }
}