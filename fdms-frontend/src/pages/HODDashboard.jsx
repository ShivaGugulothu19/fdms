import React from "react";
import { Link } from "react-router-dom";

const HODDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Welcome, HOD</h1>
      <p className="text-gray-700 mb-6">
        You have view-only access to faculty information, research records, and reports.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Faculty Profiles View (optional) */}
        <Link
          to="/hod/profile"
          className="p-6 bg-white rounded-2xl shadow hover:shadow-md border border-gray-200 transition"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">HOD Profile</h2>
          <p className="text-gray-600 text-sm">View your profile and access basic faculty information.</p>
        </Link>

        {/* Research Records View */}
        <Link
          to="/hod/research"
          className="p-6 bg-white rounded-2xl shadow hover:shadow-md border border-gray-200 transition"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Research Contributions</h2>
          <p className="text-gray-600 text-sm">Browse faculty research projects, publications, and achievements.</p>
        </Link>

        {/* Reports View */}
        <Link
          to="/hod/reports"
          className="p-6 bg-white rounded-2xl shadow hover:shadow-md border border-gray-200 transition"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Reports</h2>
          <p className="text-gray-600 text-sm">Analyze faculty data and department metrics in summary reports.</p>
        </Link>
      </div>
    </div>
  );
};

export default HODDashboard;
