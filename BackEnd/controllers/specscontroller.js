var db = require('../db.js')
var express = require('express')
var router = express.Router()

// Get specs for individual brand
router.get('/', function(req, res) {
    db.getAllModelsWithSpecs().then(results => {
        res.send(results)
    })
})

// Get specs for a specified model
router.get('/:model', function(req, res) {
    db.getModelWithSpecs(req.params.model).then(results => {
        res.send(results)
    })
})

module.exports = {
    router: router
}