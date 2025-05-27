const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  academicYear: String,
  emailNotifications: Boolean,
  portalMode: String,
}, { timestamps: true });

module.exports = mongoose.model("Settings", settingsSchema);
