import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">
        {role === "admin" ? "Admin Dashboard" : "Faculty Dashboard"}
      </h1>

      <div className="flex items-center gap-4">
        {role === "admin" && <span className="text-sm text-gray-500">Welcome, Admin</span>}
        {role === "faculty" && <span className="text-sm text-gray-500">Welcome, Faculty</span>}
        <button
          onClick={handleLogout}
          className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
