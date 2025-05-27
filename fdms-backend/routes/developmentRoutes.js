const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Development = require("../models/Development");
const authorizeRoles = require("../middleware/authorizeRole");

// 📁 Setup multer storage for certificate uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "_cert_" + path.extname(file.originalname)),
});
const upload = multer({ storage });

/**
 * POST /api/development
 * Faculty: Submit own record | Admin: Add for any faculty
 */
router.post(
  "/",
  authorizeRoles("faculty", "admin"),
  upload.single("certificate"),
  async (req, res) => {
    try {
      const { title, type, organizer, date, facultyId } = req.body;
      if (!title || !type || !organizer || !date) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const newDev = new Development({
        title,
        type,
        organizer,
        date,
        facultyId: req.user.role === "admin" ? facultyId : req.user._id,
        certificate: req.file?.filename || "",
      });

      await newDev.save();
      res.status(201).json(newDev);
    } catch (err) {
      res.status(500).json({ message: "Error saving development record", error: err });
    }
  }
);

/**
 * GET /api/development
 * Admin/HOD: View all development activities
 */
router.get("/", authorizeRoles("admin", "hod"), async (req, res) => {
  try {
    const data = await Development.find().populate("facultyId");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching development data", error: err });
  }
});

/**
 * PUT /api/development/:id
 * Admin only: Edit a development record
 */
router.put(
  "/:id",
  authorizeRoles("admin"),
  upload.single("certificate"),
  async (req, res) => {
    try {
      const updates = { ...req.body };
      if (req.file?.filename) updates.certificate = req.file.filename;

      const updated = await Development.findByIdAndUpdate(req.params.id, updates, { new: true });
      if (!updated) {
        return res.status(404).json({ message: "Development record not found" });
      }

      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ message: "Error updating development record", error: err });
    }
  }
);

/**
 * DELETE /api/development/:id
 * Admin only: Delete a development record
 */
router.delete("/:id", authorizeRoles("admin"), async (req, res) => {
  try {
    const deleted = await Development.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json({ message: "Development record deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting record", error: err });
  }
});

module.exports = router;
