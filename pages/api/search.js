import { searchApis } from '../../lib/db';
import { isAdminAuthenticated } from '../../lib/auth';

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  
  try {
    // Check if the request is from the admin dashboard
    const isAdmin = isAdminAuthenticated(req);
    const options = { publicView: !isAdmin };
    
    // Search APIs (admin sees all, public sees only approved)
    const results = searchApis(q, options);
    
    return res.status(200).json({ 
      apis: results,
      total: results.length,
      query: q
    });
  } catch (error) {
    console.error('Error searching APIs:', error);
    return res.status(500).json({ error: 'Failed to search APIs' });
  }
}
