// In-memory database for API listings
// This will be replaced with MongoDB in a production environment

let apis = [
  {
    id: '1',
    name: 'JSONPlaceholder',
    description: 'Free fake API for testing and prototyping. Provides REST endpoints for fake posts, comments, users, photos and more for developing and testing your application without a real backend.',
    category: 'development',
    auth: 'No',
    https: 'Yes',
    link: 'https://jsonplaceholder.typicode.com',
    logo: 'https://via.placeholder.com/150?text=JSONPlaceholder',
    addedAt: new Date('2023-01-01').toISOString(),
    featured: true
  },
  {
    id: '2',
    name: 'OpenWeather API',
    description: 'Current and forecast weather data for any location on Earth. Access current weather, hourly, 5-day and 16-day forecasts, historical data, and weather maps.',
    category: 'weather',
    auth: 'apiKey',
    https: 'Yes',
    link: 'https://openweathermap.org/api',
    logo: 'https://via.placeholder.com/150?text=OpenWeather',
    addedAt: new Date('2023-01-05').toISOString(),
    featured: true
  },
  {
    id: '3',
    name: 'The Cat API',
    description: 'A public service API all about Cats, free to use when making your fancy new App, Website or Service. Find cat images, facts, and breeds information.',
    category: 'animals',
    auth: 'apiKey',
    https: 'Yes',
    link: 'https://thecatapi.com/',
    logo: 'https://via.placeholder.com/150?text=CatAPI',
    addedAt: new Date('2023-01-10').toISOString(),
    featured: false
  },
  {
    id: '4',
    name: 'News API',
    description: 'Search for articles and breaking news headlines from news sources and blogs across the web. Filter by source, category, language, country, and more.',
    category: 'news',
    auth: 'apiKey',
    https: 'Yes',
    link: 'https://newsapi.org/',
    logo: 'https://via.placeholder.com/150?text=NewsAPI',
    addedAt: new Date('2023-01-15').toISOString(),
    featured: true
  },
  {
    id: '5',
    name: 'GitHub Jobs',
    description: 'The GitHub Jobs API allows you to search for jobs at companies with remote-friendly, flexible work requirements and more. Perfect for developer job search apps.',
    category: 'jobs',
    auth: 'No',
    https: 'Yes',
    link: 'https://jobs.github.com/api',
    logo: 'https://via.placeholder.com/150?text=GitHubJobs',
    addedAt: new Date('2023-01-20').toISOString(),
    featured: false
  },
  {
    id: '6',
    name: 'REST Countries',
    description: 'Information about countries including name, capital, population, currency, language, and regional blocks. Filter and search by various parameters and get detailed data about any country.',
    category: 'geo',
    auth: 'No',
    https: 'Yes',
    link: 'https://restcountries.com/',
    logo: 'https://via.placeholder.com/150?text=RESTCountries',
    addedAt: new Date('2023-01-25').toISOString(),
    featured: true
  },
  {
    id: '7',
    name: 'Random User Generator',
    description: 'Generates random user data including names, addresses, profile pictures, and contact details. Great for populating databases with realistic fake user data for testing.',
    category: 'development',
    auth: 'No',
    https: 'Yes',
    link: 'https://randomuser.me/',
    logo: 'https://via.placeholder.com/150?text=RandomUser',
    addedAt: new Date('2023-02-01').toISOString(),
    featured: false
  },
  {
    id: '8',
    name: 'Public APIs',
    description: 'A collective list of free APIs for use in software and web development. Browse hundreds of free APIs categorized by topic, auth method, CORS support, and HTTPS availability.',
    category: 'development',
    auth: 'No',
    https: 'Yes',
    link: 'https://github.com/public-apis/public-apis',
    logo: 'https://via.placeholder.com/150?text=PublicAPIs',
    addedAt: new Date('2023-02-05').toISOString(),
    featured: true
  },
  {
    id: '9',
    name: 'CoinGecko',
    description: 'Comprehensive cryptocurrency data API providing current prices, historical data, volume, market cap, and exchange information for thousands of cryptocurrencies.',
    category: 'finance',
    auth: 'No',
    https: 'Yes',
    link: 'https://www.coingecko.com/en/api',
    logo: 'https://via.placeholder.com/150?text=CoinGecko',
    addedAt: new Date('2023-02-10').toISOString(),
    featured: true
  },
  {
    id: '10',
    name: 'SpaceX API',
    description: 'Open-source API for rocket, core, capsule, pad, and launch data. Get information about SpaceX launches, vehicles, and missions in real-time.',
    category: 'science',
    auth: 'No',
    https: 'Yes',
    link: 'https://github.com/r-spacex/SpaceX-API',
    logo: 'https://via.placeholder.com/150?text=SpaceX',
    addedAt: new Date('2023-02-15').toISOString(),
    featured: false
  },
  {
    id: '11',
    name: 'Unsplash API',
    description: 'Access the world\'s most powerful photo engine. Get high-resolution, royalty-free images and search by keyword, color, orientation, and more.',
    category: 'images',
    auth: 'OAuth',
    https: 'Yes',
    link: 'https://unsplash.com/developers',
    logo: 'https://via.placeholder.com/150?text=Unsplash',
    addedAt: new Date('2023-02-20').toISOString(),
    featured: true
  },
  {
    id: '12',
    name: 'TMDB API',
    description: 'The Movie Database API provides access to data on thousands of movies, TV shows, actors, and more. Get details, images, ratings, and trailers for popular media.',
    category: 'entertainment',
    auth: 'apiKey',
    https: 'Yes',
    link: 'https://www.themoviedb.org/documentation/api',
    logo: 'https://via.placeholder.com/150?text=TMDB',
    addedAt: new Date('2023-02-25').toISOString(),
    featured: false
  },
  {
    id: '13',
    name: 'NASA API',
    description: 'Access NASA data including imagery, Mars rover photos, asteroid information, and the famous Astronomy Picture of the Day (APOD).',
    category: 'science',
    auth: 'apiKey',
    https: 'Yes',
    link: 'https://api.nasa.gov/',
    logo: 'https://via.placeholder.com/150?text=NASA',
    addedAt: new Date('2023-03-01').toISOString(),
    featured: true
  },
  {
    id: '14',
    name: 'Spotify API',
    description: 'Access and control Spotify playback, manage playlists, search for tracks, albums, artists, and retrieve detailed music metadata and recommendations.',
    category: 'music',
    auth: 'OAuth',
    https: 'Yes',
    link: 'https://developer.spotify.com/documentation/web-api/',
    logo: 'https://via.placeholder.com/150?text=Spotify',
    addedAt: new Date('2023-03-05').toISOString(),
    featured: true
  },
  {
    id: '15',
    name: 'Food Recipe API',
    description: 'Search for recipes by ingredients, nutrients, diet, allergies, and meal type. Get detailed cooking instructions, ingredient lists, and nutritional information.',
    category: 'food',
    auth: 'apiKey',
    https: 'Yes',
    link: 'https://spoonacular.com/food-api',
    logo: 'https://via.placeholder.com/150?text=FoodAPI',
    addedAt: new Date('2023-03-10').toISOString(),
    featured: false
  },
  {
    id: '16',
    name: 'Football (Soccer) API',
    description: 'Get fixtures, results, standings, team and player statistics for more than 800 football leagues and cups around the world.',
    category: 'sports',
    auth: 'apiKey',
    https: 'Yes',
    link: 'https://www.api-football.com/',
    logo: 'https://via.placeholder.com/150?text=FootballAPI',
    addedAt: new Date('2023-03-15').toISOString(),
    featured: false
  },
  {
    id: '17',
    name: 'Stripe API',
    description: 'Comprehensive payment processing platform with APIs for accepting credit cards, managing subscriptions, and handling marketplace payments.',
    category: 'payment',
    auth: 'apiKey',
    https: 'Yes',
    link: 'https://stripe.com/docs/api',
    logo: 'https://via.placeholder.com/150?text=Stripe',
    addedAt: new Date('2023-03-20').toISOString(),
    featured: true
  },
  {
    id: '18',
    name: 'IP Geolocation API',
    description: 'Get location information from IP addresses, including country, region, city, latitude, longitude, timezone, and connection details.',
    category: 'geo',
    auth: 'apiKey',
    https: 'Yes',
    link: 'https://ipinfo.io/developers',
    logo: 'https://via.placeholder.com/150?text=IPGeolocation',
    addedAt: new Date('2023-03-25').toISOString(),
    featured: false
  },
  {
    id: '19',
    name: 'Currency Exchange API',
    description: 'Real-time and historical exchange rate data for 170+ currencies, cryptocurrencies, and precious metals. Convert amounts and track fluctuations.',
    category: 'finance',
    auth: 'apiKey',
    https: 'Yes',
    link: 'https://exchangeratesapi.io/',
    logo: 'https://via.placeholder.com/150?text=ExchangeRates',
    addedAt: new Date('2023-04-01').toISOString(),
    featured: false
  },
  {
    id: '20',
    name: 'OpenAI API',
    description: 'Access advanced AI models like GPT-4 for natural language understanding, generation, classification, and more. Build AI-powered applications with state-of-the-art language capabilities.',
    category: 'ai',
    auth: 'apiKey',
    https: 'Yes',
    link: 'https://platform.openai.com/',
    logo: 'https://via.placeholder.com/150?text=OpenAI',
    addedAt: new Date('2023-04-05').toISOString(),
    featured: true
  }
];

