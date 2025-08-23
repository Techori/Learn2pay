import { Request, Response } from 'express';
import Lead from '../models/leadsModel';
import Activity from '../models/activitiesModel';
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
      entityType: 'Lead',
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

// Get all leads with filtering and pagination
export const getAllLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 10,
      stage,
      priority,
      assignedTo,
      leadSource,
      dateFrom,
      dateTo,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;
    
    // Build filter object
    const filter: any = {};
    
    if (stage) filter.stage = stage;
    if (priority) filter.priority = priority;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (leadSource) filter.leadSource = leadSource;

    // Date range filter
    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom as string);
      if (dateTo) filter.createdAt.$lte = new Date(dateTo as string);
    }

    // Search filter
    if (search) {
      filter.$or = [
        { leadName: { $regex: search, $options: 'i' } },
        { instituteName: { $regex: search, $options: 'i' } },
        { contactEmail: { $regex: search, $options: 'i' } },
        { 'contactPerson.firstName': { $regex: search, $options: 'i' } },
        { 'contactPerson.lastName': { $regex: search, $options: 'i' } }
      ];
    }
    
    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Sort
    const sort: any = {};
    sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;
    
    const leads = await Lead.find(filter)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .sort(sort)
      .skip(skip)
      .limit(limitNum);
    
    const total = await Lead.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: leads,
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

// Get lead by ID
export const getLeadById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const lead = await Lead.findById(id)
      .populate('assignedTo', 'name email phone')
      .populate('createdBy', 'name email');
    
    if (!lead) {
      res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: lead
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create new lead
export const createLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const leadData = req.body;
    const userId = getUserId(req);
    
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
      return;
    }
    
    // Set created by
    leadData.createdBy = userId;

    // If no assignedTo provided, assign to creator
    if (!leadData.assignedTo) {
      leadData.assignedTo = userId;
    }

    const lead = await Lead.create(leadData);

    // Populate the created lead
    const populatedLead = await Lead.findById(lead._id)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');

    // Log activity
    await logActivity(
      (lead._id as any).toString(),
      'Created',
      'Lead Created',
      `New lead "${lead.leadName}" was created`,
      userId,
      [],
      {
        source: 'Web',
        priority: lead.priority
      }
    );
    
    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: populatedLead
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Validation Error',
      error: error.message
    });
  }
};

// Update lead
export const updateLead = async (req: Request, res: Response): Promise<void> => {
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
    
    // Get the current lead to track changes
    const currentLead = await Lead.findById(id);
    if (!currentLead) {
      res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
      return;
    }
    
    // Track changes
    const changes: any[] = [];
    Object.keys(updateData).forEach(key => {
      if (currentLead[key as keyof typeof currentLead] !== updateData[key]) {
        changes.push({
          field: key,
          oldValue: currentLead[key as keyof typeof currentLead],
          newValue: updateData[key]
        });
      }
    });

    const lead = await Lead.findByIdAndUpdate(
      id,
      { ...updateData, lastActivityDate: new Date() },
      { new: true, runValidators: true }
    )
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');

    if (!lead) {
      res.status(404).json({
          success: false,
        message: 'Lead not found'
        });
        return;
      }

    // Log activity for significant changes
    if (changes.length > 0) {
      let activityType = 'Updated';
      let title = 'Lead Updated';
      let description = `Lead "${lead.leadName}" was updated`;

      // Special handling for stage changes
      const stageChange = changes.find(c => c.field === 'stage');
      if (stageChange) {
        activityType = 'Stage Changed';
        title = `Stage Changed: ${stageChange.oldValue} → ${stageChange.newValue}`;
        description = `Lead stage changed from "${stageChange.oldValue}" to "${stageChange.newValue}"`;
      }

      // Special handling for assignment changes
      const assignmentChange = changes.find(c => c.field === 'assignedTo');
      if (assignmentChange) {
        activityType = 'Assigned';
        title = 'Lead Reassigned';
        description = `Lead was reassigned to a new salesperson`;
      }

      await logActivity(
        (lead._id as any).toString(),
        activityType,
        title,
        description,
        userId,
        changes,
        {
          source: 'Web',
          priority: lead.priority
        }
      );
    }
    
    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: lead
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Validation Error',
      error: error.message
    });
  }
};

// Delete lead
export const deleteLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = getUserId(req);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
      return;
    }

    const lead = await Lead.findById(id);
    if (!lead) {
      res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
      return;
    }

    await Lead.findByIdAndDelete(id);

    // Log activity
    await logActivity(
      id,
      'Updated',
      'Lead Deleted',
      `Lead "${lead.leadName}" was deleted`,
      userId,
      [],
      {
        source: 'Web',
        priority: 'High'
      }
    );

    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully'
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Add note to lead
export const addNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { note, priority, nextAction, nextActionDate } = req.body;
    const userId = getUserId(req);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
      return;
    }

    const lead = await Lead.findById(id);
    if (!lead) {
      res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
      return;
    }

    // Update lead with new activity date
    await Lead.findByIdAndUpdate(id, { lastActivityDate: new Date() });

    // Log activity
    await logActivity(
      id,
      'Note Added',
      'Note Added',
      note,
      userId,
      [],
      {
        source: 'Web',
        priority: priority || 'Medium',
        nextAction,
        nextActionDate: nextActionDate ? new Date(nextActionDate) : undefined
      }
    );

    res.status(200).json({
      success: true,
      message: 'Note added successfully'
    });

  } catch (error: any) {
      res.status(400).json({
        success: false,
      message: 'Error adding note',
      error: error.message
    });
  }
};

