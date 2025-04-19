import AdminResearch from "./AdminResearch"; // Reusing admin component

const HODResearch = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">📚 HOD Research View</h1>
      <p className="text-gray-600 mb-4">Browse research contributions by faculty. (Read-only)</p>
      <AdminResearch />
    </div>
  );
};

export default HODResearch;
