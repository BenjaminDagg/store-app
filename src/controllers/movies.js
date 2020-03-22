var Movie = require('../models/movies.js');

// GET LIST OF ALL GAMES
exports.list = (req,h) => {

    return Movie.find({}).exec().then((movie) => {
        return {data: movie};
    })
    .catch((err) => {
        return {error: err};
    });

}

//GET game by id
exports.get = (req,h) => {
    var id = parseInt(req.params.id);
    
    return Movie.find({'id':id}).exec().then((movie) => {
        if (movie.length == 0) return {error: 'Game Not Found'}
        return {data: movie};
    })
}