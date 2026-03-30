// middleware/role.middleware.js
//authorization 
// Only Admin
exports.allowAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({
      message: 'Access denied: Admins only'
    });
  }
  next();
};

// Admin OR normal user (example extension)
exports.allowUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }
  next();
};