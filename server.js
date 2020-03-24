const Hapi = require("@hapi/hapi");
const Mongoose = require("mongoose");
const Joi = require("joi");
var corsHeaders = require('hapi-cors-headers');
const url = "mongodb+srv://ben:myxboxname1996@cluster0-wjntd.mongodb.net/store"
const Path = require('path');
const GameController = require("./src/controllers/games");
const AlbumController = require("./src/controllers/albums");
const ProductController = require("./src/controllers/products.js");
const MovieController = require("./src/controllers/movies");

Mongoose.connect(url , {useNewUrlParser: true, useUnifiedTopology: true});




const server = new Hapi.server({
    port:5000,
    host:'localhost',
    

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
        await server.register(require('@hapi/inert'));
        server.route({
            method: 'GET',
            path: '/{path*}',
            handler: {
                directory: {
                    path: Path.join(__dirname, './build'),
                    listing: false,
                    index: true
                }
            }
            
        })
        await server.start();
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

start(); 