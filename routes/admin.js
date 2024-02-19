const express = require('express')
const admin = require('../middlewares/admin');
const { Product } = require('../models/product');
const Order = require('../models/order');

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
        res.status(500).json({ error: error.message })
    }

})

adminRoute.get('/admin/get-product', admin, async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
adminRoute.post('/admin/delete-product', admin, async (req, res) => {
    const { id } = req.body
    try {
        await Product.findByIdAndDelete({ _id: id })

        res.json({ msg: 'Product Delete Successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
adminRoute.get('/admin/get-orders', admin, async (req, res) => {
    try {
        const orders = await Order.find({})
        res.json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
adminRoute.post('/admin/change-order-status', admin, async (req, res) => {
    const { id, status } = req.body
    try {
        let order = await Order.findById(id)
        order.status = status
        order = await order.save()
        res.json(order)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})



module.exports = adminRoute