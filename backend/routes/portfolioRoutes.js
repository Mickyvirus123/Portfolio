import express from 'express';
import {
  getPortfolio,
  updatePortfolio,
  addSkill,
  addExperience,
  addEducation,
} from '../controllers/portfolioController.js';

const router = express.Router();

// Public routes
router.get('/', getPortfolio);

// Admin routes (would need authentication middleware in production)
router.put('/', updatePortfolio);
router.post('/skills', addSkill);
router.post('/experience', addExperience);
router.post('/education', addEducation);

export default router;
