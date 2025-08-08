import { Router } from 'express';
import { onboardInstitute, handleFileUpload, listInstitutes, getInstituteById } from '../controllers/sales/salesController';

const router = Router();

// POST /api/sales/institute/onboard
router.post('/institute/onboard', handleFileUpload, onboardInstitute);

// GET /api/sales/institute/list
router.get('/institute/list', listInstitutes);

// GET /api/sales/institute/:id
router.get('/institute/:id', getInstituteById);

export default router;