import Portfolio from '../models/Portfolio.js';

// Get portfolio data
export const getPortfolio = async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();

    if (!portfolio) {
      // Create default portfolio if none exists
      portfolio = new Portfolio({
        name: 'Mohammad Ali Khan',
        title: 'Frontend Developer',
        bio: 'Passionate frontend developer with expertise in HTML, CSS, and JavaScript',
        email: 'ali@example.com',
        socialLinks: {
          facebook: 'https://www.facebook.com/ali.khan.977986',
          instagram: 'https://www.instagram.com/salaar_sikander_315',
          twitter: 'https://x.com/AliKhan19982258',
          linkedin: 'https://www.linkedin.com/in/mohammad-ali-khan-72b34a285',
        },
        skills: [
          { name: 'HTML', proficiency: 90 },
          { name: 'CSS', proficiency: 85 },
          { name: 'JavaScript', proficiency: 80 },
          { name: 'Python', proficiency: 90 },
          { name: 'Django', proficiency: 80 },
        ],
      });
      await portfolio.save();
    }

    return res.status(200).json({
      success: true,
      data: portfolio,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch portfolio',
      error: error.message,
    });
  }
};

// Update portfolio data
export const updatePortfolio = async (req, res) => {
  try {
    const updateData = req.body;
    let portfolio = await Portfolio.findOne();

    if (!portfolio) {
      portfolio = new Portfolio(updateData);
    } else {
      Object.assign(portfolio, updateData);
    }

    const updatedPortfolio = await portfolio.save();

    return res.status(200).json({
      success: true,
      message: 'Portfolio updated successfully',
      data: updatedPortfolio,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update portfolio',
      error: error.message,
    });
  }
};

// Add skill
export const addSkill = async (req, res) => {
  try {
    const { name, proficiency } = req.body;

    if (!name || proficiency === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name and proficiency are required',
      });
    }

    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found',
      });
    }

    portfolio.skills.push({ name, proficiency });
    const updatedPortfolio = await portfolio.save();

    return res.status(200).json({
      success: true,
      message: 'Skill added successfully',
      data: updatedPortfolio.skills,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add skill',
      error: error.message,
    });
  }
};

// Add experience
export const addExperience = async (req, res) => {
  try {
    const { title, company, period, description } = req.body;

    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found',
      });
    }

    portfolio.experience.push({ title, company, period, description });
    const updatedPortfolio = await portfolio.save();

    return res.status(200).json({
      success: true,
      message: 'Experience added successfully',
      data: updatedPortfolio.experience,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add experience',
      error: error.message,
    });
  }
};

// Add education
export const addEducation = async (req, res) => {
  try {
    const { degree, institution, year, details } = req.body;

    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found',
      });
    }

    portfolio.education.push({ degree, institution, year, details });
    const updatedPortfolio = await portfolio.save();

    return res.status(200).json({
      success: true,
      message: 'Education added successfully',
      data: updatedPortfolio.education,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add education',
      error: error.message,
    });
  }
};

export default {
  getPortfolio,
  updatePortfolio,
  addSkill,
  addExperience,
  addEducation,
};
