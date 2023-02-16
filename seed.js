const mongo = require('mongoose')
require('dotenv').config()
mongo.set('strictQuery', false)

mongo.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

const productSchema = new mongo.Schema({
    name: String,
    price: Number,
})

const product = mongo.model('Product', productSchema)

const seed = [
    { name: 'Apple', price: 1.99 },
    { name: 'Orange', price: 1.49 },
    { name: 'Banana', price: 0.99 },
    { name: 'Grapes', price: 2.99 },
    { name: 'Mango', price: 3.99 },
    { name: 'Pineapple', price: 4.99 },
]

product.insertMany(seed)
    .then((res) => {
        console.log('Query resolved')
        console.log(res)
    })
    .catch((err) => {
        console.log('Query rejected')
        console.log(err)
    })

// product.find({})
//     .then(res => console.log(res))
//     .catch(err => console.log(err))