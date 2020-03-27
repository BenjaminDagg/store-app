import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export class ProductDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            product: null
        };

        this.getProductInfo = this.getProductInfo.bind(this);
    }

    componentDidMount() {
        var category = this.props.match.params.category;
        var prodID = this.props.match.params.id;

        if (category === "game") {
            category = "games";
        }
        else if (category === "movie") {
            category = "movies"
        }
        else {
            category = "albums"
        }

        var query = "/" + category + "/" + prodID;
        this.getProductInfo(query);
    }

    getProductInfo(query) {
        var devURL   = '';
        var prodURL = "https://store-app-dagg.herokuapp.com"
        axios.get(prodURL + query)
        .then(res => {
            
            var product = res.data.data[0];
            console.log(product);
            this.setState({product:product});
        })
    }

    render() {
        return (
            <div>
                {this.state.product &&

                    <h1>{this.state.product.title}</h1>
                }
            </div>
        );
    }
}