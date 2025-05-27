const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Faculty = require("../models/Faculty");
const authorizeRoles = require("../middleware/authorizeRole");

// ➕ Register new faculty
router.post("/", async (req, res) => {
  const allowedDepartments = [
    "Computer Science and Engineering",
    "Information Technology",
    "Electronics and Communication Engineering",
    "Electrical and Electronics Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Artificial Intelligence and Data Science",
    "Cyber Security",
    "Mathematics",
    "Physics",
    "Chemistry",
    "English",
    "Management Studies",
    "Humanities",
    "Architecture",
    "Biomedical Engineering",
    "Environmental Engineering",
    "Aerospace Engineering"
  ];

  if (!allowedDepartments.includes(req.body.department)) {
    return res.status(400).json({ message: "Invalid department selected" });
  }

  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newFaculty = new Faculty({
      ...rest,
      password: hashedPassword,
    });

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
    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: faculty._id,
        fullName: faculty.fullName,
        email: faculty.email,
        role: faculty.role,
        department: faculty.department,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
});

// 📥 Get all faculty (admin = all, hod = only their department)
router.get("/", authorizeRoles("admin", "hod"), async (req, res) => {
  try {
    let facultyList;

    if (req.user.role === "hod") {
      facultyList = await Faculty.find({ department: req.user.department });
    } else {
      facultyList = await Faculty.find();
    }

    res.status(200).json(facultyList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching faculty", error });
  }
});

// 👤 Get faculty profile by ID (admin or HOD only)
router.get("/:id", authorizeRoles("admin", "hod"), async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // 🛡️ HODs can only access profiles from their own department
    if (req.user.role === "hod" && faculty.department !== req.user.department) {
      return res.status(403).json({ message: "Access denied: Not your department" });
    }

    res.status(200).json(faculty);
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
