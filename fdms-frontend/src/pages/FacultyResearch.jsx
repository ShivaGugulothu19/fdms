// src/pages/FacultyResearch.jsx
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const FacultyResearch = () => {
  const { user } = useAuth(); // <-- using custom hook
  const [form, setForm] = useState({
    title: "",
    type: "",
    journalName: "",
    publicationDate: "",
    doiLink: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        facultyId: user?.id, // optional chaining for safety
      };
      await axios.post("/api/research", payload);
      alert("Research submitted successfully!");
      setForm({
        title: "",
        type: "",
        journalName: "",
        publicationDate: "",
        doiLink: "",
      });
    } catch (err) {
      console.error(err);
      alert("Submission failed!");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Submit Your Research</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          name="title"
          placeholder="Research Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Type</option>
          <option value="Journal">Journal</option>
          <option value="Conference">Conference</option>
          <option value="Book Chapter">Book Chapter</option>
          <option value="Patent">Patent</option>
        </select>
        <input
          name="journalName"
          placeholder="Journal Name"
          value={form.journalName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="publicationDate"
          value={form.publicationDate}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="doiLink"
          placeholder="DOI Link"
          value={form.doiLink}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FacultyResearch;
