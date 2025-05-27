import AdminReports from "./AdminReports"; // Reusing admin component

const HODReports = () => {
  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <div className="card bg-base-100 shadow-md p-6" data-theme="light">
        <h1 className="text-2xl font-bold text-primary mb-2">📈 HOD Reports</h1>
        <p className="text-gray-600 mb-4">
          View summary reports and faculty metrics. This is a read-only view.
        </p>
        <AdminReports readOnly={true} />
      </div>
    </div>
  );
};

export default HODReports;
