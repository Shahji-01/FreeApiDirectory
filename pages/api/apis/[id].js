import { getApiById, updateApi, deleteApi } from '../../../lib/db';
import { isAdminAuthenticated, withAdminAuth } from '../../../lib/auth';

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'API ID is required' });
  }
  
  // Handle GET request - fetch API by ID
  if (req.method === 'GET') {
    try {
      // Check if request is from admin dashboard
      const isAdmin = isAdminAuthenticated(req);
      const options = { publicView: !isAdmin };
      
      const api = getApiById(id, options);
      
      if (!api) {
        return res.status(404).json({ error: 'API not found' });
      }
      
      return res.status(200).json({ api });
    } catch (error) {
      console.error('Error fetching API:', error);
      return res.status(500).json({ error: 'Failed to fetch API' });
    }
  }
  
  // For PUT and DELETE, require admin authentication
  if (req.method === 'PUT' || req.method === 'DELETE') {
    // Check if admin is authenticated
    if (!isAdminAuthenticated(req)) {
      return res.status(401).json({ error: 'Unauthorized - Admin access required' });
    }
    
    // Handle PUT request - update API by ID
    if (req.method === 'PUT') {
      try {
        const apiData = req.body;
        
        console.log('Updating API:', id);
        console.log('API data received:', apiData);
        
        // Check if API exists before trying to update
        const existingApi = getApiById(id, { publicView: false });
        if (!existingApi) {
          console.error('API not found with ID:', id);
          return res.status(404).json({ error: 'API not found' });
        }
        
        // If we're just updating the status, we don't need to validate all fields
        if (apiData.status && Object.keys(apiData).length === 2) { // id and status only
          console.log('Status-only update detected');
          const updatedApi = updateApi(id, { status: apiData.status });
          
          if (!updatedApi) {
            return res.status(404).json({ error: 'API not found' });
          }
          
          return res.status(200).json({ 
            message: `API status updated to '${apiData.status}' successfully`, 
            api: updatedApi 
          });
        }
        
        // For full updates, validate required fields
        const requiredFields = ['name', 'description', 'category', 'link'];
        const missingFields = requiredFields.filter(field => !apiData[field]);
        
        if (missingFields.length > 0) {
          return res.status(400).json({ 
            error: `Missing required fields: ${missingFields.join(', ')}` 
          });
        }
        
        // Update the API
        const updatedApi = updateApi(id, apiData);
        
        if (!updatedApi) {
          return res.status(404).json({ error: 'API not found' });
        }
        
        return res.status(200).json({ 
          message: 'API updated successfully', 
          api: updatedApi 
        });
      } catch (error) {
        console.error('Error updating API:', error);
        return res.status(500).json({ error: `Failed to update API: ${error.message}` });
      }
    }
    
    // Handle DELETE request - delete API by ID
    if (req.method === 'DELETE') {
      try {
        const success = deleteApi(id);
        
        if (!success) {
          return res.status(404).json({ error: 'API not found' });
        }
        
        return res.status(200).json({ message: 'API deleted successfully' });
      } catch (error) {
        console.error('Error deleting API:', error);
        return res.status(500).json({ error: 'Failed to delete API' });
      }
    }
  }
  
  // If the method is not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}
