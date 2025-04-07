import { useState } from "react";

const steps = ["Personal Info", "Qualifications", "Experience", "Documents"];

export default function CleanForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "Male",
  });

  const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-10 text-center">Faculty Profile</h1>

        {/* Stepper */}
        <div className="flex justify-between items-center mb-10">
          {steps.map((label, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                  step === index
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {index + 1}
              </div>
              <span className="text-xs mt-2 text-gray-600">{label}</span>
            </div>
          ))}
        </div>

        {/* FORM: Personal Info Step */}
        {step === 0 && (
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          <button
            onClick={back}
            disabled={step === 0}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            ⬅ Back
          </button>
          <button
            onClick={next}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {step === steps.length - 1 ? "Submit" : "Next ➡"}
          </button>
        </div>
      </div>
    </div>
  );
}
