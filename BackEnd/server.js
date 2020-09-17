var express = require('express')
require('dotenv').config()

var brandController = require('./controllers/brandcontroller')
var modelController = require('./controllers/modelcontroller')
var specsController = require('./controllers/specscontroller')
var categoryController = require('./controllers/categorycontroller')

var authorize = require('./Middlewares/auth.js')
const bodyParser= require('body-parser')

const app = express()
var cors = require('cors')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.options('*', cors())
app.use(cors())

//Middlewear for verifying JWT
app.use(authorize.authorize)
app.use('/api/brands', brandController.router)
app.use('/api/models', modelController.router)
app.use('/api/specs', specsController.router)
app.use('/api/category', categoryController.router)

app.get('/', function(req, res) {
    res.send("<h1>Welcome to the CarPicker API</h1>");
})
app.get('*', function(req, res) {
    res.send("<h1>Welcome to the CarPicker API</h1>");
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

app.listen(process.env.PORT, function(err) {
    if (err) throw err
    console.log(`Express server listening on port ${process.env.PORT}, in ${env} mode`)
    console.log(`Backend: http://localhost:${process.env.PORT}/`)
})








module.exports = app