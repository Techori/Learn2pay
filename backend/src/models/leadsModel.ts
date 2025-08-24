import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  leadName: string;
  instituteName: string;
  contactPerson: {
    firstName: string;
    lastName: string;
    designation: string;
  };
  contactEmail: string;
  contactPhone: string;
  address: {
    completeAddress: string;
    city: string;
    state: string;
    pinCode: string;
  };
  instituteType: 'school' | 'college' | 'academy' | 'coaching' | 'other';
  stage: 'New' | 'Contacted' | 'Demo Scheduled' | 'Demo Completed' | 'Proposal Sent' | 'Negotiation' | 'KYC Submitted' | 'Converted' | 'Lost';
  priority: 'High' | 'Medium' | 'Low';
  assignedTo: Schema.Types.ObjectId; // Sales person ID
  leadSource: 'Website' | 'Cold Call' | 'Referral' | 'Social Media' | 'Advertisement' | 'Event' | 'Other';
  estimatedValue: number;
  expectedCloseDate: Date;
  lastActivityDate: Date;
  tags: string[];
  notes: string;
  lostReason?: string;
  convertedDate?: Date;
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema = new Schema({
  leadName: {
    type: String,
    required: [true, 'Lead name is required'],
    trim: true
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
    }
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  contactPhone: {
    type: String,
    required: [true, 'Contact phone is required'],
    trim: true
  },
  address: {
    completeAddress: {
      type: String,
      required: [true, 'Complete address is required'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true
    },
    pinCode: {
      type: String,
      required: [true, 'Pin code is required'],
      trim: true
    }
  },
  instituteType: {
    type: String,
    required: [true, 'Institute type is required'],
    enum: ['school', 'college', 'academy', 'coaching', 'other']
  },
  stage: {
    type: String,
    required: [true, 'Lead stage is required'],
    enum: ['New', 'Contacted', 'Demo Scheduled', 'Demo Completed', 'Proposal Sent', 'Negotiation', 'KYC Submitted', 'Converted', 'Lost'],
    default: 'New'
  },
  priority: {
    type: String,
    required: [true, 'Priority is required'],
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Assigned salesperson is required']
  },
  leadSource: {
    type: String,
    required: [true, 'Lead source is required'],
    enum: ['Website', 'Cold Call', 'Referral', 'Social Media', 'Advertisement', 'Event', 'Other'],
    default: 'Website'
  },
  estimatedValue: {
    type: Number,
    required: [true, 'Estimated value is required'],
    min: [0, 'Estimated value cannot be negative']
  },
  expectedCloseDate: {
    type: Date,
    required: [true, 'Expected close date is required']
  },
  lastActivityDate: {
    type: Date,
    default: Date.now
  },
  tags: [{
    type: String,
    trim: true
  }],
  notes: {
    type: String,
    trim: true
  },
  lostReason: {
    type: String,
    trim: true
  },
  convertedDate: {
    type: Date
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Created by is required']
  }
}, {
  timestamps: true
});

// Indexes for better query performance
LeadSchema.index({ assignedTo: 1, stage: 1 });
LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ lastActivityDate: -1 });
LeadSchema.index({ stage: 1, priority: 1 });

// Pre-save middleware to update lastActivityDate when stage changes
LeadSchema.pre('save', function(this: ILead, next) {
  if (this.isModified('stage')) {
    this.lastActivityDate = new Date();
  }
  next();
});

export default mongoose.model<ILead>('Lead', LeadSchema);