import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  institute: { type: mongoose.Schema.Types.ObjectId, ref: "Institute" },
  raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, required: true },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Ticket", ticketSchema); 