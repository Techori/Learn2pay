import Activity from '../models/activitiesModel';

export interface ActivityLogData {
  entityType: 'Lead' | 'Onboarding';
  entityId: string;
  activityType: string;
  title: string;
  description: string;
  performedBy: string;
  changes?: Array<{
    field: string;
    oldValue: any;
    newValue: any;
  }>;
  metadata?: {
    ipAddress?: string;
    userAgent?: string;
    source?: 'Web' | 'Mobile' | 'API' | 'System';
    duration?: number;
    outcome?: 'Positive' | 'Negative' | 'Neutral' | 'Follow-up Required';
    nextAction?: string;
    nextActionDate?: Date;
    priority?: 'Low' | 'Medium' | 'High' | 'Urgent';
    tags?: string[];
    attachments?: Array<{
      fileName: string;
      fileUrl: string;
      fileType: string;
      fileSize: number;
    }>;
  };
  communication?: {
    type: 'Email' | 'Call' | 'SMS' | 'WhatsApp' | 'Meeting';
    direction: 'Inbound' | 'Outbound';
    participants: string[];
    subject?: string;
    content?: string;
    duration?: number;
    outcome?: string;
    followUpRequired?: boolean;
    followUpDate?: Date;
  };
  document?: {
    documentType: string;
    documentName: string;
    documentUrl?: string;
    status: 'Uploaded' | 'Verified' | 'Rejected';
    verifiedBy?: string;
    rejectionReason?: string;
  };
  milestone?: {
    milestoneName: string;
    dueDate: Date;
    completedDate?: Date;
    status: 'Scheduled' | 'Completed' | 'Overdue' | 'Cancelled';
  };
  isVisible?: boolean;
  visibleTo?: string[];
  isSystemGenerated?: boolean;
}

/**
 * Activity Logger Utility
 * Provides methods to log various types of activities for leads and onboarding
 */
export class ActivityLogger {
  /**
   * Log a general activity
   */
  static async logActivity(data: ActivityLogData): Promise<void> {
    try {
      await Activity.create({
        ...data,
        performedAt: new Date(),
        isVisible: data.isVisible !== false,
        isSystemGenerated: data.isSystemGenerated || false
      });
    } catch (error) {
      console.error('Error logging activity:', error);
      // Don't throw error to prevent breaking the main flow
    }
  }

  /**
   * Log entity creation (Lead or Onboarding)
   */
  static async logCreation(
    entityType: 'Lead' | 'Onboarding',
    entityId: string,
    entityName: string,
    performedBy: string,
    metadata?: any
  ): Promise<void> {
    await this.logActivity({
      entityType,
      entityId,
      activityType: 'Created',
      title: `${entityType} Created`,
      description: `${entityType} "${entityName}" was created`,
      performedBy,
      metadata: {
        source: 'Web',
        priority: 'Medium',
        ...metadata
      }
    });
  }

  /**
   * Log stage changes
   */
  static async logStageChange(
    entityType: 'Lead' | 'Onboarding',
    entityId: string,
    entityName: string,
    oldStage: string,
    newStage: string,
    performedBy: string,
    metadata?: any
  ): Promise<void> {
    await this.logActivity({
      entityType,
      entityId,
      activityType: 'Stage Changed',
      title: `Stage Changed: ${oldStage} → ${newStage}`,
      description: `${entityType} "${entityName}" stage changed from "${oldStage}" to "${newStage}"`,
      performedBy,
      changes: [{
        field: 'stage',
        oldValue: oldStage,
        newValue: newStage
      }],
      metadata: {
        source: 'Web',
        priority: 'Medium',
        ...metadata
      }
    });
  }

  /**
   * Log assignment changes
   */
  static async logAssignment(
    entityType: 'Lead' | 'Onboarding',
    entityId: string,
    entityName: string,
    oldAssignee: string,
    newAssignee: string,
    performedBy: string,
    metadata?: any
  ): Promise<void> {
    await this.logActivity({
      entityType,
      entityId,
      activityType: 'Assigned',
      title: `${entityType} Reassigned`,
      description: `${entityType} "${entityName}" was reassigned`,
      performedBy,
      changes: [{
        field: 'assignedTo',
        oldValue: oldAssignee,
        newValue: newAssignee
      }],
      metadata: {
        source: 'Web',
        priority: 'Medium',
        ...metadata
      }
    });
  }

