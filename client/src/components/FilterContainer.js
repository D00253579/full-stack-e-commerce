import React, {Component} from "react";

export default class FilterContainer extends Component
{
    render() {
        return (

                <div className = "filter-container" >
                    <fieldsetm>

                        <h4>Gender</h4>
                        <div className="checkbox-filters">
                            <label htmlFor="maleFilter"> M
                                <input type="checkbox" name="maleFilter" value="male"/>
                            </label>

                            <label htmlFor="femaleFilter"> F
                                <input type="checkbox" name="femaleFilter" value="female"/>
                            </label>

                            <label htmlFor="otherFilter"> O
                                <input type="checkbox" name="otherFilter" value="other"/>
                            </label>
                        </div>

                        <h4>Size</h4>
                        <div className="checkbox-filters">
                            <label htmlFor="sFilter"> S
                                <input type="checkbox" name="sFilter" value="small"/>
                            </label>

                            <label htmlFor="mFilter"> M
                                <input type="checkbox" name="mFilter" value="medium"/>
                            </label>

                            <label htmlFor="lFilter"> L
                                <input type="checkbox" name="lFilter" value="large"/>
                            </label>
                        </div>


                        <h4>Category</h4>
                        <div className="checkbox-filters">
                            <label htmlFor="sports-filter"> Sports
                                <input type="checkbox" name="sports-filter" value="sports"/>
                            </label>

                            <label htmlFor="casual-filter"> Casual
                                <input type="checkbox" name="casual-filter" value="casual"/>
                            </label>

                            <label htmlFor="summer-filter"> Summer
                                <input type="checkbox" name="summer-filter" value="summer"/>
                            </label>
                        </div>
                        <div className="checkbox-filters">
                            <label htmlFor="spooky-filter"> Spooky
                                <input type="checkbox" name="spooky-filter" value="spooky"/>
                            </label>

                            <label htmlFor="graphic-filter"> Graphic
                                <input type="checkbox" name="graphic-filter" value="graphic"/>
                            </label>

                            <label htmlFor="smart-filters"> Smart
                                <input type="checkbox" name="smart-filters" value="smart"/>
                            </label>

                            <label htmlFor="marvel-filter"> Marvel
                                <input type="checkbox" name="marvel-filter" value="superhero"/>
                            </label>
                       </div>



                        <h4>Colour</h4>
                        <div className="checkbox-filters">
                            <label htmlFor="red-filter" >Red
                                <input type="checkbox" name="red-filter" value="red"/>
                            </label>
                            <label htmlFor="grey-filter"> Green
                                <input type="checkbox" name="green-filter" value="green"/>
                            </label>
                            <label htmlFor="blue-filter"> Blue
                                <input type="checkbox" name="blue-filter" value="blue"/>
                            </label>
                            <label htmlFor="grey-filter"> Grey
                                <input type="checkbox" name="grey-filter" value="grey"/>
                            </label>
                        </div>
                        <div className="checkbox-filters">
                            <label htmlFor="purple-filter"> Purple
                                <input type="checkbox" name="purple-filter" value="purple"/>
                            </label>
                            <label htmlFor="white-filter"> White
                                <input type="checkbox" name="white-filter" value="white"/>
                            </label>
                            <label htmlFor="pink-filter"> Pink
                                <input type="checkbox" name="pink-filter" value="pink"/>
                            </label>
                            <label htmlFor="yellow-filter"> Yellow
                                <input type="checkbox" name="yellow-filter" value="yellow"/>
                            </label>
                        </div>

                        <h4>Price</h4>
                        <div className="checkbox-filters">
                            <input type="range" name="price-filter"/>
                        </div>

                    </fieldsetm>
                </div>
        )
    }
}