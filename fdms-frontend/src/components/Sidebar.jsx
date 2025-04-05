import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/faculty">Faculty</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/register-faculty">Register Faculty</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
