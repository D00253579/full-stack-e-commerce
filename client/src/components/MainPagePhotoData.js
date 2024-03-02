import React, {Component} from "react"
import {Redirect} from "react-router-dom";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import "../css/TShirtLayout.css";
export default class MainPagePhotoData extends Component{
    constructor(props) {
        super(props)
        this.state = {
            redirectToTShirtView:false
        }
    }
    componentDidMount() {
        this.props.products.photos.map(photo =>{
            return axios.get(`${SERVER_HOST}/products/photo/${photo.filename}`)
                .then(res =>{
                    if (res.data){
                        if (res.data.errorMessage){
                            console.log(res.data.errorMessage)
                        }else{
                            document.getElementById(photo._id).src=`data:;base64,${res.data.image}`
                        }
                    }else{
                        console.log("Record not found")
                    }
                })
        })
    }

    handleReturn = () => {
        this.setState({redirectToTShirtView: true})
    }
render(){
return(
    <div className={"tshirts-rows"}>

        {this.props.products.photos.map(photo => <button onClick={this.handleReturn}><img key={photo._id}  id={photo._id} alt={""} /></button>)}
        {this.state.redirectToTShirtView ? <Redirect to={`/TShirtView/${this.props.products._id}`}/> : null }
           
           </div>
    </div>
)
}
}