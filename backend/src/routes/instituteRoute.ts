import { registerInstitute } from "@/controllers/institute/regInstitute";
import { logInstitute } from "@/controllers/institute/logInstitute";
import { getSession, refreshToken, logout } from "@/controllers/session";
import { authenticateToken } from "@/middleware/auth";
import express from "express";

const router = express.Router();

// Public routes
router.post("/register", registerInstitute);
router.post("/login", logInstitute);
router.post("/refresh", refreshToken);

// Protected routes (require authentication)
router.get("/session", authenticateToken, getSession);
router.post("/logout", authenticateToken, logout);


export default router;
