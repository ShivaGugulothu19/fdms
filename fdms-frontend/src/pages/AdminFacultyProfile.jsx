import { useEffect, useState } from "react";
import axios from "axios";

const AdminFacultyProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
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

    fetchProfiles();
  }, [role]);

  const handleEdit = (id) => {
    if (role !== "admin") return;
    alert(`Edit action for profile ID: ${id}`);
  };

  const handleDelete = async (id) => {
    if (role !== "admin") return;
    const confirmDelete = window.confirm("Are you sure you want to delete this profile?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/faculty/${id}`, {
        headers: { "x-role": role },
      });
      setProfiles((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("❌ Failed to delete", err);
      alert("Failed to delete profile.");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">📁 Faculty Profiles</h2>
      <p className="text-gray-600 mb-6">
        {role === "admin"
          ? "View and manage all registered faculty members and their data."
          : "View all faculty profiles. You have read-only access."}
      </p>

      {profiles.length === 0 ? (
        <p className="text-gray-400">No profiles available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {profiles.map((p) => (
            <div key={p._id} className="border p-4 rounded bg-gray-50 shadow">
              <h3 className="text-lg font-semibold text-blue-600">{p.fullName || "No Name"}</h3>
              <p><strong>Email:</strong> {p.email || "-"}</p>
              <p><strong>Phone:</strong> {p.phone || "-"}</p>
              <p><strong>Address:</strong> {p.address || "-"}</p>
              <p><strong>Aadhar:</strong> {p.aadhar || "-"}</p>
              <p><strong>Gender:</strong> {p.gender || "-"}</p>

              <hr className="my-2" />

              <p><strong>Degree:</strong> {p.degree || "-"}</p>
              <p><strong>Institution:</strong> {p.institution || "-"}</p>
              <p><strong>Specialization:</strong> {p.specialization || "-"}</p>
              <p><strong>Year:</strong> {p.year || "-"}</p>

              <hr className="my-2" />

              <p><strong>Job Title:</strong> {p.jobTitle || "-"}</p>
              <p><strong>Organization:</strong> {p.organization || "-"}</p>
              <p><strong>From:</strong> {p.startDate || "-"} - {p.isCurrent ? "Present" : (p.endDate || "-")}</p>

              <hr className="my-2" />

              <div className="text-sm text-blue-500 space-x-2">
                {p.cv && <a href={`/uploads/${p.cv}`} target="_blank" rel="noreferrer">📄 CV</a>}
                {p.degreeCertificate && <a href={`/uploads/${p.degreeCertificate}`} target="_blank" rel="noreferrer">🎓 Degree</a>}
                {p.appointmentLetter && <a href={`/uploads/${p.appointmentLetter}`} target="_blank" rel="noreferrer">📑 Appointment</a>}
              </div>

              {role === "admin" && (
                <div className="mt-4 space-x-2">
                  <button
                    onClick={() => handleEdit(p._id)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFacultyProfile;
