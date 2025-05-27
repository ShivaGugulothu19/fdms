// src/pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Landing = () => {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <Helmet>
        <title>FDMS – Faculty Data Management System</title>
      </Helmet>

      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-md px-6">
        <div className="flex-1">
          <span className="text-xl font-bold text-primary">FDMS</span>
        </div>
        <div className="flex gap-4">
          <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
          <Link to="/login" className="btn btn-sm btn-secondary">Faculty Login</Link>
          <Link to="/admin" className="btn btn-sm btn-outline">Admin Login</Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero min-h-[75vh] bg-base-200">
        <div className="hero-content text-center flex-col">
          <h1 className="text-5xl font-bold text-primary">Faculty Data Management System</h1>
          <p className="py-6 text-lg text-gray-600 max-w-2xl">
            A modern platform to manage academic records, research contributions, and generate institutional reports with ease.
          </p>
          <Link to="/register" className="btn btn-primary mt-4">Get Started</Link>
        </div>
      </div>

      {/* Feature Highlights */}
      <section className="py-20 bg-base-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">Why Choose FDMS?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <h3 className="card-title">🧑‍🏫 Faculty Profiles</h3>
                <p>Manage qualifications, teaching history, achievements, and documents in one place.</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <h3 className="card-title">📚 Research Tracking</h3>
                <p>Track published work, patents, conferences, and collaborative research with real-time updates.</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <h3 className="card-title">📊 Admin Tools</h3>
                <p>Filter, review, export and analyze department-wide data for NAAC/NBA/NIRF reports.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-300 text-base-content">
        <aside>
          <p className="font-bold text-lg">
            FDMS © {new Date().getFullYear()} — Empowering Academic Excellence
          </p>
          <p>Made with ❤️ by the FDMS Dev Team</p>
        </aside>
      </footer>
    </div>
  );
};

export default Landing;
