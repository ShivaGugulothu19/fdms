import { useState } from "react";
import axios from "axios";

const steps = ["Personal Info", "Qualifications", "Experience", "Documents"];

const Profile = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
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
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      const res = await axios.post("http://localhost:5000/api/profile", data);
      alert("Profile submitted successfully ✅");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </>
        );
      case 1:
        return (
          <>
            <input
              type="text"
              placeholder="Degree"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Institution"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </>
        );
      case 2:
        return (
          <>
            <input
              type="text"
              placeholder="Job Title"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Organization"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </>
        );
      case 3:
        return (
          <>
            <label className="block mb-2 text-sm font-medium">Upload CV:</label>
            <input
              type="file"
              onChange={(e) => setFormData({ ...formData, cv: e.target.files[0] })}
              className="mb-4"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md border">
        <h2 className="text-3xl font-bold text-center mb-8">Faculty Profile Setup</h2>

        {/* Stepper */}
        <div className="flex justify-between mb-6">
          {steps.map((label, i) => (
            <div key={i} className="flex-1 text-center">
              <div
                className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold text-sm ${
                  i === step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {i + 1}
              </div>
              <p className="text-xs mt-2 text-gray-600">{label}</p>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-4">{renderStep()}</div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={back}
            disabled={step === 0}
            className="px-6 py-2 bg-gray-100 border rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            ⬅ Back
          </button>
          {step === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              ✅ Submit
            </button>
          ) : (
            <button
              onClick={next}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next ➡
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
