// routes/researchRoutes.js
const express = require("express");
const router = express.Router();
const Research = require("../models/Research");

// POST - Add research
router.post("/", async (req, res) => {
  try {
    const research = new Research(req.body);
    await research.save();
    res.status(201).json(research);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - All research
router.get("/", async (req, res) => {
  try {
    const all = await Research.find().populate("facultyId", "fullName department");
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Research by facultyId
router.get("/faculty/:id", async (req, res) => {
  try {
    const research = await Research.find({ facultyId: req.params.id });
    res.json(research);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Research entry
router.delete("/:id", async (req, res) => {
  try {
    await Research.findByIdAndDelete(req.params.id);
    res.json({ message: "Research deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
