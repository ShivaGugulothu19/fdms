import { useState } from "react";
import Layout from "../components/layout/Layout";
import StepPersonalInfo from "../components/profile/StepPersonalInfo";
import StepQualifications from "../components/profile/StepQualifications";
import StepExperience from "../components/profile/StepExperience";
import StepDocuments from "../components/profile/StepDocuments";
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
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      const res = await axios.post("http://localhost:5000/api/profile", data);
      alert("Profile submitted successfully 🎉");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0: return <StepPersonalInfo formData={formData} setFormData={setFormData} />;
      case 1: return <StepQualifications formData={formData} setFormData={setFormData} />;
      case 2: return <StepExperience formData={formData} setFormData={setFormData} />;
      case 3: return <StepDocuments formData={formData} setFormData={setFormData} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Layout>
        <div className="flex justify-center py-10 px-4">
          <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
              Faculty Profile
            </h2>

            {/* Stepper */}
            <div className="flex justify-between items-center mb-10">
              {steps.map((label, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === step
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-sm text-gray-600 mt-2">{label}</span>
                </div>
              ))}
            </div>

            {/* Step Form */}
            <div className="space-y-6">{renderStep()}</div>

            {/* Navigation */}
            <div className="mt-10 flex justify-between">
              <button
                onClick={back}
                disabled={step === 0}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
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
      </Layout>
    </div>
  );
};

export default Profile;
