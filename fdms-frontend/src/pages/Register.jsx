import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

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

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/faculty", formData);
      alert("Faculty registered successfully ✅");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white p-10 shadow-xl rounded-2xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Register New Faculty
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="w-full mt-1 p-3 border rounded-lg"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 p-3 border rounded-lg"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              className="w-full mt-1 p-3 border rounded-lg"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Department</label>
            <select
              name="department"
              className="w-full mt-1 p-3 border rounded-lg"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Department --</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 p-3 border rounded-lg"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            ➕ Register Faculty
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">Already have an account?</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login" className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm">
              👨‍🏫 Login as Faculty
            </Link>
            <Link to="/login?role=hod" className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg hover:bg-purple-200 text-sm">
              🧑‍💼 Login as HOD
            </Link>
            <Link to="/admin" className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg hover:bg-yellow-200 text-sm">
              🛡️ Login as Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
