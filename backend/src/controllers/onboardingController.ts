import { Request, Response } from 'express';
import Onboarding from '../models/onboardingModel';
import Activity from '../models/activitiesModel';
import Lead from '../models/leadsModel';
import { Types } from 'mongoose';

// Helper function to get user ID from request
const getUserId = (req: Request): string | null => {
  if (req.user?.id) return req.user.id;
  if (req.user?.userId) return req.user.userId;
  if (req.user?.instituteId) return req.user.instituteId;
  if (req.user?.studentId) return req.user.studentId;
  if (req.salesUser?._id) return (req.salesUser._id as any).toString();
  if (req.institute?._id) return (req.institute._id as any).toString();
  if (req.parent?._id) return (req.parent._id as any).toString();
  return null;
};

// Helper function to log activity
const logActivity = async (
  entityId: string,
  activityType: string,
  title: string,
  description: string,
  performedBy: string,
  changes?: any[],
  metadata?: any
) => {
  try {
    await Activity.create({
      entityType: 'Onboarding',
      entityId,
      activityType,
      title,
      description,
      performedBy,
      changes,
      metadata,
      isSystemGenerated: false
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

// Get all onboarding cases with filtering and pagination
export const getAllOnboardings = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 10,
      stage,
      assignedTo,
      dateFrom,
      dateTo,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter: any = {};

    if (stage) filter.stage = stage;
    if (assignedTo) filter.assignedTo = assignedTo;

    // Date range filter
    if (dateFrom || dateTo) {
      filter.startDate = {};
      if (dateFrom) filter.startDate.$gte = new Date(dateFrom as string);
      if (dateTo) filter.startDate.$lte = new Date(dateTo as string);
    }

    // Search filter
    if (search) {
      filter.$or = [
        { instituteName: { $regex: search, $options: 'i' } },
        { 'contactPerson.firstName': { $regex: search, $options: 'i' } },
        { 'contactPerson.lastName': { $regex: search, $options: 'i' } },
        { 'contactPerson.email': { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Sort
    const sort: any = {};
    sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

    const onboardings = await Onboarding.find(filter)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('leadId', 'leadName estimatedValue')
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    const total = await Onboarding.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: onboardings,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
        itemsPerPage: limitNum
      }
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get onboarding by ID
export const getOnboardingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const onboarding = await Onboarding.findById(id)
      .populate('assignedTo', 'name email phone')
      .populate('createdBy', 'name email')
      .populate('leadId', 'leadName estimatedValue stage')
      .populate('milestones.assignedTo', 'name email')
      .populate('communications.sentBy', 'name email');

    if (!onboarding) {
      res.status(404).json({
        success: false,
        message: 'Onboarding case not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: onboarding
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create new onboarding case
export const createOnboarding = async (req: Request, res: Response): Promise<void> => {
  try {
    const onboardingData = req.body;
    const userId = getUserId(req);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
      return;
    }

    // Set created by
    onboardingData.createdBy = userId;
    onboardingData.lastUpdatedBy = userId;

    // If no assignedTo provided, assign to creator
    if (!onboardingData.assignedTo) {
      onboardingData.assignedTo = userId;
    }

    const onboarding = await Onboarding.create(onboardingData);

    // Populate the created onboarding
    const populatedOnboarding = await Onboarding.findById(onboarding._id)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('leadId', 'leadName estimatedValue');

    // Log activity
    await logActivity(
      (onboarding._id as any).toString(),
      'Created',
      'Onboarding Started',
      `Onboarding process started for "${onboarding.instituteName}"`,
      userId,
      [],
      {
        source: 'Web',
        priority: 'High',
        contractValue: onboarding.contractValue
      }
    );

    res.status(201).json({
      success: true,
      message: 'Onboarding case created successfully',
      data: populatedOnboarding
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Validation Error',
      error: error.message
    });
  }
};

// Update onboarding case
export const updateOnboarding = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const userId = getUserId(req);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
      return;
    }

    // Get the current onboarding to track changes
    const currentOnboarding = await Onboarding.findById(id);
    if (!currentOnboarding) {
      res.status(404).json({
        success: false,
        message: 'Onboarding case not found'
      });
      return;
    }

    // Track changes
    const changes: any[] = [];
    Object.keys(updateData).forEach(key => {
      if (JSON.stringify(currentOnboarding[key as keyof typeof currentOnboarding]) !== JSON.stringify(updateData[key])) {
        changes.push({
          field: key,
          oldValue: currentOnboarding[key as keyof typeof currentOnboarding],
          newValue: updateData[key]
        });
      }
    });

    updateData.lastUpdatedBy = userId;

    const onboarding = await Onboarding.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('leadId', 'leadName estimatedValue');

    if (!onboarding) {
      res.status(404).json({
        success: false,
        message: 'Onboarding case not found'
      });
      return;
    }

    // Log activity for significant changes
    if (changes.length > 0) {
      let activityType = 'Updated';
      let title = 'Onboarding Updated';
      let description = `Onboarding case for "${onboarding.instituteName}" was updated`;

      // Special handling for stage changes
      const stageChange = changes.find(c => c.field === 'stage');
      if (stageChange) {
        activityType = 'Stage Changed';
        title = `Stage Changed: ${stageChange.oldValue} → ${stageChange.newValue}`;
        description = `Onboarding stage changed from "${stageChange.oldValue}" to "${stageChange.newValue}"`;
      }

              await logActivity(
        (onboarding._id as any).toString(),
        activityType,
        title,
        description,
        userId,
        changes,
        {
          source: 'Web',
          priority: 'Medium'
        }
      );
    }

    res.status(200).json({
      success: true,
      message: 'Onboarding case updated successfully',
      data: onboarding
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Validation Error',
      error: error.message
    });
  }
};

// Update document status
export const updateDocumentStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { documentType, status, rejectionReason, documentUrl } = req.body;
    const userId = getUserId(req);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
      return;
    }

    const onboarding = await Onboarding.findById(id);
    if (!onboarding) {
      res.status(404).json({
        success: false,
        message: 'Onboarding case not found'
      });
      return;
    }

    // Update document status
    const updatePath = `documents.${documentType}`;
    const updateData: any = {
      [`${updatePath}.status`]: status,
      lastUpdatedBy: userId
    };

    if (status === 'Submitted') {
      updateData[`${updatePath}.uploadDate`] = new Date();
    } else if (status === 'Verified') {
      updateData[`${updatePath}.verifiedDate`] = new Date();
    } else if (status === 'Rejected') {
      updateData[`${updatePath}.rejectionReason`] = rejectionReason;
    }

    if (documentUrl) {
      updateData[`${updatePath}.documentUrl`] = documentUrl;
    }

    const updatedOnboarding = await Onboarding.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    // Log activity
    let activityType = 'Document Uploaded';
    if (status === 'Verified') activityType = 'Document Verified';
    if (status === 'Rejected') activityType = 'Document Rejected';

    await logActivity(
      id,
      activityType,
      `${documentType} ${status}`,
      `Document "${documentType}" status changed to "${status}"${rejectionReason ? ` - ${rejectionReason}` : ''}`,
      userId,
      [
        {
          field: `documents.${documentType}.status`,
          oldValue: onboarding.documents[documentType as keyof typeof onboarding.documents]?.status,
          newValue: status
        }
      ],
      {
        source: 'Web',
        priority: status === 'Rejected' ? 'High' : 'Medium'
      }
    );

    res.status(200).json({
      success: true,
      message: 'Document status updated successfully',
      data: updatedOnboarding
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Error updating document status',
      error: error.message
    });
  }
};

// Update technical setup status
export const updateTechnicalSetup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { setupType, status, details } = req.body;
    const userId = getUserId(req);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
      return;
    }

    const onboarding = await Onboarding.findById(id);
    if (!onboarding) {
      res.status(404).json({
        success: false,
        message: 'Onboarding case not found'
      });
      return;
    }

    // Update technical setup status
    const updatePath = `technicalSetup.${setupType}`;
    const updateData: any = {
      [`${updatePath}.status`]: status,
      lastUpdatedBy: userId
    };

    if (status === 'In Progress') {
      updateData[`${updatePath}.startDate`] = new Date();
    } else if (status === 'Completed') {
      updateData[`${updatePath}.completionDate`] = new Date();
    }

    // Add any additional details
    if (details) {
      Object.keys(details).forEach(key => {
        updateData[`${updatePath}.${key}`] = details[key];
      });
    }

    const updatedOnboarding = await Onboarding.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    // Log activity
    await logActivity(
      id,
      'Updated',
      `${setupType} ${status}`,
      `Technical setup "${setupType}" status changed to "${status}"`,
      userId,
      [
        {
          field: `technicalSetup.${setupType}.status`,
          oldValue: onboarding.technicalSetup[setupType as keyof typeof onboarding.technicalSetup]?.status,
          newValue: status
        }
      ],
      {
        source: 'Web',
        priority: 'Medium'
      }
    );

    res.status(200).json({
      success: true,
      message: 'Technical setup updated successfully',
      data: updatedOnboarding
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Error updating technical setup',
      error: error.message
    });
  }
};

