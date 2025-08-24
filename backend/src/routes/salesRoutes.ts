import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { requireRole } from '../middleware/roleAuth';

// Import Leads Controllers
import {
  getAllLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  addNote,
  logCommunication,
  getLeadActivities,
  getLeadsDashboardStats,
  convertLead
} from '../controllers/leadsController';

// Import Onboarding Controllers
import {
  getAllOnboardings,
  getOnboardingById,
  createOnboarding,
  updateOnboarding,
  updateDocumentStatus,
  updateTechnicalSetup,
  scheduleTraining,
  completeTraining,
  addMilestone,
  getOnboardingActivities,
  getOnboardingDashboardStats
} from '../controllers/onboardingController';

const router = express.Router();

// Middleware to authenticate all sales routes
router.use(authenticateToken);

// ===== LEADS ROUTES =====

// Get all leads with filtering and pagination
// GET /api/sales/leads?page=1&limit=10&stage=New&priority=High&assignedTo=userId&search=searchTerm
router.get('/leads', getAllLeads);

// Get leads dashboard statistics
// GET /api/sales/leads/dashboard-stats?assignedTo=userId&dateFrom=2024-01-01&dateTo=2024-12-31
router.get('/leads/dashboard-stats', getLeadsDashboardStats);

// Get specific lead by ID
// GET /api/sales/leads/:id
router.get('/leads/:id', getLeadById);

// Create new lead
// POST /api/sales/leads
router.post('/leads', createLead);

// Update lead
// PUT /api/sales/leads/:id
router.put('/leads/:id', updateLead);

// Delete lead (only for admin/manager roles)
// DELETE /api/sales/leads/:id
router.delete('/leads/:id', requireRole(['admin', 'sales_manager']), deleteLead);

// Convert lead to onboarding
// POST /api/sales/leads/:id/convert
router.post('/leads/:id/convert', convertLead);

// Add note to lead
// POST /api/sales/leads/:id/notes
router.post('/leads/:id/notes', addNote);

// Log communication activity
// POST /api/sales/leads/:id/communications
router.post('/leads/:id/communications', logCommunication);

// Get lead activities/timeline
// GET /api/sales/leads/:id/activities?limit=50
router.get('/leads/:id/activities', getLeadActivities);

// ===== ONBOARDING ROUTES =====

// Get all onboarding cases with filtering and pagination
// GET /api/sales/onboarding?page=1&limit=10&stage=Documentation&assignedTo=userId&search=searchTerm
router.get('/onboarding', getAllOnboardings);

// Get onboarding dashboard statistics
// GET /api/sales/onboarding/dashboard-stats?assignedTo=userId&dateFrom=2024-01-01&dateTo=2024-12-31
router.get('/onboarding/dashboard-stats', getOnboardingDashboardStats);

// Get specific onboarding case by ID
// GET /api/sales/onboarding/:id
router.get('/onboarding/:id', getOnboardingById);

// Create new onboarding case
// POST /api/sales/onboarding
router.post('/onboarding', createOnboarding);

// Update onboarding case
// PUT /api/sales/onboarding/:id
router.put('/onboarding/:id', updateOnboarding);

// Update document status
// PUT /api/sales/onboarding/:id/documents
// Body: { documentType: 'registrationCertificate', status: 'Verified', rejectionReason?: 'reason', documentUrl?: 'url' }
router.put('/onboarding/:id/documents', updateDocumentStatus);

// Update technical setup status
// PUT /api/sales/onboarding/:id/technical-setup
// Body: { setupType: 'paymentGatewayIntegration', status: 'Completed', details: {} }
router.put('/onboarding/:id/technical-setup', updateTechnicalSetup);

// Schedule training
// POST /api/sales/onboarding/:id/training/schedule
// Body: { trainingType: 'adminTraining', scheduledDate: '2024-01-15', trainerId: 'userId', attendees: 5 }
router.post('/onboarding/:id/training/schedule', scheduleTraining);

// Complete training
// POST /api/sales/onboarding/:id/training/complete
// Body: { trainingType: 'adminTraining', attendees: 5, feedback: 'Great session' }
router.post('/onboarding/:id/training/complete', completeTraining);

// Add milestone
// POST /api/sales/onboarding/:id/milestones
// Body: { name: 'Setup Payment Gateway', description: 'Configure payment gateway', dueDate: '2024-01-20', assignedTo: 'userId' }
router.post('/onboarding/:id/milestones', addMilestone);

// Get onboarding activities/timeline
// GET /api/sales/onboarding/:id/activities?limit=50
router.get('/onboarding/:id/activities', getOnboardingActivities);

// ===== ACTIVITY ROUTES =====

