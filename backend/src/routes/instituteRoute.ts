import { registerInstitute } from "@/controllers/institute/regInstitute";
import { logInstitute } from "@/controllers/institute/logInstitute";
import { getSession, refreshToken, logout } from "@/controllers/institute/auth";
import { authenticateToken } from "@/middleware/auth";
import express from "express";

const router = express.Router();

// Public routes
router.post("/register", registerInstitute);
router.post("/login", logInstitute);
router.post("/refresh", refreshToken);

// Protected routes
router.get("/session", authenticateToken, getSession);
router.post("/logout", authenticateToken, logout);

// Example protected route
router.get("/dashboard", authenticateToken, (req, res) => {
  res.json({
    message: `Welcome ${req.institute?.instituteName}!`,
    institute: req.institute,
  });
});

export default router;