// Categories with descriptions and counts
const categories = [
  { name: 'development', label: 'Development', description: 'APIs for software development and testing' },
  { name: 'weather', label: 'Weather', description: 'Weather data from around the world' },
  { name: 'animals', label: 'Animals', description: 'Information and images of animals' },
  { name: 'news', label: 'News', description: 'Latest news and articles' },
  { name: 'jobs', label: 'Jobs', description: 'Job listings and career information' },
  { name: 'geo', label: 'Geography', description: 'Geographic and mapping data' },
  { name: 'finance', label: 'Finance', description: 'Currency, crypto, and financial market data' },
  { name: 'science', label: 'Science', description: 'Scientific data and research APIs' },
  { name: 'images', label: 'Images', description: 'Photo and image-related services' },
  { name: 'entertainment', label: 'Entertainment', description: 'Movies, TV shows, and media content' },
  { name: 'music', label: 'Music', description: 'Music streaming and audio data' },
  { name: 'food', label: 'Food & Drink', description: 'Recipes, nutrition, and food information' },
  { name: 'sports', label: 'Sports', description: 'Athletic events, scores, and statistics' },
  { name: 'payment', label: 'Payment', description: 'Process payments and financial transactions' },
  { name: 'ai', label: 'Artificial Intelligence', description: 'Machine learning and AI-powered services' }
];