// Schedule training
export const scheduleTraining = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { trainingType, scheduledDate, trainerId, attendees } = req.body;
    const userId = getUserId(req);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
      return;
    }

    const updatePath = `training.${trainingType}`;
    const updateData = {
      [`${updatePath}.status`]: 'Scheduled',
      [`${updatePath}.scheduledDate`]: new Date(scheduledDate),
      [`${updatePath}.trainerId`]: trainerId,
      [`${updatePath}.attendees`]: attendees || 0,
      lastUpdatedBy: userId
    };

    const updatedOnboarding = await Onboarding.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedOnboarding) {
      res.status(404).json({
        success: false,
        message: 'Onboarding case not found'
      });
      return;
    }

    // Log activity
    await logActivity(
      id,
      'Training Scheduled',
      `${trainingType} Scheduled`,
      `Training session "${trainingType}" scheduled for ${new Date(scheduledDate).toLocaleDateString()}`,
      userId,
      [],
      {
        source: 'Web',
        priority: 'Medium',
        nextAction: `Conduct ${trainingType}`,
        nextActionDate: new Date(scheduledDate)
      }
    );

    res.status(200).json({
      success: true,
      message: 'Training scheduled successfully',
      data: updatedOnboarding
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Error scheduling training',
      error: error.message
    });
  }
};

