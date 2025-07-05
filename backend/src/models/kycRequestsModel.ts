import mongoose from "mongoose";

const kycRequestSchema = new mongoose.Schema({
  institute: { type: mongoose.Schema.Types.ObjectId, ref: "Institute" },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  files: [{ type: String }],
  status: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("KycRequest", kycRequestSchema); 