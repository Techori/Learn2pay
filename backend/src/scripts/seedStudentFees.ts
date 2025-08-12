import mongoose from 'mongoose';
import StudentFee from '../models/studentFeesModel';
import FeeStructure from '../models/feeStructureModel';
import dotenv from 'dotenv';

dotenv.config();

const seedStudentFees = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Clear existing student fees
    await StudentFee.deleteMany({});
    console.log('Cleared existing student fees');

    // Get some existing fee structures to reference
    const feeStructures = await FeeStructure.find().limit(3);
    
    if (feeStructures.length === 0) {
      console.log('No fee structures found. Please seed fee structures first.');
      process.exit(1);
    }

    // Sample student fees data for R.D Public School
    const studentFeesData = [
      {
        studentId: 'RDP001',
        studentName: 'Aarav Sharma',
        class: '10',
        feeStructureId: feeStructures.find(fs => fs.class === '10')?._id || feeStructures[0]._id,
        academicYear: '2024-2025',
        totalFeeAmount: 25000,
        paidAmount: 15000,
        dueDate: new Date('2024-12-31'),
        payments: [
          {
            amount: 10000,
            date: new Date('2024-06-15'),
            method: 'UPI',
            transactionId: 'UPI001RDP',
            remarks: 'First semester fees'
          },
          {
            amount: 5000,
            date: new Date('2024-07-10'),
            method: 'Net Banking',
            transactionId: 'NB002RDP',
            remarks: 'Partial payment'
          }
        ]
      },
      {
        studentId: 'RDP002',
        studentName: 'Kavya Patel',
        class: '9',
        feeStructureId: feeStructures.find(fs => fs.class === '9')?._id || feeStructures[1]._id,
        academicYear: '2024-2025',
        totalFeeAmount: 23000,
        paidAmount: 23000,
        dueDate: new Date('2024-12-31'),
        payments: [
          {
            amount: 23000,
            date: new Date('2024-06-01'),
            method: 'Bank Transfer',
            transactionId: 'BT003RDP',
            remarks: 'Full year fees paid'
          }
        ]
      }
    ];

    // Use the real institute ID from R.D Public School
    const rdPublicSchoolId = new mongoose.Types.ObjectId('68894466dbc5df2ebf776ba3');

    // Add institute ID to all records and create documents individually to trigger pre-save middleware
    const studentFeesWithInstitute = studentFeesData.map(fee => ({
      ...fee,
      instituteId: rdPublicSchoolId
    }));

    // Insert sample data using individual saves to trigger pre-save middleware
    for (const feeData of studentFeesWithInstitute) {
      const studentFee = new StudentFee(feeData);
      await studentFee.save();
    }
    
    console.log('✅ Student fees seeded successfully!');
    console.log(`📊 Inserted ${studentFeesWithInstitute.length} student fee records`);
    
    // Display summary
    const summary = await StudentFee.aggregate([
      {
        $group: {
          _id: '$paymentStatus',
          count: { $sum: 1 },
          totalAmount: { $sum: '$totalFeeAmount' },
          paidAmount: { $sum: '$paidAmount' }
        }
      }
    ]);
    
    console.log('\n📈 Summary:');
    summary.forEach(item => {
      console.log(`${item._id}: ${item.count} students, Total: ₹${item.totalAmount.toLocaleString()}, Paid: ₹${item.paidAmount.toLocaleString()}`);
    });

  } catch (error) {
    console.error('❌ Error seeding student fees:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seeding function
if (require.main === module) {
  seedStudentFees();
}

export default seedStudentFees;
