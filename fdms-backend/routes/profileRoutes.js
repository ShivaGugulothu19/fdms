const express = require("express");
const multer = require("multer");
const path = require("path");
const Profile = require("../models/Profile");
const authorizeRoles = require("../middleware/authorizeRole");

const router = express.Router();

// 🗂️ File upload storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const name = file.fieldname; // cv / degreeCertificate / appointmentLetter
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}_${name}${ext}`);
  },
});
const upload = multer({ storage });

// 📝 POST: Create a new profile (faculty only)
router.post(
  "/",
  authorizeRoles("faculty"),
  upload.fields([
    { name: "cv" },
    { name: "degreeCertificate" },
    { name: "appointmentLetter" },
  ]),
  async (req, res) => {
    try {
      const existing = await Profile.findOne({ facultyId: req.user._id });
      if (existing) {
        return res.status(400).json({ message: "Profile already exists for this user." });
      }

      const files = req.files;
      const profile = new Profile({
        ...req.body,
        facultyId: req.user._id,
        cv: files?.cv?.[0]?.filename || "",
        degreeCertificate: files?.degreeCertificate?.[0]?.filename || "",
        appointmentLetter: files?.appointmentLetter?.[0]?.filename || "",
      });

      await profile.save();
      res.status(201).json(profile);
    } catch (error) {
      res.status(500).json({ message: "Error saving profile", error });
    }
  }
);

// 📋 GET all profiles (admin & hod) — Only faculty linked
router.get("/all", authorizeRoles("admin", "hod"), async (req, res) => {
  try {
    const profiles = await Profile.find().populate("facultyId");
    const filtered = profiles.filter((p) => p.facultyId?.role === "faculty");
    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profiles", error });
  }
});

// ❌ DELETE: Delete a profile by ID (admin only)
router.delete("/:id", authorizeRoles("admin"), async (req, res) => {
  try {
    const deleted = await Profile.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting profile", error });
  }
});

// ✏️ PUT: Update a profile by ID (admin only)
router.put(
  "/:id",
  authorizeRoles("admin"),
  upload.fields([
    { name: "cv" },
    { name: "degreeCertificate" },
    { name: "appointmentLetter" },
  ]),
  async (req, res) => {
    try {
      const files = req.files;
      const updates = { ...req.body };

      if (files?.cv?.[0]) updates.cv = files.cv[0].filename;
      if (files?.degreeCertificate?.[0]) updates.degreeCertificate = files.degreeCertificate[0].filename;
      if (files?.appointmentLetter?.[0]) updates.appointmentLetter = files.appointmentLetter[0].filename;

      const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, updates, { new: true });
      if (!updatedProfile) return res.status(404).json({ message: "Profile not found" });

      res.status(200).json(updatedProfile);
    } catch (error) {
      console.error("❌ PUT /api/profile/:id error:", error);
      res.status(500).json({ message: "Failed to update profile", error });
    }
  }
);

module.exports = router;
