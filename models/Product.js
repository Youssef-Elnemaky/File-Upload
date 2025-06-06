const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 50,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    // public_id: { // will be used for deleting the image later on
    //     type: String,
    //     required: true,
    // },
});

module.exports = mongoose.model('Product', ProductSchema);
