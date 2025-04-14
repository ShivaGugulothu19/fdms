import { useEffect, useState } from "react";
import axios from "axios";

const AdminResearchList = () => {
  const [researchList, setResearchList] = useState([]);

  const fetchResearch = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/research");
      setResearchList(res.data);
    } catch (err) {
      console.error(err);
      alert("Could not fetch research data");
    }
  };

  useEffect(() => {
    fetchResearch();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this research entry?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/research/${id}`);
      setResearchList((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert("Deletion failed");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">📚 Research Contributions</h2>

      {researchList.length === 0 ? (
        <p>No research contributions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Author</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Year</th>
                <th className="border px-4 py-2">Citations</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {researchList.map((res) => (
                <tr key={res._id}>
                  <td className="border px-4 py-2">{res.title}</td>
                  <td className="border px-4 py-2">{res.facultyId?.fullName}</td>
                  <td className="border px-4 py-2">{res.type}</td>
                  <td className="border px-4 py-2">{res.year}</td>
                  <td className="border px-4 py-2">{res.citationCount}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(res._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminResearchList;
