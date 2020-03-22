var Album = require('../models/albums.js');
var Game = require('../models/games.js');
var Movie = require('../models/movies.js');


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
    console.log(query);
    var result = [];
    var games =  await Game.find().exec();
    var albums = await Album.find().exec();
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
    return {data:result};
}