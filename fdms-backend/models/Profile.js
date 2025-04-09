const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  gender: String,
  dateOfBirth: Date,
  aadharNumber: String,
  panNumber: String,
  address: String,
  department: String,
  designation: String,
  qualifications: [
    {
      degree: String,
      institution: String,
      year: String,
      specialization: String,
    },
  ],
  experience: [
    {
      jobTitle: String,
      organization: String,
      startDate: String,
      endDate: String,
      isCurrent: Boolean,
    },
  ],
  documents: {
    cv: String,
    degreeCertificate: String,
    appointmentLetter: String,
    aadharCard: String,
    panCard: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("Profile", ProfileSchema);
