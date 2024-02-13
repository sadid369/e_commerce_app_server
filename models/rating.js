const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var ratingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    }
});

//Export the model


module.exports = ratingSchema;