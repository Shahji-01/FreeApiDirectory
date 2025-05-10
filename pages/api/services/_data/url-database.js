// Shared in-memory database for URL shortener service
// This is for demo purposes only - in a real application, 
// this would be replaced with a persistent database

// URL database using Map (in-memory)
export const urlDatabase = new Map();

// Track the last used ID for generating new short URLs
export let lastId = 1000;

// Generate a short unique alias
export function generateShortAlias() {
  lastId++;
  // Convert to base 36 (alphanumeric) string
  return lastId.toString(36);
}

// Example URLs for demonstration
const exampleUrls = [
  {
    originalUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    alias: 'js-docs',
    createdAt: '2023-04-15T10:00:00.000Z',
    clicks: 42
  },
  {
    originalUrl: 'https://reactjs.org/docs/getting-started.html',
    alias: 'react',
    createdAt: '2023-04-16T11:30:00.000Z',
    clicks: 27
  },
  {
    originalUrl: 'https://nextjs.org/docs/getting-started',
    alias: 'nextjs',
    createdAt: '2023-04-17T09:45:00.000Z',
    clicks: 18
  }
];

// Add example URLs to database if they don't exist
exampleUrls.forEach((url, index) => {
  const id = `example-${index + 1}`;
  if (!urlDatabase.has(id)) {
    urlDatabase.set(id, url);
  }
});