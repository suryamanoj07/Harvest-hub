// backend/middleware/checkSuperAdmin.js
const checkSuperAdmin = (req, res, next) => {
    if (!req.user || req.user.email.toLowerCase() !== 'superadmin@g.com') {
      return res.status(403).json({ success: false, message: 'Access denied. Super admin only.' });
    }
    next();
  };
  
  export default checkSuperAdmin;