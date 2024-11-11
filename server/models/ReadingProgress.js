const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const readingProgressSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    borrowingId: {
        type: String,
        required: true,
        ref: 'Borrowing',
    },
    currentPage: {
        type: Number,
        required: true,
        default: 0,
    },
    lastReadDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    readingTime: {
        type: Number,
        required: true,
        default: 0,
    },
    notes: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('ReadingProgress', readingProgressSchema);
