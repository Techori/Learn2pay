import express, { Router } from 'express';
import {
  getAllInstituteUsers,
  createInstituteUser,
  updateInstituteUser,
  deleteInstituteUser,
  updateUserStatus
} from '../controllers/instituteUserController';
import authenticateToken from '../middleware/auth';
import { requireRole } from '../middleware/roleAuth';

const router: Router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);
router.use(requireRole(['institute']));

// Routes
router.route('/')
  .get(getAllInstituteUsers)
  .post(createInstituteUser);

router.route('/:userId')
  .put(updateInstituteUser)
  .delete(deleteInstituteUser);

router.put('/:userId/status', updateUserStatus);

export default router;
