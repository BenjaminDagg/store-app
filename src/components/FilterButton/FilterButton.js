import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./FilterButton.css";
import {filterTypes} from "../../models/FilterTypes.js";


export class FilterButton extends Component {

    constructor(props) {
        super(props);

        this.state= {
            showMenu: false
        }
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.onFilterClick = this.onFilterClick.bind(this);
    }

    toggleDropdown() {
        var toggle = this.state.showMenu;
        var dropdown = document.getElementById('filter-dropdown');

        //menu showing
        if (toggle) {
            dropdown.style.display = "none";
            this.setState({showMenu:false});
        }
        else {
            dropdown.style.display = "block";
            this.setState({showMenu:true});
        }
    }

    onFilterClick(event) {
        console.log(event.target.value);
        this.props.onFilterChange(event.target.value)

        this.toggleDropdown();
    }

    render() {
        return (
            <div>
                <div id="filter">
                    <button onClick={this.toggleDropdown} id="filter-button">Sort by</button>
                    <div id="filter-dropdown">
                        <button onClick={this.onFilterClick} value={filterTypes.PRICE_LOW}>Price (low to high)</button>
                        <button onClick={this.onFilterClick} value={filterTypes.ALPHA}>Alphabetical</button>
                    </div>
                </div>
            </div>
        );
    }
}