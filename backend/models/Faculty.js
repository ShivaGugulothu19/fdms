const express = require("express");
const Faculty = require("../models/Faculty");
const router = express.Router();

// Register Faculty
router.post("/register", async (req, res) => {
  try {
    const { userId, name, email, phone, dob, gender, professionalInfo, address, workExperience, researchPapers } = req.body;

    const newFaculty = new Faculty({
      userId,
      name,
      email,
      phone,
      dob,
      gender,
      professionalInfo,
      address,
      workExperience,
      researchPapers,
    });

    await newFaculty.save();
    res.status(201).json({ message: "Faculty registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering faculty", error });
  }
});

// Get all faculty (Only Admin)
router.get("/all", async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.json(faculties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching faculty details", error });
  }
});

module.exports = router;