  /**
   * Log note addition
   */
  static async logNote(
    entityType: 'Lead' | 'Onboarding',
    entityId: string,
    note: string,
    performedBy: string,
    metadata?: any
  ): Promise<void> {
    await this.logActivity({
      entityType,
      entityId,
      activityType: 'Note Added',
      title: 'Note Added',
      description: note,
      performedBy,
      metadata: {
        source: 'Web',
        priority: metadata?.priority || 'Medium',
        nextAction: metadata?.nextAction,
        nextActionDate: metadata?.nextActionDate,
        ...metadata
      }
    });
  }

  /**
   * Log communication activities
   */
  static async logCommunication(
    entityType: 'Lead' | 'Onboarding',
    entityId: string,
    communicationData: {
      type: 'Email' | 'Call' | 'SMS' | 'WhatsApp' | 'Meeting';
      direction: 'Inbound' | 'Outbound';
      subject?: string;
      content?: string;
      participants: string[];
      duration?: number;
      outcome?: string;
      followUpRequired?: boolean;
      followUpDate?: Date;
    },
    performedBy: string,
    metadata?: any
  ): Promise<void> {
    let activityType = 'Other';
    switch (communicationData.type) {
      case 'Call':
        activityType = 'Call Made';
        break;
      case 'Email':
        activityType = 'Email Sent';
        break;
      case 'Meeting':
        activityType = 'Meeting Completed';
        break;
      default:
        activityType = 'Other';
    }

    await this.logActivity({
      entityType,
      entityId,
      activityType,
      title: `${communicationData.type} ${communicationData.direction}`,
      description: communicationData.subject || communicationData.content || `${communicationData.type} communication logged`,
      performedBy,
      communication: communicationData,
      metadata: {
        source: 'Web',
        duration: communicationData.duration,
        outcome: communicationData.outcome,
        nextAction: communicationData.followUpRequired ? 'Follow-up required' : undefined,
        nextActionDate: communicationData.followUpDate,
        ...metadata
      }
    });
  }

  /**
   * Log document activities
   */
  static async logDocument(
    entityType: 'Lead' | 'Onboarding',
    entityId: string,
    documentData: {
      documentType: string;
      documentName: string;
      status: 'Uploaded' | 'Verified' | 'Rejected';
      documentUrl?: string;
      verifiedBy?: string;
      rejectionReason?: string;
    },
    performedBy: string,
    metadata?: any
  ): Promise<void> {
    let activityType = 'Document Uploaded';
    if (documentData.status === 'Verified') activityType = 'Document Verified';
    if (documentData.status === 'Rejected') activityType = 'Document Rejected';

    await this.logActivity({
      entityType,
      entityId,
      activityType,
      title: `${documentData.documentName} ${documentData.status}`,
      description: `Document "${documentData.documentName}" status changed to "${documentData.status}"${documentData.rejectionReason ? ` - ${documentData.rejectionReason}` : ''}`,
      performedBy,
      document: documentData,
      metadata: {
        source: 'Web',
        priority: documentData.status === 'Rejected' ? 'High' : 'Medium',
        ...metadata
      }
    });
  }

  /**
   * Log milestone activities
   */
  static async logMilestone(
    entityType: 'Lead' | 'Onboarding',
    entityId: string,
    milestoneData: {
      milestoneName: string;
      dueDate: Date;
      completedDate?: Date;
      status: 'Scheduled' | 'Completed' | 'Overdue' | 'Cancelled';
    },
    performedBy: string,
    metadata?: any
  ): Promise<void> {
    let activityType = 'Updated';
    let title = 'Milestone Updated';
    
    if (milestoneData.status === 'Scheduled') {
      title = 'Milestone Scheduled';
    } else if (milestoneData.status === 'Completed') {
      title = 'Milestone Completed';
    }

    await this.logActivity({
      entityType,
      entityId,
      activityType,
      title,
      description: `Milestone "${milestoneData.milestoneName}" ${milestoneData.status.toLowerCase()}`,
      performedBy,
      milestone: milestoneData,
      metadata: {
        source: 'Web',
        priority: 'Medium',
        nextAction: milestoneData.status === 'Scheduled' ? milestoneData.milestoneName : undefined,
        nextActionDate: milestoneData.status === 'Scheduled' ? milestoneData.dueDate : undefined,
        ...metadata
      }
    });
  }

