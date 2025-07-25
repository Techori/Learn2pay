import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  teamLead: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  institute: { type: mongoose.Schema.Types.ObjectId, ref: "Institute" },
}, { timestamps: true });

export default mongoose.model("User", userSchema); 