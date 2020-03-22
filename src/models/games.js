const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const GameModel = new Schema({
    title: String,
    id: Number,
    developer:  String,
    genre: String,
    platform: [String],
    price: Number,
    type: String
});

module.exports = Mongoose.model("Game", GameModel,'games');