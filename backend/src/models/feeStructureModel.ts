import mongoose, { Schema, Document } from "mongoose";

export interface IFeeItem {
  name: string;
  amount: number;
  type: string;
}

export interface IFeeStructure extends Document {
  class: string;
  tuitionFee: number;
  admissionFee: number;
  examFee: number;
  totalFee: number;
  academicYear: string;
  instituteId: mongoose.Types.ObjectId;
  feeItems: IFeeItem[];
  createdAt: Date;
  updatedAt: Date;
}

const feeItemSchema = new Schema<IFeeItem>({
  name: {
    type: String,
    required: [true, "Fee item name is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"]
  },
  type: {
    type: String,
    enum: ["tuition", "admission", "exam", "other"],
    default: "other"
  }
});

const feeStructureSchema = new Schema<IFeeStructure>(
  {
    class: {
      type: String,
      required: [true, "Class is required"]
    },
    tuitionFee: {
      type: Number,
      required: [true, "Tuition fee is required"]
    },
    admissionFee: {
      type: Number,
      required: [true, "Admission fee is required"]
    },
    examFee: {
      type: Number,
      required: [true, "Exam fee is required"]
    },
    totalFee: {
      type: Number,
      required: [true, "Total fee is required"]
    },
    academicYear: {
      type: String,
      required: [true, "Academic year is required"],
      default: () => {
        const currentYear = new Date().getFullYear();
        return `${currentYear}-${currentYear + 1}`;
      }
    },
    instituteId: {
      type: Schema.Types.ObjectId,
      ref: "Institute",
      required: [true, "Institute ID is required"]
    },
    feeItems: {
      type: [feeItemSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

// Pre-save middleware to calculate total fee
feeStructureSchema.pre("save", function (next) {
  if (this.isModified("tuitionFee") || this.isModified("admissionFee") || this.isModified("examFee")) {
    this.totalFee = this.tuitionFee + this.admissionFee + this.examFee;
  }
  next();
});

const FeeStructure = mongoose.model<IFeeStructure>("FeeStructure", feeStructureSchema);

export default FeeStructure;
