var Movie = require('../models/movies.js');
const express = require('express');
const movieRouter  = express.Router();

module.exports = movieRouter;



movieRouter.get('/', (req,res) => {
    
    
    var params = req.query;
    if (!params.name) {
        params.name = ""
    }
    if (!params.genre) {
        params.genre = ""
    }
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
    if (!params.score) {
        params.score = 1;
    }
    else {
        params.score = parseFloat(params.score);
    }
    if (!params.rating) {
        params.rating  = ""
    }
    if (!params.genre)  {
        params.genre = "";
    }
    console.log(params);
    return Movie.find({
        $and:[
            {'title':{"$regex": params.name,"$options":"i"}},
            {'rating':{"$regex": params. rating,"$options":"i"}},
            {'genre':{"$regex": params.genre,"$options":"i"}},
            {'score':{"$gte": params.score}}
        ]
    }).exec().then((movie) => {
        var result = [];

        //only get games in price range
        movie.forEach((element) => {
            if (element.price >= params.priceMin && element.price <= params.priceHigh &&  element.score >= params.score) {
                result.push(element);
            }
        })

        return res.json({data: result});
    })
})

movieRouter.get('/:id', (req,res) => {
    var id = req.params.id;
    
    return Movie.find({'id':id}).exec().then((movie) => {
        if (movie.length == 0) return res.json({error: 'Movie Not Found'})
        return res.json({data: movie});
    })
})

/*
// GET LIST OF ALL GAMES
exports.list = (req,h) => {

    return Movie.find({}).exec().then((movie) => {
        return {data: movie};
    })
    .catch((err) => {
        return {error: err};
    });

}

//GET movie by id
exports.get = (req,h) => {
    var id = parseInt(req.params.id);
    
    return Movie.find({'id':id}).exec().then((movie) => {
        if (movie.length == 0) return {error: 'Game Not Found'}
        return {data: movie};
    })
}

//GET list of movies with filters
exports.filter = (req,h) => {
    var params = req.query;
    if (!params.name) {
        params.name = ""
    }
    if (!params.genre) {
        params.genre = ""
    }
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
    if (!params.score) {
        params.score = 1;
    }
    else {
        params.score = parseFloat(params.score);
    }
    if (!params.rating) {
        params.rating  = ""
    }
    if (!params.genre)  {
        params.genre = "";
    }
    console.log(params);
    return Movie.find({
        $and:[
            {'title':{"$regex": params.name,"$options":"i"}},
            {'rating':{"$regex": params. rating,"$options":"i"}},
            {'genre':{"$regex": params.genre,"$options":"i"}}
        ]
    }).exec().then((movie) => {
        var res = [];

        //only get games in price range
        movie.forEach((element) => {
            if (element.price >= params.priceMin && element.price <= params.priceHigh &&  element.score >= params.score) {
                res.push(element);
            }
        })

        return {data: res};
    })

    
    
    
}*/