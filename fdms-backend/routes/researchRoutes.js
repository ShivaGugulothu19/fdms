// routes/researchRoutes.js
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

// 📝 POST research (faculty)
router.post("/", async (req, res) => {
  try {
    const { title, type, journalName, publicationDate, doiLink, facultyId } = req.body;

    if (!title || !type || !publicationDate || !facultyId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newResearch = new Research({
      title,
      type,
      journalName,
      publicationDate,
      doiLink,
      facultyId,
    });

    await newResearch.save();
    res.status(201).json({ message: "Research submitted successfully" });
  } catch (error) {
    console.error("POST /api/research error:", error);
    res.status(500).json({ message: "Failed to submit research" });
  }
});

module.exports = router;
