import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  entityType: 'Lead' | 'Onboarding';
  entityId: Schema.Types.ObjectId;
  activityType: 'Created' | 'Updated' | 'Stage Changed' | 'Assigned' | 'Note Added' | 'Document Uploaded' | 'Document Verified' | 'Document Rejected' | 'Call Made' | 'Email Sent' | 'Meeting Scheduled' | 'Meeting Completed' | 'Demo Scheduled' | 'Demo Completed' | 'Proposal Sent' | 'Contract Signed' | 'Payment Received' | 'Training Scheduled' | 'Training Completed' | 'Testing Started' | 'Testing Completed' | 'Go-Live Scheduled' | 'Go-Live Completed' | 'Issue Reported' | 'Issue Resolved' | 'Feedback Received' | 'Other';
  title: string;
  description: string;
  performedBy: Schema.Types.ObjectId;
  performedAt: Date;
  
  // Previous and new values for tracking changes
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];

  // Additional metadata
  metadata: {
    ipAddress?: string;
    userAgent?: string;
    source?: 'Web' | 'Mobile' | 'API' | 'System';
    duration?: number; // For calls, meetings, demos
    outcome?: 'Positive' | 'Negative' | 'Neutral' | 'Follow-up Required';
    nextAction?: string;
    nextActionDate?: Date;
    priority?: 'Low' | 'Medium' | 'High' | 'Urgent';
    tags?: string[];
    attachments?: {
      fileName: string;
      fileUrl: string;
      fileType: string;
      fileSize: number;
    }[];
  };

  // For communication activities
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

  // For document activities
  document?: {
    documentType: string;
    documentName: string;
    documentUrl?: string;
    status: 'Uploaded' | 'Verified' | 'Rejected';
    verifiedBy?: Schema.Types.ObjectId;
    rejectionReason?: string;
  };

  // For milestone activities
  milestone?: {
    milestoneName: string;
    dueDate: Date;
    completedDate?: Date;
    status: 'Scheduled' | 'Completed' | 'Overdue' | 'Cancelled';
  };

  // Visibility and permissions
  isVisible: boolean;
  visibleTo: Schema.Types.ObjectId[]; // User IDs who can see this activity
  isSystemGenerated: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema: Schema = new Schema({
  entityType: {
    type: String,
    required: [true, 'Entity type is required'],
    enum: ['Lead', 'Onboarding']
  },
  entityId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Entity ID is required'],
    refPath: 'entityType'
  },
  activityType: {
    type: String,
    required: [true, 'Activity type is required'],
    enum: [
      'Created', 'Updated', 'Stage Changed', 'Assigned', 'Note Added',
      'Document Uploaded', 'Document Verified', 'Document Rejected',
      'Call Made', 'Email Sent', 'Meeting Scheduled', 'Meeting Completed',
      'Demo Scheduled', 'Demo Completed', 'Proposal Sent', 'Contract Signed',
      'Payment Received', 'Training Scheduled', 'Training Completed',
      'Testing Started', 'Testing Completed', 'Go-Live Scheduled', 'Go-Live Completed',
      'Issue Reported', 'Issue Resolved', 'Feedback Received', 'Other'
    ]
  },
  title: {
    type: String,
    required: [true, 'Activity title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Activity description is required'],
    trim: true
  },
  performedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Performed by is required']
  },
  performedAt: {
    type: Date,
    required: [true, 'Performed at is required'],
    default: Date.now
  },

  // Previous and new values for tracking changes
  changes: [{
    field: {
      type: String,
      required: true
    },
    oldValue: Schema.Types.Mixed,
    newValue: Schema.Types.Mixed
  }],

  // Additional metadata
  metadata: {
    ipAddress: String,
    userAgent: String,
    source: {
      type: String,
      enum: ['Web', 'Mobile', 'API', 'System'],
      default: 'Web'
    },
    duration: Number, // in minutes
    outcome: {
      type: String,
      enum: ['Positive', 'Negative', 'Neutral', 'Follow-up Required']
    },
    nextAction: String,
    nextActionDate: Date,
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent']
    },
    tags: [String],
    attachments: [{
      fileName: {
        type: String,
        required: true
      },
      fileUrl: {
        type: String,
        required: true
      },
      fileType: String,
      fileSize: Number
    }]
  },

  // For communication activities
  communication: {
    type: {
      type: String,
      enum: ['Email', 'Call', 'SMS', 'WhatsApp', 'Meeting']
    },
    direction: {
      type: String,
      enum: ['Inbound', 'Outbound']
    },
    participants: [String],
    subject: String,
    content: String,
    duration: Number, // in minutes
    outcome: String,
    followUpRequired: {
      type: Boolean,
      default: false
    },
    followUpDate: Date
  },

  // For document activities
  document: {
    documentType: String,
    documentName: String,
    documentUrl: String,
    status: {
      type: String,
      enum: ['Uploaded', 'Verified', 'Rejected']
    },
    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    rejectionReason: String
  },

  // For milestone activities
  milestone: {
    milestoneName: String,
    dueDate: Date,
    completedDate: Date,
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Overdue', 'Cancelled']
    }
  },

  // Visibility and permissions
  isVisible: {
    type: Boolean,
    default: true
  },
  visibleTo: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  isSystemGenerated: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for better query performance
ActivitySchema.index({ entityType: 1, entityId: 1, performedAt: -1 });
ActivitySchema.index({ performedBy: 1, performedAt: -1 });
ActivitySchema.index({ activityType: 1, performedAt: -1 });
ActivitySchema.index({ 'metadata.priority': 1, performedAt: -1 });
ActivitySchema.index({ isVisible: 1, performedAt: -1 });

// Static method to log activity
ActivitySchema.statics.logActivity = function(activityData: Partial<IActivity>) {
  return this.create({
    ...activityData,
    performedAt: new Date(),
    isVisible: activityData.isVisible !== false,
    isSystemGenerated: activityData.isSystemGenerated || false
  });
};

// Static method to get activities for an entity
ActivitySchema.statics.getEntityActivities = function(entityType: string, entityId: string, limit = 50) {
  return this.find({
    entityType,
    entityId,
    isVisible: true
  })
  .populate('performedBy', 'name email')
  .populate('document.verifiedBy', 'name email')
  .sort({ performedAt: -1 })
  .limit(limit);
};

// Static method to get user activities
ActivitySchema.statics.getUserActivities = function(userId: string, limit = 100) {
  return this.find({
    performedBy: userId,
    isVisible: true
  })
  .populate('performedBy', 'name email')
  .sort({ performedAt: -1 })
  .limit(limit);
};

// Static method to get activities by type
ActivitySchema.statics.getActivitiesByType = function(activityType: string, limit = 100) {
  return this.find({
    activityType,
    isVisible: true
  })
  .populate('performedBy', 'name email')
  .sort({ performedAt: -1 })
  .limit(limit);
};

// Static method to get recent activities
ActivitySchema.statics.getRecentActivities = function(days = 7, limit = 100) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return this.find({
    performedAt: { $gte: startDate },
    isVisible: true
  })
  .populate('performedBy', 'name email')
  .sort({ performedAt: -1 })
  .limit(limit);
};

export default mongoose.model<IActivity>('Activity', ActivitySchema);
