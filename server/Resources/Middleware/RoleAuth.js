
// Middleware/RoleAuth.js
const roleAuth = (allowedRoles) => {
    return (req, res, next) => {
        console.log("=== ROLE AUTH DEBUG ===");
        console.log("User role:", req.admin.role);
        console.log("Allowed roles:", allowedRoles);
        console.log("Has required role:", allowedRoles.includes(req.admin.role));
        
        if (!req.admin) {
            return res.status(401).json({
                status: 401,
                message: "Authentication required"
            });
        }
        
        if (!allowedRoles.includes(req.admin.role)) {
            return res.status(403).json({
                status: 403,
                message: "Insufficient privileges(Only Super Admin)"
            });
        }
        
        next();
    };
};

module.exports = { roleAuth };