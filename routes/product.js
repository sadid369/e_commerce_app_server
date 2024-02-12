const express = require('express')
const Product = require('../models/product');
const auth = require('../middlewares/auth');

const productRouter = express.Router()


productRouter.get('/api/products', auth, async (req, res) => {
    try {
        console.log(req.query.category);
        const products = await Product.find({ category: req.query.category });
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: e.message })
    }
})

productRouter.get('/api/products/search/:name', auth, async (req, res) => {
    try {

        const products = await Product.find({ name: { $regex: req.params.name, $options: "i" } });
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: e.message })
    }
})

module.exports = productRouter;