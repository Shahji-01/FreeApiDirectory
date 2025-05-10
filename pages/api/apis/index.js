import { getAllApis, getFeaturedApis, getApisByCategory, addApi } from '../../../lib/db';

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Handle GET request - fetch all APIs or filter by category/featured
  if (req.method === 'GET') {
    try {
      const { category, featured } = req.query;
      
      let apis;
      
      if (category) {
        // Filter by category
        apis = getApisByCategory(category);
      } else if (featured === 'true') {
        // Get only featured APIs
        apis = getFeaturedApis();
      } else {
        // Get all APIs
        apis = getAllApis();
      }
      
      return res.status(200).json({ apis });
    } catch (error) {
      console.error('Error fetching APIs:', error);
      return res.status(500).json({ error: 'Failed to fetch APIs' });
    }
  }
  
  // Handle POST request - add new API
  if (req.method === 'POST') {
    try {
      const apiData = req.body;
      
      // Validate required fields
      const requiredFields = ['name', 'description', 'category', 'link'];
      const missingFields = requiredFields.filter(field => !apiData[field]);
      
      if (missingFields.length > 0) {
        return res.status(400).json({ 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        });
      }
      
      // Add the new API
      const newApi = addApi(apiData);
      
      return res.status(201).json({ 
        message: 'API added successfully', 
        api: newApi 
      });
    } catch (error) {
      console.error('Error adding API:', error);
      return res.status(500).json({ error: 'Failed to add API' });
    }
  }
  
  // If the method is not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}
