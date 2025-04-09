import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const { pathname } = useLocation();

  const linkStyle = (path) =>
    `block px-4 py-2 rounded hover:bg-blue-100 ${
      pathname === path ? "bg-blue-200 font-semibold" : "text-gray-700"
    }`;

  return (
    <aside className="w-64 bg-white shadow border-r border-gray-200 p-4 hidden md:block">
      <h2 className="text-xl font-bold text-blue-600 mb-6">🛡️ Admin Panel</h2>
      <nav className="space-y-2">
        <Link to="/admin/dashboard" className={linkStyle("/admin/dashboard")}>
          📊 Dashboard
        </Link>
        <Link to="/admin/faculty-profile" className={linkStyle("/admin/faculty-profile")}>
          👩‍🏫 Faculty Profiles
        </Link>
        <Link to="/admin/reports" className={linkStyle("/admin/reports")}>
          📄 Reports
        </Link>
        <Link to="/admin/settings" className={linkStyle("/admin/settings")}>
          ⚙️ Settings
        </Link>
        <Link to="/admin/profile" className={linkStyle("/admin/profile")}>
          👤 Admin Profile
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
