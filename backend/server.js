import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import customerRoutes from "./routes/customerRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import generateBillRoutes from "./routes/generateBillRoutes.js"; // IMPORT NEW ROUTE

dotenv.config(); // Load environment variables first

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
(async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
    process.exit(1); // Exit if DB connection fails
  }
})();

// Use Routes  
app.use("/customers", customerRoutes);
app.use("/bills", billRoutes);
app.use("/plans", planRoutes);
app.use("/generate-bill", generateBillRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Handle Unexpected Errors
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception ❌", error);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Promise Rejection ❌", error);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
