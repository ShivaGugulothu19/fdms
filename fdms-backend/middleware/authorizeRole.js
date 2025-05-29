const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const role = req.header("x-role");
    const department = req.header("x-department");
    const id = req.header("x-user-id");

    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user = {
      role,
      department: department || null,
      id: id || null, // ✅ Add this line to provide facultyId
    };

    next();
  };
};

module.exports = authorizeRoles;
