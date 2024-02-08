const express = require('express')
const admin = require('../middlewares/admin');
const Product = require('../models/product');

const adminRoute = express.Router()

adminRoute.post('/admin/add-product', admin, (req, res) => {

    try {
        const { name, description, quantity, images, category, price } = req.body;
        let product = new Product({
            name, description, quantity, images, category, price,
        })
        product = product.save();
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: e.message })
    }

})


module.exports = adminRoute