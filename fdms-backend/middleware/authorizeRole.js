// middleware/authorizeRole.js

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // DEV MODE: simulate user role and department from headers
    const simulatedRole = req.headers["x-role"];
    const simulatedDept = req.headers["x-department"];

    // Use simulated or actual authenticated values
    const userRole = simulatedRole || req.user?.role;
    const userDept = simulatedDept || req.user?.department;

    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Attach department to request for HOD-level filtering
    req.user = {
      ...req.user,
      role: userRole,
      department: userDept,
    };

    next();
  };
};

module.exports = authorizeRoles;
