var Album = require('../models/albums.js');
var Game = require('../models/games.js');
var Movie = require('../models/movies.js');
const express = require('express');
const productRouter  = express.Router();

module.exports = productRouter;




productRouter.get('/', async (req,res) => {
    var params = req.query;
    console.log(params);
    if (!params.priceMin) {
        params.priceMin = -1000
    }
    else {
        params.priceMin = parseFloat(params.priceMin)
    }
    if (!params.priceHigh) {
        params.priceHigh = 1000
    }
    else {
        params.priceHigh = parseFloat(params.priceHigh);
    }
    console.log(params);
    
    var result = [];
    var games =  await Game.find().exec();
    var albums = await Album.find().exec();
    var  movies = await Movie.find().exec();

    if (params.query)  {

        var query = req.query.query;

        games.forEach((game) => {
            if (game.title.toLowerCase().includes(query) ||
                game.developer.toLowerCase().includes(query) ||
                query.toLowerCase().includes("game")) {
                    result.push(game);
                }
        })
        albums.forEach((album) => {
            if (album.artist.toLowerCase().includes(query) ||
                album.title.toLowerCase().includes(query) ||
                query.toLowerCase().includes("music") ||
                query.toLowerCase().includes("song") ||
                query.toLowerCase().includes("album")) {
                    result.push(album);
                }
        })
        movies.forEach((movie)  => {
            var wasAdded = false ;
            if (movie.title.toLowerCase().includes(query) ||
                movie.director.toLowerCase().includes(query)  ||
                query.toLowerCase().includes("movie")   ||
                movie.actors.includes(query))  {
                    result.push(movie);
                    wasAdded = true;
            }
            if (!wasAdded ){
                 var actors = movie.actors;
                 actors.forEach((actor)  => {
                     if (actor.toLowerCase().includes(query) && !wasAdded) {
                         result.push(movie);
                         wasAdded  = true;
                     }
                 })
            }
            
        })

        var products = [];

        //only get games in price range
        result.forEach((element) => {
            if (element.price >= params.priceMin && element.price <= params.priceHigh) {
                products.push(element);
            }
        })

        res.json({data:products});
    }
    
    var temp = games.concat(albums);
    var result = temp.concat(movies);
    
    var products = [];

    //only get games in price range
    result.forEach((element) => {
        if (element.price >= params.priceMin && element.price <= params.priceHigh) {
            products.push(element);
        }
    })

    res.json({data:products});
})



/*
// GET LIST OF ALL products
exports.list = async (req,h) => {

    var games = await Game.find().exec();
    var albums = await Album.find().exec();
    var movies = await Movie.find().exec();
    
    var temp = games.concat(albums);
    var res = temp.concat(movies);

    return {data: res};

}

exports.get = async (req,h) => {
    
    var query = req.query.query;
    var params = req.query;
    
    console.log(params);
    var result = [];
    var games =  await Game.find().exec();
    var albums = await Album.find().exec();
    var  movies = await Movie.find().exec();

    games.forEach((game) => {
        if (game.title.toLowerCase().includes(query) ||
            game.developer.toLowerCase().includes(query) ||
            query.toLowerCase().includes("game")) {
                result.push(game);
            }
    })
    albums.forEach((album) => {
        if (album.artist.toLowerCase().includes(query) ||
            album.title.toLowerCase().includes(query) ||
            query.toLowerCase().includes("music") ||
            query.toLowerCase().includes("song") ||
            query.toLowerCase().includes("album")) {
                result.push(album);
            }
    })
    movies.forEach((movie)  => {
        var wasAdded = false ;
        if (movie.title.toLowerCase().includes(query) ||
            movie.director.toLowerCase().includes(query)  ||
            query.toLowerCase().includes("movie")   ||
            movie.actors.includes(query))  {
                result.push(movie);
                wasAdded = true;
        }
        if (!wasAdded ){
             var actors = movie.actors;
             actors.forEach((actor)  => {
                 if (actor.toLowerCase().includes(query) && !wasAdded) {
                     result.push(movie);
                     wasAdded  = true;
                 }
             })
        }
        
    })
    
    

    return {data:result};
}


//GETS filtered list of products
exports.filter = async (req,h) => {
    
    var params = req.query;
    console.log(params);
    if (!params.priceMin) {
        params.priceMin = -1000
    }
    else {
        params.priceMin = parseFloat(params.priceMin)
    }
    if (!params.priceHigh) {
        params.priceHigh = 1000
    }
    else {
        params.priceHigh = parseFloat(params.priceHigh);
    }
    console.log(params);
    
    var result = [];
    var games =  await Game.find().exec();
    var albums = await Album.find().exec();
    var  movies = await Movie.find().exec();

    
    var temp = games.concat(albums);
    var res = temp.concat(movies);
    
    var products = [];

    //only get games in price range
    res.forEach((element) => {
        if (element.price >= params.priceMin && element.price <= params.priceHigh) {
            products.push(element);
        }
    })

    return {data:products};
}
*/