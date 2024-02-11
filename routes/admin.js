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

adminRoute.get('/admin/get-product', admin, async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: e.message })
    }
})
adminRoute.post('/admin/delete-product', admin, async (req, res) => {
    const { id } = req.body
    try {
        await Product.findByIdAndDelete({ _id: id })

        res.json({ msg: 'Product Delete Successfully' })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})




module.exports = adminRoute