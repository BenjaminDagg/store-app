const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const MovieModel = new Schema({
    title: String,
    director: String,
    actors: [String],
    score: Number,
    rating: String,
    type: String,
    id: Number,
    genre: String,
    price: Number
});

module.exports = Mongoose.model("Movie", MovieModel,'movies');