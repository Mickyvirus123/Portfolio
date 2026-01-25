const mongoose = require('mongoose');

// Portfolio Schema
const portfolioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'Mohammad Ali Khan'
    },
    title: {
        type: String,
        required: true,
        default: 'Frontend Developer'
    },
    email: String,
    bio: String,
    skills: [
        {
            name: String,
            proficiency: Number
        }
    ],
    experience: [
        {
            role: String,
            company: String,
            duration: String,
            description: String
        }
    ],
    education: [
        {
            degree: String,
            school: String,
            year: String,
            description: String
        }
    ],
    socialLinks: {
        facebook: String,
        instagram: String,
        twitter: String,
        linkedin: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
