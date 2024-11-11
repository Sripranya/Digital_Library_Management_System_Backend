const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const bookSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4, 
        unique: true,
    },
    isbn: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    publicationYear: {
        type: String,
        required: true,
    },
    totalCopies: {
        type: Number,
        required: true,
    },
    availableCopies: {
        type: Number,
        required: true,
    }
}, { timestamps: true }); 

module.exports = mongoose.model('Book', bookSchema);
