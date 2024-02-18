const express = require('express')
const { Product } = require('../models/product');
const auth = require('../middlewares/auth');
const User = require('../models/user');
const Order = require('../models/order');

const userRoute = express.Router()
// api add to cart
userRoute.post('/api/add-to-cart', auth, async (req, res) => {
    const { id } = req.body;
    console.log(id);
    try {
        let product = await Product.findById(id)
        let user = await User.findById(req.userId)
        console.log(product);
        console.log(user);
        if (user.cart.length == 0) {
            user.cart.push({ product, quantity: 1 })
        } else {
            let isProductFound = false;
            for (let i = 0; i < user.cart.length; i++) {
                if (user.cart[i].product._id.equals(product._id)) {
                    isProductFound = true
                }

            }

            console.log(isProductFound);
            if (isProductFound) {
                let producttt = user.cart.find((productt) => productt.product._id.equals(product._id))
                console.log(producttt);
                producttt.quantity += 1;

            } else {
                user.cart.push({ product, quantity: 1 })
            }
        }
        user = await user.save()
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: `here ${error.message}` })
    }

})
userRoute.delete('/api/remove-from-cart/:id', auth, async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        let product = await Product.findById(id)
        let user = await User.findById(req.userId)
        console.log(product);
        console.log(user);


        for (let i = 0; i < user.cart.length; i++) {
            if (user.cart[i].product._id.equals(product._id)) {
                if (user.cart[i].quantity == 1) {
                    user.cart.splice(i, 1);
                } else {
                    user.cart[i].quantity -= 1;
                }

            }
        }
        user = await user.save()
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

userRoute.post('/api/save-user-address', auth, async (req, res) => {
    const { address } = req.body
    try {
        let user = await User.findById(req.userId)
        user.address = address;
        user = await user.save();
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})
userRoute.post('/api/order', auth, async (req, res) => {
    const { cart, totalPrice, address } = req.body
    try {
        let products = []
        for (let i = 0; i < cart.length; i++) {
            let product = await Product.findById(cart[i].product._id)
            if (product.quantity >= cart[i].quantity) {
                product.quantity -= cart[i].quantity
                products.push({ product, quantity: cart[i].quantity })
                await product.save()
            } else {
                return res.status(400).json({ msg: `${product.name} is out of stock` })
            }


        }
        let user = await User.findById(req.userId)
        user.cart = [];
        user = await user.save();
        console.log(`${totalPrice}, ${address}, ${req.userId}`);
        let order = new Order({
            products,
            totalPrice,
            address,
            userId: req.userId,
            orderedAt: new Date().getTime(),

        })
        order = await order.save()
        res.json(order)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})
userRoute.get('/api/orders/me', auth, async (req, res) => {
    try {
        let orders = await Order.find({ userId: req.userId })
        res.json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})


module.exports = userRoute