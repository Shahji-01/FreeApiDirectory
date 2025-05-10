// API Services Directory - Lists all available API services

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
  },
  {
    id: 'colors',
    name: 'Colors API',
    description: 'Access color information, conversions, generate palettes, and get color psychology data. Perfect for design tools and applications.',
    longDescription: 'This API provides comprehensive information about colors including RGB, HEX, and HSL values, complementary colors, and color psychology. It allows you to generate color palettes (complementary, analogous, triadic, etc.), get random colors, and search colors by name or family. This is ideal for design applications, creative tools, or any project requiring color management.',
    endpoints: [
      {
        path: '/api/services/colors',
        method: 'GET',
        description: 'Get all colors'
      },
      {
        path: '/api/services/colors?id=5',
        method: 'GET',
        description: 'Get a specific color by ID'
      },
      {
        path: '/api/services/colors?name=blue',
        method: 'GET',
        description: 'Get a specific color by name'
      },
      {
        path: '/api/services/colors?family=primary',
        method: 'GET',
        description: 'Get colors by family (primary, secondary, etc.)'
      },
      {
        path: '/api/services/colors?random=true',
        method: 'GET',
        description: 'Generate a random color'
      },
      {
        path: '/api/services/colors?palette=1',
        method: 'GET',
        description: 'Get a predefined color palette by ID or name'
      },
      {
        path: '/api/services/colors?seed=FF0000&type=complementary',
        method: 'GET',
        description: 'Generate a custom palette from a seed color'
      },
      {
        path: '/api/services/colors?metadata=true',
        method: 'GET',
        description: 'Get color metadata (available families, palette types, etc.)'
      }
    ],
    parameters: [
      {
        name: 'id',
        type: 'integer',
        description: 'Get a specific color by ID',
        required: false
      },
      {
        name: 'name',
        type: 'string',
        description: 'Get a specific color by name',
        required: false
      },
      {
        name: 'family',
        type: 'string',
        description: 'Filter colors by family (primary, secondary, tertiary, neutral, etc.)',
        required: false
      },
      {
        name: 'random',
        type: 'boolean',
        description: 'Generate a random color',
        required: false,
        default: 'false'
      },
      {
        name: 'palette',
        type: 'string',
        description: 'Get a predefined palette by ID or name',
        required: false
      },
      {
        name: 'seed',
        type: 'string',
        description: 'Seed color for generating a custom palette (hex format)',
        required: false
      },
      {
        name: 'type',
        type: 'string',
        description: 'Type of palette to generate (complementary, analogous, triadic, monochromatic)',
        required: false,
        default: 'complementary'
      },
      {
        name: 'count',
        type: 'integer',
        description: 'Number of colors in generated palette (max 10)',
        required: false,
        default: '4'
      },
      {
        name: 'metadata',
        type: 'boolean',
        description: 'Get metadata about available colors and palettes',
        required: false,
        default: 'false'
      }
    ],
    example: {
      request: '/api/services/colors?random=true',
      response: {
        "hex": "#4F9D63",
        "rgb": {
          "r": 79,
          "g": 157,
          "b": 99
        },
        "hsl": {
          "h": 137,
          "s": 33,
          "l": 46
        },
        "complementary": "#9D4F89"
      }
    },
    category: 'design',
    icon: '🎨'
  },
  {
    id: 'dictionary',
    name: 'Dictionary API',
    description: 'Access word definitions, pronunciations, synonyms, antonyms, and etymology information for educational and reference applications.',
    longDescription: 'This API provides comprehensive dictionary data including word definitions, pronunciations, etymology, synonyms, antonyms, and usage examples. You can search words, get random words, or filter by word type. It is perfect for educational applications, language learning tools, or any project requiring rich linguistic data.',
    endpoints: [
      {
        path: '/api/services/dictionary',
        method: 'GET',
        description: 'Get all words (with pagination)'
      },
      {
        path: '/api/services/dictionary?word=serendipity',
        method: 'GET',
        description: 'Get a specific word and its details'
      },
      {
        path: '/api/services/dictionary?type=adjective',
        method: 'GET',
        description: 'Get words by type (noun, verb, adjective, etc.)'
      },
      {
        path: '/api/services/dictionary?random=true',
        method: 'GET',
        description: 'Get a random word'
      },
      {
        path: '/api/services/dictionary?synonymsFor=eloquent',
        method: 'GET',
        description: 'Get synonyms for a specific word'
      },
      {
        path: '/api/services/dictionary?antonymsFor=ephemeral',
        method: 'GET',
        description: 'Get antonyms for a specific word'
      },
      {
        path: '/api/services/dictionary?search=time',
        method: 'GET',
        description: 'Search for words (matches in word, definition, or example)'
      },
      {
        path: '/api/services/dictionary?metadata=true',
        method: 'GET',
        description: 'Get dictionary metadata'
      }
    ],
    parameters: [
      {
        name: 'word',
        type: 'string',
        description: 'Get information for a specific word',
        required: false
      },
      {
        name: 'type',
        type: 'string',
        description: 'Filter words by type (noun, verb, adjective, etc.)',
        required: false
      },
      {
        name: 'random',
        type: 'boolean',
        description: 'Get a random word',
        required: false,
        default: 'false'
      },
      {
        name: 'synonymsFor',
        type: 'string',
        description: 'Get synonyms for a specific word',
        required: false
      },
      {
        name: 'antonymsFor',
        type: 'string',
        description: 'Get antonyms for a specific word',
        required: false
      },
      {
        name: 'search',
        type: 'string',
        description: 'Search term to find in words, definitions, or examples',
        required: false
      },
      {
        name: 'limit',
        type: 'integer',
        description: 'Maximum number of results to return',
        required: false,
        default: '10'
      },
      {
        name: 'metadata',
        type: 'boolean',
        description: 'Get metadata about the dictionary',
        required: false,
        default: 'false'
      }
    ],
    example: {
      request: '/api/services/dictionary?word=serendipity',
      response: {
        "word": "serendipity",
        "pronunciation": "/ˌsɛrənˈdɪpɪti/",
        "type": "noun",
        "definition": "The occurrence and development of events by chance in a happy or beneficial way.",
        "example": "The discovery of penicillin was a serendipity.",
        "synonyms": ["chance", "fate", "destiny", "luck", "happy accident"],
        "antonyms": ["misfortune", "design", "intent"],
        "origin": "1754: coined by Horace Walpole, suggested by The Three Princes of Serendip, the title of a fairy tale in which the heroes 'were always making discoveries, by accidents and sagacity, of things they were not in quest of'",
        "pluralForm": "serendipities"
      }
    },
    category: 'education',
    icon: '📚'
  },
  {
    id: 'news',
    name: 'News API',
    description: 'Access simulated news articles, headlines, and sources for building news applications and aggregators.',
    longDescription: 'This API provides access to a collection of simulated news articles across various categories including technology, business, sports, health, science, and entertainment. You can retrieve full articles or headlines, filter by category or source, search by keyword, and sort by publication date. Perfect for building news aggregators, content platforms, or applications requiring diverse textual content.',
    endpoints: [
      {
        path: '/api/services/news',
        method: 'GET',
        description: 'Get recent news articles (with pagination)'
      },
      {
        path: '/api/services/news?id=5',
        method: 'GET',
        description: 'Get a specific article by ID'
      },
      {
        path: '/api/services/news?category=technology',
        method: 'GET',
        description: 'Get articles by category'
      },
      {
        path: '/api/services/news?source=tech-daily',
        method: 'GET',
        description: 'Get articles from a specific source'
      },
      {
        path: '/api/services/news?q=climate',
        method: 'GET',
        description: 'Search articles by keyword'
      },
      {
        path: '/api/services/news?from=2023-04-01&to=2023-04-15',
        method: 'GET',
        description: 'Get articles within a date range'
      },
      {
        path: '/api/services/news?headlines=true',
        method: 'GET',
        description: 'Get headlines only (without full content)'
      },
      {
        path: '/api/services/news?sortBy=publishedAt&order=desc',
        method: 'GET',
        description: 'Sort articles by publication date'
      },
      {
        path: '/api/services/news?sources=true',
        method: 'GET',
        description: 'Get list of all news sources'
      },
      {
        path: '/api/services/news?metadata=true',
        method: 'GET',
        description: 'Get news API metadata'
      }
    ],
    parameters: [
      {
        name: 'id',
        type: 'integer',
        description: 'Get a specific article by ID',
        required: false
      },
      {
        name: 'category',
        type: 'string',
        description: 'Filter articles by category (business, technology, sports, etc.)',
        required: false
      },
      {
        name: 'source',
        type: 'string',
        description: 'Filter articles by source ID',
        required: false
      },
      {
        name: 'q',
        type: 'string',
        description: 'Search term to find in article title, description, or content',
        required: false
      },
      {
        name: 'from',
        type: 'string',
        description: 'Start date for articles (YYYY-MM-DD format)',
        required: false
      },
      {
        name: 'to',
        type: 'string',
        description: 'End date for articles (YYYY-MM-DD format)',
        required: false
      },
      {
        name: 'headlines',
        type: 'boolean',
        description: 'Get headlines only (without full content)',
        required: false,
        default: 'false'
      },
      {
        name: 'sortBy',
        type: 'string',
        description: 'Sort field (publishedAt, title)',
        required: false,
        default: 'publishedAt'
      },
      {
        name: 'order',
        type: 'string',
        description: 'Sort order (asc, desc)',
        required: false,
        default: 'desc'
      },
      {
        name: 'limit',
        type: 'integer',
        description: 'Number of articles per page',
        required: false,
        default: '10'
      },
      {
        name: 'page',
        type: 'integer',
        description: 'Page number for pagination',
        required: false,
        default: '1'
      },
      {
        name: 'sources',
        type: 'boolean',
        description: 'Get list of all news sources',
        required: false,
        default: 'false'
      },
      {
        name: 'sourceDetails',
        type: 'string',
        description: 'Get details for a specific source by ID',
        required: false
      },
      {
        name: 'metadata',
        type: 'boolean',
        description: 'Get metadata about news API',
        required: false,
        default: 'false'
      }
    ],
    example: {
      request: '/api/services/news?category=technology&limit=1',
      response: {
        "status": "ok",
        "totalResults": 5,
        "page": 1,
        "limit": 1,
        "totalPages": 5,
        "articles": [
          {
            "id": 1,
            "title": "Tech Giants Unveil Revolutionary AI Assistant",
            "description": "Major technology companies announce a new generation of AI assistants with unprecedented natural language capabilities.",
            "content": "Leading technology companies have revealed their latest developments in artificial intelligence, showcasing assistants that can understand and respond to complex human instructions with remarkable accuracy. These new systems demonstrate significant improvements in reasoning, creativity, and factual knowledge compared to previous generations. Experts suggest these advancements could transform industries from customer service to content creation.",
            "author": "Sarah Johnson",
            "source": "tech-daily",
            "url": "https://example.com/tech-giants-ai",
            "imageUrl": "https://picsum.photos/id/1/800/450",
            "publishedAt": "2023-04-15",
            "category": "technology",
            "tags": ["AI", "machine learning", "technology"]
          }
        ]
      }
    },
    category: 'content',
    icon: '📰'
  },
  {
    id: 'image-generation',
    name: 'Image Generation API',
    description: 'Generate SVG images, patterns, charts, and QR codes based on customizable parameters.',
    longDescription: 'This advanced API creates SVG images on-demand with fully customizable parameters. Generate abstract shapes, patterns like grids or dots, simple QR codes, and interactive charts. All outputs are in SVG format which is lightweight, scalable, and can be used directly in web applications. Perfect for placeholder images, data visualization, or dynamic content creation.',
    endpoints: [
      {
        path: '/api/services/image-generation',
        method: 'GET',
        description: 'Generate random shapes (default)'
      },
      {
        path: '/api/services/image-generation?type=pattern&patternType=grid',
        method: 'GET',
        description: 'Generate a grid pattern'
      },
      {
        path: '/api/services/image-generation?type=pattern&patternType=dots',
        method: 'GET',
        description: 'Generate a dots pattern'
      },
      {
        path: '/api/services/image-generation?type=pattern&patternType=stripes',
        method: 'GET',
        description: 'Generate stripes pattern'
      },
      {
        path: '/api/services/image-generation?type=qrcode&text=Hello World',
        method: 'GET',
        description: 'Generate a simple QR code'
      },
      {
        path: '/api/services/image-generation?type=chart&width=400&height=300',
        method: 'GET',
        description: 'Generate a bar chart with random data'
      },
      {
        path: '/api/services/image-generation?width=300&height=200&numShapes=10',
        method: 'GET',
        description: 'Customize size and number of shapes'
      },
      {
        path: '/api/services/image-generation?format=json',
        method: 'GET',
        description: 'Get SVG as JSON response with metadata'
      }
    ],
    parameters: [
      {
        name: 'type',
        type: 'string',
        description: 'Type of image to generate (shape, pattern, qrcode, chart)',
        required: false,
        default: 'shape'
      },
      {
        name: 'width',
        type: 'integer',
        description: 'Width of the generated image in pixels',
        required: false,
        default: '200'
      },
      {
        name: 'height',
        type: 'integer',
        description: 'Height of the generated image in pixels',
        required: false,
        default: '200'
      },
      {
        name: 'patternType',
        type: 'string',
        description: 'Type of pattern (grid, dots, stripes, zigzag, checkerboard)',
        required: false,
        default: 'grid'
      },
      {
        name: 'text',
        type: 'string',
        description: 'Text to encode in QR code',
        required: false,
        default: 'Hello World'
      },
      {
        name: 'numShapes',
        type: 'integer',
        description: 'Number of shapes to generate',
        required: false,
        default: '5'
      },
      {
        name: 'seed',
        type: 'integer',
        description: 'Random seed for deterministic generation',
        required: false
      },
      {
        name: 'format',
        type: 'string',
        description: 'Response format (svg or json)',
        required: false,
        default: 'svg'
      },
      {
        name: 'backgroundColor',
        type: 'string',
        description: 'Background color in hex format',
        required: false,
        default: 'white'
      },
      {
        name: 'color1',
        type: 'string',
        description: 'Primary color for patterns in hex format',
        required: false
      },
      {
        name: 'color2',
        type: 'string',
        description: 'Secondary color for patterns in hex format',
        required: false
      }
    ],
    example: {
      request: '/api/services/image-generation?type=pattern&patternType=dots&width=200&height=200&color1=%23ff5733',
      response: '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">...</svg>'
    },
    category: 'media',
    icon: '🎨'
  },
  {
    id: 'text-to-speech',
    name: 'Text-to-Speech API',
    description: 'Convert text to synthesized speech with customizable voice profiles, pitch, and speed.',
    longDescription: 'This API converts text input into synthesized speech audio, available in multiple voice profiles (neutral, male, female, child, robot). Control parameters like speed, pitch, and volume to customize the output. Audio is provided in WAV format, either as a base64-encoded string or as raw audio data. Ideal for accessibility features, voice interfaces, or content narration in applications.',
    endpoints: [
      {
        path: '/api/services/text-to-speech?text=Hello World',
        method: 'GET',
        description: 'Convert text to speech (default voice)'
      },
      {
        path: '/api/services/text-to-speech?text=Hello World&voice=female',
        method: 'GET',
        description: 'Convert text with female voice'
      },
      {
        path: '/api/services/text-to-speech?text=Hello World&voice=male',
        method: 'GET',
        description: 'Convert text with male voice'
      },
      {
        path: '/api/services/text-to-speech?text=Hello World&voice=robot',
        method: 'GET',
        description: 'Convert text with robot voice'
      },
      {
        path: '/api/services/text-to-speech?text=Hello World&speed=0.8',
        method: 'GET',
        description: 'Adjust speech speed (slower)'
      },
      {
        path: '/api/services/text-to-speech?text=Hello World&pitch=1.5',
        method: 'GET',
        description: 'Adjust voice pitch (higher)'
      },
      {
        path: '/api/services/text-to-speech?text=Hello World&quality=enhanced',
        method: 'GET',
        description: 'Use enhanced quality voice synthesis'
      },
      {
        path: '/api/services/text-to-speech?text=Hello World&format=audio',
        method: 'GET',
        description: 'Get direct audio output (WAV format)'
      }
    ],
    parameters: [
      {
        name: 'text',
        type: 'string',
        description: 'Text to convert to speech (max 200 characters)',
        required: true
      },
      {
        name: 'voice',
        type: 'string',
        description: 'Voice profile (neutral, male, female, child, robot)',
        required: false,
        default: 'neutral'
      },
      {
        name: 'speed',
        type: 'float',
        description: 'Speech speed (0.5 to 2.0)',
        required: false,
        default: '1.0'
      },
      {
        name: 'pitch',
        type: 'float',
        description: 'Voice pitch (0.5 to 2.0)',
        required: false,
        default: '1.0'
      },
      {
        name: 'volume',
        type: 'float',
        description: 'Audio volume (0.1 to 1.0)',
        required: false,
        default: '0.5'
      },
      {
        name: 'format',
        type: 'string',
        description: 'Response format (json or audio)',
        required: false,
        default: 'json'
      },
      {
        name: 'quality',
        type: 'string',
        description: 'Voice quality (standard or enhanced)',
        required: false,
        default: 'standard'
      }
    ],
    example: {
      request: '/api/services/text-to-speech?text=Welcome to the text to speech API',
      response: {
        "status": "success",
        "text": "Welcome to the text to speech API",
        "audio": {
          "format": "wav",
          "encoding": "base64",
          "data": "UklGRiT..."
        },
        "parameters": {
          "voice": "neutral",
          "speed": 1,
          "pitch": 1,
          "volume": 0.5
        }
      }
    },
    category: 'media',
    icon: '🔊'
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