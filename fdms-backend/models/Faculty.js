const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  department: String,
  password: String,
  role: {
    type: String,
    enum: ['faculty', 'admin', 'hod'],
    default: 'faculty',
  },
});

module.exports = mongoose.model("Faculty", facultySchema);
