// This is an API endpoint for submitting new APIs
import { addApi } from '../../lib/db';

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const apiData = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'description', 'category', 'link', 'auth', 'https'];
    const missingFields = requiredFields.filter(field => !apiData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }
    
    // Add the new API
    const newApi = addApi(apiData);
    
    return res.status(201).json({ 
      message: 'API submitted successfully', 
      api: newApi 
    });
  } catch (error) {
    console.error('Error submitting API:', error);
    return res.status(500).json({ error: 'Failed to submit API' });
  }
}
