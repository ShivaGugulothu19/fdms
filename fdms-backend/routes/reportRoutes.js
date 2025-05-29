const express = require("express");
const Profile = require("../models/Profile");
const Research = require("../models/Research");
const authorizeRoles = require("../middleware/authorizeRole");

const router = express.Router();

// 📊 Summary report (admin & hod)
router.get("/summary", authorizeRoles("admin", "hod"), async (req, res) => {
  try {
    let totalProfiles, totalResearch, researchByType;

    if (req.user.role === "admin") {
      totalProfiles = await Profile.countDocuments();
      totalResearch = await Research.countDocuments();
      researchByType = await Research.aggregate([
        { $group: { _id: "$type", count: { $sum: 1 } } },
      ]);
    } else {
      // HOD: only their department
      const profiles = await Profile.find().populate("facultyId");
      const filteredProfiles = profiles.filter(
        (p) => p.facultyId?.department === req.user.department
      );

      const research = await Research.find().populate("facultyId");
      const filteredResearch = research.filter(
        (r) => r.facultyId?.department === req.user.department
      );

      totalProfiles = filteredProfiles.length;
      totalResearch = filteredResearch.length;
      researchByType = filteredResearch.reduce((acc, curr) => {
        acc[curr.type] = (acc[curr.type] || 0) + 1;
        return acc;
      }, {});
      researchByType = Object.entries(researchByType).map(([type, count]) => ({ _id: type, count }));
    }

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
