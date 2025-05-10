// Custom Weather API - Provides weather data for testing and prototyping

// Function to generate a random integer between min and max (inclusive)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to get a random item from an array
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Data for weather API
const cities = [
  { name: 'New York', lat: 40.7128, lon: -74.0060, country: 'US' },
  { name: 'London', lat: 51.5074, lon: -0.1278, country: 'GB' },
  { name: 'Paris', lat: 48.8566, lon: 2.3522, country: 'FR' },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503, country: 'JP' },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093, country: 'AU' },
  { name: 'Los Angeles', lat: 34.0522, lon: -118.2437, country: 'US' },
  { name: 'Hong Kong', lat: 22.3193, lon: 114.1694, country: 'HK' },
  { name: 'Berlin', lat: 52.5200, lon: 13.4050, country: 'DE' },
  { name: 'Madrid', lat: 40.4168, lon: -3.7038, country: 'ES' },
  { name: 'Rome', lat: 41.9028, lon: 12.4964, country: 'IT' },
  { name: 'Toronto', lat: 43.6532, lon: -79.3832, country: 'CA' },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708, country: 'AE' },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198, country: 'SG' },
  { name: 'Moscow', lat: 55.7558, lon: 37.6173, country: 'RU' },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777, country: 'IN' },
  { name: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729, country: 'BR' },
  { name: 'Cape Town', lat: -33.9249, lon: 18.4241, country: 'ZA' },
  { name: 'Mexico City', lat: 19.4326, lon: -99.1332, country: 'MX' },
  { name: 'Cairo', lat: 30.0444, lon: 31.2357, country: 'EG' },
  { name: 'Bangkok', lat: 13.7563, lon: 100.5018, country: 'TH' }
];

const weatherConditions = [
  { main: 'Clear', description: 'clear sky', icon: '01d' },
  { main: 'Clear', description: 'clear sky', icon: '01n' },
  { main: 'Clouds', description: 'few clouds', icon: '02d' },
  { main: 'Clouds', description: 'few clouds', icon: '02n' },
  { main: 'Clouds', description: 'scattered clouds', icon: '03d' },
  { main: 'Clouds', description: 'scattered clouds', icon: '03n' },
  { main: 'Clouds', description: 'broken clouds', icon: '04d' },
  { main: 'Clouds', description: 'broken clouds', icon: '04n' },
  { main: 'Rain', description: 'light rain', icon: '10d' },
  { main: 'Rain', description: 'light rain', icon: '10n' },
  { main: 'Rain', description: 'moderate rain', icon: '09d' },
  { main: 'Rain', description: 'moderate rain', icon: '09n' },
  { main: 'Thunderstorm', description: 'thunderstorm', icon: '11d' },
  { main: 'Thunderstorm', description: 'thunderstorm', icon: '11n' },
  { main: 'Snow', description: 'light snow', icon: '13d' },
  { main: 'Snow', description: 'light snow', icon: '13n' },
  { main: 'Mist', description: 'mist', icon: '50d' },
  { main: 'Mist', description: 'mist', icon: '50n' }
];

// Generate weather data for a specific city
const generateWeatherData = (city) => {
  const today = new Date();
  
  // Generate temperature data based on latitude (rough approximation)
  // Equator is hotter, poles are colder
  const baseTemp = 25 - Math.abs(city.lat) * 0.5;
  const currentTemp = baseTemp + randomInt(-8, 8);
  const feelsLike = currentTemp + randomInt(-2, 2);
  const minTemp = currentTemp - randomInt(1, 5);
  const maxTemp = currentTemp + randomInt(1, 5);
  
  // Generate other weather metrics
  const pressure = randomInt(980, 1040); // hPa
  const humidity = randomInt(20, 95); // %
  const windSpeed = randomInt(0, 25); // m/s
  const windDeg = randomInt(0, 359); // degrees
  const clouds = randomInt(0, 100); // % of cloudiness
  const visibility = randomInt(5000, 10000); // meters
  
  // Determine weather condition based on temperature and randomness
  let conditions;
  if (currentTemp > 25) {
    // Hot weather - more likely to be clear or cloudy
    conditions = weatherConditions.filter(c => 
      c.main === 'Clear' || c.main === 'Clouds'
    );
  } else if (currentTemp < 0) {
    // Cold weather - more likely to be snowy or cloudy
    conditions = weatherConditions.filter(c => 
      c.main === 'Snow' || c.main === 'Clouds'
    );
  } else if (currentTemp > 15 && currentTemp <= 25) {
    // Warm weather - could be anything except snow
    conditions = weatherConditions.filter(c => c.main !== 'Snow');
  } else {
    // Mild weather - could be anything
    conditions = weatherConditions;
  }
  
  // Pick a random condition from the filtered list
  const condition = getRandomItem(conditions);
  
  // Generate sunrise and sunset times
  const sunrise = new Date(today);
  sunrise.setHours(6 + randomInt(-1, 1));
  sunrise.setMinutes(randomInt(0, 59));
  
  const sunset = new Date(today);
  sunset.setHours(18 + randomInt(-1, 1));
  sunset.setMinutes(randomInt(0, 59));
  
  return {
    coord: {
      lon: city.lon,
      lat: city.lat
    },
    weather: [
      {
        id: randomInt(200, 800),
        main: condition.main,
        description: condition.description,
        icon: condition.icon
      }
    ],
    base: "stations",
    main: {
      temp: parseFloat(currentTemp.toFixed(2)),
      feels_like: parseFloat(feelsLike.toFixed(2)),
      temp_min: parseFloat(minTemp.toFixed(2)),
      temp_max: parseFloat(maxTemp.toFixed(2)),
      pressure,
      humidity
    },
    visibility,
    wind: {
      speed: parseFloat(windSpeed.toFixed(2)),
      deg: windDeg
    },
    clouds: {
      all: clouds
    },
    dt: Math.floor(Date.now() / 1000),
    sys: {
      type: 2,
      id: randomInt(1000, 9999),
      country: city.country,
      sunrise: Math.floor(sunrise.getTime() / 1000),
      sunset: Math.floor(sunset.getTime() / 1000)
    },
    timezone: randomInt(-43200, 43200),
    id: randomInt(100000, 999999),
    name: city.name,
    cod: 200
  };
};

