const StepPersonalInfo = ({ formData, setFormData }) => {
    return (
      <div className="space-y-4">
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full border p-2 rounded-lg"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
      </div>
    );
  };
  
  export default StepPersonalInfo;
  