const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const uri = "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@cluster0-8vwav.azure.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var brands
var models
var specs

client.connect(err => {
    if (err) return console.log(err)
    console.log('Connected to Database')

    const db = client.db('car-picker-database')
    brands = db.collection('brands')
    models = db.collection('models')
    specs = db.collection('specs')
})

// Brandcontroller
function getAllBrands() {
    let doc = brands.find().sort({name: 1}).toArray().catch(error => console.error(error))
    return doc
}

function getBrand(brand) {
    let query = {name: brand}
    let doc = brands.findOne(query, {projection: { _id: 0}}).catch(error => console.log(error))
    return doc
}

function getAllModelsGivenBrand(brandName) {
    let query = {brand: brandName}
    let doc = models.find(query, {projection: { _id: 0}}).sort({name: 1}).toArray().catch(error => console.error(error))
    return doc
}

// Modelcontroller
function getAllModels() {
    let doc = models.find().sort({name: 1}).toArray().catch(error => console.error(error))
    return doc
}

function getModel(modelName) {
    let query = {name: modelName}
    let doc = models.findOne(query, {projection: { _id: 0}}).catch(error => {console.error(error)})
    return doc
}

//Specscontroller
function getAllModelsWithSpecs(){
    let doc = specs.find({}, {projection: { _id: 0}}).sort({name: 1}).toArray().catch(error => console.error(error))
    return doc
}

function getModelWithSpecs(modelName) {
    let query = {model: modelName}
    let doc = specs.findOne(query, {projection: { _id: 0}}).catch(error => console.error(error))
    return doc
}

function getModelWithSpecsFromBrand(brandName) {
    let query = {brand: brandName}
    let doc = specs.find(query, {projection: { _id: 0}}).sort({name: 1}).toArray().catch(error => console.error(error))
    return doc
}

//CategoryController
function getAllElectric() {
    let query = {fuel_type: "El"}
    let doc = specs.find(query, {projection: { _id: 0}}).sort({name: 1}).toArray().catch(error => console.error(error))
    console.log(doc)
    return doc
}

//Get all environmental cars: Electric or < 70g CO2 per km
function getAllEnvironmental() {
    let query = {$or:[{fuel_type: "Naturgas"},{co2_emissions_combined: {$lt: 70}}]}
    let doc = specs.find(query, {projection: { _id: 0}}).sort({name: 1}).toArray().catch(error => console.error(error))
    console.log(doc)
    return doc
}

module.exports = {
    getAllBrands,
    getAllModels,
    getAllModelsGivenBrand,
    getModel,
    getAllModelsWithSpecs,
    getModelWithSpecs,
    getAllElectric,
    getAllEnvironmental,
    getBrand,
    getModelWithSpecsFromBrand
}
