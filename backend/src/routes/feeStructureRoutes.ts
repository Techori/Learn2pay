import express from 'express';
import {
  getAllFeeStructures,
  getFeeStructureById,
  createFeeStructure,
  updateFeeStructure,
  deleteFeeStructure,
  getFeeStructuresByInstitute
} from '../controllers/feeStructureController';
import authenticateToken from '../middleware/auth';
import { requireRole } from '../middleware/roleAuth';

const router = express.Router();

// Protect all routes and require institute role
router.use(authenticateToken);
router.use(requireRole(['institute']));

// Get all fee structures and create new fee structure
router.route('/')
  .get(getAllFeeStructures)
  .post(createFeeStructure);

// Get, update and delete fee structure by ID
router.route('/:id')
  .get(getFeeStructureById)
  .put(updateFeeStructure)
  .delete(deleteFeeStructure);

// Get fee structures by institute ID
router.route('/institute/:instituteId')
  .get(getFeeStructuresByInstitute);

export default router;
