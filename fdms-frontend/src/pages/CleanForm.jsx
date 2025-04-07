import { useState } from "react";

const steps = ["Personal Info", "Qualifications", "Experience", "Documents"];

export default function CleanForm() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-10 text-center">Faculty Profile</h1>
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
        <p className="text-center text-gray-600">Step {step + 1} content goes here</p>
      </div>
    </div>
  );
}
