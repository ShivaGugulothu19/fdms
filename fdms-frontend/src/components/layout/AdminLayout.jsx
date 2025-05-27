import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Navbar from "./Navbar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 bg-gray-900 text-white flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
