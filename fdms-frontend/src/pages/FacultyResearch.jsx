import { useState } from "react";
import axios from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const FacultyResearch = () => {
  const { user } = useAuth();
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

    if (!user?._id) {
      alert("User not authenticated.");
      return;
    }

    const payload = {
      ...form,
      facultyId: user._id,
    };

    try {
      await axios.post(`https://fdms-sc8b.onrender.com/api/research`, payload, {
        headers: {
          "x-role": "faculty",
          "x-department": user.department,
          "x-user-id": user._id,
        },
      });

      alert("Research submitted successfully!");
      setForm({
        title: "",
        type: "",
        journalName: "",
        publicationDate: "",
        doiLink: "",
      });
    } catch (err) {
      console.error("Error submitting research:", err);
      alert("Submission failed!");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="card w-full max-w-2xl bg-base-100 shadow-lg p-8" data-theme="light">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">
          📄 Submit Your Research
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Research Title"
            value={form.title}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="select select-bordered w-full"
          >
            <option value="">Select Type</option>
            <option value="Journal">Journal</option>
            <option value="Conference">Conference</option>
            <option value="Book Chapter">Book Chapter</option>
            <option value="Patent">Patent</option>
          </select>

          <input
            name="journalName"
            placeholder="Journal Name (Optional)"
            value={form.journalName}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <input
            type="date"
            name="publicationDate"
            value={form.publicationDate}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />

          <input
            name="doiLink"
            placeholder="DOI Link (Optional)"
            value={form.doiLink}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <button type="submit" className="btn btn-primary w-full">
            🚀 Submit Research
          </button>
        </form>
      </div>
    </div>
  );
};

export default FacultyResearch;
