const express = require("express");
const Research = require("../models/Research");
const authorizeRoles = require("../middleware/authorizeRole");

const router = express.Router();

// 📖 GET all research (admin & hod)
router.get("/", authorizeRoles("admin", "hod"), async (req, res) => {
  try {
    const researchList = await Research.find().populate("facultyId");
    res.json(researchList);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch research" });
  }
});

module.exports = router;
