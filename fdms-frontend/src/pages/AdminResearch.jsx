import { useEffect, useState } from "react";
import axios from "axios";

const AdminResearch = () => {
  const [allResearch, setAllResearch] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");

  const fetchAllResearch = async () => {
    try {
      const res = await axios.get("/api/research", {
        headers: {
          "x-role": role,
        },
      });

      const data = res.data;

      if (Array.isArray(data)) {
        console.log("✅ Research data loaded:", data);
        setAllResearch(data);
      } else {
        console.error("❌ Unexpected research format:", data);
        setError("Invalid data format");
        setAllResearch([]);
      }
    } catch (err) {
      console.error("❌ Failed to load research:", err);
      setError("Error loading research data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllResearch();
  }, [role]);

  const filteredResearch = allResearch.filter((r) => {
    const title = r.title?.toLowerCase() || "";
    const name = r.facultyId?.fullName?.toLowerCase() || "";
    const matchTitle = title.includes(search.toLowerCase());
    const matchName = name.includes(search.toLowerCase());
    const matchType = typeFilter ? r.type === typeFilter : true;
    return (matchTitle || matchName) && matchType;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📚 All Research Contributions</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or faculty name"
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Journal">Journal</option>
          <option value="Conference">Conference</option>
          <option value="Book Chapter">Book Chapter</option>
          <option value="Patent">Patent</option>
        </select>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-gray-500">Loading research data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredResearch.length === 0 ? (
        <p className="text-gray-500">No research records match your filters.</p>
      ) : (
        <ul className="space-y-3">
          {filteredResearch.map((r) => (
            <li key={r._id} className="border p-4 rounded shadow bg-white">
              <div className="font-semibold text-lg text-blue-700">
                {r.title || "Untitled"}
              </div>
              <div className="text-sm text-gray-600">
                <span className="italic">{r.type}</span> — {r.journalName || "N/A"}
                <br />
                Faculty: {r.facultyId?.fullName || "N/A"} ({r.facultyId?.department || "N/A"})
                <br />
                Published: {r.publicationDate?.slice(0, 10) || "N/A"}
                {r.doiLink && (
                  <>
                    <br />
                    DOI:{" "}
                    <a
                      href={r.doiLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      {r.doiLink}
                    </a>
                  </>
                )}
              </div>

              {/* Admin-only controls */}
              {role === "admin" && (
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => alert(`Edit research ID: ${r._id}`)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => alert(`Delete research ID: ${r._id}`)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminResearch;
