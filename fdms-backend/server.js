const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// Routes
const facultyRoutes = require("./routes/facultyRoutes");
const profileRoutes = require("./routes/profileRoutes");
const researchRoutes = require("./routes/researchRoutes");
const reportRoutes = require("./routes/reportRoutes");
const developmentRoutes = require("./routes/developmentRoutes");
const settingsRoutes = require("./routes/settingsRoutes"); // ✅ Added

// Mount routes
app.use("/api/faculty", facultyRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/development", developmentRoutes);
app.use("/api/settings", settingsRoutes); // ✅ Registered

// Health check route
app.get("/", (req, res) => {
  res.send("✅ FDMS Backend Running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
