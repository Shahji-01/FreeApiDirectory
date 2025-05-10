import { verifyAdminCredentials, generateAdminToken, isAdminAuthenticated } from '../../../lib/auth';

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
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
      
      // Generate token
      const token = generateAdminToken();
      
      return res.status(200).json({ 
        message: 'Login successful',
        token,
        user: {
          username,
          isAdmin: true
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Authentication failed' });
    }
  }
  
  // Handle GET request - check if authenticated
  if (req.method === 'GET') {
    const authenticated = isAdminAuthenticated(req);
    
    if (authenticated) {
      return res.status(200).json({ isAuthenticated: true });
    } else {
      return res.status(401).json({ isAuthenticated: false });
    }
  }
  
  // If the method is not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}
