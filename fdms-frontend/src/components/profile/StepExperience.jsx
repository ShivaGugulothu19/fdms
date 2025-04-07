const StepExperience = ({ formData, setFormData }) => {
    return (
      <div className="space-y-6">
        <div>
          <label className="block font-medium">Job Title</label>
          <input
            type="text"
            value={formData.jobTitle}
            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium">Organization</label>
          <input
            type="text"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium">Start Date</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="w-full border p-2 rounded-lg"
          />
        </div>
        {!formData.isCurrent && (
          <div>
            <label className="block font-medium">End Date</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full border p-2 rounded-lg"
            />
          </div>
        )}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="current"
            checked={formData.isCurrent}
            onChange={() => setFormData({ ...formData, isCurrent: !formData.isCurrent })}
          />
          <label htmlFor="current">I currently work here</label>
        </div>
      </div>
    );
  };
  
  export default StepExperience;
  