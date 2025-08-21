import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentFee extends Document {
  studentId: string;
  rollNumber: string;
  studentName: string;
  class: string;
  instituteId: Schema.Types.ObjectId;
  feeStructureId: Schema.Types.ObjectId;
  academicYear: string;
  
  // Fee amounts
  totalFeeAmount: number;
  paidAmount: number;
  pendingAmount: number;
  
  // Payment status
  paymentStatus: 'Paid' | 'Partial' | 'Unpaid';
  dueDate: Date;
  
  // Payment history
  payments: [{
    amount: number;
    date: Date;
    method: string;
    transactionId?: string;
    remarks?: string;
  }];
  
  lastPaymentDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const StudentFeeSchema: Schema = new Schema({
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    trim: true
  },
  rollNumber: {
    type: String,
    required: [true, 'Roll number is required'],
    trim: true
  },
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  class: {
    type: String,
    required: [true, 'Class is required'],
    trim: true
  },
  instituteId: {
    type: Schema.Types.ObjectId,
    ref: 'Institute',
    required: [true, 'Institute ID is required']
  },
  feeStructureId: {
    type: Schema.Types.ObjectId,
    ref: 'FeeStructure',
    required: [true, 'Fee structure ID is required']
  },
  academicYear: {
    type: String,
    required: [true, 'Academic year is required'],
    trim: true
  },
  totalFeeAmount: {
    type: Number,
    required: [true, 'Total fee amount is required'],
    min: [0, 'Total fee amount cannot be negative']
  },
  paidAmount: {
    type: Number,
    default: 0,
    min: [0, 'Paid amount cannot be negative']
  },
  pendingAmount: {
    type: Number,
    default: 0,
    min: [0, 'Pending amount cannot be negative']
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Partial', 'Unpaid'],
    default: 'Unpaid'
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  payments: [{
    amount: {
      type: Number,
      required: true,
      min: [0, 'Payment amount cannot be negative']
    },
    date: {
      type: Date,
      default: Date.now
    },
    method: {
      type: String,
      required: true,
      trim: true
    },
    transactionId: {
      type: String,
      trim: true
    },
    remarks: {
      type: String,
      trim: true
    }
  }],
  lastPaymentDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Pre-save middleware to calculate pending amount and payment status
StudentFeeSchema.pre('save', function(this: IStudentFee, next) {
  // Calculate pending amount
  this.pendingAmount = this.totalFeeAmount - this.paidAmount;
  
  // Determine payment status
  if (this.paidAmount === 0) {
    this.paymentStatus = 'Unpaid';
  } else if (this.paidAmount >= this.totalFeeAmount) {
    this.paymentStatus = 'Paid';
  } else {
    this.paymentStatus = 'Partial';
  }
  
  // Set last payment date if there are payments
  if (this.payments && this.payments.length > 0) {
    const lastPayment = this.payments[this.payments.length - 1];
    this.lastPaymentDate = lastPayment.date;
  }
  
  next();
});

// Index for better query performance
StudentFeeSchema.index({ instituteId: 1, academicYear: 1 });
StudentFeeSchema.index({ studentId: 1, instituteId: 1 });
StudentFeeSchema.index({ paymentStatus: 1 });

export default mongoose.model<IStudentFee>('StudentFee', StudentFeeSchema);
