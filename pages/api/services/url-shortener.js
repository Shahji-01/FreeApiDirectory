// URL Shortener API
// This is a simple implementation for demo purposes
// In a production application, you would use a database to store URLs

// Import shared database
import { urlDatabase, generateShortAlias } from './_data/url-database';

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { url, customAlias } = req.body;
      
      // Validate URL
      if (!url) {
        return res.status(400).json({ 
          error: 'URL is required' 
        });
      }
      
      // Basic URL validation
      try {
        new URL(url);
      } catch (e) {
        return res.status(400).json({ 
          error: 'Invalid URL format. Please provide a valid URL with http:// or https:// prefix.' 
        });
      }
      
      // Generate or use custom alias
      let alias = customAlias;
      
      // If custom alias provided, check if it's available
      if (alias) {
        // Check if alias already exists
        for (const [key, value] of urlDatabase.entries()) {
          if (value.alias === alias) {
            return res.status(409).json({
              error: 'Custom alias already in use. Please choose a different one.'
            });
          }
        }
      } else {
        // Generate a short alias based on incrementing ID
        alias = generateShortAlias();
      }
      
      // Store URL with alias
      const id = String(Date.now());
      const createdAt = new Date().toISOString();
      
      urlDatabase.set(id, {
        originalUrl: url,
        alias,
        createdAt,
        clicks: 0
      });
      
      // Construct the shortened URL (using the host from request or fallback)
      const host = req.headers.host || 'localhost:5000';
      const protocol = req.headers['x-forwarded-proto'] || 'http';
      const shortUrl = `${protocol}://${host}/api/services/url-shortener/${alias}`;
      
      return res.status(201).json({
        success: true,
        data: {
          id,
          originalUrl: url,
          shortUrl,
          alias,
          createdAt,
          clicks: 0
        }
      });
    } catch (error) {
      return res.status(500).json({ 
        error: 'Failed to create shortened URL',
        details: error.message
      });
    }
  } else if (req.method === 'GET') {
    // Documentation for the API
    return res.status(200).json({
      endpoint: '/api/services/url-shortener',
      description: 'Creates shortened URLs and redirects visitors to original URLs',
      methods: {
        POST: {
          description: 'Create a new shortened URL',
          parameters: {
            url: 'String. Required. The URL to shorten.',
            customAlias: 'String. Optional. Custom alias for the shortened URL.'
          },
          example: {
            request: {
              method: 'POST',
              body: {
                url: 'https://example.com/very/long/url/that/needs/shortening',
                customAlias: 'mysite'
              }
            },
            response: {
              success: true,
              data: {
                id: '1621344322123',
                originalUrl: 'https://example.com/very/long/url/that/needs/shortening',
                shortUrl: 'http://localhost:5000/api/services/url-shortener/mysite',
                alias: 'mysite',
                createdAt: '2023-05-19T12:23:42.123Z',
                clicks: 0
              }
            }
          }
        }
      },
      usage: 'To use a shortened URL, visit: http://localhost:5000/api/services/url-shortener/:alias',
      exampleUrls: Array.from(urlDatabase.entries()).map(([id, data]) => ({
        originalUrl: data.originalUrl,
        shortUrl: `http://localhost:5000/api/services/url-shortener/${data.alias}`,
        alias: data.alias,
        clicks: data.clicks
      }))
    });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}