import AdminReports from "./AdminReports"; // Reusing admin component

const HODReports = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">📈 HOD Reports</h1>
      <p className="text-gray-600 mb-4">View summary reports and faculty metrics.</p>
      <AdminReports />
    </div>
  );
};

export default HODReports;
