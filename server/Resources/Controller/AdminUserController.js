// Controller/AdminUserController.js
const db = require("../../DB/config");
const Admin = db.bFootLogin;
const { roleAuth } = require("../Middleware/RoleAuth");
const CryptoJS = require("crypto-js");

// Update getAdministrator to handle role-based filtering
const getAdministrator = async (req, res, next) => {
  try {
    // Only superadmin can see all admins
    if (req.admin.role === 'superadmin') {
      const admins = await Admin.findAll();
      return res.status(200).json({
        status: 200,
        message: 'Admins fetched successfully',
        data: admins
      });
    } else {
      // Regular admins can only see their own info
      const admin = await Admin.findByPk(req.admin.id);
      return res.status(200).json({
        status: 200,
        message: 'Admin fetched successfully',
        data: [admin]
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: true,
      message: error.message
    });
  }
};

// Enhanced createAdmininstartor with role validation
const createAdmininstartor = async (req, res, next) => {
  try {
    const { username, password, email, role, mobile } = req.body;
    
    // Only superadmin can create other admins
    if (req.admin.role !== 'superadmin') {
      return res.status(403).json({
        status: 403,
        message: "Only superadmin can create new admins"
      });
    }
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ where: { username } });
    if (existingAdmin) {
      return res.status(400).json({
        status: 400,
        message: "Admin with this username already exists"
      });
    }
    
    // Encrypt password
    const encryptedPassword = CryptoJS.AES.encrypt(
      password, 
      process.env.SECRET_KEY_ADMIN_PASSWORD
    ).toString();
    
    // Create admin
    const newAdmin = await Admin.create({
      username,
      password: encryptedPassword,
      email,
      mobile: mobile || null,
      role: role || 'admin',
      active: 'Yes'
    });
    
    return res.status(201).json({
      status: 201,
      message: 'Admin created successfully',
      data: newAdmin
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: true,
      message: error.message
    });
  }
};

// Add updateAdmin function
const updateAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password, mobile, role } = req.body;
    
    // Check permissions
    if (req.admin.role !== 'superadmin' && req.admin.id !== parseInt(id)) {
      return res.status(403).json({
        status: 403,
        message: "You can only update your own profile"
      });
    }
    
    // Superadmin cannot change their own role
    if (req.admin.id === parseInt(id) && role && role !== req.admin.role) {
      return res.status(400).json({
        status: 400,
        message: "You cannot change your own role"
      });
    }
    
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({
        status: 404,
        message: "Admin not found"
      });
    }
    
    // Update fields
    if (username) admin.username = username;
    if (email) admin.email = email;
    if (mobile) admin.mobile = mobile;
    
    // Only superadmin can change roles
    if (role && req.admin.role === 'superadmin') {
      admin.role = role;
    }
    
    // Update password if provided
    if (password) {
      admin.password = CryptoJS.AES.encrypt(
        password, 
        process.env.SECRET_KEY_ADMIN_PASSWORD
      ).toString();
    }
    
    await admin.save();
    
    return res.status(200).json({
      status: 200,
      message: 'Admin updated successfully',
      data: admin
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: true,
      message: error.message
    });
  }
};

// Add deleteAdmin function
const deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Only superadmin can delete admins
    if (req.admin.role !== 'superadmin') {
      return res.status(403).json({
        status: 403,
        message: "Only superadmin can delete admins"
      });
    }
    
    // Cannot delete yourself
    if (req.admin.id === parseInt(id)) {
      return res.status(400).json({
        status: 400,
        message: "You cannot delete your own account"
      });
    }
    
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({
        status: 404,
        message: "Admin not found"
      });
    }
    
    await admin.destroy();
    
    return res.status(200).json({
      status: 200,
      message: 'Admin deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: true,
      message: error.message
    });
  }
};

// Make sure to export all functions
module.exports = { 
  getAdministrator, 
  createAdmininstartor, 
  updateAdmin, 
  deleteAdmin 
};