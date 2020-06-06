var db = require('../db.js')
var express = require('express')
var router = express.Router()

// Get for list of all brands
router.get('/', function(req, res) {
    db.getAllBrands().then(results => {
        res.json({brands: results});
    })
})

// Get for individual brand
router.get('/:name', function(req, res) {
    db.getAllModelsGiveBrand(req.params.name).then(results => {
        res.json( 
        {
            name: req.params.name, 
            models: results
        })
    })
})

module.exports = {
    router: router
}