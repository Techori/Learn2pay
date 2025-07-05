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
  studentId: { type: String },
  class: { type: String },
  admissionDate: { type: Date },
  contact_email: { type: String },
  contact_phone: { type: String },
  contact_address: { type: String },
  contact_parentName: { type: String },
  contact_parentPhone: { type: String },
  contact_parentEmail: { type: String },
  academicStatus_attendance: { type: Number },
  academicStatus_currentGrade: { type: String },
  academicStatus_subjects: { type: Number },
  academicStatus_status: { type: String },
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

export default Student;