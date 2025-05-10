// Custom Countries API - Provides detailed information about countries

// Country data with basic information
const countries = [
  {
    name: "United States",
    code: "US",
    capital: "Washington, D.C.",
    region: "Americas",
    subregion: "North America",
    population: 331002651,
    area: 9833517,
    languages: [
      { name: "English", iso639_1: "en" }
    ],
    currencies: [
      { code: "USD", name: "United States Dollar", symbol: "$" }
    ],
    flag: "🇺🇸",
    timezones: ["UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", "UTC-08:00", "UTC-07:00", "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC+10:00", "UTC+12:00"],
    continents: ["North America"],
    borders: ["CAN", "MEX"],
    independent: true
  },
  {
    name: "United Kingdom",
    code: "GB",
    capital: "London",
    region: "Europe",
    subregion: "Northern Europe",
    population: 67886011,
    area: 242900,
    languages: [
      { name: "English", iso639_1: "en" }
    ],
    currencies: [
      { code: "GBP", name: "British Pound", symbol: "£" }
    ],
    flag: "🇬🇧",
    timezones: ["UTC-08:00", "UTC-05:00", "UTC-04:00", "UTC-03:00", "UTC-02:00", "UTC", "UTC+01:00", "UTC+02:00", "UTC+06:00"],
    continents: ["Europe"],
    borders: ["IRL"],
    independent: true
  },
  {
    name: "Germany",
    code: "DE",
    capital: "Berlin",
    region: "Europe",
    subregion: "Western Europe",
    population: 83783942,
    area: 357114,
    languages: [
      { name: "German", iso639_1: "de" }
    ],
    currencies: [
      { code: "EUR", name: "Euro", symbol: "€" }
    ],
    flag: "🇩🇪",
    timezones: ["UTC+01:00"],
    continents: ["Europe"],
    borders: ["AUT", "BEL", "CZE", "DNK", "FRA", "LUX", "NLD", "POL", "CHE"],
    independent: true
  },
  {
    name: "Japan",
    code: "JP",
    capital: "Tokyo",
    region: "Asia",
    subregion: "Eastern Asia",
    population: 126476461,
    area: 377930,
    languages: [
      { name: "Japanese", iso639_1: "ja" }
    ],
    currencies: [
      { code: "JPY", name: "Japanese Yen", symbol: "¥" }
    ],
    flag: "🇯🇵",
    timezones: ["UTC+09:00"],
    continents: ["Asia"],
    borders: [],
    independent: true
  },
  {
    name: "Australia",
    code: "AU",
    capital: "Canberra",
    region: "Oceania",
    subregion: "Australia and New Zealand",
    population: 25499884,
    area: 7692024,
    languages: [
      { name: "English", iso639_1: "en" }
    ],
    currencies: [
      { code: "AUD", name: "Australian Dollar", symbol: "$" }
    ],
    flag: "🇦🇺",
    timezones: ["UTC+05:00", "UTC+06:30", "UTC+07:00", "UTC+08:00", "UTC+09:30", "UTC+10:00", "UTC+10:30", "UTC+11:30"],
    continents: ["Oceania"],
    borders: [],
    independent: true
  },
  {
    name: "Brazil",
    code: "BR",
    capital: "Brasília",
    region: "Americas",
    subregion: "South America",
    population: 212559417,
    area: 8515767,
    languages: [
      { name: "Portuguese", iso639_1: "pt" }
    ],
    currencies: [
      { code: "BRL", name: "Brazilian Real", symbol: "R$" }
    ],
    flag: "🇧🇷",
    timezones: ["UTC-05:00", "UTC-04:00", "UTC-03:00", "UTC-02:00"],
    continents: ["South America"],
    borders: ["ARG", "BOL", "COL", "GUF", "GUY", "PRY", "PER", "SUR", "URY", "VEN"],
    independent: true
  },
  {
    name: "China",
    code: "CN",
    capital: "Beijing",
    region: "Asia",
    subregion: "Eastern Asia",
    population: 1402112000,
    area: 9640011,
    languages: [
      { name: "Chinese", iso639_1: "zh" }
    ],
    currencies: [
      { code: "CNY", name: "Chinese Yuan", symbol: "¥" }
    ],
    flag: "🇨🇳",
    timezones: ["UTC+08:00"],
    continents: ["Asia"],
    borders: ["AFG", "BTN", "MMR", "HKG", "IND", "KAZ", "NPL", "PRK", "KGZ", "LAO", "MAC", "MNG", "PAK", "RUS", "TJK", "VNM"],
    independent: true
  },
  {
    name: "India",
    code: "IN",
    capital: "New Delhi",
    region: "Asia",
    subregion: "Southern Asia",
    population: 1380004385,
    area: 3287590,
    languages: [
      { name: "Hindi", iso639_1: "hi" },
      { name: "English", iso639_1: "en" }
    ],
    currencies: [
      { code: "INR", name: "Indian Rupee", symbol: "₹" }
    ],
    flag: "🇮🇳",
    timezones: ["UTC+05:30"],
    continents: ["Asia"],
    borders: ["AFG", "BGD", "BTN", "MMR", "CHN", "NPL", "PAK", "LKA"],
    independent: true
  },
  {
    name: "France",
    code: "FR",
    capital: "Paris",
    region: "Europe",
    subregion: "Western Europe",
    population: 65273511,
    area: 551695,
    languages: [
      { name: "French", iso639_1: "fr" }
    ],
    currencies: [
      { code: "EUR", name: "Euro", symbol: "€" }
    ],
    flag: "🇫🇷",
    timezones: ["UTC-10:00", "UTC-09:30", "UTC-09:00", "UTC-08:00", "UTC-04:00", "UTC-03:00", "UTC+01:00", "UTC+02:00", "UTC+03:00", "UTC+04:00", "UTC+05:00", "UTC+10:00", "UTC+11:00", "UTC+12:00"],
    continents: ["Europe"],
    borders: ["AND", "BEL", "DEU", "ITA", "LUX", "MCO", "ESP", "CHE"],
    independent: true
  },
  {
    name: "South Africa",
    code: "ZA",
    capital: "Pretoria",
    region: "Africa",
    subregion: "Southern Africa",
    population: 59308690,
    area: 1221037,
    languages: [
      { name: "Afrikaans", iso639_1: "af" },
      { name: "English", iso639_1: "en" },
      { name: "Zulu", iso639_1: "zu" }
    ],
    currencies: [
      { code: "ZAR", name: "South African Rand", symbol: "R" }
    ],
    flag: "🇿🇦",
    timezones: ["UTC+02:00"],
    continents: ["Africa"],
    borders: ["BWA", "LSO", "MOZ", "NAM", "SWZ", "ZWE"],
    independent: true
  },
  {
    name: "Mexico",
    code: "MX",
    capital: "Mexico City",
    region: "Americas",
    subregion: "North America",
    population: 128932753,
    area: 1964375,
    languages: [
      { name: "Spanish", iso639_1: "es" }
    ],
    currencies: [
      { code: "MXN", name: "Mexican Peso", symbol: "$" }
    ],
    flag: "🇲🇽",
    timezones: ["UTC-08:00", "UTC-07:00", "UTC-06:00"],
    continents: ["North America"],
    borders: ["BLZ", "GTM", "USA"],
    independent: true
  },
  {
    name: "Russia",
    code: "RU",
    capital: "Moscow",
    region: "Europe",
    subregion: "Eastern Europe",
    population: 144104080,
    area: 17098242,
    languages: [
      { name: "Russian", iso639_1: "ru" }
    ],
    currencies: [
      { code: "RUB", name: "Russian Ruble", symbol: "₽" }
    ],
    flag: "🇷🇺",
    timezones: ["UTC+02:00", "UTC+03:00", "UTC+04:00", "UTC+05:00", "UTC+06:00", "UTC+07:00", "UTC+08:00", "UTC+09:00", "UTC+10:00", "UTC+11:00", "UTC+12:00"],
    continents: ["Europe", "Asia"],
    borders: ["AZE", "BLR", "CHN", "EST", "FIN", "GEO", "KAZ", "PRK", "LVA", "LTU", "MNG", "NOR", "POL", "UKR"],
    independent: true
  },
  {
    name: "Canada",
    code: "CA",
    capital: "Ottawa",
    region: "Americas",
    subregion: "North America",
    population: 38005238,
    area: 9984670,
    languages: [
      { name: "English", iso639_1: "en" },
      { name: "French", iso639_1: "fr" }
    ],
    currencies: [
      { code: "CAD", name: "Canadian Dollar", symbol: "$" }
    ],
    flag: "🇨🇦",
    timezones: ["UTC-08:00", "UTC-07:00", "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC-03:30"],
    continents: ["North America"],
    borders: ["USA"],
    independent: true
  },
  {
    name: "Egypt",
    code: "EG",
    capital: "Cairo",
    region: "Africa",
    subregion: "Northern Africa",
    population: 102334404,
    area: 1002450,
    languages: [
      { name: "Arabic", iso639_1: "ar" }
    ],
    currencies: [
      { code: "EGP", name: "Egyptian Pound", symbol: "£" }
    ],
    flag: "🇪🇬",
    timezones: ["UTC+02:00"],
    continents: ["Africa", "Asia"],
    borders: ["ISR", "LBY", "SDN"],
    independent: true
  },
  {
    name: "Italy",
    code: "IT",
    capital: "Rome",
    region: "Europe",
    subregion: "Southern Europe",
    population: 59554023,
    area: 301336,
    languages: [
      { name: "Italian", iso639_1: "it" }
    ],
    currencies: [
      { code: "EUR", name: "Euro", symbol: "€" }
    ],
    flag: "🇮🇹",
    timezones: ["UTC+01:00"],
    continents: ["Europe"],
    borders: ["AUT", "FRA", "SMR", "SVN", "CHE", "VAT"],
    independent: true
  },
  {
    name: "New Zealand",
    code: "NZ",
    capital: "Wellington",
    region: "Oceania",
    subregion: "Australia and New Zealand",
    population: 5084300,
    area: 270467,
    languages: [
      { name: "English", iso639_1: "en" },
      { name: "Māori", iso639_1: "mi" }
    ],
    currencies: [
      { code: "NZD", name: "New Zealand Dollar", symbol: "$" }
    ],
    flag: "🇳🇿",
    timezones: ["UTC-11:00", "UTC-10:00", "UTC+12:00", "UTC+12:45", "UTC+13:00"],
    continents: ["Oceania"],
    borders: [],
    independent: true
  }
];

