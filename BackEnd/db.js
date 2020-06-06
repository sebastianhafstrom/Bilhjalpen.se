const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://carPickerAdmin:TtkD%23WIfQO4Qn6@cluster0-8vwav.azure.mongodb.net/test?retryWrites=true&w=majority";

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

function getAllBrands() {
    let doc = brands.find().sort({name: 1}).toArray().catch(error => console.error(error))
    // console.log(results)
    return doc
}

function getAllModels() {
    let doc = models.find().toArray().catch(error => console.error(error))
    return doc
}

function getAllModelsGiveBrand(brandName) {
    let query = {brand: brandName}
    let doc = models.find(query).sort({name: 1}).toArray().catch(error => console.error(error))
    return doc
}

function getModelAndSpecs(name) {
    let query = {model: name}
    let doc = specs.find(query).sort({variant: 1}).toArray().catch(error => console.error(error))
    return doc
}

module.exports = {
    getAllBrands: getAllBrands,
    getAllModelsGiveBrand: getAllModelsGiveBrand,
    getModelAndSpecs: getModelAndSpecs,
    getAllModels: getAllModels
}
