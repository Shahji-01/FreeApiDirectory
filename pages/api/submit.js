// This is an API endpoint for submitting new APIs
import { addApi } from '../../lib/db';

// Email validation helper
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// URL validation helper
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

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
    
    // Basic validation for required fields
    const requiredFields = ['name', 'description', 'category', 'link', 'auth', 'https'];
    const missingFields = requiredFields.filter(field => !apiData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: `Missing required fields: ${missingFields.join(', ')}`,
        missingFields
      });
    }
    
    // Advanced validation
    const validationErrors = [];
    
    // Validate URL format
    if (!isValidUrl(apiData.link)) {
      validationErrors.push({
        field: 'link',
        message: 'Invalid URL format. Please provide a valid URL with http:// or https:// prefix.'
      });
    }
    
    // Validate submitter email if provided
    if (apiData.submitterInfo && apiData.submitterInfo.email && !isValidEmail(apiData.submitterInfo.email)) {
      validationErrors.push({
        field: 'submitterInfo.email',
        message: 'Invalid email format'
      });
    }
    
    // Validate endpoint paths if provided
    if (apiData.endpoints && apiData.endpoints.length > 0) {
      apiData.endpoints.forEach((endpoint, index) => {
        if (!endpoint.path || endpoint.path.trim() === '') {
          validationErrors.push({
            field: `endpoints[${index}].path`,
            message: 'Endpoint path is required'
          });
        }
      });
    }
    
    // Return validation errors if any
    if (validationErrors.length > 0) {
      return res.status(400).json({
        error: 'Validation failed',
        validationErrors
      });
    }
    
    // Process and clean the data before storing
    const processedData = {
      ...apiData,
      
      // Add submission timestamp if not present
      addedAt: apiData.addedAt || new Date().toISOString(),
      
      // Add status field for moderation
      status: 'pending',
      
      // Clean up any empty fields
      longDescription: apiData.longDescription || '',
      parameters: Array.isArray(apiData.parameters) ? apiData.parameters : [],
      endpoints: Array.isArray(apiData.endpoints) 
        ? apiData.endpoints.map(endpoint => ({
            ...endpoint,
            parameters: Array.isArray(endpoint.parameters) ? endpoint.parameters : []
          })) 
        : [],
      
      // Sanitize submitter info to ensure required fields
      submitterInfo: apiData.submitterInfo || {
        name: '',
        email: '',
        website: ''
      }
    };
    
    // Add the new API
    const newApi = addApi(processedData);
    
    // Send confirmation email to submitter if email provided
    if (processedData.submitterInfo && processedData.submitterInfo.email) {
      // In a production app, we would send a confirmation email here
      console.log(`Email confirmation would be sent to: ${processedData.submitterInfo.email}`);
    }
    
    // Send success response
    return res.status(201).json({ 
      message: 'API submitted successfully and is pending review', 
      api: newApi 
    });
    
  } catch (error) {
    console.error('Error submitting API:', error);
    return res.status(500).json({ 
      error: 'Failed to submit API',
      details: error.message
    });
  }
}
