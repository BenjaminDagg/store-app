var Game = require('../models/games.js');
const express = require('express');
const gameRouter  = express.Router();

module.exports = gameRouter;


// GET LIST OF ALL GAMES /games
gameRouter.get('/',  (req,res) => {
    var params = req.query;
    if (!params.name) {
        params.name = ""
    }
    if (!params.platform) {
        params.platform = "PC"
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
    console.log(params);
    return Game.find({
        $and:[
            {'title':{"$regex": params.name,"$options":"i"}},
            {'platform':params.platform},
            {'genre':{"$regex": params.genre,"$options":"i"}}
        ]
    }).exec().then((game) => {
        var result = [];

        //only get games in price range
        game.forEach((element) => {
            if (element.price >= params.priceMin && element.price <= params.priceHigh) {
                result.push(element);
            }
        })

        return res.json({data: result});
    })
})

//GET GAME  by ID   /games/:id
gameRouter.get('/:id', (req,res) => {
    var id = req.params.id;
    
    return Game.find({'id':id}).exec().then((game) => {
        if (game.length == 0) return res.json({error: 'Game Not Found'})
        return res.json({data: game});
    })
})



/*
// GET LIST OF ALL GAMES
exports.list = (req,h) => {

    
    

    return Game.find({}).exec().then((game) => {
        return {data: game};
    })
    .catch((err) => {
        return {error: err};
    });

}

//GET game by id
exports.get = (req,h) => {
    var id = parseInt(req.params.id);
    
    return Game.find({'id':id}).exec().then((game) => {
        if (game.length == 0) return {error: 'Game Not Found'}
        return {data: game};
    })
}

//GET list of games with filters
exports.filter = (req,h) => {
    var params = req.query;
    if (!params.name) {
        params.name = ""
    }
    if (!params.platform) {
        params.platform = "PC"
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
    console.log(params);
    return Game.find({
        $and:[
            {'title':{"$regex": params.name,"$options":"i"}},
            {'platform':params.platform},
            {'genre':{"$regex": params.genre,"$options":"i"}}
        ]
    }).exec().then((game) => {
        var res = [];

        //only get games in price range
        game.forEach((element) => {
            if (element.price >= params.priceMin && element.price <= params.priceHigh) {
                res.push(element);
            }
        })

        return {data: res};
    })

    
    
    
}
*/
