import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 p-6">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">FDMS</h2>
      <nav className="flex flex-col space-y-4 text-gray-700 text-base font-medium">
        <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        <Link to="/profile" className="hover:text-blue-600">Faculty Profile</Link>
        <Link to="/publications" className="hover:text-blue-600">Publications</Link>
        <Link to="/reports" className="hover:text-blue-600">Reports</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