// Log communication activity
export const logCommunication = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      type,
      direction,
      subject,
      content,
      duration,
      outcome,
      participants,
      followUpRequired,
      followUpDate
    } = req.body;
    const userId = getUserId(req);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
      return;
    }
    
    const lead = await Lead.findById(id);
    if (!lead) {
      res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
      return;
    }

    // Update lead with new activity date
    await Lead.findByIdAndUpdate(id, { lastActivityDate: new Date() });

    // Determine activity type based on communication type
    let activityType = 'Other';
    switch (type) {
      case 'Call':
        activityType = 'Call Made';
        break;
      case 'Email':
        activityType = 'Email Sent';
        break;
      case 'Meeting':
        activityType = 'Meeting Completed';
        break;
    }

    // Log activity
    await logActivity(
      id,
      activityType,
      `${type} ${direction}`,
      subject || content || `${type} communication logged`,
      userId,
      [],
      {
        source: 'Web',
        duration,
        outcome,
        nextAction: followUpRequired ? 'Follow-up required' : undefined,
        nextActionDate: followUpDate ? new Date(followUpDate) : undefined
      }
    );

    res.status(200).json({
      success: true,
      message: 'Communication logged successfully'
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Error logging communication',
      error: error.message
    });
  }
};

// Get lead activities
export const getLeadActivities = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { limit = 50 } = req.query;

    const activities = await Activity.find({
      entityType: 'Lead',
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

// Get leads dashboard stats
export const getLeadsDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assignedTo, dateFrom, dateTo } = req.query;

    // Build filter
    const filter: any = {};
    if (assignedTo) filter.assignedTo = assignedTo;
    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom as string);
      if (dateTo) filter.createdAt.$lte = new Date(dateTo as string);
    }

    // Get basic counts
    const totalLeads = await Lead.countDocuments(filter);
    const newLeads = await Lead.countDocuments({ ...filter, stage: 'New' });
    const contactedLeads = await Lead.countDocuments({ ...filter, stage: 'Contacted' });
    const convertedLeads = await Lead.countDocuments({ ...filter, stage: 'Converted' });
    const lostLeads = await Lead.countDocuments({ ...filter, stage: 'Lost' });

    // Get stage distribution
    const stageDistribution = await Lead.aggregate([
      { $match: filter },
      { $group: { _id: '$stage', count: { $sum: 1 } } }
    ]);

    // Get priority distribution
    const priorityDistribution = await Lead.aggregate([
      { $match: filter },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    // Get source distribution
    const sourceDistribution = await Lead.aggregate([
      { $match: filter },
      { $group: { _id: '$leadSource', count: { $sum: 1 } } }
    ]);

    // Get estimated value stats
    const valueStats = await Lead.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalValue: { $sum: '$estimatedValue' },
          avgValue: { $avg: '$estimatedValue' },
          minValue: { $min: '$estimatedValue' },
          maxValue: { $max: '$estimatedValue' }
        }
      }
    ]);

    // Get conversion rate
    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
    
    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalLeads,
          newLeads,
          contactedLeads,
          convertedLeads,
          lostLeads,
          conversionRate: Math.round(conversionRate * 100) / 100
        },
        distributions: {
          stages: stageDistribution,
          priorities: priorityDistribution,
          sources: sourceDistribution
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

// Update lead stage only
export const updateLeadStage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { stage, reason } = req.body;
    const userId = getUserId(req);
    
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
      return;
    }
    
    if (!stage) {
      res.status(400).json({
        success: false,
        message: 'Stage is required'
      });
      return;
    }
    
    // Get the current lead to track changes
    const currentLead = await Lead.findById(id);
    if (!currentLead) {
      res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
      return;
    }
    
    const updateData: any = {
      stage,
      lastActivityDate: new Date()
    };

    // If marking as lost, add lost reason
    if (stage === 'Lost' && reason) {
      updateData.lostReason = reason;
    }

    // If converting, add converted date
    if (stage === 'Converted') {
      updateData.convertedDate = new Date();
    }

    const lead = await Lead.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');
    
    if (!lead) {
      res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
      return;
    }

    // Log stage change activity
    await logActivity(
      (lead._id as any).toString(),
      'Stage Changed',
      `Stage Changed: ${currentLead.stage} → ${stage}`,
      `Lead stage changed from "${currentLead.stage}" to "${stage}"${reason ? ` - ${reason}` : ''}`,
      userId,
      [
        {
          field: 'stage',
          oldValue: currentLead.stage,
          newValue: stage
        }
      ],
      {
        source: 'Web',
        priority: lead.priority
      }
    );
    
    res.status(200).json({
      success: true,
      message: 'Lead stage updated successfully',
      data: lead
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Error updating lead stage',
      error: error.message
    });
  }
};

// Convert lead to onboarding
export const convertLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { contractValue, expectedCompletionDate, assignedTo } = req.body;
    const userId = getUserId(req);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
      return;
    }

    const lead = await Lead.findById(id);
    if (!lead) {
      res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
      return;
    }

    // Update lead status to converted
    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      {
        stage: 'Converted',
        convertedDate: new Date(),
        lastActivityDate: new Date()
      },
      { new: true }
    );

    // Log conversion activity
    await logActivity(
      id,
      'Stage Changed',
      'Lead Converted',
      `Lead "${lead.leadName}" has been successfully converted to onboarding`,
      userId,
      [
        {
          field: 'stage',
          oldValue: lead.stage,
          newValue: 'Converted'
        }
      ],
      {
        source: 'Web',
        priority: 'High',
        contractValue
      }
    );

    res.status(200).json({
      success: true,
      message: 'Lead converted successfully',
      data: {
        lead: updatedLead,
        onboardingData: {
          leadId: lead._id,
          instituteName: lead.instituteName,
          contactPerson: lead.contactPerson,
          contractValue,
          expectedCompletionDate,
          assignedTo
        }
      }
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Error converting lead',
      error: error.message
    });
  }
};