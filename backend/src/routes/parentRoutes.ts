import { registerStudent } from "@/controllers/parents/regStudent";
import { loginParent } from "@/controllers/parents/logParent";

import { getSession, refreshToken, logout } from "@/controllers/session";
import { authenticateToken } from "@/middleware/auth";
import express from "express";

const router = express.Router();

// Public routes
router.post("/register", registerStudent);
router.post("/login", loginParent);
router.post("/refresh", refreshToken);

// Protected routes (require authentication)
router.get("/session", authenticateToken, getSession);
router.post("/logout", authenticateToken, logout);



export default router;
