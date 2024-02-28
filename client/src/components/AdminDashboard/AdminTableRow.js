import React, {Component} from "react"
import {Redirect} from "react-router-dom";
import {SERVER_HOST} from "../../config/global_constants";
import axios from "axios";
export default class AdminTableRow extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            rowIsClicked: false
        }
    }
componentDidMount() {
        this.props.product.photos.map(photo =>{
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

    handleRowClick = () => {
        this.setState({rowIsClicked: true})
    }

    render() {
        const {
            product_id,
            name,
            price,
            category,
            brand,
            current_stock,
            photos
        } = this.props.product;

        return (
            this.state.rowIsClicked ? (<Redirect to={`/AdminDashboard/EditProduct/${this.props.product._id}`} />
            ) : (
                /* let soldOrForSale = null
        if(localStorage.accessLevel <= ACCESS_LEVEL_GUEST)
        {
            if(this.props.car.sold !== true)
            {
                soldOrForSale = <BuyCar carID={this.props.car._id} price={this.props.car.price} />
            }
            else
            {
                soldOrForSale = "SOLD"
            }
        }
               */
                <tr onClick={this.handleRowClick}>
                    <td>{this.props.rowNum}</td>
                    <td>{name} </td>
                    <td>{category}</td>
                    <td>{brand}</td>
                    <td>{price}</td>
                    <td>{current_stock}</td>
                    <td>{product_id}</td>
                    <td className="photos">{photos.map(photo =><img key={photo._id} id={photo._id} alt=""/>)}</td>
                </tr>
            )
        )
    }
}