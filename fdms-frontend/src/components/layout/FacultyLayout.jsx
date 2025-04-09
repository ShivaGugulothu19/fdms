import { Outlet } from "react-router-dom";
import FacultySidebar from "./FacultySidebar";
import Navbar from "./Navbar";

const FacultyLayout = () => {
  return (
    <div className="flex min-h-screen">
      <FacultySidebar />
      <div className="flex-1 bg-gray-50">
        <Navbar /> {/* This can be reused unless you want to customize */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FacultyLayout;
