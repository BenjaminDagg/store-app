import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css";


export class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productDropdownToggle: false,
            searchText: ""
        };
        this.searchChanged = this.searchChanged.bind(this);
        this.toggleDropdownProduct = this.toggleDropdownProduct.bind(this);
    }

    toggleDropdownProduct() {
        console.log('in');
        var toggle = this.state.productDropdownToggle;
        console.log(toggle);
        toggle = !toggle;
        console.log(toggle);
        this.setState({productDropdownToggle:toggle});
    }

    searchChanged(event) {
        var value = event.target.value;
        console.log('search value = ' + value);
        this.setState({searchText:value});
    }

    render() {

        

        return (
            <div id="header" className="container">
                <div className="row">
                <div id="header-container" className="col-12">
                    <div className="header-item">
                        <h1>Store</h1>
                    </div>
                    <div className="header-item">
                        <input onChange={this.searchChanged} value={this.state.searchText} /><a href={"/products/search?query=" + this.state.searchText}><button>Search</button></a>
                    </div>
                    <div className="header-item">
                    <div class="dropdown">
                        <button  onClick={this.toggleDropdownProduct} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Products
                        </button>
                        {this.state.productDropdownToggle  &&
                            <div id="product-dropdown" >
                            <a href="/products" class="dropdown-item" to="/products/all">All Products</a>
                            <a href="/products/games" class="dropdown-item" to="/products/games">Games</a>
                            <a class="dropdown-item" href="/products/movies">Movies</a>
                            <a href="/products/music" class="dropdown-item" to="/products/music">Music</a>
                        </div>
                        }
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}