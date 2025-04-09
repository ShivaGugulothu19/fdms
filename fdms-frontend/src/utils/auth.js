export const isAdmin = () => {
    return localStorage.getItem("role") === "admin";
  };
  
  export const isFaculty = () => {
    return localStorage.getItem("role") === "faculty";
  };
  
  export const isLoggedIn = () => {
    return localStorage.getItem("isLoggedIn") === "true";
  };
  