import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

// Register User
export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};

// Get Faculty List
export const getFaculty = async () => {
  const response = await API.get("/faculty");
  return response.data;
};
