import mongoose, { Schema, Document } from 'mongoose';

export interface IOnboarding extends Document {
  leadId: Schema.Types.ObjectId;
  instituteId?: Schema.Types.ObjectId; // Will be set when institute is created
  instituteName: string;
  contactPerson: {
    firstName: string;
    lastName: string;
    designation: string;
    email: string;
    phone: string;
  };
  stage: 'Documentation' | 'Setup' | 'Training' | 'Testing' | 'Go-Live' | 'Completed' | 'On-Hold';
  overallProgress: number; // 0-100
  startDate: Date;
  expectedCompletionDate: Date;
  actualCompletionDate?: Date;
  assignedTo: Schema.Types.ObjectId; // Onboarding specialist ID
  contractValue: number;
  
  // Documentation tracking
  documents: {
    registrationCertificate: {
      status: 'Pending' | 'Submitted' | 'Verified' | 'Rejected';
      uploadDate?: Date;
      verifiedDate?: Date;
      rejectionReason?: string;
      documentUrl?: string;
    };
    educationalLicense: {
      status: 'Pending' | 'Submitted' | 'Verified' | 'Rejected';
      uploadDate?: Date;
      verifiedDate?: Date;
      rejectionReason?: string;
      documentUrl?: string;
    };
    panCard: {
      status: 'Pending' | 'Submitted' | 'Verified' | 'Rejected';
      uploadDate?: Date;
      verifiedDate?: Date;
      rejectionReason?: string;
      documentUrl?: string;
    };
    gstCertificate: {
      status: 'Pending' | 'Submitted' | 'Verified' | 'Rejected';
      uploadDate?: Date;
      verifiedDate?: Date;
      rejectionReason?: string;
      documentUrl?: string;
    };
    bankDetails: {
      status: 'Pending' | 'Submitted' | 'Verified' | 'Rejected';
      uploadDate?: Date;
      verifiedDate?: Date;
      rejectionReason?: string;
      accountNumber?: string;
      ifscCode?: string;
      bankName?: string;
    };
    serviceAgreement: {
      status: 'Pending' | 'Sent' | 'Signed' | 'Completed';
      sentDate?: Date;
      signedDate?: Date;
      documentUrl?: string;
    };
  };

  // Technical setup tracking
  technicalSetup: {
    paymentGatewayIntegration: {
      status: 'Pending' | 'In Progress' | 'Testing' | 'Completed';
      startDate?: Date;
      completionDate?: Date;
      gatewayProvider?: string;
      merchantId?: string;
    };
    systemIntegration: {
      status: 'Pending' | 'In Progress' | 'Testing' | 'Completed';
      startDate?: Date;
      completionDate?: Date;
      integrationType?: string;
      apiKeys?: boolean;
    };
    userAccountSetup: {
      status: 'Pending' | 'In Progress' | 'Completed';
      adminAccountCreated: boolean;
      staffAccountsCreated: number;
      parentPortalSetup: boolean;
    };
    feeStructureSetup: {
      status: 'Pending' | 'In Progress' | 'Completed';
      classesConfigured: number;
      feeStructuresCreated: number;
    };
  };

  // Training tracking
  training: {
    adminTraining: {
      status: 'Pending' | 'Scheduled' | 'In Progress' | 'Completed';
      scheduledDate?: Date;
      completedDate?: Date;
      trainerId?: Schema.Types.ObjectId;
      attendees: number;
    };
    staffTraining: {
      status: 'Pending' | 'Scheduled' | 'In Progress' | 'Completed';
      scheduledDate?: Date;
      completedDate?: Date;
      trainerId?: Schema.Types.ObjectId;
      attendees: number;
    };
    parentOrientation: {
      status: 'Pending' | 'Scheduled' | 'In Progress' | 'Completed';
      scheduledDate?: Date;
      completedDate?: Date;
      communicationSent: boolean;
    };
  };

  // Testing phase
  testing: {
    userAcceptanceTesting: {
      status: 'Pending' | 'In Progress' | 'Passed' | 'Failed';
      startDate?: Date;
      completionDate?: Date;
      testCasesTotal?: number;
      testCasesPassed?: number;
      issues?: string[];
    };
    paymentTesting: {
      status: 'Pending' | 'In Progress' | 'Passed' | 'Failed';
      testTransactions: number;
      successfulTransactions: number;
      issues?: string[];
    };
  };

  // Go-live tracking
  goLive: {
    status: 'Pending' | 'Scheduled' | 'In Progress' | 'Completed';
    scheduledDate?: Date;
    actualDate?: Date;
    rollbackPlan: boolean;
    supportTeamAssigned: boolean;
    monitoringSetup: boolean;
  };

  // Support and follow-up
  postGoLiveSupport: {
    supportPeriod: number; // days
    issuesReported: number;
    issuesResolved: number;
    satisfactionScore?: number; // 1-5
    feedbackNotes?: string;
  };

  // Milestones and deadlines
  milestones: [{
    name: string;
    description: string;
    dueDate: Date;
    completedDate?: Date;
    status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
    assignedTo?: Schema.Types.ObjectId;
  }];

