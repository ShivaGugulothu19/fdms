import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  const linkStyle = (path) =>
    `block px-4 py-2 rounded hover:bg-blue-100 ${
      pathname === path ? "bg-blue-200 font-semibold" : "text-gray-700"
    }`;

  return (
    <aside className="w-64 bg-white shadow border-r border-gray-200 p-4 hidden md:block">
      <h2 className="text-xl font-bold text-blue-600 mb-6">FDMS Faculty</h2>
      <nav className="space-y-2">
        <Link to="/dashboard" className={linkStyle("/dashboard")}>
          📊 Dashboard
        </Link>
        <Link to="/profile" className={linkStyle("/profile")}>
          👤 Profile
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
