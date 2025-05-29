import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

const AdminFacultyProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [editingProfile, setEditingProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [showModal, setShowModal] = useState(false);
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchProfiles();
  }, [role]);

  const fetchProfiles = async () => {
    try {
      const res = await axios.get("/api/profile/all", {
        headers: { "x-role": role },
      });
      setProfiles(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Error fetching profiles", err);
      setProfiles([]);
    }
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setFormData(profile);
    setFiles({});
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (role !== "admin") return;
    const confirmDelete = window.confirm("Are you sure you want to delete this profile?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/profile/${id}`, {
        headers: { "x-role": role },
      });
      setProfiles((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("❌ Failed to delete", err);
      alert("Failed to delete profile.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles((prev) => ({ ...prev, [name]: fileList[0] }));
  };

  const handleUpdate = async () => {
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      Object.entries(files).forEach(([key, file]) => data.append(key, file));

      await axios.put(`/api/profile/${editingProfile._id}`, data, {
        headers: { "x-role": role, "Content-Type": "multipart/form-data" },
      });

      setShowModal(false);
      fetchProfiles();
    } catch (err) {
      console.error("❌ Failed to update", err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-950 border border-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-white mb-2">📁 Faculty Profiles</h2>
        <p className="text-gray-400 mb-6">
          {role === "admin"
            ? "View and manage all registered faculty members and their details."
            : "View faculty profiles. Access is read-only."}
        </p>

        {profiles.length === 0 ? (
          <p className="text-gray-500">No faculty profiles found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {profiles.map((p) => (
              <div key={p._id} className="bg-gray-800 rounded-lg shadow p-5 border border-gray-700">
                <h3 className="text-xl font-semibold text-blue-400 mb-2">
                  {p.facultyId?.fullName || p.fullName || "No Name"}
                </h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-semibold text-gray-300">Email:</span> {p.facultyId?.email || p.email || "-"}</p>
                  <p><span className="font-semibold text-gray-300">Phone:</span> {p.facultyId?.phone || p.phone || "-"}</p>
                  <p><span className="font-semibold text-gray-300">Department:</span> {p.facultyId?.department || "-"}</p>
                  <p><span className="font-semibold text-gray-300">Address:</span> {p.address || "-"}</p>
                  <p><span className="font-semibold text-gray-300">Aadhar:</span> {p.aadhar || "-"}</p>
                  <p><span className="font-semibold text-gray-300">Gender:</span> {p.gender || "-"}</p>
                  <hr className="border-gray-600 my-2" />
                  <p><span className="font-semibold text-gray-300">Degree:</span> {p.degree || "-"}</p>
                  <p><span className="font-semibold text-gray-300">Institution:</span> {p.institution || "-"}</p>
                  <p><span className="font-semibold text-gray-300">Specialization:</span> {p.specialization || "-"}</p>
                  <p><span className="font-semibold text-gray-300">Year:</span> {p.year || "-"}</p>
                  <hr className="border-gray-600 my-2" />
                  <p><span className="font-semibold text-gray-300">Job Title:</span> {p.jobTitle || "-"}</p>
                  <p><span className="font-semibold text-gray-300">Organization:</span> {p.organization || "-"}</p>
                  <p><span className="font-semibold text-gray-300">From:</span> {p.startDate || "-"} – {p.isCurrent ? "Present" : p.endDate || "-"}</p>
                  <hr className="border-gray-600 my-2" />
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-indigo-400">
                    {p.cv && (<a href={`/uploads/${p.cv}`} target="_blank" rel="noreferrer" className="underline hover:text-indigo-300">📄 CV</a>)}
                    {p.degreeCertificate && (<a href={`/uploads/${p.degreeCertificate}`} target="_blank" rel="noreferrer" className="underline hover:text-indigo-300">🎓 Degree</a>)}
                    {p.appointmentLetter && (<a href={`/uploads/${p.appointmentLetter}`} target="_blank" rel="noreferrer" className="underline hover:text-indigo-300">📑 Appointment</a>)}
                  </div>
                  {role === "admin" && (
                    <div className="mt-4 flex gap-3">
                      <button onClick={() => handleEdit(p)} className="px-4 py-1 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded">✏️ Edit</button>
                      <button onClick={() => handleDelete(p._id)} className="px-4 py-1 bg-red-600 hover:bg-red-500 text-white font-semibold rounded">🗑️ Delete</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Edit Faculty Profile</h3>

            <div className="space-y-3">
              <input type="text" name="address" placeholder="Address" value={formData.address || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600" />
              <input type="text" name="aadhar" placeholder="Aadhar" value={formData.aadhar || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600" />
              <input type="text" name="degree" placeholder="Degree" value={formData.degree || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600" />
              <input type="text" name="institution" placeholder="Institution" value={formData.institution || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600" />
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Upload New CV</label>
                <input type="file" name="cv" onChange={handleFileChange} className="file-input file-input-bordered w-full" />
                <label className="text-sm text-gray-400">Upload Degree Certificate</label>
                <input type="file" name="degreeCertificate" onChange={handleFileChange} className="file-input file-input-bordered w-full" />
                <label className="text-sm text-gray-400">Upload Appointment Letter</label>
                <input type="file" name="appointmentLetter" onChange={handleFileChange} className="file-input file-input-bordered w-full" />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded">Cancel</button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFacultyProfile;