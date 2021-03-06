const express = require('express');
const app  = express();
const Mongoose   = require('mongoose');
var cors = require('cors');
var path = require('path');

var http = require('http').Server(app);

//FOR DEPLOY USE mongodb+srv://ben:myxboxname1996@cluster0-wjntd.mongodb.net/store


//enable cors for dev
app.use(cors());
//mongodb+srv://ben:myxboxname1996@cluster0-wjntd.mongodb.net/store?retryWrites=true&w=majority
const dbUrl =  "mongodb+srv://ben:myxboxname1996@cluster0-wjntd.mongodb.net/store"
//Mongoose.connect(dbUrl , {useNewUrlParser: true, useUnifiedTopology: true});
//connect to mongodb database
Mongoose.connect(process.env.DB_URL , {useNewUrlParser: true, useUnifiedTopology: true});
//Mongoose.connect(dbUrl , {useNewUrlParser: true, useUnifiedTopology: true});
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