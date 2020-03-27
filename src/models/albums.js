const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const AlbumModel = new Schema({
    artist: String,
    id: Number,
    title: String,
    type: String,
    price: Number,
    genre: String,
    score: Number
});

module.exports = Mongoose.model("Album", AlbumModel,'albums');