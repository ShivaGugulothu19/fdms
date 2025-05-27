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
    "Aerospace Engineering",
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
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-xl bg-base-100 shadow-2xl p-8" data-theme="light">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Register New Faculty
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              className="input input-bordered"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              className="input input-bordered"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              type="text"
              name="phone"
              className="input input-bordered"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Department</span>
            </label>
            <select
              name="department"
              className="select select-bordered"
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

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              className="input input-bordered"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            ➕ Register Faculty
          </button>
        </form>

        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-gray-500">Already have an account?</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login" className="btn btn-sm btn-neutral">
              👨‍🏫 Login as Faculty
            </Link>
            <Link to="/login?role=hod" className="btn btn-sm btn-accent">
              🧑‍💼 Login as HOD
            </Link>
            <Link to="/admin" className="btn btn-sm btn-warning">
              🛡️ Login as Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
