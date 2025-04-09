import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">✅ This is the Dashboard page</h2>

      {user.role === "admin" && (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Faculty Profiles</h2>
              <p className="text-gray-600">Manage and update all faculty-related information.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Reports</h2>
              <p className="text-gray-600">View and download compliance reports for NAAC/NBA.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Settings</h2>
              <p className="text-gray-600">Customize portal and access management.</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="/register"
              className="inline-block text-blue-600 text-lg font-medium underline hover:text-blue-800"
            >
              ➕ Register New Faculty
            </a>
          </div>
        </>
      )}

      {user.role === "faculty" && (
        <p className="text-gray-600 text-lg">Welcome to your profile dashboard 🎓</p>
      )}
    </div>
  );
};

export default Dashboard;
