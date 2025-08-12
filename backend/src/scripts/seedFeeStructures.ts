import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FeeStructure from '../models/feeStructureModel';
import Institute from '../models/institute/instituteModel';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/learn2pay');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Sample fee structures
const seedFeeStructures = async (): Promise<void> => {
  try {
    await connectDB();
    
    // Clear existing fee structures
    await FeeStructure.deleteMany({});
    console.log('Cleared existing fee structures');
    
    // Get all institutes
    const institutes = await Institute.find({}).select('_id instituteName');
    
    if (institutes.length === 0) {
      console.log('No institutes found. Please add institutes first.');
      process.exit(0);
    }
    
    // Create fee structures for each institute
    const currentYear = new Date().getFullYear();
    const academicYear = `${currentYear}-${currentYear + 1}`;
    
    for (const institute of institutes) {
      console.log(`Creating fee structures for institute: ${institute.instituteName}`);
      
      // Class 8
      await FeeStructure.create({
        class: '8',
        tuitionFee: 13000,
        admissionFee: 5000,
        examFee: 2000,
        totalFee: 20000,
        academicYear,
        instituteId: institute._id,
        feeItems: [
          { name: 'Tuition Fee', amount: 13000, type: 'tuition' },
          { name: 'Admission Fee', amount: 5000, type: 'admission' },
          { name: 'Examination Fee', amount: 2000, type: 'exam' }
        ]
      });
      
      // Class 9
      await FeeStructure.create({
        class: '9',
        tuitionFee: 14000,
        admissionFee: 5000,
        examFee: 2000,
        totalFee: 21000,
        academicYear,
        instituteId: institute._id,
        feeItems: [
          { name: 'Tuition Fee', amount: 14000, type: 'tuition' },
          { name: 'Admission Fee', amount: 5000, type: 'admission' },
          { name: 'Examination Fee', amount: 2000, type: 'exam' }
        ]
      });
      
      // Class 10
      await FeeStructure.create({
        class: '10',
        tuitionFee: 15000,
        admissionFee: 5000,
        examFee: 2000,
        totalFee: 22000,
        academicYear,
        instituteId: institute._id,
        feeItems: [
          { name: 'Tuition Fee', amount: 15000, type: 'tuition' },
          { name: 'Admission Fee', amount: 5000, type: 'admission' },
          { name: 'Examination Fee', amount: 2000, type: 'exam' }
        ]
      });
    }
    
    console.log(`Created fee structures for ${institutes.length} institutes`);
    
    // Disconnect from database
    await mongoose.disconnect();
    console.log('Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding fee structures:', error);
    process.exit(1);
  }
};

seedFeeStructures();
