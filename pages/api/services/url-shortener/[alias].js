// URL Shortener redirect handler
// This is a simple in-memory implementation for demo purposes
// In a production application, you would use a database to store URLs

// External database reference (to be replaced with real database in production)
import { urlDatabase } from '../_data/url-database';

export default function handler(req, res) {
  const { alias } = req.query;
  
  // Find URL by alias
  let urlData = null;
  for (const [key, value] of urlDatabase.entries()) {
    if (value.alias === alias) {
      urlData = { ...value, id: key };
      break;
    }
  }
  
  if (urlData) {
    // Increment click count
    urlData.clicks += 1;
    urlDatabase.set(urlData.id, {
      originalUrl: urlData.originalUrl,
      alias: urlData.alias,
      createdAt: urlData.createdAt,
      clicks: urlData.clicks
    });
    
    // Redirect to original URL
    res.setHeader('Location', urlData.originalUrl);
    res.status(302).end();
    return;
  }
  
  // If alias not found, return error
  return res.status(404).json({
    error: 'Shortened URL not found'
  });
}