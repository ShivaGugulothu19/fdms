import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Faculty from "./pages/Faculty";
import Courses from "./pages/Courses";
import Performance from "./pages/Performance";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Sidebar />
              <div className="main-content">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/faculty" element={<Faculty />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/performance" element={<Performance />} />
                  <Route path="/reports" element={<Reports />} />
                </Routes>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
