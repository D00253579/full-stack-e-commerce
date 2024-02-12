import React, {Component} from "react";


export default class FilterContainer extends Component
{
    constructor(props)
    {
        super(props)
    }

    getFilters = () => {
        const {getFilters} = this.props

        let updatedFilters = {
            gender: this.getCheckedValues("gender"),
            size: this.getCheckedValues("size"),
            category: this.getCheckedValues("category"),
            colour: this.getCheckedValues("colour"),
        }
        this.setState({filters: updatedFilters}, () => {
            console.log("Updated Filters: ", this.state.filters)
            getFilters(this.state.filters)
        })
    }

    // Helper function to get the values from a checkbox group and add them
    // to their respective arrays
    getCheckedValues = (filterName) => {
        let checkboxes = document.getElementsByName(filterName)
        let checkedValues = []

        checkboxes.forEach((checkbox) => {
            if(checkbox.checked) {
                checkedValues.push(checkbox.value)
            }
        })
        return checkedValues
    }


    render() {
        return (

                <div className = "filter-container" >
                    <fieldset>

                        <h4>Gender</h4>
                        <div className="checkbox-filters">
                            <label> M
                                <input
                                    type="checkbox"
                                    name="gender"
                                    value="Male"/>
                            </label>

                            <label> F
                                <input
                                    type="checkbox"
                                    name="gender"
                                    value="Female"/>
                            </label>

                            <label> O
                                <input
                                    type="checkbox"
                                    name="gender"
                                    value="Other"/>
                            </label>
                        </div>

                        <h4>Size</h4>
                        <div>
                            <label> S
                                <input
                                    type="checkbox"
                                    name="size"
                                    value="small"/>
                            </label>

                            <label> M
                                <input
                                    type="checkbox"
                                    name="size"
                                    value="medium"/>
                            </label>

                            <label> L
                                <input
                                    type="checkbox"
                                    name="size"
                                    value="large"/>
                            </label>
                        </div>


                        <h4>Category</h4>
                        <div >
                            <label> Sports
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Sports"/>
                            </label>

                            <label> Casual
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Casual"/>
                            </label>

                            <label> Summer
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Summer"/>
                            </label>
                        </div>
                        <div className="category">
                            <label> Spooky
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Spooky"/>
                            </label>

                            <label> Graphic
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Graphic"/>
                            </label>

                            <label> Smart
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Smart"/>
                            </label>

                            <label> Marvel
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="Superhero"/>
                            </label>
                       </div>



                        <h4>Colour</h4>
                        <div className="checkbox-filters">
                            <label>Red
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Red"/>
                            </label>
                            <label> Green
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Green"/>
                            </label>
                            <label> Blue
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Blue"/>
                            </label>
                            <label> Grey
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Grey"/>
                            </label>
                        </div>
                        <div className="checkbox-filters">
                            <label> Purple
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Purple"/>
                            </label>
                            <label> White
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="White"/>
                            </label>
                            <label> Pink
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Pink"/>
                            </label>
                            <label> Yellow
                                <input
                                    type="checkbox"
                                    name="colour"
                                    value="Yellow"/>
                            </label>
                        </div>

                        <h4>Price</h4>
                        <div className="checkbox-filters">
                            <input type="range" name="price-filter"/>
                        </div>

                        <div className="filter-buttons">
                           <button type="button" onClick={this.getFilters}>Apply</button>
                        </div>
                    </fieldset>
                </div>
        )
    }
}