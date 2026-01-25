import express from 'express';
import {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from '../controllers/contactController.js';
import { validateContact, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// Public route - submit contact form
router.post('/', validateContact, handleValidationErrors, submitContact);

// Admin routes (would need authentication middleware in production)
router.get('/', getAllContacts);
router.get('/:id', getContactById);
router.put('/:id', updateContactStatus);
router.delete('/:id', deleteContact);

export default router;
