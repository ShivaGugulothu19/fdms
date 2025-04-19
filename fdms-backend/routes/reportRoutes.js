const express = require("express");
const Profile = require("../models/Profile");
const Research = require("../models/Research");
const authorizeRoles = require("../middleware/authorizeRole");

const router = express.Router();

// 📊 Summary report (admin & hod)
router.get("/summary", authorizeRoles("admin", "hod"), async (req, res) => {
  try {
    const totalProfiles = await Profile.countDocuments();
    const researchByType = await Research.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } },
    ]);
    const totalResearch = await Research.countDocuments();

    res.json({
      totalProfiles,
      totalResearch,
      researchByType,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate report" });
  }
});

module.exports = router;
