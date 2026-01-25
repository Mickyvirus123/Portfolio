require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Import database connection
const connectDB = require('./config/database');

// Import models
const Contact = require('./models/Contact');
const Portfolio = require('./models/Portfolio');

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Email configuration
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    }
});

// Validation helper
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Routes

// GET - Fetch portfolio data
app.get('/api/portfolio', async (req, res) => {
    try {
        let portfolio = await Portfolio.findOne();
        
        // If no portfolio exists, create default one
        if (!portfolio) {
            portfolio = await Portfolio.create({
                name: "Mohammad Ali Khan",
                title: "Frontend Developer",
                email: "ali@example.com",
                skills: [
                    { name: "HTML", proficiency: 90 },
                    { name: "CSS", proficiency: 85 },
                    { name: "JavaScript", proficiency: 80 },
                    { name: "Python", proficiency: 90 },
                    { name: "Django", proficiency: 80 }
                ],
                experience: [
                    {
                        role: "Frontend Developer Intern",
                        company: "Codesquadz",
                        duration: "August 2023 - March 2024"
                    }
                ],
                education: [
                    {
                        degree: "Bachelor of Technology in Computer Science",
                        school: "Gurugram University",
                        year: "2021 - 2025"
                    },
                    {
                        degree: "Intermediate",
                        school: "Sun Flower Public School",
                        year: "2019 - 2020"
                    },
                    {
                        degree: "High School",
                        school: "Sun Flower Public School",
                        year: "2018 - 2019"
                    }
                ]
            });
        }

        res.json({
            success: true,
            data: portfolio
        });
    } catch (error) {
        console.error('Portfolio fetch error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to load portfolio data',
            error: error.message
        });
    }
});

// PUT - Update portfolio data (admin)
app.put('/api/portfolio', async (req, res) => {
    try {
        let portfolio = await Portfolio.findOne();
        
        if (!portfolio) {
            portfolio = new Portfolio(req.body);
        } else {
            Object.assign(portfolio, req.body);
            portfolio.updatedAt = Date.now();
        }

        await portfolio.save();

        res.json({
            success: true,
            message: 'Portfolio updated successfully',
            data: portfolio
        });
    } catch (error) {
        console.error('Portfolio update error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update portfolio',
            error: error.message
        });
    }
});

// POST - Submit contact form
app.post('/api/contacts', async (req, res) => {
    try {
        const { fullName, email, phone, subject, message } = req.body;
        const errors = [];

        // Validation
        if (!fullName || fullName.trim() === '') {
            errors.push({ field: 'fullName', message: 'Full name is required' });
        }
        if (!email || !validateEmail(email)) {
            errors.push({ field: 'email', message: 'Valid email is required' });
        }
        if (!phone || !validatePhone(phone)) {
            errors.push({ field: 'phone', message: 'Valid 10-digit phone number is required' });
        }
        if (!subject || subject.trim() === '') {
            errors.push({ field: 'subject', message: 'Subject is required' });
        }
        if (!message || message.trim() === '') {
            errors.push({ field: 'message', message: 'Message is required' });
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        // Create and save contact to database
        const contact = new Contact({
            fullName,
            email,
            phone,
            subject,
            message
        });

        const savedContact = await contact.save();

        // Send email notification if configured
        if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
            try {
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: process.env.EMAIL_USER,
                    replyTo: email,
                    subject: `New Contact Form Submission: ${subject}`,
                    html: `
                        <h2>New Contact Form Submission</h2>
                        <p><strong>Name:</strong> ${fullName}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                        <h3>Message:</h3>
                        <p>${message.replace(/\n/g, '<br>')}</p>
                        <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
                    `
                });

                // Send confirmation email to user
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'We received your message',
                    html: `
                        <h2>Thank you, ${fullName}!</h2>
                        <p>We have received your message and will get back to you as soon as possible.</p>
                        <p><strong>Your message:</strong></p>
                        <p>${message.replace(/\n/g, '<br>')}</p>
                        <p>Best regards,<br>Mohammad Ali Khan</p>
                    `
                });
            } catch (emailError) {
                console.error('Email error:', emailError.message);
                // Don't fail the request if email fails
            }
        }

        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            contactId: savedContact._id
        });
    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process contact submission',
            error: error.message
        });
    }
});

// GET - Fetch all contacts (admin view)
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        console.error('Contacts fetch error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to load contacts',
            error: error.message
        });
    }
});

// GET - Fetch single contact
app.get('/api/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.json({
            success: true,
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to load contact',
            error: error.message
        });
    }
});

// PUT - Mark contact as read
app.put('/api/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.json({
            success: true,
            message: 'Contact marked as read',
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update contact',
            error: error.message
        });
    }
});

// DELETE - Delete contact
app.delete('/api/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.json({
            success: true,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete contact',
            error: error.message
        });
    }
});

// Health check
app.get('/api/health', async (req, res) => {
    try {
        // Check database connection
        const dbStatus = await Portfolio.countDocuments();
        
        res.json({
            success: true,
            message: 'Backend is running',
            timestamp: new Date().toISOString(),
            database: 'connected'
        });
    } catch (error) {
        res.status(503).json({
            success: false,
            message: 'Backend error',
            database: 'disconnected',
            error: error.message
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.path
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err.message
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Backend server is running on http://localhost:${PORT}`);
    console.log(`📧 API endpoints available at http://localhost:${PORT}/api`);
});
