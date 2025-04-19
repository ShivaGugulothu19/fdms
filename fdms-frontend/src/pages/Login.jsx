import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  const isHOD = new URLSearchParams(location.search).get("role") === "hod";

  const handleLogin = async (e) => {
    e.preventDefault();

    // ✅ Hardcoded Admin login
    if (email === "admin@fdms.com" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "admin");
      localStorage.setItem("user", JSON.stringify({ email, fullName: "Admin", role: "admin" }));
      window.location.href = "/admin/dashboard";
      return;
    }

    // ✅ Hardcoded HOD login
    if (email === "hod@fdms.com" && password === "hod123") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "hod");
      localStorage.setItem("user", JSON.stringify({ email, fullName: "HOD", role: "hod" }));
      window.location.href = "/hod/dashboard";
      return;
    }

    // ✅ Faculty login via backend
    try {
      const res = await axios.post("http://localhost:5000/api/faculty/login", {
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
      console.error(err);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          {isHOD ? "Login as HOD" : "Login"}
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
          >
            Login ➡
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
