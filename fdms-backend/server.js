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

// Routes
const facultyRoutes = require("./routes/facultyRoutes");
const profileRoutes = require("./routes/profileRoutes");
const researchRoutes = require("./routes/researchRoutes");
const reportRoutes = require("./routes/reportRoutes"); // ✅ Reports route

app.use("/api/faculty", facultyRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/reports", reportRoutes); // ✅ Registered route

// Health check route
app.get("/", (req, res) => {
  res.send("✅ FDMS Backend Running");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
