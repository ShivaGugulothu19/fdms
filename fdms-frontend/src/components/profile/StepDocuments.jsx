const StepDocuments = ({ formData, setFormData }) => {
    return (
      <div className="space-y-6">
        <div>
          <label className="block font-medium">Upload CV</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFormData({ ...formData, cv: e.target.files[0] })}
            className="w-full border p-2 rounded-lg bg-white"
          />
        </div>
  
        <div>
          <label className="block font-medium">Upload Degree Certificate</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setFormData({ ...formData, degreeCertificate: e.target.files[0] })}
            className="w-full border p-2 rounded-lg bg-white"
          />
        </div>
  
        <div>
          <label className="block font-medium">Upload Appointment Letter</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setFormData({ ...formData, appointmentLetter: e.target.files[0] })}
            className="w-full border p-2 rounded-lg bg-white"
          />
        </div>
      </div>
    );
  };
  
  export default StepDocuments;
  