import express from 'express';
const router = express.Router();
import { ensureAuth } from '../middleware/authMiddleware.js';
import { getUserProfile, toggleSaveConfession } from '../controllers/userController.js';

router.get('/profile', ensureAuth, getUserProfile);
router.post('/save/:id', ensureAuth, toggleSaveConfession);

export default router;