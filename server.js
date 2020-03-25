const Hapi = require("@hapi/hapi");
const Mongoose = require("mongoose");
const Joi = require("joi");
const boom = require('@hapi/boom');
var corsHeaders = require('hapi-cors-headers');
const url = "mongodb+srv://ben:myxboxname1996@cluster0-wjntd.mongodb.net/store"
const Path = require('path');
const GameController = require("./src/controllers/games");
const AlbumController = require("./src/controllers/albums");
const ProductController = require("./src/controllers/products.js");
const MovieController = require("./src/controllers/movies");

Mongoose.connect(url , {useNewUrlParser: true, useUnifiedTopology: true});

const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


const server = new Hapi.server({
    port: process.env.PORT || 5000,
    routes:  {
        files: {
            relativeTo: Path.join(__dirname, 'build')
        }
    }

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
    path: "/api/games",
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

server.route({
    method: 'GET',
    path: "/movies/filter",
    handler: MovieController.filter
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

server.route({
    method: 'GET',
    path: '/products/filter',
    handler: ProductController.filter
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
            path: '/{any*}',
            handler: {
                directory: {
                    path: Path.join(__dirname, 'build'),
                    listing:false,
                    index:true
                }
            }
            
        })
        server.ext('onPreResponse', (req, h) => {
            console.log('in1');
            const { response } = req;
            if (response.isBoom && response.output.statusCode === 404) {
                console.log('in2');
              return h.file('index.html');
            }
            return h.continue;
          });
        await server.start();
        console.log('server started');
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

start(); 
app.listen(8080, () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
  });