import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IInstituteUser extends Document {
  name: string;
  email: string;
  contact?: string;
  password: string;
  role: 'Principal' | 'Accountant' | 'Teacher' | 'Office Staff' | 'Admin';
  status: 'Active' | 'Inactive';
  instituteId: Schema.Types.ObjectId;
  permissions: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const InstituteUserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  contact: {
    type: String,
    trim: true,
    match: [/^\d{10,15}$/, 'Please enter a valid contact number']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['Principal', 'Accountant', 'Teacher', 'Office Staff', 'Admin'],
    required: [true, 'Role is required']
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  instituteId: {
    type: Schema.Types.ObjectId,
    ref: 'Institute',
    required: [true, 'Institute ID is required']
  },
  permissions: {
    type: String,
    default: 'Basic Access'
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better query performance
InstituteUserSchema.index({ email: 1 });
InstituteUserSchema.index({ instituteId: 1 });
InstituteUserSchema.index({ instituteId: 1, role: 1 });

// Hash password before saving
InstituteUserSchema.pre('save', async function(this: IInstituteUser, next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
InstituteUserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
InstituteUserSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const InstituteUser = mongoose.model<IInstituteUser>('InstituteUser', InstituteUserSchema);

export default InstituteUser;
