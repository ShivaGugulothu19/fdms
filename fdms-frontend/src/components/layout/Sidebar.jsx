import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const linkStyle = (path) =>
    `block px-4 py-2 rounded hover:bg-blue-100 ${
      pathname === path ? "bg-blue-200 font-semibold" : "text-gray-700"
    }`;

  return (
    <aside className="w-64 bg-white shadow border-r border-gray-200 p-4 hidden md:block">
      <h2 className="text-xl font-bold text-blue-600 mb-6">
        {role === "admin" ? "FDMS Admin" : role === "hod" ? "FDMS HOD" : "FDMS Faculty"}
      </h2>

      <nav className="space-y-2">
        {/* Dashboard Link */}
        {role === "admin" && (
          <Link to="/admin/dashboard" className={linkStyle("/admin/dashboard")}>
            📊 Dashboard
          </Link>
        )}
        {role === "hod" && (
          <Link to="/hod/dashboard" className={linkStyle("/hod/dashboard")}>
            📊 Dashboard
          </Link>
        )}
        {role === "faculty" && (
          <Link to="/dashboard" className={linkStyle("/dashboard")}>
            📊 Dashboard
          </Link>
        )}

        {/* Profile Link */}
        {(role === "faculty" || role === "admin") && (
          <Link
            to={role === "admin" ? "/admin/profile" : "/profile"}
            className={linkStyle(role === "admin" ? "/admin/profile" : "/profile")}
          >
            👤 Profile
          </Link>
        )}

        {/* Research Link */}
        {role === "faculty" && (
          <Link to="/research" className={linkStyle("/research")}>
            📚 Research
          </Link>
        )}
        {role === "admin" && (
          <Link to="/admin/research" className={linkStyle("/admin/research")}>
            📚 Research
          </Link>
        )}
        {role === "hod" && (
          <Link to="/admin/research" className={linkStyle("/admin/research")}>
            📚 Research
          </Link>
        )}

        {/* Admin-only Links */}
        {role === "admin" && (
          <>
            <Link to="/admin/faculty-profile" className={linkStyle("/admin/faculty-profile")}>
              👥 Faculty
            </Link>
            <Link to="/admin/reports" className={linkStyle("/admin/reports")}>
              📑 Reports
            </Link>
            <Link to="/admin/settings" className={linkStyle("/admin/settings")}>
              ⚙️ Settings
            </Link>
          </>
        )}

        {/* HOD-only Reports Access */}
        {role === "hod" && (
          <Link to="/admin/reports" className={linkStyle("/admin/reports")}>
            📑 Reports
          </Link>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
