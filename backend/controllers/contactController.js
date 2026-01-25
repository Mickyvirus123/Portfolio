import Contact from '../models/Contact.js';
import { sendEmail } from '../config/email.js';

// Submit contact form
export const submitContact = async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    // Create new contact document
    const newContact = new Contact({
      fullName,
      email,
      phone,
      subject,
      message,
    });

    // Save to database
    const savedContact = await newContact.save();

    // Send confirmation email to user
    const userEmailHtml = `
      <h2>Thank you for contacting me, ${fullName}!</h2>
      <p>I have received your message and will get back to you as soon as possible.</p>
      <hr>
      <h3>Your Message Details:</h3>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
      <hr>
      <p>Best regards,<br>Mohammad Ali Khan</p>
    `;

    await sendEmail(email, 'Thank you for reaching out!', userEmailHtml);

    // Send notification email to portfolio owner
    const ownerEmailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr>
      <p>Reply to: ${email}</p>
    `;

    await sendEmail(process.env.EMAIL_TO, `New Contact: ${subject}`, ownerEmailHtml);

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      data: {
        id: savedContact._id,
        fullName: savedContact.fullName,
        email: savedContact.email,
      },
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Get all contacts (admin only)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: error.message,
    });
  }
};

// Get single contact by ID
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch contact',
      error: error.message,
    });
  }
};

// Update contact status
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Contact status updated',
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update contact',
      error: error.message,
    });
  }
};

// Delete contact
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
      error: error.message,
    });
  }
};

export default {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
};