// Helper function to get a new unique ID
const getNewId = () => {
  const ids = apis.map(api => parseInt(api.id));
  const maxId = Math.max(...ids, 0);
  return (maxId + 1).toString();
};

// Get all APIs (defaults to only approved APIs for public view)
export const getAllApis = (options = { publicView: true }) => {
  // For admin view, return all APIs
  if (!options.publicView) {
    return [...apis];
  }
  
  // For public view, filter out non-approved APIs
  return apis.filter(api => api.status !== 'pending' && api.status !== 'rejected');
};

// Get featured APIs
export const getFeaturedApis = () => {
  // Only show approved and featured APIs
  return apis.filter(api => api.featured && api.status !== 'pending' && api.status !== 'rejected');
};

// Get API by ID (defaults to only approved APIs for public view)
export const getApiById = (id, options = { publicView: true }) => {
  const api = apis.find(api => api.id === id) || null;
  
  // For admin view or if API not found, return as is
  if (!options.publicView || !api) {
    return api;
  }
  
  // For public view, only return if approved
  return (api.status !== 'pending' && api.status !== 'rejected') ? api : null;
};

// Get APIs by category (defaults to only approved APIs for public view)
export const getApisByCategory = (category, options = { publicView: true }) => {
  // For admin view, return all APIs in category
  if (!options.publicView) {
    return apis.filter(api => api.category === category);
  }
  
  // For public view, filter out non-approved APIs
  return apis.filter(api => 
    api.category === category && 
    api.status !== 'pending' && 
    api.status !== 'rejected'
  );
};

// Add new API
export const addApi = (apiData) => {
  const newApi = {
    id: getNewId(),
    addedAt: new Date().toISOString(),
    featured: false,
    ...apiData
  };
  
  apis = [...apis, newApi];
  return newApi;
};

// Update API
export const updateApi = (id, apiData) => {
  const apiIndex = apis.findIndex(api => api.id === id);
  
  if (apiIndex === -1) {
    return null;
  }
  
  const updatedApi = {
    ...apis[apiIndex],
    ...apiData,
  };
  
  apis = [
    ...apis.slice(0, apiIndex),
    updatedApi,
    ...apis.slice(apiIndex + 1)
  ];
  
  return updatedApi;
};

// Delete API
export const deleteApi = (id) => {
  const apiIndex = apis.findIndex(api => api.id === id);
  
  if (apiIndex === -1) {
    return false;
  }
  
  apis = [
    ...apis.slice(0, apiIndex),
    ...apis.slice(apiIndex + 1)
  ];
  
  return true;
};

// Get all categories
export const getAllCategories = () => {
  return categories.map(category => {
    const count = apis.filter(api => api.category === category.name).length;
    return { ...category, count };
  });
};

// Search APIs (defaults to only approved APIs for public view)
export const searchApis = (query, options = { publicView: true }) => {
  const lowercaseQuery = query.toLowerCase();
  
  // Filter by search terms
  let results = apis.filter(api => 
    api.name.toLowerCase().includes(lowercaseQuery) || 
    api.description.toLowerCase().includes(lowercaseQuery) ||
    api.category.toLowerCase().includes(lowercaseQuery) ||
    (api.longDescription && api.longDescription.toLowerCase().includes(lowercaseQuery))
  );
  
  // For public view, filter out non-approved APIs
  if (options.publicView) {
    results = results.filter(api => api.status !== 'pending' && api.status !== 'rejected');
  }
  
  return results;
};
