import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentId: { type: String, unique: true },
  name: { type: String, required: true },
  parentName: { type: String, required: true },
  parentEmail: { type: String, required: true },
  parentPhone: { type: String, required: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  age: { type: Number, required: true },
  grade: { type: String, required: true },
  section: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  address: {
    completeAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
  },
  instituteName: { type: String, required: true },
  admissionDate: { type: Date, required: true },
}, { timestamps: true });

studentSchema.pre('save', async function (next) {
  try {
    // Get current year
    const currentYear = new Date().getFullYear();

    // Get institute abbreviation (first 3 letters, uppercase)
    const instituteAbbr = this.instituteName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 3);

    // Get grade and section
    const gradeSection = `${this.grade}${this.section}`;

    // Use roll number as part of the ID
    const rollNumberPart = this.rollNumber.padStart(3, '0');

    // Format: INST-GRADE-YEAR-ROLL (e.g., ABC-5A-2024-001)
    this.studentId = `${instituteAbbr}-${gradeSection}-${currentYear}-${rollNumberPart}`;

    next();
  } catch (error) {
    console.log("model error: ", (error as Error).message);
    next(error as Error);
  }

  studentSchema.post('save', function(doc) {
    if (!doc.studentId) {
      throw new Error('Student ID not generated');
    }
  })
});

const Student = mongoose.model("Student", studentSchema);

export default Student;