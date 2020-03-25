import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import axios from 'axios';
import {Catalog} from "../catalog/Catalog.js";
import {FilterButton} from "../FilterButton/FilterButton.js";
import {filterTypes} from "../../models/FilterTypes.js";
import {SideBar} from "../SideBar/SideBar.js";

export class ResultList extends Component {

    constructor(props) {
        super(props);

        this.state= {
            prodCategory: this.props.match.params.category,
            products: [],
            filter : filterTypes.ALPHA
        }
        this.filterChanged = this.filterChanged.bind(this);
        this.sortProducts = this.sortProducts.bind(this);
        this.getItems = this.getItems.bind(this);
    }

    componentDidMount() {

        //parse the query to call api
        var url = window.location.href;
        //removes hostname from url // eslint-disable-next-line
        // eslint-disable-next-line
        url = "/" + url.replace (/^[a-z]{4,5}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1');
        //removes '/products' from url
        url = url.substring(9,url.length);
        //get category from url
        var category = this.props.match.params.category;
        console.log("category  = " + category);
        if (category === "music") {
            url = "/albums" + url.substring(6,url.length);
        }
        var query = "/" + category;

        if (category === "search") {
            var searchQuery = new URLSearchParams(this.props.location.search);
            var search = searchQuery.get('query');
            url = "/products/search?query=" + search;
            console.log('query = ' + query);
        }
        if (category === undefined) {
            url = "/products";
            category = "all";
        }
        if (category === 'filter') {
            url = "/products" + url;
            category = "all";
        }
        console.log('url = ' + url);
        this.setState({category: category});
        this.getItems(url);
    }

    getItems(query) {
        console.log('query in func =  ' + query);
        var baseURLDev = 'http://localhost:5000/api'  ;
        var baseURL = 'https://store-app-dagg.herokuapp.com/api/games'
        axios.get(baseURL)
        .then(res => {
            console.log(res);
            
            this.setState({products:res.data.data},() => {
                this.sortProducts();
            });
        })
    }

    filterChanged(newFilter) {
        console.log('new_filter = ' + newFilter);
        this.setState({filter:newFilter},() => {
            this.sortProducts();
        });
    }

    sortProducts() {
        var products = this.state.products;
        var filter = this.state.filter;
        var sortedProducts = [];
        switch(filter) {
            case filterTypes.PRICE_LOW:
                sortedProducts = products.sort(function(a,b) {
                    if (a.price < b.price) {
                        return -1;
                    }
                    if (b.price < a.price) {
                        return 1;
                    }
                    return 0;
                });
                break;
            default:
                sortedProducts = products.sort(function(a,b) {
                    if (a.title < b.title) {
                        return -1;
                    }
                    if (b.title < a.title) {
                        return 1;
                    }
                    return 0;
                })
        }
        this.setState({products: sortedProducts});
    }

    render() {
        return (
            <div>
                <h1>Result list</h1>
                
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-2">
                            <SideBar category={this.state.category}/>
                        </div>
                        <div className="col-12 col-md-10">
                            {this.state.products.length > 0 &&
                                <FilterButton filter={this.state.filter} onFilterChange={this.filterChanged}/>
                            }
                            {this.state.products.length > 0 &&
                                <Catalog filter={this.state.filter} onFilterChange={this.filterChanged} products={this.state.products} />
                            }
                        </div>
                    </div>
                </div>
                
                
            </div>
        );
    }
}