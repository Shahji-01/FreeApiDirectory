// Advanced Weather Forecast API
export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { city, days = 5, units = 'metric' } = req.query;
      
      if (!city) {
        return res.status(400).json({ 
          error: 'City parameter is required' 
        });
      }
      
      // Validate parameters
      const forecastDays = parseInt(days);
      if (isNaN(forecastDays) || forecastDays < 1 || forecastDays > 7) {
        return res.status(400).json({ 
          error: 'Days parameter must be a number between 1 and 7' 
        });
      }
      
      if (!['metric', 'imperial'].includes(units)) {
        return res.status(400).json({ 
          error: 'Units parameter must be either "metric" or "imperial"' 
        });
      }
      
      // Generate weather forecast data
      const forecast = generateWeatherForecast(city, forecastDays, units);
      
      return res.status(200).json({
        success: true,
        data: forecast
      });
    } catch (error) {
      return res.status(500).json({ 
        error: 'Weather forecast generation failed',
        details: error.message
      });
    }
  } else {
    // Return API documentation for non-GET requests
    return res.status(200).json({
      endpoint: '/api/services/weather-forecast',
      description: 'Provides weather forecast data for a specified city',
      method: 'GET',
      parameters: {
        city: 'String. Required. The name of the city to get weather forecast for.',
        days: 'Number. Optional. Number of days in the forecast (1-7, default: 5).',
        units: 'String. Optional. Units of measurement ("metric" or "imperial", default: "metric").'
      },
      example: {
        request: 'GET /api/services/weather-forecast?city=London&days=3&units=metric',
        response: {
          success: true,
          data: {
            city: 'London',
            country: 'UK',
            units: 'metric',
            current: {
              temp: 15,
              feels_like: 14,
              humidity: 76,
              wind_speed: 12,
              condition: 'Cloudy',
              icon: '☁️'
            },
            forecast: [
              {
                date: '2023-05-19',
                day: 'Friday',
                high: 17,
                low: 12,
                condition: 'Partly Cloudy',
                icon: '⛅',
                chance_of_rain: 30,
                humidity: 75,
                wind_speed: 10
              },
              /* Additional days... */
            ]
          }
        }
      }
    });
  }
}

// Generate mock weather forecast data
function generateWeatherForecast(city, days, units) {
  // This is a demo function that returns realistic but randomized weather data
  // In a real application, you would call a weather API
  
  // Mapping of cities to countries and climate types
  const cityInfo = {
    'london': { name: 'London', country: 'UK', climate: 'temperate' },
    'new york': { name: 'New York', country: 'USA', climate: 'continental' },
    'tokyo': { name: 'Tokyo', country: 'Japan', climate: 'humid' },
    'paris': { name: 'Paris', country: 'France', climate: 'temperate' },
    'sydney': { name: 'Sydney', country: 'Australia', climate: 'subtropical' },
    'dubai': { name: 'Dubai', country: 'UAE', climate: 'desert' },
    'moscow': { name: 'Moscow', country: 'Russia', climate: 'continental' },
    'rio de janeiro': { name: 'Rio de Janeiro', country: 'Brazil', climate: 'tropical' },
    'cairo': { name: 'Cairo', country: 'Egypt', climate: 'desert' },
    'cape town': { name: 'Cape Town', country: 'South Africa', climate: 'mediterranean' }
  };
  
  // Normalize city name for lookup
  const normalizedCity = city.toLowerCase();
  
  // Get city info or use default
  const info = cityInfo[normalizedCity] || { 
    name: capitalizeWords(city), 
    country: 'Unknown', 
    climate: 'temperate' 
  };
  
  // Generate current weather based on climate
  const current = generateCurrentWeather(info.climate, units);
  
  // Generate daily forecasts
  const forecast = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const forecastDate = new Date(today);
    forecastDate.setDate(today.getDate() + i);
    
    const dayForecast = generateDailyForecast(
      info.climate,
      forecastDate,
      current,
      units,
      i === 0 // If first day, base it more closely on current conditions
    );
    
    forecast.push(dayForecast);
  }
  
  return {
    city: info.name,
    country: info.country,
    coordinates: {
      latitude: getRandomNumber(-90, 90, 6),
      longitude: getRandomNumber(-180, 180, 6)
    },
    units,
    current,
    forecast
  };
}

