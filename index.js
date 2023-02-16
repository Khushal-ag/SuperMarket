const express = require("express"); // npm i express
const path = require("path"); // npm i path
require('dotenv').config() //npm i dotenv
const mongo = require('mongoose') //npm i mongooose
const methodOverride = require('method-override') //npm i method-override
const product = require('./models/Product')
const app = express();
app.set('view engine', 'ejs'); // npm i ejs
app.set('views', path.join(__dirname, '/views'));

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true })); // npm i body-parser

mongo.set('strictQuery', false)
mongo.connect(process.env.MONGO_URI)
    .then(() => app.listen(process.env.PORT, () => {
        console.log('Connected to MongDB & Server is listening on port', process.env.PORT);
    }))
    .catch(err => console.error('Could not connect to MongoDB...', err))

// app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('home');
})
app.get('/product', async (req, res) => {
    const productList = await product.find({})
    res.render('products/index.ejs', { productList });
});
app.post('/product', async (req, res) => {
    console.log(req.body);
    const newProduct = new product(req.body);
    await newProduct.save();
    await product.deleteMany({ name: '' })
    res.redirect('/product');
})
app.put('/product/:id', async (req, res) => {
    const { id } = req.params;
    const update = req.body
    // console.log(id)
    // console.log(update)
    const productUpdate = await product.findByIdAndUpdate(id, update, { runValidators: true, new: true })
    console.log(productUpdate)
    res.redirect(`/product/${id}`);
})
app.get('/product/new', (req, res) => {
    res.render('products/new.ejs');
})

app.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    const item = await product.findById(id)
    // console.log(item);
    res.render('products/product.ejs', { item });
})
app.delete('/product/:id', async (req, res) => {
    const { id } = req.params;
    // console.log(id,'delete')
    const deleteProduct = await product.findByIdAndDelete(id)
    console.log(deleteProduct)
    res.redirect('/product');
})

app.get('/product/:id/edit', async (req, res) => {
    console.log(req.params)
    const { id } = req.params;
    const item = await product.findById(id)
    console.log(item);
    res.render('products/edit.ejs', { item });
})