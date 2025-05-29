import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@fdms.com" && password === "admin123") {
      const adminUser = {
        email: "admin@fdms.com",
        fullName: "Admin",
        role: "admin",
      };

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "admin");
      localStorage.setItem("user", JSON.stringify(adminUser));

      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-sm bg-base-100 shadow-lg p-6" data-theme="light">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">🔐 Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="admin@fdms.com"
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
              placeholder="********"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            ➡ Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
