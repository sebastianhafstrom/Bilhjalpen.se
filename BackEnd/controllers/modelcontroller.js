var db = require('../db.js')
var express = require('express')
var router = express.Router()

// // Get for individual brand
router.get('/:name', function(req, res) {
    db.getModelAndSpecs(req.params.name).then(results => {
        res.json(
        {
            name: req.params.name,
            categories: [
                'Märke',
                'Modell',
                'Variant',
                'Motortyp', 
                'Antal cylindrar', 
                'Effekt (kW)', 
                'Effekt (hp)', 
                'Varvtal (Effekt)', 
                'Vridmoment', 
                'Varvtal (Vridmoment)', 
                'Utsläppsstandard', 
                'Drivning', 
                'Typ av växelläda', 
                'Antal växlar', 
                'Topphastighet (km/h)', 
                'Acceleration 0-100 km/h', 
                'Drivmedel', 
                'Oktan', 
                'Bränsleåtgång (urban)', 
                'Bränsleåtgång (Extra urban)', 
                'Bränsleåtgång (combined)', 
                'CO2 Utsläpp (g/km)', 
                'Vikt', 
                'Max vikt', 
                'Antal dörrar', 
                'Antal säten', 
                'Längd, mm', 
                'Bredd (utan speglar, mm)', 
                'Bredd (med speglar, mm)', 
                'Höjd (mm)', 
                "Bagagevolym"],
            specs: results
        })
    })
})

module.exports = {
    router: router
}