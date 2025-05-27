const mongoose = require("mongoose");

const developmentSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["FDP", "Workshop", "STTP", "Certification"],
    required: true,
  },
  organizer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  certificate: {
    type: String, // File path of uploaded certificate
    default: "",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Development", developmentSchema);
