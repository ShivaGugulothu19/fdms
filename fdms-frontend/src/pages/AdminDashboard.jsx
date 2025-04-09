import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/faculty");
        setFacultyList(res.data);
      } catch (err) {
        console.error(err);
        alert("Error fetching faculty");
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this faculty?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/faculty/${id}`);
      setFacultyList((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete faculty.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">👩‍💼 Admin Dashboard</h2>

      {/* Admin Navigation Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
        <Link
          to="/admin/faculty-profile"
          className="bg-white p-6 rounded-xl shadow border border-gray-200 hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">👩‍🏫 Faculty Profiles</h3>
          <p className="text-gray-600">View, manage, and update all faculty details.</p>
        </Link>

        <Link
          to="/admin/reports"
          className="bg-white p-6 rounded-xl shadow border border-gray-200 hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">📊 Reports</h3>
          <p className="text-gray-600">Generate and download institutional reports.</p>
        </Link>

        <Link
          to="/admin/settings"
          className="bg-white p-6 rounded-xl shadow border border-gray-200 hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">⚙️ Settings</h3>
          <p className="text-gray-600">Customize roles, access, and configuration.</p>
        </Link>
      </div>

      {/* Faculty Table */}
      <div className="bg-white p-4 border rounded-xl shadow-sm">
        <h3 className="text-2xl font-bold mb-4">👨‍🏫 Faculty Management</h3>

        {facultyList.length === 0 ? (
          <p className="text-gray-600">No faculty registered yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Phone</th>
                  <th className="px-4 py-2 border">Department</th>
                  <th className="px-4 py-2 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {facultyList.map((faculty) => (
                  <tr key={faculty._id}>
                    <td className="px-4 py-2 border">{faculty.fullName}</td>
                    <td className="px-4 py-2 border">{faculty.email}</td>
                    <td className="px-4 py-2 border">{faculty.phone}</td>
                    <td className="px-4 py-2 border">{faculty.department}</td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        className="text-red-600 hover:underline mr-4"
                        onClick={() => handleDelete(faculty._id)}
                      >
                        Delete
                      </button>
                      <button className="text-blue-600 hover:underline">Edit</button>
                      {/* Edit functionality to be added later */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
