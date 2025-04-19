import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar"; // ✅ Correct relative path
import Navbar from "./Navbar"; // ✅ Also inside layout folder

const HODLayout = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
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
