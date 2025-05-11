import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://tailwindui.com/img/project-images/dashboard-sample.png"
            className="max-w-sm rounded-lg shadow-2xl"
            alt="FDMS Dashboard"
          />
          <div>
            <h1 className="text-5xl font-bold text-primary">Faculty Data Management System</h1>
            <p className="py-6 text-lg text-gray-600">
              Streamline academic profiles, research tracking, and institutional reporting in one place.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Link to="/register" className="btn btn-primary">Register</Link>
              <Link to="/login" className="btn btn-outline btn-secondary">Faculty Login</Link>
              <Link to="/admin" className="btn btn-outline">Admin Login</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-base-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Faculty Profiles</h3>
                <p>Manage academic, personal, and professional details in one dashboard.</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Research Contributions</h3>
                <p>Track publications, projects, and collaborative research.</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Admin Insights</h3>
                <p>Review, filter, and report faculty activities for accreditation and compliance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <div>
          <p className="font-bold">
            FDMS © {new Date().getFullYear()} — Empowering Academic Excellence
          </p>
          <p>Made with ❤️ in Codespaces</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
