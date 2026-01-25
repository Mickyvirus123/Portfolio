import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
      match: [/^[0-9]{10,}$/, 'Please provide a valid phone number'],
    },
    subject: {
      type: String,
      required: [true, 'Please provide a subject'],
      trim: true,
      maxlength: [100, 'Subject cannot exceed 100 characters'],
    },
    message: {
      type: String,
      required: [true, 'Please provide a message'],
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
      minlength: [10, 'Message must be at least 10 characters'],
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied'],
      default: 'new',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
