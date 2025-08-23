import { registerStudent, bulkRegisterStudents, uploadMiddleware, getStudentsByInstitute } from "@/controllers/parents/regStudent";
import { loginParent } from "@/controllers/parents/logParent";

import { getSession, refreshToken, logout } from "@/controllers/session";
import { authenticateToken } from "@/middleware/auth";
import express from "express";

const router = express.Router();

// Public routes
router.post("/login", loginParent);
router.post("/refresh", refreshToken);

// Protected routes (require authentication)
router.post("/register", authenticateToken, registerStudent);
router.post("/bulk-register", authenticateToken, uploadMiddleware, bulkRegisterStudents);
router.get("/session", authenticateToken, getSession);
router.post("/logout", authenticateToken, logout);

// Get students by institute ID (for institute dashboard)
router.get("/students", authenticateToken, getStudentsByInstitute);



export default router;
