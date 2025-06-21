import { registerInstitute } from "@/controllers/institute/regInstitute";
import express from "express";

const router = express.Router();

router.post("/register", registerInstitute);

export default router;
