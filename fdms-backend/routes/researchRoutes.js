const express = require("express");
const router = express.Router();
const Research = require("../models/Research");

// 🔼 Add a research contribution
router.post("/", async (req, res) => {
  try {
    const newResearch = new Research(req.body);
    await newResearch.save();
    res.status(201).json(newResearch);
  } catch (err) {
    res.status(500).json({ message: "Error saving research", err });
  }
});

// 🔽 Get all contributions (admin)
router.get("/", async (req, res) => {
  try {
    const researchList = await Research.find().populate("facultyId", "fullName department");
    res.json(researchList);
  } catch (err) {
    res.status(500).json({ message: "Error fetching research", err });
  }
});

// ❌ Delete research
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Research.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting research", err });
  }
});

module.exports = router;
