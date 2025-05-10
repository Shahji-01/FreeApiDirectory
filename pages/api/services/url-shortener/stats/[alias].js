// URL Shortener stats API
import { urlDatabase } from '../../_data/url-database';

export default function handler(req, res) {
  const { alias } = req.query;
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // Find URL by alias
  let urlData = null;
  let urlId = null;
  
  for (const [key, value] of urlDatabase.entries()) {
    if (value.alias === alias) {
      urlData = value;
      urlId = key;
      break;
    }
  }
  
  if (!urlData) {
    return res.status(404).json({
      error: 'URL not found',
      message: `No URL found with alias: ${alias}`
    });
  }
  
  // Construct the full short URL
  const host = req.headers.host || 'localhost:5000';
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const shortUrl = `${protocol}://${host}/api/services/url-shortener/${alias}`;
  
  // Return URL stats
  return res.status(200).json({
    success: true,
    data: {
      id: urlId,
      originalUrl: urlData.originalUrl,
      shortUrl,
      alias: urlData.alias,
      createdAt: urlData.createdAt,
      clicks: urlData.clicks,
      stats: {
        // Add some additional stats
        avgClicksPerDay: calculateAvgClicksPerDay(urlData.createdAt, urlData.clicks),
        ageInDays: calculateAgeInDays(urlData.createdAt)
      }
    }
  });
}

// Calculate average clicks per day
function calculateAvgClicksPerDay(createdAt, clicks) {
  const creationDate = new Date(createdAt);
  const now = new Date();
  const ageInDays = Math.max(1, Math.floor((now - creationDate) / (1000 * 60 * 60 * 24)));
  return parseFloat((clicks / ageInDays).toFixed(2));
}

// Calculate age in days
function calculateAgeInDays(createdAt) {
  const creationDate = new Date(createdAt);
  const now = new Date();
  return Math.floor((now - creationDate) / (1000 * 60 * 60 * 24));
}