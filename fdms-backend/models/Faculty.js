const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  department: String,
  password: String,
});

module.exports = mongoose.model("Faculty", facultySchema);
