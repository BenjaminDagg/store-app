var Album = require('../models/albums.js');

// GET LIST OF ALL albums
exports.list = (req,h) => {
    return Album.find({}).exec().then((album) => {
        return { data: album};
    
    })
    .catch((err) => {
        return {error: err};
    });

}

//GET album by id
//GET game by id
exports.get = (req,h) => {
    var id = parseInt(req.params.id);
    
    return Album.find({'id':id}).exec().then((album) => {
        if (album.length == 0) return {error: 'Album Not Found'}
        return {data: album};
    })
}


//GET albums with query parameters
//GET list of games with filters
exports.filter = (req,h) => {
    var params = req.query;
    if (!params.name) {
        params.name = ""
    }
    if (!params.genre) {
        params.genre = ""
    }
    if (!params.artist) {
        params.artist = ""
    }
    if (!params.priceMin) {
        params.priceMin = -1000
    }
    else {
        params.priceMin = parseFloat(params.priceMin)
    }
    if (!params.priceHigh) {
        params.priceHigh = 1000
    }
    else {
        params.priceHigh = parseFloat(params.priceHigh);
    }
    return Album.find({
        $and:[
            {'title':{"$regex": params.name,"$options":"i"}},
            {'artist':{"$regex": params.artist,"$options":"i"}},
            {'genre':{"$regex": params.genre,"$options":"i"}}
        ]
    }).exec().then((album) => {
        var res = [];

        //only get games in price range
        album.forEach((element) => {
            if (element.price >= params.priceMin && element.price <= params.priceHigh) {
                res.push(element);
            }
        })
        return {data: res};
    })

    
    
    
}