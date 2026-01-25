import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'Mohammad Ali Khan',
    },
    title: {
      type: String,
      required: true,
      default: 'Frontend Developer',
    },
    bio: {
      type: String,
      required: true,
      default: 'Passionate frontend developer with expertise in HTML, CSS, and JavaScript',
    },
    email: {
      type: String,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'],
    },
    phone: String,
    location: String,
    profileImage: {
      type: String,
      default: '/images/about.png',
    },
    skills: [
      {
        name: String,
        proficiency: {
          type: Number,
          min: 0,
          max: 100,
        },
      },
    ],
    experience: [
      {
        title: String,
        company: String,
        period: String,
        description: String,
      },
    ],
    education: [
      {
        degree: String,
        institution: String,
        year: String,
        details: String,
      },
    ],
    socialLinks: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedin: String,
      github: String,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;
