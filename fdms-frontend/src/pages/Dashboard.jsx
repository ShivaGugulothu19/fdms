import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="card bg-base-100 shadow-lg p-8" data-theme="light">
        <h2 className="text-3xl font-bold text-primary mb-8">
          📊 {user?.role === "admin" ? "Admin Dashboard" : "Faculty Dashboard"}
        </h2>

        {user?.role === "admin" ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Link
                to="/admin/faculty-profile"
                className="card bg-base-100 border shadow hover:shadow-md transition"
              >
                <div className="card-body">
                  <h3 className="card-title text-blue-600">👩‍🏫 Faculty Profiles</h3>
                  <p>Manage and update all faculty-related information.</p>
                </div>
              </Link>

              <Link
                to="/admin/reports"
                className="card bg-base-100 border shadow hover:shadow-md transition"
              >
                <div className="card-body">
                  <h3 className="card-title text-blue-600">📈 Reports</h3>
                  <p>View and download compliance reports.</p>
                </div>
              </Link>

              <Link
                to="/admin/settings"
                className="card bg-base-100 border shadow hover:shadow-md transition"
              >
                <div className="card-body">
                  <h3 className="card-title text-blue-600">⚙️ Settings</h3>
                  <p>Customize portal and access management.</p>
                </div>
              </Link>
            </div>

            <div className="mt-10 text-center">
              <Link to="/register" className="btn btn-outline btn-primary">
                ➕ Register New Faculty
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-600">
              🎓 Welcome to your faculty dashboard!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
