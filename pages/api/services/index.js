// API Services Directory - Lists all available API services

const apiServices = [
  {
    id: 'random-user',
    name: 'Random User Generator API',
    description: 'Generate random user profiles for testing and development. Get realistic user data including names, addresses, emails, and profile pictures.',
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
    category: 'development'
  },
  {
    id: 'weather',
    name: 'Weather API',
    description: 'Get current weather data and forecasts for locations worldwide. Realistic weather data simulation based on global locations with temperature, conditions, and other meteorological information.',
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
    category: 'weather'
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency API',
    description: 'Access cryptocurrency market data including prices, market cap, volume, and historical data. Real-time price simulation with appropriate market fluctuations.',
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
    category: 'finance'
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