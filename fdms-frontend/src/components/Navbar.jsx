import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>FDMS</h2>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </nav>
  );
};

export default Navbar;
