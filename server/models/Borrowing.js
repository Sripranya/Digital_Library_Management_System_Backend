const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const borrowingSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4, 
        unique: true,
    },
    
    bookId: {
        type: String,
        required: true,
        // ref: 'Book',
    },
    memberId: {
        type: String,
        required: true,
        ref: 'Member',
    },
    borrowDate: {
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    returnDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['active', 'returned', 'overdue'],
        default: 'active',
    }
}, { timestamps: true });

module.exports = mongoose.model('Borrowing', borrowingSchema);
