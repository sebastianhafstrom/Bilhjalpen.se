var db = require('../db.js')
var express = require('express')
var router = express.Router()

// Get all models
router.get('/', function(req, res) {
    db.getAllModels().then(results => {
        res.json({models: results})
    })
})

// Get data of one model
router.get('/:model', function(req, res) {
    db.getModel(req.params.model).then(results => {
        res.send(results)
    })
})

module.exports = {
    router: router
}