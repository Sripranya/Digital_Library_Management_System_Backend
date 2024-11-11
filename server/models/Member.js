const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const memberSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true,  
    },
    name: {
        type: String,
        required: true   
    },
    email: {
        type: String,
        required: true   
    },
    membershipType: { 
        type: String, 
        enum: ['standard', 'premium'], 
        required: true   
    },
    joinDate: { 
        type: Date, 
        default: Date.now 
    },
    status: { 
        type: String, 
        enum: ['active', 'suspended'], 
        default: 'active' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
