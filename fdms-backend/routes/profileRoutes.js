const express = require("express");
const multer = require("multer");
const path = require("path");
const Profile = require("../models/Profile");
const authorizeRoles = require("../middleware/authorizeRole");

const router = express.Router();

// 🗂️ File upload storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
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
      const files = req.files;
      const profile = new Profile({
        ...req.body,
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

// 📋 GET all profiles (admin & hod)
router.get("/all", authorizeRoles("admin", "hod"), async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(Array.isArray(profiles) ? profiles : []);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profiles", error });
  }
});

module.exports = router;
