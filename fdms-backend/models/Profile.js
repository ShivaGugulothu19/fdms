const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  address: String,
  aadhar: String,
  gender: String,

  // Qualification
  degree: String,
  institution: String,
  year: String,
  specialization: String,

  // Work Experience
  jobTitle: String,
  organization: String,
  startDate: String,
  endDate: String,
  isCurrent: Boolean,

  // Uploaded Documents
  cv: String,
  degreeCertificate: String,
  appointmentLetter: String,
});

module.exports = mongoose.model("Profile", ProfileSchema);
