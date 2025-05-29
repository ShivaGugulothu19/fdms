import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const AdminResearch = ({ readOnly = false }) => {
  const { user } = useAuth();
  const [allResearch, setAllResearch] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});

  const role = user?.role || "admin";
  const department = user?.department || "";

  useEffect(() => {
    fetchResearch();
  }, [role]);

  const fetchResearch = async () => {
    try {
      const res = await axios.get("/api/research", {
        headers: {
          "x-role": role,
          "x-department": department,
          "x-user-id": user?._id || "",
        },
      });
      setAllResearch(res.data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError("Failed to load research");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this research entry?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/research/${id}`, {
        headers: {
          "x-role": role,
          "x-department": department,
          "x-user-id": user?._id || "",
        },
      });
      setAllResearch((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("❌ Delete failed", err);
      alert("Failed to delete research entry.");
    }
  };

  const handleEdit = (r) => {
    setEditing(r);
    setFormData({
      title: r.title,
      type: r.type,
      journalName: r.journalName,
      publicationDate: r.publicationDate?.slice(0, 10),
      doiLink: r.doiLink,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/research/${editing._id}`, formData, {
        headers: {
          "x-role": role,
          "x-department": department,
          "x-user-id": user?._id || "",
        },
      });
      setEditing(null);
      fetchResearch();
    } catch (err) {
      console.error("❌ Failed to update research", err);
      alert("Failed to update.");
    }
  };

  const filtered = allResearch.filter((r) =>
    (r.title?.toLowerCase().includes(search.toLowerCase()) ||
      r.facultyId?.fullName?.toLowerCase().includes(search.toLowerCase())) &&
    (!typeFilter || r.type === typeFilter)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0e0f11] p-6 text-white" data-theme="dark">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Research Contributions</h1>
          <p className="text-gray-400 text-sm">Submitted by faculty members</p>
        </div>

        <div className="bg-[#1c1e22] card border border-gray-700 p-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by title or faculty"
              className="input input-bordered bg-[#111214] text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="select select-bordered bg-[#111214] text-white"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Journal">Journal</option>
              <option value="Conference">Conference</option>
              <option value="Book Chapter">Book Chapter</option>
              <option value="Patent">Patent</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500">No matching research records.</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((r) => (
              <div key={r._id} className="card bg-[#1b1d22] border border-gray-700 p-4">
                <div>
                  <h2 className="font-semibold text-lg text-primary-content">{r.title}</h2>
                  <p className="text-gray-400 text-sm">
                    {r.type} | {r.journalName || "N/A"} | {r.publicationDate?.slice(0, 10)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {r.facultyId?.fullName} ({r.facultyId?.department})
                  </p>
                  {r.doiLink && (
                    <a href={r.doiLink} target="_blank" rel="noreferrer" className="text-blue-400 underline text-sm">
                      DOI Link
                    </a>
                  )}
                </div>
                {!readOnly && role === "admin" && (
                  <div className="mt-2 flex gap-2">
                    <button className="btn btn-sm btn-outline btn-warning" onClick={() => handleEdit(r)}>Edit</button>
                    <button className="btn btn-sm btn-outline btn-error" onClick={() => handleDelete(r._id)}>Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ✏️ Edit Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Edit Research Entry</h3>
              <div className="space-y-3">
                <input name="title" placeholder="Title" value={formData.title || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600" />
                <input name="journalName" placeholder="Journal Name" value={formData.journalName || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600" />
                <input name="publicationDate" type="date" value={formData.publicationDate || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600" />
                <input name="doiLink" placeholder="DOI Link" value={formData.doiLink || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600" />
                <select name="type" value={formData.type || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600">
                  <option value="Journal">Journal</option>
                  <option value="Conference">Conference</option>
                  <option value="Book Chapter">Book Chapter</option>
                  <option value="Patent">Patent</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button onClick={() => setEditing(null)} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded">Cancel</button>
                <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminResearch;
