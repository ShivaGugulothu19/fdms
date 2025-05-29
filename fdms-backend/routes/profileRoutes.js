const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Profile = require("../models/Profile");
const authorizeRoles = require("../middleware/authorizeRole");

const router = express.Router();

// 🔧 Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// 🗂️ File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const name = file.fieldname;
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}_${name}${ext}`);
  },
});
const upload = multer({ storage });

// 📝 POST: Create profile
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
      console.log("▶ BODY:", req.body);
      console.log("▶ FILES:", req.files);
      console.log("▶ USER:", req.user);

      const existing = await Profile.findOne({ facultyId: req.user.id });
      if (existing) {
        return res.status(400).json({ message: "Profile already exists for this user." });
      }

      const files = req.files;
      const profile = new Profile({
        ...req.body,
        facultyId: req.user.id,
        cv: files?.cv?.[0]?.filename || "",
        degreeCertificate: files?.degreeCertificate?.[0]?.filename || "",
        appointmentLetter: files?.appointmentLetter?.[0]?.filename || "",
      });

      await profile.save();
      res.status(201).json(profile);
    } catch (error) {
      console.error("🔥 Error saving profile:", error);
      res.status(500).json({ message: "Error saving profile", error });
    }
  }
);

// 📄 GET: All faculty profiles (admin/hod)
router.get("/all", authorizeRoles("admin", "hod"), async (req, res) => {
  try {
    let profiles = await Profile.find().populate("facultyId");

    profiles = profiles.filter((p) => p.facultyId?.role === "faculty");

    if (req.user.role === "hod") {
      profiles = profiles.filter(
        (p) => p.facultyId?.department === req.user.department
      );
    }

    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profiles", error });
  }
});

// ✏️ PUT: Update profile (admin only)
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
      const updates = { ...req.body };
      const files = req.files;

      if (files?.cv?.[0]) updates.cv = files.cv[0].filename;
      if (files?.degreeCertificate?.[0]) updates.degreeCertificate = files.degreeCertificate[0].filename;
      if (files?.appointmentLetter?.[0]) updates.appointmentLetter = files.appointmentLetter[0].filename;

      const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, updates, { new: true });
      if (!updatedProfile) return res.status(404).json({ message: "Profile not found" });

      res.status(200).json(updatedProfile);
    } catch (error) {
      res.status(500).json({ message: "Failed to update profile", error });
    }
  }
);

// ❌ DELETE: Remove profile (admin only)
router.delete("/:id", authorizeRoles("admin"), async (req, res) => {
  try {
    const deleted = await Profile.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Profile not found" });

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting profile", error });
  }
});

module.exports = router;
