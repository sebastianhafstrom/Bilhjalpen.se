var express = require('express')
var db = require('./db.js')
const bodyParser= require('body-parser')
const port = process.env.PORT || 3000
const app = express()
var cors = require('cors')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.options('*', cors())
app.use(cors())


app.get('/', function(req, res) {
    res.render('pages/index.ejs')
})

// Get for list of all brands
app.get('/brands', function(req, res) {
    db.getAllBrands().then(results => {
        res.json({brands: results});
    })
})

// Get for individual brand
app.get('/brand/:name', function(req, res) {
    db.getAllModelsGiveBrand(req.params.name).then(results => {
        res.json( 
        {
            name: req.params.name, 
            models: results
        })
    })
})

// // Get for individual brand
app.get('/model/:name', function(req, res) {
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

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.message = 'Invalid route';
    error.status = 404;
    next(error);
});
app.use((error, req, res) => {
    res.status(error.status || 500);
    return res.json({
        error: {
        message: error.message,
        },
    });
});

var env = app.get('env')

app.listen(port, function(err) {
    if (err) throw err
    console.log(`Express server listening on port ${port}, in ${env} mode`)
    console.log(`Backend: http://localhost:${port}/`)
})








module.exports = app