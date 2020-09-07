var db = require('../db.js')
var express = require('express')
var router = express.Router()

// Get all electric cars
router.get('/electric', function(req, res) {
    db.getAllElectric().then(results => {
        res.json({models: results})
    })
})

// Get all environmental cars
router.get('/environmental', function(req, res) {
    db.getAllEnvironmental().then(results => {
        res.json({models: results})
    })
})


module.exports = {
    router: router
}