const mongoose = require('mongoose');
const ratingSchema = require('./rating');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true

        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        quantity: {
            type: Number,
            required: true
        },
        images: [
            {
                type: String,
                required: true
            }
        ],
        category: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },

        ratings: [ratingSchema]
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = { Product, productSchema };