// Extract all regions
const getAllRegions = () => {
  const regions = new Set();
  countries.forEach(country => {
    regions.add(country.region);
  });
  return Array.from(regions);
};

// Extract all subregions
const getAllSubregions = () => {
  const subregions = new Set();
  countries.forEach(country => {
    subregions.add(country.subregion);
  });
  return Array.from(subregions);
};

// Extract all languages
const getAllLanguages = () => {
  const languageSet = new Set();
  countries.forEach(country => {
    country.languages.forEach(lang => {
      languageSet.add(lang.name);
    });
  });
  return Array.from(languageSet).sort();
};

// Extract all currencies
const getAllCurrencies = () => {
  const currencySet = new Set();
  countries.forEach(country => {
    country.currencies.forEach(currency => {
      currencySet.add(currency.name);
    });
  });
  return Array.from(currencySet).sort();
};

// Filter countries by various criteria
const filterCountries = (query) => {
  let result = [...countries];
  
  // Filter by name
  if (query.name) {
    const nameQuery = query.name.toLowerCase();
    result = result.filter(country => 
      country.name.toLowerCase().includes(nameQuery)
    );
  }
  
  // Filter by country code
  if (query.code) {
    const codeQuery = query.code.toUpperCase();
    result = result.filter(country => 
      country.code === codeQuery
    );
  }
  
  // Filter by region
  if (query.region) {
    const regionQuery = query.region.toLowerCase();
    result = result.filter(country => 
      country.region.toLowerCase().includes(regionQuery)
    );
  }
  
  // Filter by subregion
  if (query.subregion) {
    const subregionQuery = query.subregion.toLowerCase();
    result = result.filter(country => 
      country.subregion.toLowerCase().includes(subregionQuery)
    );
  }
  
  // Filter by language
  if (query.language) {
    const languageQuery = query.language.toLowerCase();
    result = result.filter(country => 
      country.languages.some(lang => 
        lang.name.toLowerCase().includes(languageQuery)
      )
    );
  }
  
  // Filter by currency
  if (query.currency) {
    const currencyQuery = query.currency.toLowerCase();
    result = result.filter(country => 
      country.currencies.some(curr => 
        curr.name.toLowerCase().includes(currencyQuery) || 
        curr.code.toLowerCase().includes(currencyQuery)
      )
    );
  }
  
  // Filter by population range
  if (query.minPopulation) {
    const minPop = parseInt(query.minPopulation);
    if (!isNaN(minPop)) {
      result = result.filter(country => country.population >= minPop);
    }
  }
  
  if (query.maxPopulation) {
    const maxPop = parseInt(query.maxPopulation);
    if (!isNaN(maxPop)) {
      result = result.filter(country => country.population <= maxPop);
    }
  }
  
  return result;
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
    // Check if metadata is requested
    if (req.query.metadata === 'true') {
      return res.status(200).json({
        totalCountries: countries.length,
        regions: getAllRegions(),
        subregions: getAllSubregions(),
        languages: getAllLanguages(),
        currencies: getAllCurrencies()
      });
    }
    
    // Handle lookup by country code
    if (req.query.code) {
      const countryCode = req.query.code.toUpperCase();
      const country = countries.find(c => c.code === countryCode);
      
      if (!country) {
        return res.status(404).json({ error: 'Country not found' });
      }
      
      return res.status(200).json(country);
    }
    
    // Filter countries based on query parameters
    const filteredCountries = filterCountries(req.query);
    
    // Return the results
    return res.status(200).json({
      count: filteredCountries.length,
      countries: filteredCountries
    });
  } catch (error) {
    console.error('Error handling countries request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}