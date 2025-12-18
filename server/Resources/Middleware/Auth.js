// Middleware/Auth.js
const jwt = require('jsonwebtoken');
const db = require("../../DB/config");
const Admin = db.bFootLogin;

// Middleware/Auth.js
const AdminAuth = async (req, res, next) => {
  try {
    console.log("Auth middleware called");
    console.log("Headers:", req.headers);
    
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      console.log("No authorization header found");
      return res.status(401).json({
        status: 401,
        message: "Authorization header required"
      });
    }

    // Extract token (handle both "Bearer token" and just "token" formats)
    let token = authHeader;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7); // Remove "Bearer " prefix
      console.log("Extracted token from Bearer format:", token);
    } else {
      console.log("Using token as-is:", token);
    }

    console.log("Token to verify:", token);
    
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY_ADMIN_AUTH_TOKEN, (error, decode) => {
      if (error) {
        console.log("JWT verification failed:", error.message);
        return error;
      } else {
        console.log("JWT verified successfully, payload:", decode);
        return decode;
      }
    });

    if (verifyToken && verifyToken.userId) {
      console.log("Looking for admin with username:", verifyToken.userId);
      const adminInfo = await Admin.findOne({ where: { username: verifyToken.userId } });
      
      if (!adminInfo) {
        console.log("Admin not found in database");
        return res.status(401).json({
          status: 401,
          message: "Admin not found"
        });
      }
      
      if (adminInfo.active !== 'Yes') {
        console.log("Admin account is not active");
        return res.status(401).json({
          status: 401,
          message: "Account disabled"
        });
      }
      
  req.admin = {
  id: adminInfo.ID,   // ✅ match DB column
  username: adminInfo.username,
  email: adminInfo.email,
  role: adminInfo.role   // ✅ fetch real role
};

      
      console.log("Authentication successful, proceeding to next middleware");
      next();
    } else {
      console.log("Token verification failed:", verifyToken);
      return res.status(401).json({
        status: 401,
        name: verifyToken.name,
        message: verifyToken.message
      });
    }
  } catch (error) {
    console.log("Unexpected error in auth middleware:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error"
    });
  }
};

module.exports = { AdminAuth };


// const jwt = require('jsonwebtoken');
// const db = require("../../DB/config");
// const moment = require('moment'); // require

// const Admin = db.bFootLogin;


// const AdminAuth = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization;

//         const verifyToken = jwt.verify(token, process.env.SECRET_KEY_ADMIN_AUTH_TOKEN, ((error, decode) => {
//             if (error) {
//                 return error;
//             }
//             else {
//                 return decode;
//             }
//         }));

//         if (verifyToken.userId !== undefined) {
//             console.log("user id si      ", verifyToken.userId)
//             const adminInfo = await Admin.findOne({ where: { username: verifyToken.userId } });
//             req.token = token;
//             req.admin = adminInfo;
//         }
//         else {
//             return res.status(302).send({
//                 status: 302,
//                 name: verifyToken.name,
//                 message: verifyToken.message
//             });
//         }

//     } catch (error) {
//         res.status(500).send(error);
//     }
//     next();
// }

// module.exports = { AdminAuth }




// ---------------------------------------------------------

// const jwt = require('jsonwebtoken');
// const db = require("../../DB/config");
// const moment = require('moment');

// const Admin = db.bFootLogin;

// const AdminAuth = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;

//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return res.status(401).json({ status: 401, message: "Authorization header missing or malformed" });
//         }

//         const token = authHeader.split(' ')[1];

//         const verifyToken = jwt.verify(token, process.env.SECRET_KEY_ADMIN_AUTH_TOKEN);

//         if (verifyToken?.userId) {
//             console.log("User ID is:", verifyToken.userId);

//             const adminInfo = await Admin.findOne({ where: { username: verifyToken.userId } });

//             if (!adminInfo) {
//                 return res.status(404).json({ status: 404, message: "Admin not found" });
//             }

//             req.token = token;
//             req.admin = adminInfo;

//             next(); 
//         } else {
//             return res.status(401).json({
//                 status: 401,
//                 name: "Unauthorized",
//                 message: "Token decoded but userId is missing"
//             });
//         }

//     } catch (error) {
//         console.error("JWT Verification Error:", error);
//         return res.status(401).json({
//             status: 401,
//             name: error.name || "JsonWebTokenError",
//             message: error.message || "Invalid token"
//         });
//     }
// };

// module.exports = { AdminAuth };







