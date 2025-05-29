const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Faculty = require("./models/Faculty");

const departments = [
  { name: "HOD CSE", email: "hod.cse@fdms.com", department: "Computer Science and Engineering" },
  { name: "HOD IT", email: "hod.it@fdms.com", department: "Information Technology" },
  { name: "HOD ECE", email: "hod.ece@fdms.com", department: "Electronics and Communication Engineering" },
  { name: "HOD EEE", email: "hod.eee@fdms.com", department: "Electrical and Electronics Engineering" },
  { name: "HOD ME", email: "hod.me@fdms.com", department: "Mechanical Engineering" },
  { name: "HOD CE", email: "hod.ce@fdms.com", department: "Civil Engineering" },
  { name: "HOD AI", email: "hod.ai@fdms.com", department: "Artificial Intelligence and Data Science" },
  { name: "HOD CY", email: "hod.cy@fdms.com", department: "Cyber Security" },
  { name: "HOD MATH", email: "hod.math@fdms.com", department: "Mathematics" },
  { name: "HOD PHY", email: "hod.phy@fdms.com", department: "Physics" },
  { name: "HOD CHE", email: "hod.che@fdms.com", department: "Chemistry" },
  { name: "HOD ENG", email: "hod.eng@fdms.com", department: "English" },
  { name: "HOD MGMT", email: "hod.mgmt@fdms.com", department: "Management Studies" },
  { name: "HOD HUM", email: "hod.hum@fdms.com", department: "Humanities" },
  { name: "HOD ARC", email: "hod.arc@fdms.com", department: "Architecture" },
  { name: "HOD BIO", email: "hod.bio@fdms.com", department: "Biomedical Engineering" },
  { name: "HOD ENV", email: "hod.env@fdms.com", department: "Environmental Engineering" },
  { name: "HOD AERO", email: "hod.aero@fdms.com", department: "Aerospace Engineering" }
];

const password = "hod@123"; // Default password for all HODs

async function seedHODs() {
  try {
    await mongoose.connect("mongodb://localhost:27017/fdms");

    for (const dep of departments) {
      const exists = await Faculty.findOne({ email: dep.email });
      if (!exists) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await Faculty.create({
          fullName: dep.name,
          email: dep.email,
          password: hashedPassword,
          department: dep.department,
          role: "hod"
        });
        console.log(`✅ Created: ${dep.email}`);
      } else {
        console.log(`⚠️ Already exists: ${dep.email}`);
      }
    }

    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
}

seedHODs();