  // Risk and escalation
  risks: [{
    description: string;
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    impact: string;
    mitigation: string;
    status: 'Open' | 'In Progress' | 'Resolved';
    identifiedDate: Date;
    resolvedDate?: Date;
  }];

  // Communication log
  communications: [{
    type: 'Email' | 'Call' | 'Meeting' | 'SMS' | 'WhatsApp';
    subject: string;
    content: string;
    sentBy: Schema.Types.ObjectId;
    sentTo: string[];
    sentDate: Date;
    response?: string;
    responseDate?: Date;
  }];

  // Status tracking
  isOnHold: boolean;
  onHoldReason?: string;
  onHoldDate?: Date;
  
  // Metadata
  createdBy: Schema.Types.ObjectId;
  lastUpdatedBy: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const OnboardingSchema: Schema = new Schema({
  leadId: {
    type: Schema.Types.ObjectId,
    ref: 'Lead',
    required: [true, 'Lead ID is required']
  },
  instituteId: {
    type: Schema.Types.ObjectId,
    ref: 'Institute'
  },
  instituteName: {
    type: String,
    required: [true, 'Institute name is required'],
    trim: true
  },
  contactPerson: {
    firstName: {
      type: String,
      required: [true, 'Contact person first name is required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Contact person last name is required'],
      trim: true
    },
    designation: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Contact email is required'],
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Contact phone is required'],
      trim: true
    }
  },
  stage: {
    type: String,
    required: [true, 'Onboarding stage is required'],
    enum: ['Documentation', 'Setup', 'Training', 'Testing', 'Go-Live', 'Completed', 'On-Hold'],
    default: 'Documentation'
  },
  overallProgress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
    default: Date.now
  },
  expectedCompletionDate: {
    type: Date,
    required: [true, 'Expected completion date is required']
  },
  actualCompletionDate: {
    type: Date
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Assigned onboarding specialist is required']
  },
  contractValue: {
    type: Number,
    required: [true, 'Contract value is required'],
    min: [0, 'Contract value cannot be negative']
  },

  // Documentation tracking
  documents: {
    registrationCertificate: {
      status: {
        type: String,
        enum: ['Pending', 'Submitted', 'Verified', 'Rejected'],
        default: 'Pending'
      },
      uploadDate: Date,
      verifiedDate: Date,
      rejectionReason: String,
      documentUrl: String
    },
    educationalLicense: {
      status: {
        type: String,
        enum: ['Pending', 'Submitted', 'Verified', 'Rejected'],
        default: 'Pending'
      },
      uploadDate: Date,
      verifiedDate: Date,
      rejectionReason: String,
      documentUrl: String
    },
    panCard: {
      status: {
        type: String,
        enum: ['Pending', 'Submitted', 'Verified', 'Rejected'],
        default: 'Pending'
      },
      uploadDate: Date,
      verifiedDate: Date,
      rejectionReason: String,
      documentUrl: String
    },
    gstCertificate: {
      status: {
        type: String,
        enum: ['Pending', 'Submitted', 'Verified', 'Rejected'],
        default: 'Pending'
      },
      uploadDate: Date,
      verifiedDate: Date,
      rejectionReason: String,
      documentUrl: String
    },
    bankDetails: {
      status: {
        type: String,
        enum: ['Pending', 'Submitted', 'Verified', 'Rejected'],
        default: 'Pending'
      },
      uploadDate: Date,
      verifiedDate: Date,
      rejectionReason: String,
      accountNumber: String,
      ifscCode: String,
      bankName: String
    },
    serviceAgreement: {
      status: {
        type: String,
        enum: ['Pending', 'Sent', 'Signed', 'Completed'],
        default: 'Pending'
      },
      sentDate: Date,
      signedDate: Date,
      documentUrl: String
    }
  },

