const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Faculty = require("../models/Faculty");

// Load env variables and connect to DB
dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Allowed departments
const departments = [
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
];

// Utility function to create default HOD users
const seedHodUsers = async () => {
  try {
    for (const dept of departments) {
      const email = `hod.${dept.toLowerCase().replace(/\s+/g, "").replace(/&/g, "and")}@fdms.com`;

      const existing = await Faculty.findOne({ email });
      if (!existing) {
        const newHod = new Faculty({
          fullName: `HOD - ${dept}`,
          email: email,
          password: "defaultpass123", // 🔐 You should enforce change on first login
          role: "hod",
          department: dept,
        });

        await newHod.save();
        console.log(`✅ Created HOD for: ${dept}`);
      } else {
        console.log(`⚠️ Already exists: ${email}`);
      }
    }

    console.log("✅ Seeding complete");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    mongoose.disconnect();
  }
};

seedHodUsers();
