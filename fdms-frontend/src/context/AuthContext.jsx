// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(); // <-- this fixes the import issue

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    const role = localStorage.getItem("role");
    if (role === "admin") return { email: "admin@fdms.com", role: "admin" };
    return saved ? { ...JSON.parse(saved), role } : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", userData.role);
    if (userData.role !== "admin") {
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
