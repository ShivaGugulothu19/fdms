const HODProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <div className="card bg-base-100 shadow-md p-6 max-w-xl mx-auto" data-theme="light">
        <h1 className="text-2xl font-bold text-primary mb-4">👤 HOD Profile</h1>
        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold">Name:</span> {user?.fullName || "N/A"}</p>
          <p><span className="font-semibold">Email:</span> {user?.email || "N/A"}</p>
          <p><span className="font-semibold">Role:</span> HOD</p>
        </div>
      </div>
    </div>
  );
};

export default HODProfile;
