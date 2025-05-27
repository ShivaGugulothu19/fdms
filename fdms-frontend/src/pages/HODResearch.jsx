import AdminResearch from "./AdminResearch"; // Reusing admin component

const HODResearch = () => {
  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <div className="card bg-base-100 shadow-md p-6" data-theme="light">
        <h1 className="text-2xl font-bold text-primary mb-2">📚 HOD Research View</h1>
        <p className="text-gray-600 mb-4">
          Browse research contributions submitted by faculty. This is a read-only view.
        </p>
        <AdminResearch readOnly={true} />
      </div>
    </div>
  );
};

export default HODResearch;
