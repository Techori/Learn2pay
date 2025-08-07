import express from "express";
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  updateTicketStatus,
  assignTicket
} from "../controllers/ticketsController";

const router = express.Router();

// GET /api/tickets - Get all tickets with filtering and pagination
router.get("/", getAllTickets);

// GET /api/tickets/:id - Get single ticket by ID
router.get("/:id", getTicketById);

// POST /api/tickets - Create new ticket
router.post("/", createTicket);

// PUT /api/tickets/:id - Update ticket
router.put("/:id", updateTicket);

// DELETE /api/tickets/:id - Delete ticket
router.delete("/:id", deleteTicket);

// PATCH /api/tickets/:id/status - Update ticket status only
router.patch("/:id/status", updateTicketStatus);

// PATCH /api/tickets/:id/assign - Assign ticket to user
router.patch("/:id/assign", assignTicket);

export default router;
