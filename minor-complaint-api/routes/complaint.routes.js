import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import {
  getAllComplaints,
  createComplaint,
  resolveComplaint,
  deleteComplaint
} from "../controllers/complaint.controller.js";

const router = express.Router();

// Public Routes
router.get("/", getAllComplaints);
router.post("/", createComplaint);

// Protected Routes
router.put("/:id/resolve", authMiddleware, resolveComplaint);
router.delete("/:id", authMiddleware, deleteComplaint);

export default router;
