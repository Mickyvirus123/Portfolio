const mongoose = require('mongoose');

// Contact Schema
const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please provide your full name'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone number'],
        match: [/^[0-9]{10}$/, 'Phone must be a 10-digit number']
    },
    subject: {
        type: String,
        required: [true, 'Please provide a subject'],
        trim: true,
        minlength: [5, 'Subject must be at least 5 characters']
    },
    message: {
        type: String,
        required: [true, 'Please provide a message'],
        minlength: [10, 'Message must be at least 10 characters']
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', contactSchema);
