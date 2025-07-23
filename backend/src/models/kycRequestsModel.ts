import mongoose from "mongoose";

const kycRequestSchema = new mongoose.Schema({
  institute: { type: mongoose.Schema.Types.ObjectId, ref: "Institute" },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  documents: {
    registrationCertificate: {
      filename: { type: String },
      contentType: { type: String },
      data: { type: Buffer }
    },
    panCard: {
      filename: { type: String },
      contentType: { type: String },
      data: { type: Buffer }
    }
  },
  status: { type: String, required: true, enum: ["not started","pending","under_review","verified","approved","rejected"], default: "not started" },
}, { timestamps: true });

export default mongoose.model("KycRequest", kycRequestSchema); 