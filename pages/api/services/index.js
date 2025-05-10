// API Services Directory - Lists all available API services

// Define our API handler function

const apiServices = [
  {
    id: 'random-user',
    name: 'Random User Generator API',
    description: 'Generate random user profiles for testing and development. Get realistic user data including names, addresses, emails, and profile pictures.',
    longDescription: 'This API provides random user data that can be used for testing applications, populating databases with sample data, or creating demo accounts. Each generated user includes a complete profile with personal information, contact details, and even avatar URLs. The data is randomly generated but maintains realistic patterns and relationships.',
    endpoints: [
      {
        path: '/api/services/random-user',
        method: 'GET',
        description: 'Get random user data'
      },
      {
        path: '/api/services/random-user?count=10',
        method: 'GET',
        description: 'Get multiple random users'
      },
      {
        path: '/api/services/random-user?gender=female',
        method: 'GET',
        description: 'Filter by gender (male/female)'
      },
      {
        path: '/api/services/random-user?minAge=30&maxAge=50',
        method: 'GET',
        description: 'Filter by age range'
      }
    ],
    parameters: [
      {
        name: 'count',
        type: 'integer',
        description: 'Number of users to generate (1-100)',
        required: false,
        default: '1'
      },
      {
        name: 'gender',
        type: 'string',
        description: 'Filter by gender (male or female)',
        required: false
      },
      {
        name: 'minAge',
        type: 'integer',
        description: 'Minimum age of generated users',
        required: false
      },
      {
        name: 'maxAge',
        type: 'integer',
        description: 'Maximum age of generated users',
        required: false
      }
    ],
    example: {
      request: '/api/services/random-user?count=1',
      response: {
        "info": {
          "count": 1,
          "parameters": {
            "count": 1
          },
          "version": "1.0"
        },
        "results": [
          {
            "id": 1234,
            "firstName": "John",
            "lastName": "Doe",
            "name": "John Doe",
            "email": "john.doe@example.com",
            "gender": "male",
            "age": 35,
            "phone": "(555) 123-4567",
            "address": {
              "street": "123 Main St",
              "city": "New York",
              "state": "New York",
              "stateCode": "NY",
              "zipCode": 10001,
              "country": "United States",
              "countryCode": "US"
            },
            "avatar": "https://i.pravatar.cc/300?img=1",
            "username": "john123",
            "registeredDate": "2023-01-01T00:00:00.000Z"
          }
        ]
      }
    },
    category: 'development',
    icon: '👤'
  },
  {
    id: 'weather',
    name: 'Weather API',
    description: 'Get current weather data and forecasts for locations worldwide. Realistic weather data simulation based on global locations with temperature, conditions, and other meteorological information.',
    longDescription: 'This API provides simulated weather data for cities around the world. It generates realistic current weather conditions based on location and time of year, as well as multi-day forecasts. This is perfect for developing weather apps, testing location-based services, or adding weather data to travel applications without needing API keys.',
    endpoints: [
      {
        path: '/api/services/weather',
        method: 'GET',
        description: 'Get weather for a random city'
      },
      {
        path: '/api/services/weather?city=London',
        method: 'GET',
        description: 'Get weather for a specific city'
      },
      {
        path: '/api/services/weather?lat=40.7128&lon=-74.0060',
        method: 'GET',
        description: 'Get weather by coordinates'
      },
      {
        path: '/api/services/weather?forecast=true',
        method: 'GET',
        description: 'Get weather forecast'
      },
      {
        path: '/api/services/weather?forecast=true&days=7',
        method: 'GET',
        description: 'Get weather forecast for specific days'
      }
    ],
    parameters: [
      {
        name: 'city',
        type: 'string',
        description: 'City name to get weather for',
        required: false
      },
      {
        name: 'lat',
        type: 'number',
        description: 'Latitude coordinate',
        required: false
      },
      {
        name: 'lon',
        type: 'number',
        description: 'Longitude coordinate',
        required: false
      },
      {
        name: 'forecast',
        type: 'boolean',
        description: 'Get forecast data instead of current weather',
        required: false,
        default: 'false'
      },
      {
        name: 'days',
        type: 'integer',
        description: 'Number of days for forecast (1-14)',
        required: false,
        default: '5'
      }
    ],
    example: {
      request: '/api/services/weather?city=London',
      response: {
        "coord": {
          "lon": -0.1278,
          "lat": 51.5074
        },
        "weather": [
          {
            "id": 501,
            "main": "Rain",
            "description": "moderate rain",
            "icon": "10d"
          }
        ],
        "base": "stations",
        "main": {
          "temp": 12.75,
          "feels_like": 12.13,
          "temp_min": 11.76,
          "temp_max": 13.16,
          "pressure": 1012,
          "humidity": 88
        },
        "visibility": 10000,
        "wind": {
          "speed": 4.63,
          "deg": 220
        },
        "clouds": {
          "all": 90
        },
        "dt": 1629283802,
        "sys": {
          "type": 2,
          "id": 2019646,
          "country": "GB",
          "sunrise": 1629259384,
          "sunset": 1629312072
        },
        "timezone": 3600,
        "id": 2643743,
        "name": "London",
        "cod": 200
      }
    },
    category: 'weather',
    icon: '🌤️'
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency API',
    description: 'Access cryptocurrency market data including prices, market cap, volume, and historical data. Real-time price simulation with appropriate market fluctuations.',
    longDescription: 'This API provides simulated cryptocurrency market data for major coins and tokens. It includes current prices, historical data, and market statistics with realistic price fluctuations. All data follows real-world patterns of volatility for each cryptocurrency, making it suitable for developing and testing cryptocurrency dashboards, portfolio trackers, or trading interfaces.',
    endpoints: [
      {
        path: '/api/services/crypto',
        method: 'GET',
        description: 'Get all cryptocurrency data'
      },
      {
        path: '/api/services/crypto?id=bitcoin',
        method: 'GET',
        description: 'Get data for a specific cryptocurrency by ID'
      },
      {
        path: '/api/services/crypto?coin=btc',
        method: 'GET',
        description: 'Get data for a specific cryptocurrency by symbol'
      },
      {
        path: '/api/services/crypto?id=ethereum&historical=true',
        method: 'GET',
        description: 'Get historical price data'
      },
      {
        path: '/api/services/crypto?id=ethereum&historical=true&days=30',
        method: 'GET',
        description: 'Get historical price data for specific days'
      }
    ],
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'Cryptocurrency ID (e.g., bitcoin, ethereum)',
        required: false
      },
      {
        name: 'coin',
        type: 'string',
        description: 'Cryptocurrency symbol (e.g., btc, eth)',
        required: false
      },
      {
        name: 'historical',
        type: 'boolean',
        description: 'Get historical price data instead of current data',
        required: false,
        default: 'false'
      },
      {
        name: 'days',
        type: 'integer',
        description: 'Number of days for historical data (1-365)',
        required: false,
        default: '7'
      },
      {
        name: 'vs_currency',
        type: 'string',
        description: 'Currency to display prices in',
        required: false,
        default: 'usd'
      }
    ],
    example: {
      request: '/api/services/crypto?id=bitcoin',
      response: {
        "id": "bitcoin",
        "symbol": "btc",
        "name": "Bitcoin",
        "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
        "current_price": 48523.42,
        "market_cap": 927389283749,
        "market_cap_rank": 1,
        "fully_diluted_valuation": 1027389283749,
        "total_volume": 29384756382,
        "high_24h": 49827.36,
        "low_24h": 47982.58,
        "price_change_24h": 537.84,
        "price_change_percentage_24h": "1.12",
        "market_cap_change_24h": 10291827364,
        "market_cap_change_percentage_24h": "1.12",
        "circulating_supply": 19000000,
        "total_supply": 21000000,
        "max_supply": 21000000,
        "ath": 69000,
        "ath_change_percentage": "-29.67",
        "ath_date": "2021-11-10T14:24:11.849Z",
        "atl": 67.81,
        "atl_change_percentage": "71461.1",
        "atl_date": "2013-07-06T00:00:00.000Z",
        "roi": null,
        "last_updated": "2023-04-05T12:30:09.825Z"
      }
    },
    category: 'finance',
    icon: '💰'
  },
  {
    id: 'quotes',
    name: 'Quotes API',
    description: 'Access a collection of inspirational and famous quotes with filtering by author, tag, or keyword. Perfect for adding motivational content to apps.',
    longDescription: 'This API provides access to a curated collection of inspirational and famous quotes from notable individuals across history. Each quote includes the text, author attribution, and categorization tags. You can retrieve random quotes or filter by specific authors, themes, or keywords. Perfect for adding motivational content to applications, creating daily quote features, or building inspiration-focused services.',
    endpoints: [
      {
        path: '/api/services/quotes',
        method: 'GET',
        description: 'Get a random quote'
      },
      {
        path: '/api/services/quotes?count=5',
        method: 'GET',
        description: 'Get multiple random quotes'
      },
      {
        path: '/api/services/quotes?author=Einstein',
        method: 'GET',
        description: 'Get quotes by a specific author'
      },
      {
        path: '/api/services/quotes?tag=inspiration',
        method: 'GET',
        description: 'Get quotes with a specific tag'
      },
      {
        path: '/api/services/quotes?id=1',
        method: 'GET',
        description: 'Get a specific quote by ID'
      },
      {
        path: '/api/services/quotes?metadata=true',
        method: 'GET',
        description: 'Get quote metadata (available tags, authors, etc.)'
      }
    ],
    parameters: [
      {
        name: 'count',
        type: 'integer',
        description: 'Number of quotes to retrieve (1-10)',
        required: false,
        default: '1'
      },
      {
        name: 'author',
        type: 'string',
        description: 'Filter quotes by author name (case-insensitive, partial match)',
        required: false
      },
      {
        name: 'tag',
        type: 'string',
        description: 'Filter quotes by tag (inspiration, wisdom, success, etc.)',
        required: false
      },
      {
        name: 'id',
        type: 'integer',
        description: 'Get a specific quote by ID',
        required: false
      },
      {
        name: 'metadata',
        type: 'boolean',
        description: 'Get metadata about available quotes',
        required: false,
        default: 'false'
      }
    ],
    example: {
      request: '/api/services/quotes',
      response: {
        "status": "success",
        "count": 1,
        "quotes": [
          {
            "id": 5,
            "text": "The greatest glory in living lies not in never falling, but in rising every time we fall.",
            "author": "Nelson Mandela",
            "tags": ["resilience", "life", "inspiration"]
          }
        ]
      }
    },
    category: 'content',
    icon: '💬'
  },
  {
    id: 'todo',
    name: 'Todo API',
    description: 'A RESTful API for managing todo items with support for creating, updating, completing, and filtering tasks. Ideal for todo list applications.',
    longDescription: 'This API provides a complete solution for managing todo lists and task management applications. It supports creating, reading, updating, and deleting todo items, as well as filtering by completion status, priority, and tags. Each todo item can have attributes like title, completion status, priority level, due date, and categorization tags. The API maintains state during your session, allowing for realistic todo application development without database setup.',
    endpoints: [
      {
        path: '/api/services/todo',
        method: 'GET',
        description: 'Get all todo items'
      },
      {
        path: '/api/services/todo?completed=false',
        method: 'GET',
        description: 'Get incomplete todo items'
      },
      {
        path: '/api/services/todo?priority=high',
        method: 'GET',
        description: 'Get high priority todo items'
      },
      {
        path: '/api/services/todo?tag=work',
        method: 'GET',
        description: 'Get todo items with a specific tag'
      },
      {
        path: '/api/services/todo/:id',
        method: 'GET',
        description: 'Get a specific todo item by ID'
      },
      {
        path: '/api/services/todo',
        method: 'POST',
        description: 'Create a new todo item'
      },
      {
        path: '/api/services/todo/:id',
        method: 'PUT',
        description: 'Update a todo item'
      },
      {
        path: '/api/services/todo/:id',
        method: 'DELETE',
        description: 'Delete a todo item'
      }
    ],
    parameters: [
      {
        name: 'completed',
        type: 'boolean',
        description: 'Filter by completion status',
        required: false
      },
      {
        name: 'priority',
        type: 'string',
        description: 'Filter by priority (low, medium, high)',
        required: false
      },
      {
        name: 'tag',
        type: 'string',
        description: 'Filter by tag',
        required: false
      }
    ],
    requestBody: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Title of the todo item',
          required: true
        },
        completed: {
          type: 'boolean',
          description: 'Completion status',
          required: false,
          default: false
        },
        priority: {
          type: 'string',
          description: 'Priority level (low, medium, high)',
          required: false,
          default: 'medium'
        },
        dueDate: {
          type: 'string',
          description: 'Due date (ISO format)',
          required: false
        },
        tags: {
          type: 'array',
          description: 'Array of tag strings',
          required: false
        }
      }
    },
    example: {
      request: '/api/services/todo',
      response: {
        "count": 5,
        "todos": [
          {
            "id": "1",
            "title": "Complete project documentation",
            "completed": false,
            "priority": "high",
            "dueDate": "2023-05-11T10:00:00.000Z",
            "tags": ["work", "documentation"]
          },
          {
            "id": "2",
            "title": "Buy groceries",
            "completed": false,
            "priority": "medium",
            "dueDate": "2023-05-12T10:00:00.000Z",
            "tags": ["personal", "shopping"]
          }
          // More items...
        ]
      }
    },
    category: 'development',
    icon: '✅'
  },
  {
    id: 'countries',
    name: 'Countries API',
    description: 'Comprehensive information about countries including demographics, geography, languages, currencies, and more. Perfect for building location-based features.',
    longDescription: 'This API provides detailed information about countries around the world. Each country entry includes comprehensive data about geography, population, languages, currencies, flags, timezones, and more. You can search and filter countries by various criteria including name, region, language, currency, and population range. This API is ideal for building location selectors, international e-commerce applications, travel apps, or educational tools.',
    endpoints: [
      {
        path: '/api/services/countries',
        method: 'GET',
        description: 'Get data for all countries'
      },
      {
        path: '/api/services/countries?name=united',
        method: 'GET',
        description: 'Search countries by name'
      },
      {
        path: '/api/services/countries?code=US',
        method: 'GET',
        description: 'Get country by country code'
      },
      {
        path: '/api/services/countries?region=Europe',
        method: 'GET',
        description: 'Filter countries by region'
      },
      {
        path: '/api/services/countries?language=Spanish',
        method: 'GET',
        description: 'Filter countries by language'
      },
      {
        path: '/api/services/countries?currency=Euro',
        method: 'GET',
        description: 'Filter countries by currency'
      },
      {
        path: '/api/services/countries?metadata=true',
        method: 'GET',
        description: 'Get countries metadata'
      }
    ],
    parameters: [
      {
        name: 'name',
        type: 'string',
        description: 'Search countries by name (partial match)',
        required: false
      },
      {
        name: 'code',
        type: 'string',
        description: 'Country code (2-letter ISO code)',
        required: false
      },
      {
        name: 'region',
        type: 'string',
        description: 'Filter by region (Europe, Asia, Africa, etc.)',
        required: false
      },
      {
        name: 'subregion',
        type: 'string',
        description: 'Filter by subregion (Western Europe, Southeast Asia, etc.)',
        required: false
      },
      {
        name: 'language',
        type: 'string',
        description: 'Filter by language (English, Spanish, etc.)',
        required: false
      },
      {
        name: 'currency',
        type: 'string',
        description: 'Filter by currency name or code',
        required: false
      },
      {
        name: 'minPopulation',
        type: 'integer',
        description: 'Minimum population threshold',
        required: false
      },
      {
        name: 'maxPopulation',
        type: 'integer',
        description: 'Maximum population threshold',
        required: false
      },
      {
        name: 'metadata',
        type: 'boolean',
        description: 'Get metadata about available regions, languages, etc.',
        required: false,
        default: 'false'
      }
    ],
    example: {
      request: '/api/services/countries?code=US',
      response: {
        "name": "United States",
        "code": "US",
        "capital": "Washington, D.C.",
        "region": "Americas",
        "subregion": "North America",
        "population": 331002651,
        "area": 9833517,
        "languages": [
          {
            "name": "English",
            "iso639_1": "en"
          }
        ],
        "currencies": [
          {
            "code": "USD",
            "name": "United States Dollar",
            "symbol": "$"
          }
        ],
        "flag": "🇺🇸",
        "timezones": [
          "UTC-12:00",
          "UTC-11:00",
          "UTC-10:00",
          "UTC-09:00",
          "UTC-08:00",
          "UTC-07:00",
          "UTC-06:00",
          "UTC-05:00",
          "UTC-04:00",
          "UTC+10:00",
          "UTC+12:00"
        ],
        "continents": [
          "North America"
        ],
        "borders": [
          "CAN",
          "MEX"
        ],
        "independent": true
      }
    },
    category: 'geo',
    icon: '🌎'
  },
  {
    id: 'joke',
    name: 'Joke API',
    description: 'Access a collection of jokes with filtering by category and type. Perfect for adding humor to applications.',
    longDescription: 'This API provides a collection of jokes that can be filtered by category, type, and safety level. Each joke includes categorization and type information. You can retrieve random jokes or filter by specific categories like programming, science, food, etc. This is perfect for adding a humor feature to your applications or building joke-of-the-day functionality.',
    endpoints: [
      {
        path: '/api/services/joke',
        method: 'GET',
        description: 'Get a random joke'
      },
      {
        path: '/api/services/joke?category=programming',
        method: 'GET',
        description: 'Get a joke from a specific category'
      },
      {
        path: '/api/services/joke?type=one-liner',
        method: 'GET',
        description: 'Get a joke of a specific type'
      },
      {
        path: '/api/services/joke?id=1',
        method: 'GET',
        description: 'Get a specific joke by ID'
      },
      {
        path: '/api/services/joke?metadata=true',
        method: 'GET',
        description: 'Get joke metadata (available categories, types, etc.)'
      }
    ],
    parameters: [
      {
        name: 'category',
        type: 'string',
        description: 'Filter jokes by category (programming, science, food, etc.)',
        required: false
      },
      {
        name: 'type',
        type: 'string',
        description: 'Filter jokes by type (one-liner, question-answer, story)',
        required: false
      },
      {
        name: 'id',
        type: 'integer',
        description: 'Get a specific joke by ID',
        required: false
      },
      {
        name: 'safe',
        type: 'boolean',
        description: 'Ensure joke is safe for all audiences',
        required: false,
        default: 'true'
      },
      {
        name: 'metadata',
        type: 'boolean',
        description: 'Get metadata about available jokes',
        required: false,
        default: 'false'
      }
    ],
    example: {
      request: '/api/services/joke',
      response: {
        "status": "success",
        "joke": {
          "id": 13,
          "text": "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
          "category": "programming",
          "safe": true,
          "type": "question-answer"
        }
      }
    },
    category: 'entertainment',
    icon: '😂'
  }
];

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Get query parameters
    const serviceId = req.query.id;
    
    // If serviceId is provided, return specific service
    if (serviceId) {
      const service = apiServices.find(s => s.id === serviceId);
      
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      
      return res.status(200).json(service);
    }
    
    // Otherwise return all services
    return res.status(200).json({
      services: apiServices,
      count: apiServices.length,
      baseUrl: `${req.headers.host || 'localhost:5000'}`
    });
  } catch (error) {
    console.error('Error fetching API services:', error);
    return res.status(500).json({ error: 'Failed to fetch API services' });
  }
}