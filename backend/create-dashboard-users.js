const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User Schema (copied from the model)
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    teamLead: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    institute: { type: mongoose.Schema.Types.ObjectId, ref: "Institute" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

async function createDashboardUsers() {
    try {
        // Connect to database
        await mongoose.connect("mongodb+srv://coderrrx:Passit%401234@learningserver.mu9jzil.mongodb.net/Learn2Pay");
        console.log("Connected to MongoDB");

        // Hash password
        const hashedPassword = await bcrypt.hash("password123", 10);

        // Define users for each dashboard role
        const dashboardUsers = [
            {
                fullName: "John Sales Person",
                email: "salesperson@test.com",
                password: hashedPassword,
                role: "sales_person",
            },
            {
                fullName: "Sarah Sales Manager",
                email: "salesmanager@test.com",
                password: hashedPassword,
                role: "sales_manager",
            },
            {
                fullName: "Michael Admin",
                email: "admin@test.com",
                password: hashedPassword,
                role: "admin",
            },
            {
                fullName: "Lisa Onboarding Specialist",
                email: "onboarding@test.com",
                password: hashedPassword,
                role: "sales_person", // Can handle onboarding
            },
            {
                fullName: "David Support Partner",
                email: "support@test.com",
                password: hashedPassword,
                role: "Support Partner",
            },
            {
                fullName: "Emma Referral Partner",
                email: "referral@test.com",
                password: hashedPassword,
                role: "Referral Partner",
            },
        ];

        // Create users
        for (const userData of dashboardUsers) {
            try {
                // Check if user already exists
                const existingUser = await User.findOne({ email: userData.email });
                if (existingUser) {
                    console.log(`User ${userData.email} already exists, skipping...`);
                    continue;
                }

                const user = new User(userData);
                await user.save();
                console.log(`✅ Created user: ${userData.fullName} (${userData.email})`);
            } catch (error) {
                console.error(`❌ Error creating user ${userData.email}:`, error.message);
            }
        }

        console.log("\n🎉 Dashboard users creation completed!");
        console.log("\n📋 Login Credentials:");
        console.log("=".repeat(50));
        dashboardUsers.forEach(user => {
            console.log(`Role: ${user.role}`);
            console.log(`Email: ${user.email}`);
            console.log(`Password: password123`);
            console.log("-".repeat(30));
        });

    } catch (error) {
        console.error("Error creating dashboard users:", error);
    } finally {
        await mongoose.connection.close();
        console.log("Database connection closed");
    }
}

createDashboardUsers(); 