  /**
   * Log training activities
   */
  static async logTraining(
    entityType: 'Lead' | 'Onboarding',
    entityId: string,
    trainingData: {
      trainingType: string;
      status: 'Scheduled' | 'In Progress' | 'Completed';
      scheduledDate?: Date;
      completedDate?: Date;
      attendees?: number;
      feedback?: string;
    },
    performedBy: string,
    metadata?: any
  ): Promise<void> {
    let activityType = 'Training Scheduled';
    if (trainingData.status === 'Completed') activityType = 'Training Completed';

    await this.logActivity({
      entityType,
      entityId,
      activityType,
      title: `${trainingData.trainingType} ${trainingData.status}`,
      description: `Training "${trainingData.trainingType}" ${trainingData.status.toLowerCase()}${trainingData.attendees ? ` with ${trainingData.attendees} attendees` : ''}${trainingData.feedback ? ` - ${trainingData.feedback}` : ''}`,
      performedBy,
      metadata: {
        source: 'Web',
        priority: 'Medium',
        nextAction: trainingData.status === 'Scheduled' ? `Conduct ${trainingData.trainingType}` : undefined,
        nextActionDate: trainingData.scheduledDate,
        ...metadata
      }
    });
  }

  /**
   * Log conversion from lead to onboarding
   */
  static async logConversion(
    leadId: string,
    leadName: string,
    onboardingId: string,
    contractValue: number,
    performedBy: string,
    metadata?: any
  ): Promise<void> {
    // Log on the lead
    await this.logActivity({
      entityType: 'Lead',
      entityId: leadId,
      activityType: 'Stage Changed',
      title: 'Lead Converted',
      description: `Lead "${leadName}" has been successfully converted to onboarding`,
      performedBy,
      changes: [{
        field: 'stage',
        oldValue: 'KYC Submitted',
        newValue: 'Converted'
      }],
      metadata: {
        source: 'Web',
        priority: 'High',
        contractValue,
        ...metadata
      }
    });

    // Log on the onboarding
    await this.logActivity({
      entityType: 'Onboarding',
      entityId: onboardingId,
      activityType: 'Created',
      title: 'Onboarding Started',
      description: `Onboarding process started for converted lead "${leadName}"`,
      performedBy,
      metadata: {
        source: 'Web',
        priority: 'High',
        contractValue,
        leadId,
        ...metadata
      }
    });
  }

  /**
   * Get recent activities for dashboard
   */
  static async getRecentActivities(days: number = 7, limit: number = 100): Promise<any[]> {
    try {
      return await Activity.getRecentActivities(days, limit);
    } catch (error) {
      console.error('Error fetching recent activities:', error);
      return [];
    }
  }

  /**
   * Get activities for a specific entity
   */
  static async getEntityActivities(
    entityType: 'Lead' | 'Onboarding',
    entityId: string,
    limit: number = 50
  ): Promise<any[]> {
    try {
      return await Activity.getEntityActivities(entityType, entityId, limit);
    } catch (error) {
      console.error('Error fetching entity activities:', error);
      return [];
    }
  }

  /**
   * Get activities for a specific user
   */
  static async getUserActivities(userId: string, limit: number = 100): Promise<any[]> {
    try {
      return await Activity.getUserActivities(userId, limit);
    } catch (error) {
      console.error('Error fetching user activities:', error);
      return [];
    }
  }

  /**
   * Bulk log system activities
   */
  static async logSystemActivities(activities: ActivityLogData[]): Promise<void> {
    try {
      const activitiesWithDefaults = activities.map(activity => ({
        ...activity,
        performedAt: new Date(),
        isVisible: activity.isVisible !== false,
        isSystemGenerated: true
      }));

      await Activity.insertMany(activitiesWithDefaults);
    } catch (error) {
      console.error('Error bulk logging activities:', error);
    }
  }
}

export default ActivityLogger;
