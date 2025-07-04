import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  leadName: { type: String, required: true },
  instituteName: { type: String, required: true },
  contactPhone: { type: String, required: true },
  salesOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  stage: { type: String, required: true },
  lastUpdated: { type: Date },
}, { timestamps: true });

export default mongoose.model("Lead", leadSchema); 