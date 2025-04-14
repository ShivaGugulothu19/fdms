const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  title: { type: String, required: true },
  journal: { type: String, required: true },
  year: { type: Number, required: true },
  type: { type: String, enum: ["Journal", "Conference"], required: true },
  citationCount: { type: Number, default: 0 },
  doi: { type: String },
});

module.exports = mongoose.model("Research", researchSchema);
