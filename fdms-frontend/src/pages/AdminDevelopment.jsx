import { useEffect, useState } from "react";
import axios from "axios";

const AdminDevelopment = () => {
  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchActivities();
  }, [role]);

  const fetchActivities = async () => {
    try {
      const res = await axios.get("/api/development", {
        headers: { "x-role": role },
      });
      setActivities(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch development activities:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this activity?")) return;
    try {
      await axios.delete(`/api/development/${id}`, {
        headers: { "x-role": role },
      });
      setActivities((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("❌ Failed to delete activity:", err);
      alert("Failed to delete activity.");
    }
  };

  const handleEdit = (activity) => {
    setEditing(activity);
    setFormData({
      title: activity.title,
      type: activity.type,
      organizer: activity.organizer,
      date: activity.date?.slice(0, 10),
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/development/${editing._id}`, formData, {
        headers: { "x-role": role },
      });
      setEditing(null);
      fetchActivities();
    } catch (err) {
      console.error("❌ Failed to update activity:", err);
      alert("Failed to update.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const filtered = activities.filter((item) => {
    const matchesName =
      item.facultyId?.fullName?.toLowerCase().includes(search.toLowerCase()) || false;
    const matchesType = type ? item.type === type : true;
    return matchesName && matchesType;
  });

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-1">🧠 Professional Development</h1>
          <p className="text-gray-600 text-sm">
            Track workshops, FDPs, conferences, and training activities.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-base-100 shadow card border p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by faculty name"
              className="input input-bordered w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="select select-bordered w-full"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="FDP">FDP</option>
              <option value="Workshop">Workshop</option>
              <option value="STTP">STTP</option>
              <option value="Certification">Certification</option>
            </select>
          </div>
        </div>

        {/* Result List */}
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading activities...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No development activities found.</div>
        ) : (
          <div className="grid gap-6">
            {filtered.map((a) => (
              <div key={a._id} className="card bg-base-100 border shadow p-6">
                <div className="flex justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-blue-700">{a.title}</h2>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Faculty:</span> {a.facultyId?.fullName || "N/A"} ({a.facultyId?.department || "N/A"})
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Type:</span> {a.type} &nbsp; | &nbsp;
                      <span className="font-medium">Organizer:</span> {a.organizer} &nbsp; | &nbsp;
                      <span className="font-medium">Date:</span> {a.date?.slice(0, 10)}
                    </p>
                    {a.certificate && (
                      <p className="mt-1 text-sm">
                        <span className="font-medium text-gray-600">Certificate:</span>{" "}
                        <a
                          href={`/uploads/${a.certificate}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          View
                        </a>
                      </p>
                    )}
                  </div>
                  {role === "admin" && (
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(a)} className="btn btn-sm btn-warning">✏️ Edit</button>
                      <button onClick={() => handleDelete(a._id)} className="btn btn-sm btn-error">🗑️ Delete</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✏️ Edit Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Edit Development Activity</h2>
              <div className="space-y-3">
                <input name="title" placeholder="Title" value={formData.title || ""} onChange={handleChange} className="input input-bordered w-full" />
                <input name="organizer" placeholder="Organizer" value={formData.organizer || ""} onChange={handleChange} className="input input-bordered w-full" />
                <input name="date" type="date" value={formData.date || ""} onChange={handleChange} className="input input-bordered w-full" />
                <select name="type" value={formData.type || ""} onChange={handleChange} className="select select-bordered w-full">
                  <option value="FDP">FDP</option>
                  <option value="Workshop">Workshop</option>
                  <option value="STTP">STTP</option>
                  <option value="Certification">Certification</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setEditing(null)} className="btn">Cancel</button>
                <button onClick={handleUpdate} className="btn btn-primary">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDevelopment;
