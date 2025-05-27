import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const { pathname } = useLocation();
  const role = localStorage.getItem("role");
  const basePath = role === "hod" ? "/hod" : "/admin";

  const linkStyle = (path) =>
    `block px-4 py-2 rounded transition-colors duration-200 ${
      pathname === path
        ? "bg-gray-800 text-white font-semibold"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = role === "admin" ? "/admin" : "/login?role=hod";
  };

  return (
    <aside className="w-64 bg-gray-950 text-white shadow-lg border-r border-gray-800 p-4 hidden md:block">
      <h2 className="text-xl font-bold text-white mb-6">
        {role === "hod" ? "🏫 HOD Panel" : "🛡️ Admin Panel"}
      </h2>
      <nav className="space-y-2">
        <Link to={`${basePath}/dashboard`} className={linkStyle(`${basePath}/dashboard`)}>
          📊 Dashboard
        </Link>

        {(role === "admin" || role === "hod") && (
          <Link
            to={`${basePath}/faculty-profile`}
            className={linkStyle(`${basePath}/faculty-profile`)}
          >
            👩‍🏫 Faculty Profiles
          </Link>
        )}

        <Link to={`${basePath}/reports`} className={linkStyle(`${basePath}/reports`)}>
          📄 Reports
        </Link>

        {role === "admin" && (
          <Link to={`${basePath}/settings`} className={linkStyle(`${basePath}/settings`)}>
            ⚙️ Settings
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="w-full text-left block px-4 py-2 rounded text-red-400 hover:bg-red-600 hover:text-white transition-colors duration-200"
        >
          🚪 Logout
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
