const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  department: {
    type: String,
    enum: [
      "Computer Science and Engineering",
      "Information Technology",
      "Electronics and Communication Engineering",
      "Electrical and Electronics Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
      "Artificial Intelligence and Data Science",
      "Cyber Security",
      "Mathematics",
      "Physics",
      "Chemistry",
      "English",
      "Management Studies",
      "Humanities",
      "Architecture",
      "Biomedical Engineering",
      "Environmental Engineering",
      "Aerospace Engineering"
    ],
    required: true
  },
  password: String,
  role: {
    type: String,
    enum: ['faculty', 'admin', 'hod'],
    default: 'faculty',
  },
});

module.exports = mongoose.model("Faculty", facultySchema);
