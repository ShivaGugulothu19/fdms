import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie
} from "recharts";

const AdminReports = () => {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get("/api/reports/summary", {
          headers: {
            "x-role": role,
          },
        });
        console.log("✅ Report data:", res.data);
        setReport(res.data);
      } catch (err) {
        console.error("❌ Error loading report", err);
        setError("Failed to load report data.");
      }
    };

    fetchReport();
  }, [role]);

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">📈 Admin Reports</h2>

      {error && <p className="text-red-500">{error}</p>}

      {!report ? (
        <p className="text-gray-500">Loading report data...</p>
      ) : (
        <div className="space-y-8">

          {/* 🔹 Top Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded shadow text-center">
              <h3 className="text-lg font-semibold text-blue-700">Total Profiles</h3>
              <p className="text-3xl">{report.totalProfiles ?? 0}</p>
            </div>
            <div className="bg-green-50 p-4 rounded shadow text-center">
              <h3 className="text-lg font-semibold text-green-700">Total Research</h3>
              <p className="text-3xl">{report.totalResearch ?? 0}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded shadow text-center">
              <h3 className="text-lg font-semibold text-yellow-700">CVs Missing</h3>
              <p className="text-3xl">{report.missingDocuments?.cv ?? 0}</p>
            </div>
            <div className="bg-red-50 p-4 rounded shadow text-center">
              <h3 className="text-lg font-semibold text-red-700">Appointments Missing</h3>
              <p className="text-3xl">{report.missingDocuments?.appointmentLetter ?? 0}</p>
            </div>
          </div>

          {/* 🔹 Research Type Bar Chart */}
          <div className="bg-white border rounded p-4 shadow">
            <h3 className="text-xl font-bold text-purple-600 mb-4">📊 Research Type Chart</h3>
            <div className="w-full overflow-x-auto">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={report.researchByType}>
                  <XAxis dataKey="_id" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" name="Research Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 🔹 Faculty by Department Pie Chart */}
          <div className="bg-white border rounded p-4 shadow">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">🏫 Faculty Distribution</h3>
            <div className="w-full overflow-x-auto">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={report.facultyByDepartment}
                    dataKey="count"
                    nameKey="_id"
                    outerRadius={100}
                    fill="#82ca9d"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 🔹 Degree Certs Missing */}
          <div className="bg-white border rounded p-4 shadow">
            <h3 className="text-xl font-bold text-orange-600 mb-2">🎓 Degree Certificates Missing</h3>
            <p>{report.missingDocuments?.degreeCertificate ?? 0}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
