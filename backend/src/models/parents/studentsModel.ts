import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parentName: { type: String, required: true },
  parentEmail: { type: String, required: true },
  parentPhone: { type: String, required: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  age: { type: Number, required: true },
  grade: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  address: { 
    completeAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
   },
  instituteName: { type: String, required: true },
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

export default Student;