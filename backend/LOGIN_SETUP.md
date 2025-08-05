# Login Data Setup Guide

This guide explains how to add login data for all dashboard roles in the Learn2Pay application.

## Dashboard Roles

The application supports the following dashboard roles:
- **Salesperson** - Sales team member
- **Sales Admin** - Sales team manager
- **Super Admin** - System administrator
- **Referral Partner** - Referral program partner
- **Support Partner** - Customer support team

## Method 1: Using the Script (Recommended)

### Prerequisites
1. Make sure MongoDB is running on `localhost:27017`
2. Ensure the database `learn2pay` exists
3. Install dependencies: `npm install`

### Steps

1. **Run the user creation script:**
   ```bash
   cd backend
   node create-dashboard-users.js
   ```

2. **Expected output:**
   ```
   Connected to MongoDB
   ✅ Created user: John Salesperson (salesperson@test.com)
   ✅ Created user: Sarah Sales Admin (salesadmin@test.com)
   ✅ Created user: Michael Super Admin (superadmin@test.com)
   ✅ Created user: Lisa Referral Partner (referral@test.com)
   ✅ Created user: David Support Partner (support@test.com)
   
   🎉 Dashboard users creation completed!
   
   📋 Login Credentials:
   ==================================================
   Role: Salesperson
   Email: salesperson@test.com
   Password: password123
   ------------------------------
   Role: Sales Admin
   Email: salesadmin@test.com
   Password: password123
   ------------------------------
   Role: Super Admin
   Email: superadmin@test.com
   Password: password123
   ------------------------------
   Role: Referral Partner
   Email: referral@test.com
   Password: password123
   ------------------------------
   Role: Support Partner
   Email: support@test.com
   Password: password123
   ------------------------------
   Database connection closed
   ```

## Method 2: Manual Database Entry

### Using MongoDB Compass or MongoDB Shell

1. **Connect to your MongoDB database**
2. **Navigate to the `users` collection**
3. **Insert the following documents:**

```javascript
// Salesperson
{
  "fullName": "John Salesperson",
  "email": "salesperson@test.com",
  "password": "$2b$10$hashedPasswordHere", // Use bcrypt hash of "password123"
  "role": "Salesperson",
  "createdAt": new Date(),
  "updatedAt": new Date()
}

// Sales Admin
{
  "fullName": "Sarah Sales Admin",
  "email": "salesadmin@test.com",
  "password": "$2b$10$hashedPasswordHere", // Use bcrypt hash of "password123"
  "role": "Sales Admin",
  "createdAt": new Date(),
  "updatedAt": new Date()
}

// Super Admin
{
  "fullName": "Michael Super Admin",
  "email": "superadmin@test.com",
  "password": "$2b$10$hashedPasswordHere", // Use bcrypt hash of "password123"
  "role": "Super Admin",
  "createdAt": new Date(),
  "updatedAt": new Date()
}

// Referral Partner
{
  "fullName": "Lisa Referral Partner",
  "email": "referral@test.com",
  "password": "$2b$10$hashedPasswordHere", // Use bcrypt hash of "password123"
  "role": "Referral Partner",
  "createdAt": new Date(),
  "updatedAt": new Date()
}

// Support Partner
{
  "fullName": "David Support Partner",
  "email": "support@test.com",
  "password": "$2b$10$hashedPasswordHere", // Use bcrypt hash of "password123"
  "role": "Support Partner",
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

## Method 3: Using the API

### Create a user via API call

```bash
curl -X POST http://localhost:3000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Salesperson",
    "email": "salesperson@test.com",
    "password": "password123",
    "role": "Salesperson"
  }'
```

## Testing the Login

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend server:**
   ```bash
   cd server-frontend
   npm run dev
   ```

3. **Navigate to the login page** (usually `http://localhost:5173`)

4. **Use any of the demo credentials:**
   - Email: `salesperson@test.com` (or any other role email)
   - Password: `password123`
   - Select the appropriate role from the dropdown

5. **Click Login** - you should be redirected to the appropriate dashboard

## Dashboard Routes

After successful login, users are redirected to:
- **Salesperson**: `/sales-dashboard/salesperson`
- **Sales Admin**: `/sales-dashboard/manager`
- **Super Admin**: `/superAdmin-dashboard`
- **Referral Partner**: `/referral-dashboard`
- **Support Partner**: `/support-dashboard`

## Security Notes

- All passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Tokens are stored in secure HTTP-only cookies
- The API validates both email and role for login

## Troubleshooting

### Common Issues

1. **"User already exists" error:**
   - The script will skip existing users, this is normal
   - If you want to recreate users, delete them from the database first

2. **"Connection refused" error:**
   - Make sure MongoDB is running
   - Check if the database URL is correct in the script

3. **"Invalid credentials" error:**
   - Verify the email and role match exactly
   - Ensure the password is "password123"
   - Check if the user exists in the database

4. **CORS errors:**
   - Make sure the backend CORS settings include your frontend URL
   - Check if the backend is running on the correct port

### Database Connection

If you're using a different MongoDB setup, update the connection string in `create-dashboard-users.js`:

```javascript
await mongoose.connect("your-mongodb-connection-string");
```

## Adding More Users

To add more users, you can:

1. **Modify the script** and add more entries to the `dashboardUsers` array
2. **Use the API** to create users programmatically
3. **Add directly to the database** using MongoDB tools

## Customization

You can customize the user data by modifying:
- User names and emails in the script
- Password (remember to update the frontend demo credentials display)
- Additional user fields as needed 