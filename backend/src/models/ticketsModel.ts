import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  institute: { type: String }, // Changed from ObjectId to String for institute name
  raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: { type: String, required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    required: true,
    enum: ['New', 'In Progress', 'Resolved', 'Closed'],
    default: 'New'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Ticket", ticketSchema);