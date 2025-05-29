const express = require("express");
const router = express.Router();
const Settings = require("../models/Settings");
const authorizeRoles = require("../middleware/authorizeRole");

// GET current settings (admin only)
router.get("/", authorizeRoles("admin"), async (req, res) => {
  try {
    const settings = await Settings.findOne() || {};
    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({ message: "Failed to load settings" });
  }
});

// POST or update settings (admin only)
router.post("/", authorizeRoles("admin"), async (req, res) => {
  try {
    const updated = await Settings.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to save settings" });
  }
});

module.exports = router;