// Get recent activities across all leads and onboarding
// GET /api/sales/activities/recent?days=7&limit=100
router.get('/activities/recent', async (req, res) => {
  try {
    const { days = 7, limit = 100 } = req.query;
    const Activity = require('../models/activitiesModel').default;
    
    const activities = await Activity.getRecentActivities(
      parseInt(days as string),
      parseInt(limit as string)
    );

    res.status(200).json({
      success: true,
      data: activities
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// Get activities by user
// GET /api/sales/activities/user/:userId?limit=100
router.get('/activities/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 100 } = req.query;
    const Activity = require('../models/activitiesModel').default;
    
    const activities = await Activity.getUserActivities(
      userId,
      parseInt(limit as string)
    );

    res.status(200).json({
      success: true,
      data: activities
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// Get activities by type
// GET /api/sales/activities/type/:activityType?limit=100
router.get('/activities/type/:activityType', async (req, res) => {
  try {
    const { activityType } = req.params;
    const { limit = 100 } = req.query;
    const Activity = require('../models/activitiesModel').default;
    
    const activities = await Activity.getActivitiesByType(
      activityType,
      parseInt(limit as string)
    );

    res.status(200).json({
      success: true,
      data: activities
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// ===== REPORTING ROUTES =====

// Get comprehensive sales report
// GET /api/sales/reports/comprehensive?dateFrom=2024-01-01&dateTo=2024-12-31&assignedTo=userId
router.get('/reports/comprehensive', async (req, res) => {
  try {
    const { dateFrom, dateTo, assignedTo } = req.query;
    
    // Build filter
    const filter: any = {};
    if (assignedTo) filter.assignedTo = assignedTo;
    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom as string);
      if (dateTo) filter.createdAt.$lte = new Date(dateTo as string);
    }

    const Lead = require('../models/leadsModel').default;
    const Onboarding = require('../models/onboardingModel').default;
    const Activity = require('../models/activitiesModel').default;

    // Get leads data
    const leadsStats = {
      total: await Lead.countDocuments(filter),
      byStage: await Lead.aggregate([
        { $match: filter },
        { $group: { _id: '$stage', count: { $sum: 1 } } }
      ]),
      byPriority: await Lead.aggregate([
        { $match: filter },
        { $group: { _id: '$priority', count: { $sum: 1 } } }
      ]),
      bySource: await Lead.aggregate([
        { $match: filter },
        { $group: { _id: '$leadSource', count: { $sum: 1 } } }
      ]),
      totalValue: await Lead.aggregate([
        { $match: filter },
        { $group: { _id: null, total: { $sum: '$estimatedValue' } } }
      ])
    };

    // Get onboarding data
    const onboardingStats = {
      total: await Onboarding.countDocuments(filter),
      byStage: await Onboarding.aggregate([
        { $match: filter },
        { $group: { _id: '$stage', count: { $sum: 1 } } }
      ]),
      avgProgress: await Onboarding.aggregate([
        { $match: filter },
        { $group: { _id: null, avg: { $avg: '$overallProgress' } } }
      ]),
      totalValue: await Onboarding.aggregate([
        { $match: filter },
        { $group: { _id: null, total: { $sum: '$contractValue' } } }
      ])
    };

    // Get activity data
    const activityFilter = { ...filter };
    if (dateFrom || dateTo) {
      activityFilter.performedAt = {};
      if (dateFrom) activityFilter.performedAt.$gte = new Date(dateFrom as string);
      if (dateTo) activityFilter.performedAt.$lte = new Date(dateTo as string);
    }

    const activityStats = await Activity.aggregate([
      { $match: activityFilter },
      { $group: { _id: '$activityType', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        leads: leadsStats,
        onboarding: onboardingStats,
        activities: activityStats,
        generatedAt: new Date()
      }
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// Get performance metrics for sales team
// GET /api/sales/reports/performance?dateFrom=2024-01-01&dateTo=2024-12-31
router.get('/reports/performance', requireRole(['admin', 'sales_manager']), async (req, res) => {
  try {
    const { dateFrom, dateTo } = req.query;
    
    const dateFilter: any = {};
    if (dateFrom || dateTo) {
      dateFilter.createdAt = {};
      if (dateFrom) dateFilter.createdAt.$gte = new Date(dateFrom as string);
      if (dateTo) dateFilter.createdAt.$lte = new Date(dateTo as string);
    }

    const Lead = require('../models/leadsModel').default;
    const Onboarding = require('../models/onboardingModel').default;

    // Get performance by salesperson
    const salesPerformance = await Lead.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: '$assignedTo',
          totalLeads: { $sum: 1 },
          convertedLeads: {
            $sum: { $cond: [{ $eq: ['$stage', 'Converted'] }, 1, 0] }
          },
          lostLeads: {
            $sum: { $cond: [{ $eq: ['$stage', 'Lost'] }, 1, 0] }
          },
          totalValue: { $sum: '$estimatedValue' },
          avgValue: { $avg: '$estimatedValue' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'salesperson'
        }
      },
      {
        $project: {
          salesperson: { $arrayElemAt: ['$salesperson', 0] },
          totalLeads: 1,
          convertedLeads: 1,
          lostLeads: 1,
          totalValue: 1,
          avgValue: 1,
          conversionRate: {
            $multiply: [
              { $divide: ['$convertedLeads', '$totalLeads'] },
              100
            ]
          }
        }
      }
    ]);

    // Get onboarding performance
    const onboardingPerformance = await Onboarding.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: '$assignedTo',
          totalOnboardings: { $sum: 1 },
          completedOnboardings: {
            $sum: { $cond: [{ $eq: ['$stage', 'Completed'] }, 1, 0] }
          },
          avgProgress: { $avg: '$overallProgress' },
          totalValue: { $sum: '$contractValue' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'specialist'
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        salesPerformance,
        onboardingPerformance,
        generatedAt: new Date()
      }
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

export default router;