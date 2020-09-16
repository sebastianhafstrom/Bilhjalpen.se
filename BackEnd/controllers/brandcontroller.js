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
        if(results != null){
            res.status(200).send(results)
        }
        else{
            res.status(404).end()
        }
    })
})

// Get models for individual brand
router.get('/:brand/models', function(req, res) {
    db.getAllModelsGivenBrand(req.params.brand).then(results => {
        console.log('Hi: ',results)
        if(results != null){
            res.status(200).send(results)
        }
        else{
            res.status(404).end()
        }
        
    })
})

module.exports = {
    router: router
}