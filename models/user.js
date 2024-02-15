const mongoose = require('mongoose');
const { productSchema } = require('./product');

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: (value) => {
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re)
            },
            message: 'Please Enter a Valid Email Address'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {

                return value.length >= 6;
            },
            message: 'Please Enter a Valid Password that is gater or equal to  6 Character'
        }

    },
    address: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'user',
    },
    cart: [
        {
            product: productSchema,
            quantity: {
                type: Number,
                required: true
            },
        },
    ]


});

//Export the model
const User = mongoose.model('User', userSchema);
module.exports = User;