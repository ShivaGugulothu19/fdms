import { Routes, Route, Navigate } from "react-router-dom";

// Public & Common
import Register from "../pages/Register";
import Login from "../pages/Login";
import AdminLogin from "../pages/AdminLogin";

// Faculty Pages
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import FacultyResearch from "../pages/FacultyResearch";

// Admin Pages
import AdminDashboard from "../pages/AdminDashboard";
import AdminFacultyProfile from "../pages/AdminFacultyProfile";
import AdminReports from "../pages/AdminReports";
import AdminSettings from "../pages/AdminSettings";
import AdminResearch from "../pages/AdminResearch";

// HOD Pages
import HODDashboard from "../pages/HODDashboard";
import HODResearch from "../pages/HODResearch";
import HODReports from "../pages/HODReports";
import HODProfile from "../pages/HODProfile";

// Layouts
import Layout from "../components/layout/Layout";
import AdminLayout from "../components/layout/AdminLayout";
import HODLayout from "../components/layout/HODLayout";

const AppRoutes = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminLogin />} />

      {/* Faculty Routes */}
      {isLoggedIn && role === "faculty" && (
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/research" element={<FacultyResearch />} />
        </Route>
      )}

      {/* Admin Routes */}
      {isLoggedIn && role === "admin" && (
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/faculty-profile" element={<AdminFacultyProfile />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/research" element={<AdminResearch />} />
        </Route>
      )}

      {/* HOD Routes */}
      {isLoggedIn && role === "hod" && (
        <Route element={<HODLayout />}>
          <Route path="/hod/dashboard" element={<HODDashboard />} />
          <Route path="/hod/research" element={<HODResearch />} />
          <Route path="/hod/reports" element={<HODReports />} />
          <Route path="/hod/profile" element={<HODProfile />} />
          <Route path="/hod/faculty-profile" element={<AdminFacultyProfile />} />
        </Route>
      )}

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
