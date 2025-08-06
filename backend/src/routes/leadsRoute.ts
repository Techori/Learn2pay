import express from "express";
import {
  getAllLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  updateLeadStage
} from "../controllers/leadsController";

const router = express.Router();

// GET /api/leads - Get all leads with filtering and pagination
router.get("/", getAllLeads);

// GET /api/leads/:id - Get single lead by ID
router.get("/:id", getLeadById);

// POST /api/leads - Create new lead
router.post("/", createLead);

// PUT /api/leads/:id - Update lead
router.put("/:id", updateLead);

// DELETE /api/leads/:id - Delete lead
router.delete("/:id", deleteLead);

// PATCH /api/leads/:id/stage - Update lead stage only
router.patch("/:id/stage", updateLeadStage);

export default router;
