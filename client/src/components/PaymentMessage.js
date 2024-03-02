import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"

export default class PaymentMessage extends Component {
    static messageType = {
        SUCCESS: "success",
        ERROR: "error",
        CANCEL: "cancel"
    }

    constructor(props) {
        super(props);
        this.state = {
            redirectToMainPage: false
        }
    }
componentDidMount() {
        if(this.props.match.params.messageType===PaymentMessage.messageType.SUCCESS){
            this.setState({heading:"Paypal Transaction Confirmation",message:"Your Transaction was successful."})
        }else if(this.props.match.params.messageType===PaymentMessage.messageType.CANCEL){
        this.setState({heading:"Paypal Transaction Cancelled",message:"Your transaction was cancelled."})

        }else if(this.props.match.params.messageType===PaymentMessage.messageType.ERROR){
        this.setState({heading:"Paypal Transaction Error",message:"An error occurred with your transaction, please try again."})
    }
    }
render(){
    return(
        <div className="PaymentMessage">
            {this.state.redirectToMainPage? <Redirect to={"/MainPage"}/>:null}
            <h3>{this.state.heading}</h3>
            <p>{this.props.match.params.message}</p>
            <p>{this.state.message}</p>
            {this.props.match.params.messageType===PaymentMessage.messageType.SUCCESS?<p>Your PayPal payment confirmation is <span id="payPalPaymentID">{this.props.match.params.payPalPaymentID}</span></p>:null}
        </div>
    )
}
}