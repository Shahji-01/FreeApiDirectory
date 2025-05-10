import { verifyAdminCredentials } from '../../../lib/auth';

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Initialize session if it doesn't exist
  if (!req.session) {
    req.session = {};
  }
  
  // Handle POST request - login
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }
      
      const isValid = verifyAdminCredentials(username, password);
      
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      // Set session
      req.session.isAdmin = true;
      
      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Authentication failed' });
    }
  }
  
  // Handle GET request - check if authenticated
  if (req.method === 'GET') {
    if (req.session && req.session.isAdmin) {
      return res.status(200).json({ isAuthenticated: true });
    } else {
      return res.status(401).json({ isAuthenticated: false });
    }
  }
  
  // Handle DELETE request - logout
  if (req.method === 'DELETE') {
    if (req.session) {
      req.session.isAdmin = false;
    }
    return res.status(200).json({ message: 'Logged out successfully' });
  }
  
  // If the method is not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}
