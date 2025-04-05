import { useState } from "react";
import axios from "axios";

const FacultyRegister = () => {
  const [facultyData, setFacultyData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    department: "",
    designation: "",
    experienceYears: "",
    currentAddress: "",
    permanentAddress: "",
    workExperience: [],
    researchPapers: [],
  });

  const handleChange = (e) => {
    setFacultyData({ ...facultyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/faculty/register", {
        ...facultyData,
        professionalInfo: {
          department: facultyData.department,
          designation: facultyData.designation,
          experienceYears: facultyData.experienceYears,
        },
        address: {
          current: facultyData.currentAddress,
          permanent: facultyData.permanentAddress,
        },
      });

      alert("Faculty registered successfully");
    } catch (error) {
      alert("Error registering faculty");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register Faculty</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input type="date" name="dob" onChange={handleChange} required />
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="text" name="department" placeholder="Department" onChange={handleChange} required />
        <input type="text" name="designation" placeholder="Designation" onChange={handleChange} required />
        <input type="number" name="experienceYears" placeholder="Years of Experience" onChange={handleChange} required />
        <input type="text" name="currentAddress" placeholder="Current Address" onChange={handleChange} required />
        <input type="text" name="permanentAddress" placeholder="Permanent Address" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default FacultyRegister;
