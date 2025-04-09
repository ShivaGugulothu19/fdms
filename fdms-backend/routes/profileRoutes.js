const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.fields([
  { name: "cv" },
  { name: "degreeCertificate" },
  { name: "appointmentLetter" },
  { name: "aadharCard" },
  { name: "panCard" },
]), async (req, res) => {
  try {
    const {
      fullName, email, phone, gender, dateOfBirth, aadharNumber,
      panNumber, address, department, designation,
      qualifications, experience
    } = req.body;

    const profile = new Profile({
      fullName,
      email,
      phone,
      gender,
      dateOfBirth,
      aadharNumber,
      panNumber,
      address,
      department,
      designation,
      qualifications: JSON.parse(qualifications || "[]"),
      experience: JSON.parse(experience || "[]"),
      documents: {
        cv: req.files?.cv?.[0]?.filename || "",
        degreeCertificate: req.files?.degreeCertificate?.[0]?.filename || "",
        appointmentLetter: req.files?.appointmentLetter?.[0]?.filename || "",
        aadharCard: req.files?.aadharCard?.[0]?.filename || "",
        panCard: req.files?.panCard?.[0]?.filename || "",
      },
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving profile", error });
  }
});

module.exports = router;
