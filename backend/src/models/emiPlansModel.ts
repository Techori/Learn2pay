import mongoose from "mongoose";

const emiPlanSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  totalAmount: { type: Number, required: true },
  monthlyEmi: { type: Number, required: true },
  tenureMonths: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  startDate: { type: Date, required: true },
  status: { type: String, required: true },
  autoPayActive: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("EmiPlan", emiPlanSchema); 