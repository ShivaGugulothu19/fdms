const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");
const authorizeRoles = require("../middleware/authorizeRole");

// ➕ Register new faculty
router.post("/", async (req, res) => {
  try {
    const newFaculty = new Faculty(req.body);
    await newFaculty.save();
    res.status(201).json(newFaculty);
  } catch (error) {
    res.status(500).json({ message: "Error saving faculty", error });
  }
});

// 🔐 Login faculty/admin/hod
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const faculty = await Faculty.findOne({ email, password });
    if (!faculty) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: faculty._id,
        fullName: faculty.fullName,
        email: faculty.email,
        role: faculty.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
});

// 📥 Get all faculty (admin & hod)
router.get("/", authorizeRoles("admin", "hod"), async (req, res) => {
  try {
    const facultyList = await Faculty.find();
    res.status(200).json(facultyList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching faculty", error });
  }
});

// ❌ Delete faculty by ID (admin only)
router.delete("/:id", authorizeRoles("admin"), async (req, res) => {
  try {
    const deleted = await Faculty.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.status(200).json({ message: "Faculty deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting faculty", error });
  }
});

module.exports = router;
