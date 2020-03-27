import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Catalog.css";
import {filterTypes} from "../../models/FilterTypes.js";
import {CatalogItem} from "../CatalogItem/CatalogItem.js";
// eslint-disable-next-line
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

export class Catalog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filter:this.props.filter
        }
        this.sort = this.sort.bind(this);
        this.createList = this.createList.bind(this);
    }


    sort() {
        
        if (this.props.filter === filterTypes.ALPHA) {
            this.props.onFilterChange(filterTypes.PRICE)
        }
        else {
            this.props.onFilterChange(filterTypes.ALPHA)
        }
        
    }

    createList() {
        
        if (!this.props.products) {
            return []
        }
        var propItems = this.props.products;

        if (this.state.filter) {
            propItems.sort(function(a,b) {
                return a.price > b.price
            })
        }

        /*
        var list = propItems.map((item) => {
            return <div class="col-12 col-md-3">
                <Link style={{ 'textDecoration': 'none','color':'black' }} to={"/product/" + item.type + "/" +  item.id}>
                <div className="catalog-item">
                    <span>{item.title}</span><br/>
                    <span>{item.price}</span>
                </div>
                </Link>
            </div>
        })
        */
       var list = propItems.map((item) => {
        return <div class="col-12 col-md-3">
            
            <Link style={{ 'textDecoration': 'none','color':'black' }} to={"/product/" + item.type + "/" +  item.id}>
                <CatalogItem item={item} />
            </Link>
        </div>
        })

        return list;
    }

    render() {
        
        var list = this.createList();

        return (
            <div className="container">
                 <div className="row">
                     {list}
                 </div>
                
            </div>
        );
    }
}