import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./SideBar.css";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

const platforms = {
    PC: 'PC',
    XBOX: 'xbox',
    PS: 'playstation'
};

export class SideBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            platform: platforms.PC
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onPlatformChange = this.onPlatformChange.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
    }

    componentDidMount() {
        var platform = localStorage.getItem("platform");
        console.log('in sidebar platform =  ' + platform);
        
        this.setState({platform:platform});
    }

    onSubmit() {

        //save form data before going to new url
        localStorage.setItem("platform", this.state.platform);


        var url = window.location.href + "/filter";
        window.location.href = url;
    }

    onPlatformChange(event) {
        var platform = event.target.value
        
        this.setState({platform:platform});
    }

    resetFilters() {
        var url = "";

        
    }

    render() {
        return (
            <div>
                <h1>sidebar</h1>
                
                <form action={window.location.href}>
                    {this.props.category === 'games' &&
                        <div>
                            <div>
                                <h6>Platform</h6>
                                <label for="xbox">Xbox</label>
                                <input type="radio" checked={this.state.platform === platforms.XBOX} onChange={this.onPlatformChange} name="platform" id="xbox" value={platforms.XBOX}></input>
                                <label for="pc">PC</label>
                                <input type="radio" checked={this.state.platform === platforms.PC} onChange={this.onPlatformChange} name="platform" id="pc" value={platforms.PC}/>
                                <label for="ps">Playstation</label>
                                <input type="radio" checked={this.state.platform === platforms.PS} onChange={this.onPlatformChange} name="platform" id="ps" value={platforms.PS}/>
                            </div>
                            <div>
                                <h6>Genre</h6>
                                <label for="rpg">RPG</label>
                                <input type="radio" name="genre" id="rpg" value="rpg"></input>
                                <label for="shooter">Shooter</label>
                                <input type="radio" name="genre" id="shooter" value="shooter"/>
                            </div>
                        </div>
                    }
                    {this.props.category === 'music' &&
                        <div>
                            <div>
                            <h6>Genre</h6>
                                <label for="classic">Classic</label>
                                <input type="radio" name="genre" id="classic" value="classic"></input>
                                <label for="rock">Rock</label>
                                <input type="radio" name="genre" id="rock" value="rock"/>
                                <label for="rock">Alternative</label>
                                <input type="radio" name="genre" id="alternative" value="alternative"/>
                            </div>
                        </div>
                    }
                    {(this.props.category === 'all'  ||  this.props.category === 'search')  &&
                        <div>
                            <div>
                                <h6>Products</h6>
                                <a href="/products/games">Games</a><br/>
                                <a href="/products/music">Music</a><br/>
                                <a href="/products/movies">Movies</a>
                            </div>
                            
                        </div>
                    }
                    {this.props.category  === 'movies' &&
                        
                        <div>
                            <div id="score-input-div">
                                <h6>Score</h6>
                                <span  className="score-input">⭐⭐⭐⭐⭐</span><input  className="score-input"  type="radio" id="5" name="score" value="5"/><br/>
                                <span  className="score-input">⭐⭐⭐⭐</span><input className="score-input" type="radio" id="4" name="score" value="4"/><br/>
                                <span className="score-input">⭐⭐⭐</span><input className="score-input" type="radio" id="3" name="score" value="3"/><br/>
                                <span className="score-input">⭐⭐</span><input className="score-input" type="radio" id="2" name="score" value="2"/><br/>
                                <span className="score-input">⭐</span><input className="score-input" type="radio" id="1" name="score" value="1"/>
                            </div>
                            <div>
                                <h6>Rating</h6>
                                <label for="ratingR">R</label>
                                <input type="radio" name="rating" id="ratingR" value="R"></input>
                                <label for="ratingPG13" >PG 13</label>
                                <input type="radio" name="rating"  id="ratingPG13" value="PG13"></input>
                            </div>
                        </div>

                    }
                    
                    <div>
                        <h6>Price</h6>
                        <input className="price-input" type="text" name="priceMin" id="priceMin" placeholder="min."></input>
                        to
                        <input className="price-input" type="text" name="priceHigh" id="priceHigh" placeholder="max."></input>
                    </div>
                    <input type="submit"/><a href={this.props.category === "all" ? "/products" : "/products/" + this.props.category}>Reset</a>
                </form>
                
            </div>
        );
    }
}