// Generate forecast data
const generateForecastData = (city, days = 5) => {
  const forecast = {
    city: {
      id: randomInt(100000, 999999),
      name: city.name,
      coord: {
        lon: city.lon,
        lat: city.lat
      },
      country: city.country,
      population: randomInt(500000, 15000000),
      timezone: randomInt(-43200, 43200)
    },
    cod: "200",
    message: 0.0036,
    cnt: days,
    list: []
  };
  
  // Generate base temperature pattern based on latitude
  const baseTemp = 25 - Math.abs(city.lat) * 0.5;
  
  // Generate forecast entries
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const forecastDate = new Date(today);
    forecastDate.setDate(today.getDate() + i);
    
    // Add random temperature variation to the base
    const dayTemp = baseTemp + randomInt(-8, 8);
    
    // Create forecast entry
    const entry = {
      dt: Math.floor(forecastDate.getTime() / 1000),
      sunrise: Math.floor(forecastDate.setHours(6, randomInt(0, 59)) / 1000),
      sunset: Math.floor(forecastDate.setHours(18, randomInt(0, 59)) / 1000),
      temp: {
        day: parseFloat((dayTemp).toFixed(2)),
        min: parseFloat((dayTemp - randomInt(2, 6)).toFixed(2)),
        max: parseFloat((dayTemp + randomInt(2, 6)).toFixed(2)),
        night: parseFloat((dayTemp - randomInt(5, 10)).toFixed(2)),
        eve: parseFloat((dayTemp - randomInt(1, 3)).toFixed(2)),
        morn: parseFloat((dayTemp - randomInt(3, 7)).toFixed(2))
      },
      feels_like: {
        day: parseFloat((dayTemp + randomInt(-2, 2)).toFixed(2)),
        night: parseFloat((dayTemp - randomInt(5, 12)).toFixed(2)),
        eve: parseFloat((dayTemp - randomInt(1, 5)).toFixed(2)),
        morn: parseFloat((dayTemp - randomInt(3, 9)).toFixed(2))
      },
      pressure: randomInt(980, 1040),
      humidity: randomInt(20, 95),
      weather: [getRandomItem(weatherConditions)],
      speed: randomInt(0, 25),
      deg: randomInt(0, 359),
      clouds: randomInt(0, 100),
      pop: parseFloat((Math.random()).toFixed(2))
    };
    
    forecast.list.push(entry);
  }
  
  return forecast;
};

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
    const cityName = req.query.city || req.query.q;
    const lat = parseFloat(req.query.lat) || null;
    const lon = parseFloat(req.query.lon) || null;
    const forecast = req.query.forecast === 'true'; // Check if forecast is requested
    const days = parseInt(req.query.days) || 5; // Number of forecast days
    
    // Find the city or use a random one
    let city;
    
    if (cityName) {
      city = cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
    } else if (lat !== null && lon !== null) {
      // Find the closest city if lat/lon provided (simple implementation)
      city = cities.reduce((closest, current) => {
        const currentDist = Math.sqrt(
          Math.pow(current.lat - lat, 2) + Math.pow(current.lon - lon, 2)
        );
        const closestDist = Math.sqrt(
          Math.pow(closest.lat - lat, 2) + Math.pow(closest.lon - lon, 2)
        );
        return currentDist < closestDist ? current : closest;
      });
    } else {
      // No params, use random city
      city = getRandomItem(cities);
    }
    
    // If city not found, return error
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }
    
    // Return either current weather or forecast
    if (forecast) {
      return res.status(200).json(generateForecastData(city, days));
    } else {
      return res.status(200).json(generateWeatherData(city));
    }
  } catch (error) {
    console.error('Error generating weather data:', error);
    return res.status(500).json({ error: 'Failed to generate weather data' });
  }
}