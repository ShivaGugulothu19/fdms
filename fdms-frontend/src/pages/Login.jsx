import { useState } from "react";
import axios from "../api/axiosInstance";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  const isHOD = new URLSearchParams(location.search).get("role") === "hod";

  const handleLogin = async (e) => {
    e.preventDefault();

    // 🔐 Hardcoded Admin Login
    if (email === "admin@fdms.com" && password === "admin123") {
      const adminUser = {
        email,
        fullName: "Admin",
        role: "admin"
      };
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "admin");
      localStorage.setItem("user", JSON.stringify(adminUser));
      window.location.href = "/admin/dashboard";
      return;
    }

    try {
      await axios.post(`https://fdms-sc8b.onrender.com/api/faculty/login", {
        email,
        password,
      });

      const user = res.data.user;

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "faculty") {
        window.location.href = "/dashboard";
      } else if (user.role === "hod") {
        window.location.href = "/hod/dashboard";
      } else if (user.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        alert("Unauthorized role");
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-8" data-theme="light">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          {isHOD ? "Login as HOD" : "Faculty Login"}
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-2">
            ➡ Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