// Complete training
export const completeTraining = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { trainingType, attendees, feedback } = req.body;
    const userId = getUserId(req);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
      return;
    }

    const updatePath = `training.${trainingType}`;
    const updateData = {
      [`${updatePath}.status`]: 'Completed',
      [`${updatePath}.completedDate`]: new Date(),
      [`${updatePath}.attendees`]: attendees,
      lastUpdatedBy: userId
    };

    const updatedOnboarding = await Onboarding.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedOnboarding) {
      res.status(404).json({
        success: false,
        message: 'Onboarding case not found'
      });
      return;
    }

    // Log activity
    await logActivity(
      id,
      'Training Completed',
      `${trainingType} Completed`,
      `Training session "${trainingType}" completed with ${attendees} attendees${feedback ? ` - ${feedback}` : ''}`,
      userId,
      [],
      {
        source: 'Web',
        priority: 'Medium'
      }
    );

    res.status(200).json({
      success: true,
      message: 'Training completed successfully',
      data: updatedOnboarding
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Error completing training',
      error: error.message
    });
  }
};

// Add milestone
export const addMilestone = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, dueDate, assignedTo } = req.body;
    const userId = getUserId(req);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
      return;
    }

    const milestone = {
      name,
      description,
      dueDate: new Date(dueDate),
      assignedTo: assignedTo || userId,
      status: 'Pending'
    };

    const updatedOnboarding = await Onboarding.findByIdAndUpdate(
      id,
      {
        $push: { milestones: milestone },
        lastUpdatedBy: userId
      },
      { new: true }
    );

    if (!updatedOnboarding) {
      res.status(404).json({
        success: false,
        message: 'Onboarding case not found'
      });
      return;
    }

    // Log activity
    await logActivity(
      id,
      'Updated',
      'Milestone Added',
      `New milestone "${name}" added with due date ${new Date(dueDate).toLocaleDateString()}`,
      userId,
      [],
      {
        source: 'Web',
        priority: 'Medium',
        nextAction: name,
        nextActionDate: new Date(dueDate)
      }
    );

    res.status(200).json({
      success: true,
      message: 'Milestone added successfully',
      data: updatedOnboarding
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Error adding milestone',
      error: error.message
    });
  }
};

