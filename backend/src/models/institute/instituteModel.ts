import mongoose from "mongoose";

const InstituteSchema = new mongoose.Schema(
  {
    instituteName: { type: String, required: true },
    instituteType: {
      type: String,
      required: true,
      enum: ["school", "college", "academy", "gym", "other", "coaching"],
    },
    description: { type: String, required: false },
    contactPerson: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    contactEmail: { type: String, required: true, unique: true },
    contactPhone: { type: String, required: true, unique: true },
    address: {
      completeAddress: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pinCode: { type: String, required: true },
    },
    password: { type: String, required: true },
    documents: {
      registerationCertificate: {
        type: Boolean,
        required: true,
        default: false,
      },
      panCard: { type: Boolean, required: true, default: false },
    },
    documentUrls: {
      affiliationProof: { type: String, default: null },
      panCard: { type: String, default: null },
      gstCertificate: { type: String, default: null },
      otherDocuments: [{ type: String }],
    },
    kycStatus: {
      type: String,
      enum: [
        "not started",
        "pending",
        "under_review",
        "verified",
        "approved",
        "rejected",
      ],
      default: "not started",
      required: true,
    },
    approved: { type: Boolean, default: false },
    premiumPlan: { type: Boolean, default: false },
    salesOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    referralOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

//add funtion to add kyc status to default if not created

export default mongoose.model("Institute", InstituteSchema);
