import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-blue-700">📊 Dashboard</h2>

      {user?.role === "admin" ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link to="/admin/faculty-profile" className="bg-white p-6 rounded-xl shadow border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">👩‍🏫 Faculty Profiles</h3>
              <p className="text-gray-600">Manage and update all faculty-related information.</p>
            </Link>

            <Link to="/admin/reports" className="bg-white p-6 rounded-xl shadow border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">📈 Reports</h3>
              <p className="text-gray-600">View and download compliance reports.</p>
            </Link>

            <Link to="/admin/settings" className="bg-white p-6 rounded-xl shadow border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">⚙️ Settings</h3>
              <p className="text-gray-600">Customize portal and access management.</p>
            </Link>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/register"
              className="inline-block text-blue-600 text-lg font-medium underline hover:text-blue-800"
            >
              ➕ Register New Faculty
            </Link>
          </div>
        </>
      ) : (
        <p className="text-lg text-gray-600 mt-8">🎓 Welcome to your faculty dashboard!</p>
      )}
    </div>
  );
};

export default Dashboard;
