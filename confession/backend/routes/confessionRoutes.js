import express from 'express';
const router = express.Router();
import { ensureAuth } from '../middleware/authMiddleware.js'; // Added .js
import { createLimiter, reactionLimiter } from '../middleware/rateLimiter.js'; // Added .js
import {
    getConfessions,
    createConfession,
    editConfession,
    deleteConfession,
    reactToConfession,
    reportConfession
} from '../controllers/confessionController.js'; // Added .js

router.get('/', getConfessions);
router.post('/', ensureAuth, createLimiter, createConfession);
router.put('/:id', ensureAuth, editConfession);
router.delete('/:id', ensureAuth, deleteConfession);
router.post('/:id/react', ensureAuth, reactionLimiter, reactToConfession);
router.post('/:id/report', ensureAuth, reportConfession);

export default router;