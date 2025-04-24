// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (role === "admin") return { email: "admin@fdms.com", role: "admin" };

    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        id: parsed._id || parsed.id, // normalize _id to id
        role,
      };
    }

    return null;
  });

  const login = (userData) => {
    const normalized = {
      ...userData,
      id: userData._id || userData.id, // normalize _id to id
    };

    setUser(normalized);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", userData.role);
    if (userData.role !== "admin") {
      localStorage.setItem("user", JSON.stringify(normalized));
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
