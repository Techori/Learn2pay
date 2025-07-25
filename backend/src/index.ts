import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db";
import instituteRoutes from "./routes/instituteRoute";
import parentRoutes from "./routes/parentRoutes";
import chatbotRoute from "./routes/chatbotRoute";
import dotenv from "dotenv";
dotenv.config();
console.log('Loaded GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'SET' : 'NOT SET');
const app = express();
const PORT = process.env.PORT || 3000;
// Connect to database
connectDB();

// Middleware
app.use(express.json({ limit: '50mb' })); // Increased limit for file uploads
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Added for form data
app.use(cookieParser()); // Add this line for cookie support
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Important: allows cookies to be sent
  })
);

// Routes
app.use("/api/institute", instituteRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/chatbot", chatbotRoute);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Learn2Pay Backend API is running!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
