const express = require("express");
const Faculty = require("../models/Faculty");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// ✅ Register Faculty
router.post("/register", authMiddleware, async (req, res) => {
  try {
    const { name, email, phone, dob, gender, professionalInfo, address, workExperience, researchPapers } = req.body;

    // Check if the faculty already exists
    const existingFaculty = await Faculty.findOne({ userId: req.user.id });
    if (existingFaculty) return res.status(400).json({ msg: "Faculty profile already exists" });

    const faculty = new Faculty({
      userId: req.user.id,
      name, email, phone, dob, gender, professionalInfo, address, workExperience, researchPapers,
    });

    await faculty.save();
    res.status(201).json({ msg: "Faculty registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// ✅ Get All Faculty (Admin Only)
router.get("/all", authMiddleware, async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ msg: "Access Denied" });

    const facultyList = await Faculty.find();
    res.json(facultyList);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// ✅ Update Faculty Profile
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ userId: req.user.id });
    if (!faculty) return res.status(404).json({ msg: "Faculty not found" });

    Object.assign(faculty, req.body);
    await faculty.save();

    res.json({ msg: "Faculty profile updated" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// ✅ Delete Faculty (Admin Only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ msg: "Access Denied" });

    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ msg: "Faculty deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