// Get onboarding activities
export const getOnboardingActivities = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { limit = 50 } = req.query;

    const activities = await Activity.find({
      entityType: 'Onboarding',
      entityId: id,
      isVisible: true
    })
      .populate('performedBy', 'name email')
      .sort({ performedAt: -1 })
      .limit(parseInt(limit as string));

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
};

// Get onboarding dashboard stats
export const getOnboardingDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assignedTo, dateFrom, dateTo } = req.query;

    // Build filter
    const filter: any = {};
    if (assignedTo) filter.assignedTo = assignedTo;
    if (dateFrom || dateTo) {
      filter.startDate = {};
      if (dateFrom) filter.startDate.$gte = new Date(dateFrom as string);
      if (dateTo) filter.startDate.$lte = new Date(dateTo as string);
    }

    // Get basic counts
    const totalOnboardings = await Onboarding.countDocuments(filter);
    const activeOnboardings = await Onboarding.countDocuments({ 
      ...filter, 
      stage: { $nin: ['Completed', 'On-Hold'] } 
    });
    const completedOnboardings = await Onboarding.countDocuments({ 
      ...filter, 
      stage: 'Completed' 
    });
    const onHoldOnboardings = await Onboarding.countDocuments({ 
      ...filter, 
      isOnHold: true 
    });

    // Get stage distribution
    const stageDistribution = await Onboarding.aggregate([
      { $match: filter },
      { $group: { _id: '$stage', count: { $sum: 1 } } }
    ]);

    // Get average progress
    const progressStats = await Onboarding.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          avgProgress: { $avg: '$overallProgress' },
          minProgress: { $min: '$overallProgress' },
          maxProgress: { $max: '$overallProgress' }
        }
      }
    ]);

    // Get contract value stats
    const valueStats = await Onboarding.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalValue: { $sum: '$contractValue' },
          avgValue: { $avg: '$contractValue' },
          minValue: { $min: '$contractValue' },
          maxValue: { $max: '$contractValue' }
        }
      }
    ]);

    // Get completion rate
    const completionRate = totalOnboardings > 0 ? (completedOnboardings / totalOnboardings) * 100 : 0;

    // Get overdue onboardings
    const overdueOnboardings = await Onboarding.countDocuments({
      ...filter,
      expectedCompletionDate: { $lt: new Date() },
      stage: { $ne: 'Completed' }
    });

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalOnboardings,
          activeOnboardings,
          completedOnboardings,
          onHoldOnboardings,
          overdueOnboardings,
          completionRate: Math.round(completionRate * 100) / 100
        },
        distributions: {
          stages: stageDistribution
        },
        progressStats: progressStats[0] || {
          avgProgress: 0,
          minProgress: 0,
          maxProgress: 0
        },
        valueStats: valueStats[0] || {
          totalValue: 0,
          avgValue: 0,
          minValue: 0,
          maxValue: 0
        }
      }
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};
