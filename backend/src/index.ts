import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import instituteRoutes from "./routes/instituteRoute";

// Initialize environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/institute", instituteRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Learn2Pay Backend API is running!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
