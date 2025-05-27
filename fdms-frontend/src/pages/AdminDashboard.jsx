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
        const res = await axios.get("/api/faculty", {
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
      await axios.delete(`/api/faculty/${id}`, {
        headers: { "x-role": role },
      });
      setFacultyList((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete faculty.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0f11] p-6 text-gray-200" data-theme="dark">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-400 mt-1 text-sm">Centralized control panel for FDMS administration</p>
        </div>

        {/* Feature Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Faculty Profiles", desc: "Manage and review faculty data", to: "/admin/faculty-profile" },
            { title: "Research Contributions", desc: "View research publications", to: "/admin/research" },
            { title: "Professional Development", desc: "Workshops, FDPs, and more", to: "/admin/development" },
            { title: "Reports & Compliance", desc: "Generate official reports", to: "/admin/reports" },
            { title: "Settings", desc: "Admin preferences and access", to: "/admin/settings" },
          ].map((mod, i) => (
            <Link
              key={i}
              to={mod.to}
              className="group card bg-[#1b1d22] border border-gray-700 shadow-sm hover:border-primary transition"
            >
              <div className="card-body space-y-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-primary">
                  {mod.title}
                </h3>
                <p className="text-sm text-gray-400">{mod.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Faculty Snapshot */}
        <div className="card bg-[#1b1d22] p-6 border border-gray-700 shadow-sm">
          <h2 className="text-xl font-semibold text-white mb-4">Faculty Overview</h2>

          {/* Filters */}
          <div className="mb-4 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name..."
              className="input input-bordered bg-[#111214] text-white w-full md:w-1/2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="select select-bordered bg-[#111214] text-white"
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
            <p className="text-gray-500">No faculty found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra text-sm">
                <thead>
                  <tr className="text-gray-400">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Department</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((faculty) => (
                    <tr key={faculty._id}>
                      <td>{faculty.fullName}</td>
                      <td>{faculty.email}</td>
                      <td>{faculty.phone}</td>
                      <td>{faculty.department}</td>
                      <td className="text-center space-x-2">
                        {role === "admin" && (
                          <>
                            <button
                              onClick={() => handleDelete(faculty._id)}
                              className="btn btn-xs btn-error"
                            >
                              Delete
                            </button>
                            <button className="btn btn-xs btn-outline btn-primary">Edit</button>
                          </>
                        )}
                        {role === "hod" && <span className="text-gray-500 text-xs">View-only</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
