import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import CleanForm from "../pages/CleanForm"; // ✅ NEW

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/clean" element={<CleanForm />} /> {/* ✅ NEW ROUTE */}
    </Routes>
  );
};

export default AppRoutes;