// Generate current weather conditions
function generateCurrentWeather(climate, units) {
  // Temperature ranges by climate (in Celsius)
  const tempRanges = {
    'temperate': { min: 5, max: 25 },
    'continental': { min: -5, max: 30 },
    'humid': { min: 15, max: 35 },
    'subtropical': { min: 15, max: 35 },
    'desert': { min: 20, max: 45 },
    'tropical': { min: 20, max: 35 },
    'mediterranean': { min: 10, max: 35 }
  };
  
  // Get temperature range for climate or use default temperate
  const range = tempRanges[climate] || tempRanges.temperate;
  
  // Generate temperature in Celsius
  let temp = getRandomNumber(range.min, range.max);
  
  // Weather conditions and their probability by climate
  const conditionsByClimate = {
    'temperate': [
      { condition: 'Sunny', icon: '☀️', probability: 0.3 },
      { condition: 'Partly Cloudy', icon: '⛅', probability: 0.4 },
      { condition: 'Cloudy', icon: '☁️', probability: 0.2 },
      { condition: 'Rainy', icon: '🌧️', probability: 0.1 }
    ],
    'continental': [
      { condition: 'Sunny', icon: '☀️', probability: 0.4 },
      { condition: 'Partly Cloudy', icon: '⛅', probability: 0.3 },
      { condition: 'Cloudy', icon: '☁️', probability: 0.1 },
      { condition: 'Rainy', icon: '🌧️', probability: 0.1 },
      { condition: 'Snowy', icon: '❄️', probability: temp < 2 ? 0.1 : 0 }
    ],
    'humid': [
      { condition: 'Sunny', icon: '☀️', probability: 0.2 },
      { condition: 'Partly Cloudy', icon: '⛅', probability: 0.3 },
      { condition: 'Cloudy', icon: '☁️', probability: 0.2 },
      { condition: 'Rainy', icon: '🌧️', probability: 0.3 }
    ],
    'subtropical': [
      { condition: 'Sunny', icon: '☀️', probability: 0.5 },
      { condition: 'Partly Cloudy', icon: '⛅', probability: 0.3 },
      { condition: 'Cloudy', icon: '☁️', probability: 0.1 },
      { condition: 'Rainy', icon: '🌧️', probability: 0.1 }
    ],
    'desert': [
      { condition: 'Sunny', icon: '☀️', probability: 0.8 },
      { condition: 'Partly Cloudy', icon: '⛅', probability: 0.15 },
      { condition: 'Cloudy', icon: '☁️', probability: 0.04 },
      { condition: 'Rainy', icon: '🌧️', probability: 0.01 }
    ],
    'tropical': [
      { condition: 'Sunny', icon: '☀️', probability: 0.4 },
      { condition: 'Partly Cloudy', icon: '⛅', probability: 0.3 },
      { condition: 'Cloudy', icon: '☁️', probability: 0.1 },
      { condition: 'Rainy', icon: '🌧️', probability: 0.2 }
    ],
    'mediterranean': [
      { condition: 'Sunny', icon: '☀️', probability: 0.6 },
      { condition: 'Partly Cloudy', icon: '⛅', probability: 0.3 },
      { condition: 'Cloudy', icon: '☁️', probability: 0.05 },
      { condition: 'Rainy', icon: '🌧️', probability: 0.05 }
    ]
  };
  
  // Get conditions for climate or use default temperate
  const conditions = conditionsByClimate[climate] || conditionsByClimate.temperate;
  
  // Select a weather condition based on probability
  const condition = selectByProbability(conditions);
  
  // Generate other weather attributes
  const humidity = condition.condition === 'Rainy' 
    ? getRandomNumber(70, 95) 
    : getRandomNumber(40, 80);
    
  const wind_speed = getRandomNumber(0, 25);
  const feels_like = adjustFeelsLike(temp, humidity, wind_speed);
  
  // Convert to imperial if needed
  if (units === 'imperial') {
    temp = celsiusToFahrenheit(temp);
    feels_like = celsiusToFahrenheit(feels_like);
  }
  
  return {
    temp: Math.round(temp),
    feels_like: Math.round(feels_like),
    humidity,
    wind_speed: Math.round(wind_speed),
    condition: condition.condition,
    icon: condition.icon,
    description: generateWeatherDescription(condition.condition, Math.round(temp), units)
  };
}

