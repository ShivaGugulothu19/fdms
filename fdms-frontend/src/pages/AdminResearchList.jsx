// src/pages/admin/AdminResearch.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const AdminResearch = () => {
  const [allResearch, setAllResearch] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const fetchAllResearch = async () => {
    try {
      const res = await axios.get("/api/research");
      setAllResearch(res.data);
    } catch (err) {
      console.error(err);
      alert("Error loading research data");
    }
  };

  useEffect(() => {
    fetchAllResearch();
  }, []);

  const filteredResearch = allResearch.filter((r) => {
    const matchTitle = r.title.toLowerCase().includes(search.toLowerCase());
    const matchName = r.facultyId?.fullName.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter ? r.type === typeFilter : true;
    return (matchTitle || matchName) && matchType;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Research Contributions</h2>

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

      <ul className="space-y-3">
        {filteredResearch.map((r) => (
          <li key={r._id} className="border p-4 rounded shadow">
            <div className="font-semibold text-lg">{r.title}</div>
            <div className="text-sm text-gray-600">
              <span className="italic">{r.type}</span> — {r.journalName || "N/A"}
              <br />
              Faculty: {r.facultyId?.fullName} ({r.facultyId?.department})<br />
              Published: {r.publicationDate?.slice(0, 10)}
              {r.doiLink && (
                <>
                  <br />
                  DOI: <a href={r.doiLink} target="_blank" rel="noreferrer" className="text-blue-600 underline">{r.doiLink}</a>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminResearch;