  // Technical setup tracking
  technicalSetup: {
    paymentGatewayIntegration: {
      status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Testing', 'Completed'],
        default: 'Pending'
      },
      startDate: Date,
      completionDate: Date,
      gatewayProvider: String,
      merchantId: String
    },
    systemIntegration: {
      status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Testing', 'Completed'],
        default: 'Pending'
      },
      startDate: Date,
      completionDate: Date,
      integrationType: String,
      apiKeys: Boolean
    },
    userAccountSetup: {
      status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
      },
      adminAccountCreated: {
        type: Boolean,
        default: false
      },
      staffAccountsCreated: {
        type: Number,
        default: 0
      },
      parentPortalSetup: {
        type: Boolean,
        default: false
      }
    },
    feeStructureSetup: {
      status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
      },
      classesConfigured: {
        type: Number,
        default: 0
      },
      feeStructuresCreated: {
        type: Number,
        default: 0
      }
    }
  },

  // Training tracking
  training: {
    adminTraining: {
      status: {
        type: String,
        enum: ['Pending', 'Scheduled', 'In Progress', 'Completed'],
        default: 'Pending'
      },
      scheduledDate: Date,
      completedDate: Date,
      trainerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      attendees: {
        type: Number,
        default: 0
      }
    },
    staffTraining: {
      status: {
        type: String,
        enum: ['Pending', 'Scheduled', 'In Progress', 'Completed'],
        default: 'Pending'
      },
      scheduledDate: Date,
      completedDate: Date,
      trainerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      attendees: {
        type: Number,
        default: 0
      }
    },
    parentOrientation: {
      status: {
        type: String,
        enum: ['Pending', 'Scheduled', 'In Progress', 'Completed'],
        default: 'Pending'
      },
      scheduledDate: Date,
      completedDate: Date,
      communicationSent: {
        type: Boolean,
        default: false
      }
    }
  },

  // Testing phase
  testing: {
    userAcceptanceTesting: {
      status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Passed', 'Failed'],
        default: 'Pending'
      },
      startDate: Date,
      completionDate: Date,
      testCasesTotal: Number,
      testCasesPassed: Number,
      issues: [String]
    },
    paymentTesting: {
      status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Passed', 'Failed'],
        default: 'Pending'
      },
      testTransactions: {
        type: Number,
        default: 0
      },
      successfulTransactions: {
        type: Number,
        default: 0
      },
      issues: [String]
    }
  },

  // Go-live tracking
  goLive: {
    status: {
      type: String,
      enum: ['Pending', 'Scheduled', 'In Progress', 'Completed'],
      default: 'Pending'
    },
    scheduledDate: Date,
    actualDate: Date,
    rollbackPlan: {
      type: Boolean,
      default: false
    },
    supportTeamAssigned: {
      type: Boolean,
      default: false
    },
    monitoringSetup: {
      type: Boolean,
      default: false
    }
  },

  // Support and follow-up
  postGoLiveSupport: {
    supportPeriod: {
      type: Number,
      default: 30 // 30 days default
    },
    issuesReported: {
      type: Number,
      default: 0
    },
    issuesResolved: {
      type: Number,
      default: 0
    },
    satisfactionScore: {
      type: Number,
      min: 1,
      max: 5
    },
    feedbackNotes: String
  },

  // Milestones and deadlines
  milestones: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    dueDate: {
      type: Date,
      required: true
    },
    completedDate: Date,
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed', 'Overdue'],
      default: 'Pending'
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }],

  // Risk and escalation
  risks: [{
    description: {
      type: String,
      required: true
    },
    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      required: true
    },
    impact: String,
    mitigation: String,
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Resolved'],
      default: 'Open'
    },
    identifiedDate: {
      type: Date,
      default: Date.now
    },
    resolvedDate: Date
  }],

  // Communication log
  communications: [{
    type: {
      type: String,
      enum: ['Email', 'Call', 'Meeting', 'SMS', 'WhatsApp'],
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    content: String,
    sentBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    sentTo: [String],
    sentDate: {
      type: Date,
      default: Date.now
    },
    response: String,
    responseDate: Date
  }],

  // Status tracking
  isOnHold: {
    type: Boolean,
    default: false
  },
  onHoldReason: String,
  onHoldDate: Date,
  
  // Metadata
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Created by is required']
  },
  lastUpdatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
OnboardingSchema.index({ assignedTo: 1, stage: 1 });
OnboardingSchema.index({ leadId: 1 });
OnboardingSchema.index({ instituteId: 1 });
OnboardingSchema.index({ createdAt: -1 });
OnboardingSchema.index({ expectedCompletionDate: 1 });
OnboardingSchema.index({ stage: 1, overallProgress: 1 });

// Pre-save middleware to calculate overall progress
OnboardingSchema.pre('save', function(this: IOnboarding, next) {
  // Calculate overall progress based on completed tasks
  let totalTasks = 0;
  let completedTasks = 0;

  // Document verification progress
  const docStatuses = Object.values(this.documents);
  docStatuses.forEach((doc: any) => {
    totalTasks++;
    if (doc.status === 'Verified' || doc.status === 'Completed') {
      completedTasks++;
    }
  });

  // Technical setup progress
  const techStatuses = Object.values(this.technicalSetup);
  techStatuses.forEach((tech: any) => {
    totalTasks++;
    if (tech.status === 'Completed') {
      completedTasks++;
    }
  });

  // Training progress
  const trainingStatuses = Object.values(this.training);
  trainingStatuses.forEach((training: any) => {
    totalTasks++;
    if (training.status === 'Completed') {
      completedTasks++;
    }
  });

  // Testing progress
  const testingStatuses = Object.values(this.testing);
  testingStatuses.forEach((test: any) => {
    totalTasks++;
    if (test.status === 'Passed') {
      completedTasks++;
    }
  });

  // Go-live progress
  totalTasks++;
  if (this.goLive.status === 'Completed') {
    completedTasks++;
  }

  // Calculate percentage
  this.overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Update stage based on progress
  if (this.overallProgress === 100) {
    this.stage = 'Completed';
    this.actualCompletionDate = new Date();
  }

  next();
});

export default mongoose.model<IOnboarding>('Onboarding', OnboardingSchema);
