import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const { pathname } = useLocation();
  const role = localStorage.getItem("role");
  const basePath = role === "hod" ? "/hod" : "/admin";

  const linkStyle = (path) =>
    `block px-4 py-2 rounded hover:bg-blue-100 ${
      pathname === path ? "bg-blue-200 font-semibold" : "text-gray-700"
    }`;

  return (
    <aside className="w-64 bg-white shadow border-r border-gray-200 p-4 hidden md:block">
      <h2 className="text-xl font-bold text-blue-600 mb-6">
        {role === "hod" ? "🏫 HOD Panel" : "🛡️ Admin Panel"}
      </h2>
      <nav className="space-y-2">
        <Link to={`${basePath}/dashboard`} className={linkStyle(`${basePath}/dashboard`)}>
          📊 Dashboard
        </Link>

        {/* ✅ Faculty Profiles for both admin & hod */}
        {(role === "admin" || role === "hod") && (
          <Link to={`${basePath}/faculty-profile`} className={linkStyle(`${basePath}/faculty-profile`)}>
            👩‍🏫 Faculty Profiles
          </Link>
        )}

        <Link to={`${basePath}/reports`} className={linkStyle(`${basePath}/reports`)}>
          📄 Reports
        </Link>

        {/* ⚙️ Settings only for admin */}
        {role === "admin" && (
          <Link to={`${basePath}/settings`} className={linkStyle(`${basePath}/settings`)}>
            ⚙️ Settings
          </Link>
        )}

        <Link to={`${basePath}/profile`} className={linkStyle(`${basePath}/profile`)}>
          👤 {role === "hod" ? "HOD" : "Admin"} Profile
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
