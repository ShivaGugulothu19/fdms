import React from "react";
import { Link } from "react-router-dom";

const HODDashboard = () => {
  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="card bg-base-100 shadow-lg p-8" data-theme="light">
        <h1 className="text-3xl font-bold text-primary mb-4">👋 Welcome, HOD</h1>
        <p className="text-gray-600 mb-6">
          You have view-only access to faculty profiles, research contributions, and department reports.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/hod/profile" className="card bg-base-100 border shadow-sm hover:shadow-md transition">
            <div className="card-body">
              <h2 className="card-title text-blue-600">HOD Profile</h2>
              <p className="text-sm text-gray-600">
                View your profile and department access settings.
              </p>
            </div>
          </Link>

          <Link to="/hod/research" className="card bg-base-100 border shadow-sm hover:shadow-md transition">
            <div className="card-body">
              <h2 className="card-title text-blue-600">Research Contributions</h2>
              <p className="text-sm text-gray-600">
                View faculty research projects and achievements.
              </p>
            </div>
          </Link>

          <Link to="/hod/reports" className="card bg-base-100 border shadow-sm hover:shadow-md transition">
            <div className="card-body">
              <h2 className="card-title text-blue-600">Reports</h2>
              <p className="text-sm text-gray-600">
                Analyze faculty data for your department.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HODDashboard;
