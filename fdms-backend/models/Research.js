// models/Research.js
const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ["Journal", "Conference", "Book Chapter", "Patent"],
    required: true,
  },
  publicationDate: { type: Date },
  journalName: { type: String },
  doiLink: { type: String },
  coAuthors: { type: [String] },
  document: { type: String }, // Path to uploaded file (optional)
}, { timestamps: true });

module.exports = mongoose.model("Research", researchSchema);
