const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Student Schema (copied from the model)
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
});

const Student = mongoose.model("Student", studentSchema);

async function createTestStudent() {
  try {
    // Connect to database
    await mongoose.connect("mongodb://localhost:27017/learn2pay");
    console.log("Connected to MongoDB");

    // Hash password
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Create test student
    const testStudent = new Student({
      name: "John Doe",
      parentName: "Jane Doe",
      parentEmail: "parent@test.com",
      parentPhone: "+1234567890",
      password: hashedPassword,
      dateOfBirth: new Date("2010-01-01"),
      age: 14,
      grade: "9th Grade",
      rollNumber: "TEST001",
      address: {
        completeAddress: "123 Test Street",
        city: "Test City",
        state: "Test State",
        pinCode: "123456",
      },
      instituteName: "Test Institute",
    });

    await testStudent.save();
    console.log("Test student created successfully!");
    console.log("Parent Email: parent@test.com");
    console.log("Password: password123");
  } catch (error) {
    console.error("Error creating test student:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

createTestStudent();
