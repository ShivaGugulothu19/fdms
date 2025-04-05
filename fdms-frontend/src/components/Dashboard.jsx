import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <h2>Welcome to Faculty Data Management System</h2>
      </div>
    </div>
  );
};

export default Dashboard;
