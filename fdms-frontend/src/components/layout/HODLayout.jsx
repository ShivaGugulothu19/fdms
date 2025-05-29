import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const HODLayout = () => {
  const { user } = useAuth();

  const menuItems = [
    { to: "/hod/dashboard", label: "Dashboard" },
    { to: "/hod/profile", label: "Faculty Profiles" },
    { to: "/hod/research", label: "Research" },
    { to: "/hod/reports", label: "Reports" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-6 text-xl font-bold border-b border-gray-700">
          HOD Panel
          <div className="text-sm mt-1 text-gray-400">{user?.department}</div>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 py-2 rounded hover:bg-gray-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 bg-gray-50">
        <Navbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HODLayout;
