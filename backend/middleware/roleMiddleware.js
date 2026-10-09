// Usage: authorizeRoles("admin") or authorizeRoles("admin", "student")
// Must be used AFTER the "protect" middleware, since it relies on req.user
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Requires role: ${allowedRoles.join(" or ")}`,
      });
    }

    next();
  };
};

module.exports = { authorizeRoles };
