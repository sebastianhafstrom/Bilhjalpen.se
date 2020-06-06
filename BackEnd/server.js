var express = require('express')
var brandController = require('./controllers/brandcontroller')
var modelController = require('./controllers/modelcontroller')

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

app.use('/api/brands', brandController.router)
app.use('/api/models', modelController.router)


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