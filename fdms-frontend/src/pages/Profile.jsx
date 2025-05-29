import { useState } from "react";
import axios from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext"; // make sure this is correctly implemented

const steps = ["Personal Info", "Qualifications", "Experience", "Documents"];

const Profile = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    aadhar: "",
    gender: "Male",
    degree: "",
    institution: "",
    year: "",
    specialization: "",
    jobTitle: "",
    organization: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    cv: null,
    degreeCertificate: null,
    appointmentLetter: null,
  });

  const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    const requiredFields = ["fullName", "email", "phone", "aadhar"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in your ${field}`);
        return;
      }
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      await axios.post(`https://fdms-sc8b.onrender.com/api/profile", data, {
        headers: {
          "x-role": "faculty",
          "x-department": user?.department,
          "x-user-id": user?._id,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile submitted successfully ✅");
    } catch (err) {
      console.error("Profile submission failed:", err);
      alert("Something went wrong! Please try again.");
    }
  };

  const inputClass = "input input-bordered w-full";
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <input type="text" placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className={inputClass} />
            <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} />
            <input type="text" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} />
            <input type="text" placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className={inputClass} />
            <input type="text" placeholder="Aadhar Number" value={formData.aadhar} onChange={(e) => setFormData({ ...formData, aadhar: e.target.value })} className={inputClass} />
          </>
        );
      case 1:
        return (
          <>
            <input type="text" placeholder="Degree" value={formData.degree} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} className={inputClass} />
            <input type="text" placeholder="Institution" value={formData.institution} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} className={inputClass} />
            <input type="text" placeholder="Year of Completion" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className={inputClass} />
            <input type="text" placeholder="Specialization" value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })} className={inputClass} />
          </>
        );
      case 2:
        return (
          <>
            <input type="text" placeholder="Job Title" value={formData.jobTitle} onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })} className={inputClass} />
            <input type="text" placeholder="Organization" value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} className={inputClass} />
            <input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className={inputClass} />
            <input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className={inputClass} />
          </>
        );
      case 3:
        return (
          <>
            <div className="form-control">
              <label className="label">Upload CV</label>
              <input type="file" className="file-input file-input-bordered w-full" onChange={(e) => setFormData({ ...formData, cv: e.target.files[0] })} />
            </div>
            <div className="form-control">
              <label className="label">Degree Certificate</label>
              <input type="file" className="file-input file-input-bordered w-full" onChange={(e) => setFormData({ ...formData, degreeCertificate: e.target.files[0] })} />
            </div>
            <div className="form-control">
              <label className="label">Appointment Letter</label>
              <input type="file" className="file-input file-input-bordered w-full" onChange={(e) => setFormData({ ...formData, appointmentLetter: e.target.files[0] })} />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-base-100 p-8 rounded-xl shadow-xl" data-theme="light">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">Faculty Profile Setup</h2>
        <div className="flex justify-between mb-10">
          {steps.map((label, i) => (
            <div key={i} className="flex-1 text-center">
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold text-sm ${i === step ? "bg-primary text-white" : "bg-base-300 text-gray-600"}`}>
                {i + 1}
              </div>
              <p className="text-xs mt-2">{label}</p>
            </div>
          ))}
        </div>
        <div className="space-y-4">{renderStep()}</div>
        <div className="mt-8 flex justify-between">
          <button onClick={back} disabled={step === 0} className="btn btn-outline">⬅ Back</button>
          {step === steps.length - 1 ? (
            <button onClick={handleSubmit} className="btn btn-success">✅ Submit</button>
          ) : (
            <button onClick={next} className="btn btn-primary">Next ➡</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
