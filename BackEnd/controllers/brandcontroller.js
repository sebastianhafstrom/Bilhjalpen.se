var db = require('../db.js')
var express = require('express')
var router = express.Router()

// Get for list of all brands
router.get('/', function(req, res) {
    db.getAllBrands().then(results => {
        res.json({brands: results});
    })
})

//Get data on a specific brand
router.get('/:brand', function(req, res) {
    console.log(req.params.brand)
    db.getBrand(req.params.brand).then(results => {
        res.send(results)
    })
})

// Get models for individual brand
router.get('/:name', function(req, res) {
    db.getAllModelsGivenBrand(req.params.name).then(results => {
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