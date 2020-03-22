const Hapi = require("hapi");
const Mongoose = require("mongoose");
const Joi = require("joi");
var corsHeaders = require('hapi-cors-headers');
const url = "mongodb+srv://ben:myxboxname1996@cluster0-wjntd.mongodb.net/store"

const GameController = require("./controllers/games");
const AlbumController = require("./controllers/albums");
const ProductController = require("./controllers/products.js");
const MovieController = require("./controllers/movies");

Mongoose.connect(url , {useNewUrlParser: true, useUnifiedTopology: true});


const GameModel = Mongoose.model("games", {
    title: String
});

const MusicModel = Mongoose.model("albums", {
    artist: String
});


const server = new Hapi.server({
    port:5000,
    host:'localhost',
    routes: { cors: true }
    
});

/*  ============== GAMES =========================*/
// GET list of all games
server.route({
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    method: "GET",
    path: "/games",
    handler: GameController.list
});

//GET game by id
server.route({
    method: 'GET',
    path: "/games/{id}",
    handler: GameController.get
})

//GET filtered list of games
server.route({
    method: 'GET',
    path: "/games/filter",
    handler: GameController.filter
})

/*  ============== ALBUMS =========================*/
//GET all albums
server.route({
    method: 'GET',
    path: "/albums",
    handler: AlbumController.list
})

//GET album by id
server.route({
    method: 'GET',
    path: '/albums/{id}',
    handler: AlbumController.get
})

//GET  albums with query params
server.route({
    method: 'GET',
    path: "/albums/filter",
    handler: AlbumController.filter
})


/*  ============== MOVIES =========================*/
//GET list of all movies
server.route({
    method: 'GET',
    path: '/movies',
    handler: MovieController.list
})

//GET movie by id
server.route({
    method: 'GET',
    path: "/movies/{id}",
    handler: MovieController.get
})


/*  ============== PRODUCTS =========================*/
server.route({
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    method: "GET",
    path: "/products/search",
    handler: ProductController.get
});

server.route({
    method: 'GET',
    path: '/products',
    handler: ProductController.list
})


const start = async function() {
    try {
        await server.register({
            plugin: require('hapi-cors'),
            options: {
                origins: ['*']
            }
        })
 
        await server.start();
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

start();