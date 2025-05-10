// Simple authentication utilities for admin access
// In a production app, this would be replaced with a more robust auth system

// Hardcoded admin credentials for demo purposes
// In a real application, these would be stored securely in a database
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

// JWT-like token (simplified for demo)
const ADMIN_TOKEN = 'freeapi-admin-token-123456789';

// Verify admin credentials
export const verifyAdminCredentials = (username, password) => {
  return username === ADMIN_CREDENTIALS.username && 
         password === ADMIN_CREDENTIALS.password;
};

// Generate a token (in a real app, this would be a proper JWT)
export const generateAdminToken = () => {
  return ADMIN_TOKEN;
};

// Check if request has valid admin auth header
export const isAdminAuthenticated = (req) => {
  if (!req || !req.headers) {
    return false;
  }
  
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  const token = authHeader.split(' ')[1];
  return token === ADMIN_TOKEN;
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
