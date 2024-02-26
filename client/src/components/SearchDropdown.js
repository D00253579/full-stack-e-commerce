import React, {Component} from "react"
import {Redirect} from "react-router-dom";

export default class SearchDropdown extends Component {

    constructor(props) {
        super(props)
        this.state = {
            redirectToProductPage: false,
            selectedProductId: ""
        }
    }

    handleClick = (id) => {
        this.setState({redirectToProductPage: true})
        this.setState({selectedProductId: id})
    }
    render() {

        if(this.state.redirectToProductPage) {
            return <Redirect to={`/AdminDashboard/EditProduct/${this.state.selectedProductId}`} />;

        }
        return (

            <div className="search-dropdown">
                    <div className="search-dropdown-content">
                        {this.props.searchResults.map((result) => (

                            <div className="search-dropdown-item" key={result._id} onClick={() => this.handleClick(result._id)}>
                                <div className="search-brand">
                                    <p>{result.brand}</p>
                                </div>
                                <div className="search-name">
                                    <p className="catch-name-overload">{result.name}</p>
                                </div>
                                <div className="search-category">
                                    <p>{result.category}</p>
                                </div>



                            </div>

                        ))}
                    </div>

            </div>


        )
    }
}