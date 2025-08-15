import mongoose from 'mongoose';
import InstituteUser from '../models/instituteUserModel';
import dotenv from 'dotenv';

dotenv.config();

const seedInstituteUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Clear existing institute users
    await InstituteUser.deleteMany({});
    console.log('Cleared existing institute users');

    // Use the R.D Public School institute ID
    const rdPublicSchoolId = new mongoose.Types.ObjectId('68894466dbc5df2ebf776ba3');

    // Sample institute users data
    const instituteUsersData = [
      {
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh@nps.edu',
        contact: '9876543210',
        password: 'password123',
        role: 'Principal',
        status: 'Active',
        instituteId: rdPublicSchoolId,
        permissions: 'Full Access',
        lastLogin: new Date('2024-08-15T09:30:00Z')
      },
      {
        name: 'Mrs. Priya Sharma',
        email: 'priya@nps.edu',
        contact: '9876543211',
        password: 'password123',
        role: 'Accountant',
        status: 'Active',
        instituteId: rdPublicSchoolId,
        permissions: 'Fee Management, Reports',
        lastLogin: new Date('2024-08-15T08:45:00Z')
      },
      {
        name: 'Mr. Amit Singh',
        email: 'amit@nps.edu',
        contact: '9876543212',
        password: 'password123',
        role: 'Teacher',
        status: 'Active',
        instituteId: rdPublicSchoolId,
        permissions: 'Student Management, Attendance',
        lastLogin: new Date('2024-08-14T18:00:00Z')
      },
      {
        name: 'Ms. Sunita Patel',
        email: 'sunita@nps.edu',
        contact: '9876543213',
        password: 'password123',
        role: 'Office Staff',
        status: 'Inactive',
        instituteId: rdPublicSchoolId,
        permissions: 'Basic Access',
        lastLogin: new Date('2024-08-12T10:00:00Z')
      }
    ];

    // Insert sample data using individual saves to trigger pre-save middleware for password hashing
    for (const userData of instituteUsersData) {
      const user = new InstituteUser(userData);
      await user.save();
    }
    
    console.log('✅ Institute users seeded successfully!');
    console.log(`📊 Inserted ${instituteUsersData.length} institute user records`);
    
    // Display summary
    const summary = await InstituteUser.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
          active: {
            $sum: { $cond: [{ $eq: ['$status', 'Active'] }, 1, 0] }
          }
        }
      }
    ]);
    
    console.log('\n📈 Summary by Role:');
    summary.forEach(item => {
      console.log(`${item._id}: ${item.count} users (${item.active} active)`);
    });

  } catch (error) {
    console.error('❌ Error seeding institute users:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seeding function
if (require.main === module) {
  seedInstituteUsers();
}

export default seedInstituteUsers;
