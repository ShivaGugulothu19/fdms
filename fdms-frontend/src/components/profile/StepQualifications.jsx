const StepQualifications = ({ formData, setFormData }) => {
    return (
      <div className="space-y-6">
        <div>
          <label className="block font-medium">Degree</label>
          <input
            type="text"
            value={formData.degree}
            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium">Institution</label>
          <input
            type="text"
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium">Year</label>
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium">Specialization</label>
          <input
            type="text"
            value={formData.specialization}
            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />
        </div>
      </div>
    );
  };
  
  export default StepQualifications;
  