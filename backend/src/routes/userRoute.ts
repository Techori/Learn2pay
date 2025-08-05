import express from "express";
import { loginUser } from "@/controllers/userLogin";
import { getSession, refreshToken, logout } from "@/controllers/session";
import { authenticateToken } from "@/middleware/auth";

const router = express.Router();

// Public routes
router.post("/login", loginUser);
router.post("/refresh", refreshToken);

// Protected routes
router.get("/session", authenticateToken, getSession);
router.post("/logout", logout);

export default router; 