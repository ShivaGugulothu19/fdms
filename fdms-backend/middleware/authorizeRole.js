const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const role = req.header("x-role");
    const department = req.header("x-department");

    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user = {
      role,
      department: department || null,
    };

    next();
  };
};

module.exports = authorizeRoles;
