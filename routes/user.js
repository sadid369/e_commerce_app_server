const express = require('express')
const { Product } = require('../models/product');
const auth = require('../middlewares/auth');
const User = require('../models/user');

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





module.exports = userRoute