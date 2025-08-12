import express from 'express';
import {
  getAllStudentFees,
  getStudentFeeById,
  createStudentFee,
  addPayment,
  updateStudentFee,
  deleteStudentFee,
  getPaymentHistory
} from '../controllers/studentFeesController';
import authenticateToken from '../middleware/auth';
import { requireRole } from '../middleware/roleAuth';

const router = express.Router();

// Protect all routes and require institute role
router.use(authenticateToken);
router.use(requireRole(['institute']));

// Get all student fees and create new student fee record
router.route('/')
  .get(getAllStudentFees)
  .post(createStudentFee);

// Get, update and delete student fee by ID
router.route('/:id')
  .get(getStudentFeeById)
  .put(updateStudentFee)
  .delete(deleteStudentFee);

// Add payment to student fee record
router.route('/:id/payment')
  .post(addPayment);

// Get payment history for a specific student
router.route('/student/:studentId/history')
  .get(getPaymentHistory);

export default router;