// Generate forecast for a specific day
function generateDailyForecast(climate, date, currentConditions, units, isToday) {
  // Format the date
  const dateString = formatDate(date);
  const dayName = getDayName(date);
  
  // Base the forecast on current conditions if it's today
  let high, low, baseCondition;
  
  if (isToday) {
    // For today, use current conditions as a base
    const currentTemp = units === 'imperial' 
      ? fahrenheitToCelsius(currentConditions.temp) 
      : currentConditions.temp;
      
    high = currentTemp + getRandomNumber(1, 4);
    low = currentTemp - getRandomNumber(3, 7);
    baseCondition = currentConditions.condition;
  } else {
    // For future days, generate new conditions based on climate
    // Temperature ranges by climate (in Celsius)
    const tempRanges = {
      'temperate': { min: 5, max: 25 },
      'continental': { min: -5, max: 30 },
      'humid': { min: 15, max: 35 },
      'subtropical': { min: 15, max: 35 },
      'desert': { min: 20, max: 45 },
      'tropical': { min: 20, max: 35 },
      'mediterranean': { min: 10, max: 35 }
    };
    
    const range = tempRanges[climate] || tempRanges.temperate;
    high = getRandomNumber(range.min + 5, range.max);
    low = high - getRandomNumber(5, 12);
    
    // Weather conditions by climate
    const conditionsByClimate = {
      'temperate': ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'],
      'continental': ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Snowy'],
      'humid': ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'],
      'subtropical': ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'],
      'desert': ['Sunny', 'Partly Cloudy'],
      'tropical': ['Sunny', 'Partly Cloudy', 'Rainy'],
      'mediterranean': ['Sunny', 'Partly Cloudy']
    };
    
    const conditions = conditionsByClimate[climate] || conditionsByClimate.temperate;
    baseCondition = conditions[Math.floor(Math.random() * conditions.length)];
  }
  
  // Get icon for condition
  const icons = {
    'Sunny': '☀️',
    'Partly Cloudy': '⛅',
    'Cloudy': '☁️',
    'Rainy': '🌧️',
    'Snowy': '❄️'
  };
  
  // Generate chance of rain based on condition
  const chanceOfRain = {
    'Sunny': getRandomNumber(0, 10),
    'Partly Cloudy': getRandomNumber(10, 30),
    'Cloudy': getRandomNumber(20, 50),
    'Rainy': getRandomNumber(60, 100),
    'Snowy': getRandomNumber(20, 40)
  };
  
  // Generate humidity based on condition
  const humidity = {
    'Sunny': getRandomNumber(30, 60),
    'Partly Cloudy': getRandomNumber(40, 70),
    'Cloudy': getRandomNumber(50, 80),
    'Rainy': getRandomNumber(70, 95),
    'Snowy': getRandomNumber(60, 90)
  };
  
  // Generate wind speed
  const windSpeed = getRandomNumber(0, 25);
  
  // Convert to imperial if needed
  if (units === 'imperial') {
    high = celsiusToFahrenheit(high);
    low = celsiusToFahrenheit(low);
  }
  
  return {
    date: dateString,
    day: dayName,
    high: Math.round(high),
    low: Math.round(low),
    condition: baseCondition,
    icon: icons[baseCondition] || '☀️',
    chance_of_rain: chanceOfRain[baseCondition] || 0,
    humidity: humidity[baseCondition] || 50,
    wind_speed: Math.round(windSpeed),
    description: generateWeatherDescription(baseCondition, Math.round(high), units)
  };
}

