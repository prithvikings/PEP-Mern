import express from 'express';
const router = express.Router();
import { ensureAdmin } from '../middleware/authMiddleware.js';
import { getReports, deleteAsAdmin } from "../controllers/adminController.js";

router.use(ensureAdmin); 
router.get('/reports', getReports);
router.delete('/confession/:id', deleteAsAdmin);

export default router;