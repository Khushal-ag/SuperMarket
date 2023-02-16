const mongo = require('mongoose')

const productSchema = new mongo.Schema({
    name: String,
    price: Number,
})

const Product = mongo.model('Product', productSchema)

module.exports = Product