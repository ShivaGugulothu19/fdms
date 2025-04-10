import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("");

  // 🔄 Fetch all faculty
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/faculty");
        setFacultyList(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error(err);
        alert("Error fetching faculty");
      }
    };

    fetchData();
  }, []);

  // 🔍 Filter logic
  useEffect(() => {
    let filteredData = facultyList;

    if (searchTerm) {
      filteredData = filteredData.filter((f) =>
        f.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (department) {
      filteredData = filteredData.filter((f) =>
        f.department.toLowerCase() === department.toLowerCase()
      );
    }

    setFiltered(filteredData);
  }, [searchTerm, department, facultyList]);

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
      <h2 className="text-3xl font-bold mb-6 text-blue-700">👨‍💼 Admin Dashboard</h2>

      {/* 🔎 Search and Filter */}
      <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
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

      {/* 📋 Table */}
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
                    <button
                      className="text-red-600 hover:underline mr-4"
                      onClick={() => handleDelete(faculty._id)}
                    >
                      Delete
                    </button>
                    <button className="text-blue-600 hover:underline">Edit</button>
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
