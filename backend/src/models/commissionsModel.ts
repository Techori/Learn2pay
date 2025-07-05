import mongoose from "mongoose";

const commissionSchema = new mongoose.Schema({
  referralPartner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  institute: { type: mongoose.Schema.Types.ObjectId, ref: "Institute" },
  revenueGenerated: { type: Number, required: true },
  rate: { type: Number, required: true },
  commissionAmt: { type: Number, required: true },
  status: { type: String, required: true },
  payoutDate: { type: Date },
}, { timestamps: true });

export default mongoose.model("Commission", commissionSchema); 