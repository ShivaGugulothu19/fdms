const HODProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    return (
      <div className="p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">👤 HOD Profile</h1>
        <p><strong>Name:</strong> {user?.fullName || "N/A"}</p>
        <p><strong>Email:</strong> {user?.email || "N/A"}</p>
        <p><strong>Role:</strong> HOD</p>
      </div>
    );
  };
  
  export default HODProfile;
  