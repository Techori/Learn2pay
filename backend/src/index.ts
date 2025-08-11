import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db";
import instituteRoutes from "./routes/instituteRoute";
import parentRoutes from "./routes/parentRoutes";
import chatbotRoute from "./routes/chatbotRoute";
import userRoutes from "./routes/userRoute";
import leadsRoutes from "./routes/leadsRoute";
import ticketsRoutes from "./routes/ticketsRoute";
import salesRoutes from "./routes/salesRoutes";
import dotenv from "dotenv";
dotenv.config();
console.log('Loaded GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'SET' : 'NOT SET');
const app = express();
const PORT = process.env.PORT || 3000;
// Connect to database
connectDB();

const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:5173',
  'http://192.168.29.220:8080',
  'http://192.168.29.220:8081',
  'https://www.larn2pay.com',
  'https://learn2pay-production.up.railway.app',
  'https://learn2pay-client-frontend.vercel.app',
  'https://learn2pay-server-frontend.vercel.app',
];

// Debug middleware
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Middleware
app.use(express.json({ limit: '50mb' })); // Increased limit for file uploads
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Added for form data
app.use(cookieParser()); // Add this line for cookie support
app.use(
  cors({
    origin:  function (origin, callback) {
    if (!origin) return callback(null, true);
    const normalizedOrigin = origin.replace(/\/$/, '');
    const normalizedAllowedOrigins = allowedOrigins.map(o => o.replace(/\/$/, ''));
    if (normalizedAllowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS not allowed for origin: ${origin}`), false);
  },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH"],
    credentials: true, // Important: allows cookies to be sent
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
    optionsSuccessStatus: 200,
  })
);

// Routes
app.use("/api/institute", instituteRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/chatbot", chatbotRoute);
app.use("/api/user", userRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use('/api/sales', salesRoutes);


// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Learn2Pay Backend API is running!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
