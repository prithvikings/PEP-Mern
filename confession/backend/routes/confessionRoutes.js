import express from 'express';
const router = express.Router();
import { ensureAuth } from '../middleware/authMiddleware.js';
import { createLimiter, reactionLimiter } from '../middleware/rateLimiter.js';
import {
    getConfessions,
    createConfession,
    editConfession,
    deleteConfession,
    voteConfession, // Import the new function
    reportConfession
} from '../controllers/confessionController.js';

router.get('/', getConfessions);
router.post('/', ensureAuth, createLimiter, createConfession);
router.put('/:id', ensureAuth, editConfession);
router.delete('/:id', ensureAuth, deleteConfession);

// CHANGED: /vote instead of /react
router.post('/:id/vote', ensureAuth, reactionLimiter, voteConfession); 

router.post('/:id/report', ensureAuth, reportConfession);

export default router;