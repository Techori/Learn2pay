
import { registerInstitute } from "@/controllers/institute/regInstitute";
import { logInstitute } from "@/controllers/institute/logInstitute";
import { getSession, refreshToken, logout } from "@/controllers/session";
import { authenticateToken } from "@/middleware/auth";
import express from "express";
import { startKycVerification, getKycStatus, getDocument, getDocumentInfo } from "@/controllers/kyc/kycController";

const router = express.Router();

// Public routes
router.post("/register", registerInstitute);
router.post("/login", logInstitute);
router.post("/refresh", refreshToken);

// Protected routes (require authentication)
router.get("/session", authenticateToken, getSession);
router.post("/logout", authenticateToken, logout);

// KYC routes
router.get('/kyc/status', authenticateToken, getKycStatus);
router.post('/kyc/verify', authenticateToken, startKycVerification);

// Route to get document info (filename, content type, etc.)
router.get('/kyc/document/:documentType/info', authenticateToken, getDocumentInfo);

// Route to serve documents from MongoDB
router.get('/kyc/document/:documentType', authenticateToken, getDocument);

export default router;
