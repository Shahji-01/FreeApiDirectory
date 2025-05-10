// This is a server-side API endpoint file
import { getApiById } from '../../lib/db';

export default function handler(req, res) {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'API ID is required' });
  }
  
  // Handle GET request to fetch API by ID
  if (req.method === 'GET') {
    try {
      const api = getApiById(id);
      
      if (!api) {
        return res.status(404).json({ error: 'API not found' });
      }
      
      return res.status(200).json({ api });
    } catch (error) {
      console.error('Error fetching API:', error);
      return res.status(500).json({ error: 'Failed to fetch API' });
    }
  }
  
  // If the method is not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}
