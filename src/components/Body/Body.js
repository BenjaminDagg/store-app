import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from "../Header/Header.js";
import {Home} from "../Home/Home.js";
import { ProductDetails } from "../ProductDetails/ProductDetails.js";
import { ResultList } from "../ResultList/ResultList.js";
// eslint-disable-next-line
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

export class Body extends Component {
    render() {
        return (
            <div id="body">
                
                <Router>
                    <Header/>
                

                
                    <div>
                        <Route exact={true} path={"/"} render={() => <Home/>} />
                        <Route exact={true} path={"/products"} render={(props) => <ResultList {...props} />} />
                        <Route  path={"/products/:category"} render={(props) => <ResultList {...props} />} />
                        <Route  path={"/product/:category/:id"} render={(props) => <ProductDetails {...props} />} />
                    </div>
                </Router>
            </div>
        );
    }
}