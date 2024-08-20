// roleMiddleware.js
exports.authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ msg: 'User role not authorized to access this route' });
      }
      next();
    };
  };
  