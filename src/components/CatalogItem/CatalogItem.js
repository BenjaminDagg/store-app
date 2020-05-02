import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



export class CatalogItem extends Component {

    constructor(props) {
        super(props);

        this.createRating = this.createRating.bind(this);
       
    }


    createRating(){
        var container = document.getElementById(this.props.item.id);
        if (!this.props.item   || container ==  null)  {
            
            return;
        }
        console.log('in create rating the title is' + this.props.item.score);
        var container = document.getElementById(this.props.item.id);
        var rating = this.props.item.score;
        console.log('container is ' + container);
        var text = "";
        for(var i = 1; i <= rating;i++) {   
            
            text += "&#11088";
            
        }
        container.innerHTML = text;
        
    }

    

    render() {
        
        
        this.createRating();

        return (
            <div className="catalog-item">
                <h4>{this.props.item.title}</h4>
                <div className="item-description">
                    <span><strong>Price:</strong> ${this.props.item.price}  USD</span><br/>
                    <span id={this.props.item.id} ><strong>Rating:</strong></span>
                </div>
                {this.props.item.type === "game" &&

                    <div className="item-platforms">
                        <span><strong>Platforms:</strong></span>
                        {this.props.item.platform.map((element ) => {
                            return <span>{element} , </span>
                        })}
                    </div>
                }
                {this.props.item.type === "movie" &&

                    <div> 
                        <span><strong>Director: </strong>{this.props.item.director}</span>
                        <div className="item-actors">
                            <span><strong>Actors: </strong></span>
                            {this.props.item.actors.map((element ) => {
                                return <span>{element} , </span>
                            })}
                        </div>
                    </div>

                }
            </div>
        );
    }
}