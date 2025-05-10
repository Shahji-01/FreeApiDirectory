// Simple authentication utilities for admin access
// In a production app, this would be replaced with a more robust auth system

// Hardcoded admin credentials for demo purposes
// In a real application, these would be stored securely in a database
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

// Verify admin credentials
export const verifyAdminCredentials = (username, password) => {
  return username === ADMIN_CREDENTIALS.username && 
         password === ADMIN_CREDENTIALS.password;
};

// Check if request has valid admin session
export const isAdminAuthenticated = (req) => {
  return req.session && req.session.isAdmin === true;
};

// Middleware to protect admin routes
export const withAdminAuth = (handler) => {
  return (req, res) => {
    // Check if user is authenticated as admin
    if (!isAdminAuthenticated(req)) {
      return res.status(401).json({ 
        error: 'Unauthorized access. Admin authentication required.' 
      });
    }
    
    // If authenticated, proceed to the handler
    return handler(req, res);
  };
};
