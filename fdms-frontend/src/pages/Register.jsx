import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", user);
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" onChange={(e) => setUser({ ...user, name: e.target.value })} required />
        <input type="email" placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} required />
        <input type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
