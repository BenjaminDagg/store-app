const express = require('express');
const app  = express();
const Mongoose   = require('mongoose');
var cors = require('cors');
var path = require('path');

var http = require('http').Server(app);

//enable cors for dev
app.use(cors());

//const dbUrl =  "mongodb+srv://ben:myxboxname1996@cluster0-wjntd.mongodb.net/store"
const dbUrl =  "mongodb://ben:myxboxname1996@127.0.0.1:27017/store"
//connect to mongodb database
Mongoose.connect(dbUrl , {useNewUrlParser: true, useUnifiedTopology: true});
const db   = Mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

//lets  our routes accept JSON
app.use(express.json());

//controllers
const GameController  = require('./src/controllers/games.js');
const AlbumController  = require('./src/controllers/albums.js');
const MovieController  = require('./src/controllers/movies.js');
const ProductController  = require('./src/controllers/products.js');

//routes
app.use('/games',GameController);
app.use('/albums', AlbumController);
app.use('/movies', MovieController);
app.use('/products', ProductController);

//serve static index file for all routes
app.use( express.static( __dirname + `/build` ) );
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '/build/index.html'));
}); 

http.listen(process.env.PORT || 3000  , () => console.log('Server started'));