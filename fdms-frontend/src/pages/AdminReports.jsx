import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFE", "#FF5E5E"];

const AdminReports = ({ readOnly = false }) => {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const role = localStorage.getItem("role");
  const department = localStorage.getItem("department");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get("/api/reports/summary", {
          headers: {
            "x-role": role,
            "x-department": department || "", // Include department header for HOD
          },
        });
        setReport({
          totalProfiles: res.data.totalProfiles || 0,
          totalResearch: res.data.totalResearch || 0,
          researchByType: res.data.researchByType || [],
          facultyByDepartment: res.data.facultyByDepartment || [],
          missingDocuments: res.data.missingDocuments || {},
        });
      } catch (err) {
        console.error("❌ Error loading report", err);
        setError("Failed to load report data.");
      }
    };

    fetchReport();
  }, [role, department]);

  const completionRate = () => {
    const total = report?.totalProfiles || 0;
    const complete =
      total -
      ((report?.missingDocuments?.cv || 0) +
        (report?.missingDocuments?.appointmentLetter || 0) +
        (report?.missingDocuments?.degreeCertificate || 0));
    return total ? ((complete / total) * 100).toFixed(1) : "0";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-950 border border-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-2 text-white">📈 Reports & Analytics</h2>
        <p className="text-gray-400 mb-6">Overview of data completeness, research contributions, and faculty metrics.</p>

        {error && <p className="text-red-500">{error}</p>}

        {!report ? (
          <p className="text-gray-400">Loading report data...</p>
        ) : (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Total Profiles", value: report.totalProfiles, bg: "bg-blue-700" },
                { title: "Total Research", value: report.totalResearch, bg: "bg-green-600" },
                { title: "CVs Missing", value: report.missingDocuments.cv || 0, bg: "bg-yellow-600" },
                { title: "Appointments Missing", value: report.missingDocuments.appointmentLetter || 0, bg: "bg-red-600" },
              ].map((item, i) => (
                <div key={i} className={`rounded-lg p-4 text-center ${item.bg} shadow`}>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-3xl font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-800 rounded-lg p-4 shadow-md text-center">
              <h3 className="text-xl font-semibold text-indigo-400 mb-1">✅ Document Completion Rate</h3>
              <p className="text-4xl font-bold text-indigo-300">{completionRate()}%</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-purple-300 mb-4">📊 Research Type Distribution</h3>
              {Array.isArray(report.researchByType) && report.researchByType.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={report.researchByType}>
                    <XAxis dataKey="_id" stroke="#ccc" />
                    <YAxis allowDecimals={false} stroke="#ccc" />
                    <Tooltip contentStyle={{ backgroundColor: "#2d2d2d", borderColor: "#666" }} />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" name="Count" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-400 text-sm">No research data available.</p>
              )}
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-teal-300 mb-4">🏫 Faculty by Department</h3>
              {Array.isArray(report.facultyByDepartment) && report.facultyByDepartment.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={report.facultyByDepartment}
                      dataKey="count"
                      nameKey="_id"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {report.facultyByDepartment.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-400 text-sm">No department data available.</p>
              )}
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-orange-300 mb-2">🎓 Degree Certificates Missing</h3>
              <p className="text-3xl font-semibold">{report.missingDocuments.degreeCertificate || 0}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReports;
