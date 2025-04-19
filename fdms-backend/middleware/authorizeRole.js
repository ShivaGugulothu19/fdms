// middleware/authorizeRole.js
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      // DEV MODE: simulate user role from header
      const simulatedRole = req.headers["x-role"];
      const userRole = simulatedRole || req.user?.role;
  
      if (!userRole || !roles.includes(userRole)) {
        return res.status(403).json({ message: "Access denied" });
      }
  
      next();
    };
  };
  
  module.exports = authorizeRoles;
  