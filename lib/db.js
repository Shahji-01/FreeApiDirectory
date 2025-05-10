// In-memory database for API listings
// This will be replaced with MongoDB in a production environment

let apis = [
  {
    id: '1',
    name: 'JSONPlaceholder',
    description: 'Free fake API for testing and prototyping',
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
    name: 'Open Weather Map',
    description: 'Current weather data for any location on Earth',
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
    description: 'Pictures of cats from the internet',
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
    description: 'Search for articles and breaking news headlines',
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
    description: 'Jobs for software developers',
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
    description: 'Information about countries via a RESTful API',
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
    description: 'Generates random user data',
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
    description: 'A collective list of free APIs for use in software',
    category: 'development',
    auth: 'No',
    https: 'Yes',
    link: 'https://github.com/public-apis/public-apis',
    logo: 'https://via.placeholder.com/150?text=PublicAPIs',
    addedAt: new Date('2023-02-05').toISOString(),
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
  { name: 'geo', label: 'Geography', description: 'Geographic and mapping data' }
];

// Helper function to get a new unique ID
const getNewId = () => {
  const ids = apis.map(api => parseInt(api.id));
  const maxId = Math.max(...ids, 0);
  return (maxId + 1).toString();
};

// Get all APIs
export const getAllApis = () => {
  return [...apis];
};

// Get featured APIs
export const getFeaturedApis = () => {
  return apis.filter(api => api.featured);
};

// Get API by ID
export const getApiById = (id) => {
  return apis.find(api => api.id === id) || null;
};

// Get APIs by category
export const getApisByCategory = (category) => {
  return apis.filter(api => api.category === category);
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

// Search APIs
export const searchApis = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return apis.filter(api => 
    api.name.toLowerCase().includes(lowercaseQuery) || 
    api.description.toLowerCase().includes(lowercaseQuery) ||
    api.category.toLowerCase().includes(lowercaseQuery)
  );
};
