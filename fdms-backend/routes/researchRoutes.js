const express = require("express");
const Research = require("../models/Research");
const authorizeRoles = require("../middleware/authorizeRole");

const router = express.Router();

// 📖 GET all research (admin & hod)
router.get("/", authorizeRoles("admin", "hod"), async (req, res) => {
  try {
    let researchList = await Research.find().populate("facultyId");

    if (req.user.role === "hod") {
      researchList = researchList.filter(
        (r) => r.facultyId?.department === req.user.department
      );
    }

    res.json(researchList);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch research" });
  }
});

// 📝 POST new research (faculty only)
router.post("/", authorizeRoles("faculty"), async (req, res) => {
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

// ✏️ PUT update research (admin only)
router.put("/:id", authorizeRoles("admin"), async (req, res) => {
  try {
    const updated = await Research.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Research not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    console.error("PUT /api/research/:id error:", error);
    res.status(500).json({ message: "Failed to update research entry" });
  }
});

// ❌ DELETE research (admin only)
router.delete("/:id", authorizeRoles("admin"), async (req, res) => {
  try {
    const deleted = await Research.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Research entry not found" });
    }
    res.status(200).json({ message: "Research entry deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/research/:id error:", error);
    res.status(500).json({ message: "Failed to delete research entry" });
  }
});

module.exports = router;
