import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import AdminFacultyProfile from "../pages/AdminFacultyProfile";
import AdminReports from "../pages/AdminReports";
import AdminSettings from "../pages/AdminSettings";

import Layout from "../components/layout/Layout";
import AdminLayout from "../components/layout/AdminLayout";

const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const role = localStorage.getItem("role");

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminLogin />} />

      {isLoggedIn && role === "faculty" && (
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      )}

      {isLoggedIn && role === "admin" && (
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/faculty-profile" element={<AdminFacultyProfile />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      )}

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
