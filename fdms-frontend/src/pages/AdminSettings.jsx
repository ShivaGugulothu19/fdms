import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

const AdminSettings = () => {
  const [academicYear, setAcademicYear] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [portalMode, setPortalMode] = useState("Live");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const role = localStorage.getItem("role");

  useEffect(() => {
    axios
      .get("/api/settings", { headers: { "x-role": role } })
      .then((res) => {
        const data = res.data || {};
        setAcademicYear(data.academicYear || "");
        setEmailNotifications(data.emailNotifications || false);
        setPortalMode(data.portalMode || "Live");
      })
      .catch((err) => console.error("❌ Failed to load settings:", err))
      .finally(() => setLoading(false));
  }, [role]);

  const handleSave = async () => {
    const payload = { academicYear, emailNotifications, portalMode };
    setSaving(true);
    try {
      await axios.post("/api/settings", payload, {
        headers: { "x-role": role },
      });
      alert("✅ Settings saved successfully");
    } catch (err) {
      console.error("❌ Failed to save settings:", err);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-950 border border-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-2">⚙️ Admin Settings</h2>
        <p className="text-gray-400 mb-6">Configure system-wide options and access policies.</p>

        {/* General Settings */}
        <div className="bg-gray-800 rounded-lg p-5 mb-6 shadow">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">🛠️ General Configuration</h3>

          {loading ? (
            <p className="text-gray-500">Loading settings...</p>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1">Academic Year</label>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                />
              </div>

              <div className="mb-4 flex items-center justify-between">
                <label className="text-sm text-gray-300">Email Notifications</label>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={() => setEmailNotifications((prev) => !prev)}
                  className="form-checkbox h-5 w-5 text-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-1">Portal Mode</label>
                <select
                  value={portalMode}
                  onChange={(e) => setPortalMode(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                >
                  <option value="Live">Live</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-semibold"
              >
                {saving ? "Saving..." : "Save Settings"}
              </button>
            </>
          )}
        </div>

        {/* Role Summary */}
        <div className="bg-gray-800 rounded-lg p-5 shadow">
          <h3 className="text-xl font-semibold text-green-400 mb-3">👥 Role Access Overview</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2 text-sm">
            <li><strong>Admin</strong> – Full access to all modules and controls</li>
            <li><strong>HOD</strong> – View-only access to department profiles</li>
            <li><strong>Faculty</strong> – Can update personal profile and research data</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
