import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  emiPlan: { type: mongoose.Schema.Types.ObjectId, ref: "EmiPlan" },
  institute: { type: mongoose.Schema.Types.ObjectId, ref: "Institute" },
  amount: { type: Number, required: true },
  dueForMonth: { type: String, required: true },
  paidOn: { type: Date },
  status: { type: String, required: true },
  paymentMethod: { type: String },
  receiptUrl: { type: String },
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema); 