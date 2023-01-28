const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        max: 10,
        min: 0,
        required: true
    },
    pages: {
        type: Number,
        min: 0,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Book', bookSchema);