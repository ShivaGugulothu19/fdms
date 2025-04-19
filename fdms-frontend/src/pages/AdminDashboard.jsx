import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/faculty", {
          headers: { "x-role": role },
        });
        setFacultyList(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error(err);
        alert("Error fetching faculty");
      }
    };
    fetchData();
  }, [role]);

  useEffect(() => {
    let results = facultyList;
    if (searchTerm) {
      results = results.filter((f) =>
        f.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (department) {
      results = results.filter(
        (f) => f.department.toLowerCase() === department.toLowerCase()
      );
    }
    setFiltered(results);
  }, [searchTerm, department, facultyList]);

  const handleDelete = async (id) => {
    if (role !== "admin") return;
    const confirm = window.confirm("Are you sure you want to delete this faculty?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/faculty/${id}`, {
        headers: { "x-role": role },
      });
      setFacultyList((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete faculty.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">👨‍💼 Admin Dashboard</h2>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Link to="/admin/faculty-profile" className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-xl font-semibold">👩‍🏫 Faculty Profiles</h3>
          <p>Manage and update all faculty details.</p>
        </Link>
        <Link to="/admin/research" className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-xl font-semibold">📚 Research</h3>
          <p>View faculty research publications.</p>
        </Link>
        <Link to="/admin/reports" className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-xl font-semibold">📈 Reports</h3>
          <p>Generate and download reports.</p>
        </Link>
        <Link to="/admin/settings" className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-xl font-semibold">⚙️ Settings</h3>
          <p>Customize access and portal config.</p>
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border px-4 py-2 rounded-md w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border px-4 py-2 rounded-md"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <p className="text-gray-600">No faculty found.</p>
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
              {filtered.map((faculty) => (
                <tr key={faculty._id}>
                  <td className="px-4 py-2 border">{faculty.fullName}</td>
                  <td className="px-4 py-2 border">{faculty.email}</td>
                  <td className="px-4 py-2 border">{faculty.phone}</td>
                  <td className="px-4 py-2 border">{faculty.department}</td>
                  <td className="px-4 py-2 border text-center">
                    {role === "admin" && (
                      <>
                        <button
                          className="text-red-600 hover:underline mr-4"
                          onClick={() => handleDelete(faculty._id)}
                        >
                          Delete
                        </button>
                        <button className="text-blue-600 hover:underline">Edit</button>
                      </>
                    )}
                    {role === "hod" && <span className="text-gray-400">View-only</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
