import React, {Component} from "react";
import FacebookIcon from "../Images/FacebookIcon.png";
import InstagramIcon from "../Images/InstagramIcon.png";
import SnapchatIcon from "../Images/SnapchatIcon.png";
import {Redirect} from "react-router-dom";


export default class Footer extends Component {
    /*
        Include:
        Back to top of page link
        Help section - link to returns
        Social Media Links
        Copyright

        track my order - could be linked to the view previous purchases?
     */
    constructor() {
        super();
        this.state = {
            redirectToReturnProduct: false
        }
    }
    redirectToReturns = () => {
        this.setState({redirectToReturnProducts: true})
    }

    render() {
        return (
            <div>
                {this.state.redirectToReturnProducts ? <Redirect to={"/ProductReturn"}/> : null}
                <footer>
                    <div className={"footer-container"}>
                        <div className={"help-section"}>
                            <h2>CUSTOMER CARE</h2>
                            <h3>Help & Contact Us</h3>
                            <h3 onClick={this.redirectToReturns} className="returns-button">Returns</h3>
                            <h3>Track My Order</h3>
                        </div>
                        <div className={"link-section"}>
                            <h2>LINKS</h2>
                            <div className={"social-media-icons"}>
                                <img src={FacebookIcon} alt="Facebook link" className="facebook-image"/>
                                <img src={InstagramIcon} alt="Instagram link" className="instagram-image"/>
                                <img src={SnapchatIcon} alt="Snapchat link" className="snapchat-image"/>
                            </div>
                        </div>
                    </div>
                    {/* Copyright symbol from https://blog.hubspot.com/website/html-code-copyright */}
                    <div className={"copyright-section"}>
                        <span>&copy; 2024 JLC CLOTHING</span>
                    </div>
                </footer>
            </div>
        )
    }
}