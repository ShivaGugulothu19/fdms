const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/faculty", require("./routes/facultyRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/research", require("./routes/researchRoutes"));


// Test route
app.get("/", (req, res) => res.send("FDMS Backend Running ✅"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
