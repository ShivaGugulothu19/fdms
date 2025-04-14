import { useState } from "react";
import axios from "axios";

const FacultyResearch = () => {
  const [formData, setFormData] = useState({
    title: "",
    journal: "",
    year: "",
    type: "Journal",
    citationCount: 0,
    doi: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/research", {
        ...formData,
        facultyId: user._id,
      });
      alert("Research added ✅");
      setFormData({
        title: "",
        journal: "",
        year: "",
        type: "Journal",
        citationCount: 0,
        doi: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white p-8 shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Add Research Contribution</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Research Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="journal"
          placeholder="Journal / Conference Name"
          value={formData.journal}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        >
          <option value="Journal">Journal</option>
          <option value="Conference">Conference</option>
        </select>
        <input
          type="number"
          name="citationCount"
          placeholder="Citation Count"
          value={formData.citationCount}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="doi"
          placeholder="DOI (optional)"
          value={formData.doi}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          ➕ Add Research
        </button>
      </form>
    </div>
  );
};

export default FacultyResearch;