// Helper function to get a random number within a range
function getRandomNumber(min, max, decimals = 0) {
  const random = Math.random() * (max - min) + min;
  return decimals === 0 ? Math.floor(random) : parseFloat(random.toFixed(decimals));
}

// Helper function to select weather condition by probability
function selectByProbability(items) {
  const rand = Math.random();
  let cumulativeProbability = 0;
  
  for (const item of items) {
    cumulativeProbability += item.probability;
    if (rand < cumulativeProbability) {
      return item;
    }
  }
  
  // Fallback to first item if none selected
  return items[0];
}

// Helper function to adjust feels like temperature
function adjustFeelsLike(temp, humidity, windSpeed) {
  // Simple feels like temperature calculation
  // In reality, this would use more complex formulas like heat index and wind chill
  if (temp > 25) {
    // Hot weather: consider humidity (heat index simplified)
    return temp + (humidity > 60 ? (humidity - 60) / 10 : 0);
  } else if (temp < 10 && windSpeed > 5) {
    // Cold weather with wind: consider wind chill (simplified)
    return temp - (windSpeed / 5);
  }
  // Moderate temperature: minimal adjustment
  return temp;
}

// Helper function to convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

// Helper function to convert Fahrenheit to Celsius
function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}

// Helper function to format date as YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Helper function to get day name
function getDayName(date) {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

// Helper function to capitalize words
function capitalizeWords(str) {
  return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Generate a human-readable weather description
function generateWeatherDescription(condition, temp, units) {
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const tempDescriptions = {
    'imperial': {
      freezing: 32,
      cold: 50,
      cool: 60,
      mild: 70,
      warm: 80,
      hot: 90
    },
    'metric': {
      freezing: 0,
      cold: 10,
      cool: 15,
      mild: 20,
      warm: 25,
      hot: 30
    }
  };
  
  const thresholds = tempDescriptions[units];
  
  let tempDescription;
  if (temp <= thresholds.freezing) tempDescription = 'freezing';
  else if (temp <= thresholds.cold) tempDescription = 'cold';
  else if (temp <= thresholds.cool) tempDescription = 'cool';
  else if (temp <= thresholds.mild) tempDescription = 'mild';
  else if (temp <= thresholds.warm) tempDescription = 'warm';
  else if (temp <= thresholds.hot) tempDescription = 'hot';
  else tempDescription = 'very hot';
  
  const descriptions = {
    'Sunny': [
      `A ${tempDescription} day with clear skies and plenty of sunshine.`,
      `Expect bright sunshine and ${tempDescription} temperatures around ${temp}${tempUnit}.`,
      `Clear skies and sunshine with ${tempDescription} weather.`
    ],
    'Partly Cloudy': [
      `${capitalizeWords(tempDescription)} with a mix of sun and clouds throughout the day.`,
      `Partly cloudy skies with temperatures around ${temp}${tempUnit}.`,
      `Some clouds expected, but still a ${tempDescription} day overall.`
    ],
    'Cloudy': [
      `Mostly cloudy conditions with ${tempDescription} temperatures reaching ${temp}${tempUnit}.`,
      `Overcast skies with ${tempDescription} weather throughout the day.`,
      `Expect cloudy skies and ${tempDescription} conditions.`
    ],
    'Rainy': [
      `Periods of rain with ${tempDescription} temperatures around ${temp}${tempUnit}.`,
      `Expect rainfall and ${tempDescription} conditions throughout the day.`,
      `A rainy day with ${tempDescription} temperatures.`
    ],
    'Snowy': [
      `Snow expected with ${tempDescription} temperatures around ${temp}${tempUnit}.`,
      `A snowy day with ${tempDescription} conditions.`,
      `Expect snowfall and ${tempDescription} temperatures.`
    ]
  };
  
  const options = descriptions[condition] || descriptions.Sunny;
  return options[Math.floor(Math.random() * options.length)];
}