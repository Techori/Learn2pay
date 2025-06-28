import mongoose from "mongoose";

const InstituteSchema = new mongoose.Schema({
  institute_name: { type: String, required: true },
  institute_type : {type: String, required: true, enum: ['school', 'college', 'university', 'other'] },
  description  :{ type: String, required: false },
  contact_person: {
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
  documents:{
    registerationCertificate: { type: Boolean, required: true, default: false },
    panCard: { type: Boolean, required: true, default: false },
  }
}, { timestamps: true });

export default mongoose.model("Institute", InstituteSchema);
