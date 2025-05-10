// Custom Cryptocurrency API - Provides cryptocurrency price data for testing and prototyping

// Function to generate a random float between min and max
const randomFloat = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(8));

// Function to generate a random integer between min and max
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to get a random item from an array
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Cryptocurrency data
const cryptocurrencies = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    currentPrice: 50000,
    priceChangeRange: 0.05, // 5% daily fluctuation
    marketCap: 950000000000,
    marketCapRank: 1,
    fullyDilutedValuation: 1050000000000,
    totalVolume: 30000000000,
    high24h: 51000,
    low24h: 49000,
    priceChange24h: 500,
    priceChangePercentage24h: 1,
    marketCapChange24h: 10000000000,
    marketCapChangePercentage24h: 1.05,
    circulatingSupply: 19000000,
    totalSupply: 21000000,
    maxSupply: 21000000,
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    currentPrice: 3000,
    priceChangeRange: 0.07, // 7% daily fluctuation
    marketCap: 360000000000,
    marketCapRank: 2,
    fullyDilutedValuation: 360000000000,
    totalVolume: 20000000000,
    high24h: 3100,
    low24h: 2900,
    priceChange24h: 50,
    priceChangePercentage24h: 1.67,
    marketCapChange24h: 6000000000,
    marketCapChangePercentage24h: 1.69,
    circulatingSupply: 120000000,
    totalSupply: 0,
    maxSupply: 0,
  },
  {
    id: 'tether',
    symbol: 'usdt',
    name: 'Tether',
    image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
    currentPrice: 1,
    priceChangeRange: 0.005, // 0.5% daily fluctuation
    marketCap: 95000000000,
    marketCapRank: 3,
    fullyDilutedValuation: 0,
    totalVolume: 80000000000,
    high24h: 1.005,
    low24h: 0.995,
    priceChange24h: 0.001,
    priceChangePercentage24h: 0.1,
    marketCapChange24h: 100000000,
    marketCapChangePercentage24h: 0.1,
    circulatingSupply: 95000000000,
    totalSupply: 95000000000,
    maxSupply: 0,
  },
  {
    id: 'binancecoin',
    symbol: 'bnb',
    name: 'BNB',
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    currentPrice: 300,
    priceChangeRange: 0.06, // 6% daily fluctuation
    marketCap: 45000000000,
    marketCapRank: 4,
    fullyDilutedValuation: 0,
    totalVolume: 1500000000,
    high24h: 310,
    low24h: 290,
    priceChange24h: 5,
    priceChangePercentage24h: 1.69,
    marketCapChange24h: 750000000,
    marketCapChangePercentage24h: 1.69,
    circulatingSupply: 150000000,
    totalSupply: 150000000,
    maxSupply: 0,
  },
  {
    id: 'ripple',
    symbol: 'xrp',
    name: 'XRP',
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    currentPrice: 0.5,
    priceChangeRange: 0.08, // 8% daily fluctuation
    marketCap: 27000000000,
    marketCapRank: 5,
    fullyDilutedValuation: 50000000000,
    totalVolume: 1000000000,
    high24h: 0.52,
    low24h: 0.48,
    priceChange24h: 0.01,
    priceChangePercentage24h: 2,
    marketCapChange24h: 500000000,
    marketCapChangePercentage24h: 1.89,
    circulatingSupply: 54000000000,
    totalSupply: 100000000000,
    maxSupply: 100000000000,
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    currentPrice: 0.3,
    priceChangeRange: 0.09, // 9% daily fluctuation
    marketCap: 10500000000,
    marketCapRank: 8,
    fullyDilutedValuation: 13500000000,
    totalVolume: 200000000,
    high24h: 0.32,
    low24h: 0.28,
    priceChange24h: 0.02,
    priceChangePercentage24h: 6.67,
    marketCapChange24h: 700000000,
    marketCapChangePercentage24h: 6.67,
    circulatingSupply: 35000000000,
    totalSupply: 45000000000,
    maxSupply: 45000000000,
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    currentPrice: 100,
    priceChangeRange: 0.1, // 10% daily fluctuation
    marketCap: 42500000000,
    marketCapRank: 6,
    fullyDilutedValuation: 55000000000,
    totalVolume: 2500000000,
    high24h: 105,
    low24h: 95,
    priceChange24h: 7,
    priceChangePercentage24h: 7,
    marketCapChange24h: 2900000000,
    marketCapChangePercentage24h: 6.82,
    circulatingSupply: 425000000,
    totalSupply: 550000000,
    maxSupply: 0,
  },
  {
    id: 'dogecoin',
    symbol: 'doge',
    name: 'Dogecoin',
    image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
    currentPrice: 0.07,
    priceChangeRange: 0.15, // 15% daily fluctuation
    marketCap: 9800000000,
    marketCapRank: 9,
    fullyDilutedValuation: 0,
    totalVolume: 500000000,
    high24h: 0.075,
    low24h: 0.065,
    priceChange24h: 0.005,
    priceChangePercentage24h: 7.14,
    marketCapChange24h: 700000000,
    marketCapChangePercentage24h: 7.14,
    circulatingSupply: 140000000000,
    totalSupply: 0,
    maxSupply: 0,
  },
  {
    id: 'polkadot',
    symbol: 'dot',
    name: 'Polkadot',
    image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
    currentPrice: 5,
    priceChangeRange: 0.09, // 9% daily fluctuation
    marketCap: 6300000000,
    marketCapRank: 12,
    fullyDilutedValuation: 0,
    totalVolume: 150000000,
    high24h: 5.2,
    low24h: 4.8,
    priceChange24h: 0.15,
    priceChangePercentage24h: 3,
    marketCapChange24h: 185000000,
    marketCapChangePercentage24h: 3,
    circulatingSupply: 1260000000,
    totalSupply: 0,
    maxSupply: 0,
  },
  {
    id: 'matic-network',
    symbol: 'matic',
    name: 'Polygon',
    image: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
    currentPrice: 0.7,
    priceChangeRange: 0.11, // 11% daily fluctuation
    marketCap: 6800000000,
    marketCapRank: 11,
    fullyDilutedValuation: 7000000000,
    totalVolume: 300000000,
    high24h: 0.74,
    low24h: 0.67,
    priceChange24h: 0.04,
    priceChangePercentage24h: 6.06,
    marketCapChange24h: 370000000,
    marketCapChangePercentage24h: 5.76,
    circulatingSupply: 9750000000,
    totalSupply: 10000000000,
    maxSupply: 10000000000,
  }
];

// Generate current cryptocurrency price data
const generateCryptoPriceData = (crypto, vs_currency = 'usd') => {
  // Generate price fluctuation based on the coin's volatility
  const priceChangePercent = randomFloat(-crypto.priceChangeRange, crypto.priceChangeRange);
  const newPrice = crypto.currentPrice * (1 + priceChangePercent);
  const priceChange = newPrice - crypto.currentPrice;
  
  // Generate 24h high and low based on the new price
  const high24h = newPrice * (1 + randomFloat(0, 0.05));
  const low24h = newPrice * (1 - randomFloat(0, 0.05));
  
  // Update market cap based on price change
  const marketCap = crypto.marketCap * (1 + priceChangePercent);
  const marketCapChange = marketCap - crypto.marketCap;
  
  return {
    id: crypto.id,
    symbol: crypto.symbol,
    name: crypto.name,
    image: crypto.image,
    current_price: parseFloat(newPrice.toFixed(8)),
    market_cap: Math.round(marketCap),
    market_cap_rank: crypto.marketCapRank,
    fully_diluted_valuation: crypto.fullyDilutedValuation ? Math.round(crypto.fullyDilutedValuation * (1 + priceChangePercent)) : null,
    total_volume: Math.round(crypto.totalVolume * (0.8 + randomFloat(0, 0.4))),
    high_24h: parseFloat(high24h.toFixed(8)),
    low_24h: parseFloat(low24h.toFixed(8)),
    price_change_24h: parseFloat(priceChange.toFixed(8)),
    price_change_percentage_24h: parseFloat(priceChangePercent * 100).toFixed(2),
    market_cap_change_24h: Math.round(marketCapChange),
    market_cap_change_percentage_24h: parseFloat(priceChangePercent * 100).toFixed(2),
    circulating_supply: Math.round(crypto.circulatingSupply),
    total_supply: crypto.totalSupply ? Math.round(crypto.totalSupply) : null,
    max_supply: crypto.maxSupply ? Math.round(crypto.maxSupply) : null,
    ath: parseFloat((crypto.currentPrice * 2.5).toFixed(8)),
    ath_change_percentage: parseFloat((-60 + randomFloat(0, 20)).toFixed(2)),
    ath_date: "2021-11-10T14:24:11.849Z",
    atl: parseFloat((crypto.currentPrice * 0.05).toFixed(8)),
    atl_change_percentage: parseFloat((1900 + randomFloat(0, 500)).toFixed(2)),
    atl_date: "2020-03-13T02:35:41.817Z",
    roi: null,
    last_updated: new Date().toISOString()
  };
};

// Generate historical price data for a specific cryptocurrency
const generateHistoricalData = (crypto, days = 7) => {
  const prices = [];
  const market_caps = [];
  const total_volumes = [];
  
  // Set base values
  let basePrice = crypto.currentPrice;
  let baseMarketCap = crypto.marketCap;
  let baseVolume = crypto.totalVolume;
  
  // Generate data points (one per day)
  const now = Date.now();
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  
  for (let i = days; i >= 0; i--) {
    const timestamp = now - (i * millisecondsPerDay);
    
    // Add some random variation each day
    const priceChange = randomFloat(-crypto.priceChangeRange, crypto.priceChangeRange);
    basePrice = basePrice * (1 + priceChange);
    baseMarketCap = baseMarketCap * (1 + priceChange);
    baseVolume = baseVolume * (0.8 + randomFloat(0, 0.4));
    
    // Add data point
    prices.push([timestamp, parseFloat(basePrice.toFixed(8))]);
    market_caps.push([timestamp, Math.round(baseMarketCap)]);
    total_volumes.push([timestamp, Math.round(baseVolume)]);
  }
  
  return {
    prices,
    market_caps,
    total_volumes
  };
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
    const coinId = req.query.id || req.query.coin;
    const historical = req.query.historical === 'true';
    const days = parseInt(req.query.days) || 7;
    const vs_currency = req.query.vs_currency || 'usd';
    
    // If no coinId, return list of all coins
    if (!coinId) {
      return res.status(200).json(
        cryptocurrencies.map(crypto => generateCryptoPriceData(crypto, vs_currency))
      );
    }
    
    // Find the coin
    const coin = cryptocurrencies.find(c => 
      c.id.toLowerCase() === coinId.toLowerCase() || 
      c.symbol.toLowerCase() === coinId.toLowerCase()
    );
    
    // If coin not found, return error
    if (!coin) {
      return res.status(404).json({ error: 'Coin not found' });
    }
    
    // Return either current price data or historical data
    if (historical) {
      return res.status(200).json(generateHistoricalData(coin, days));
    } else {
      return res.status(200).json(generateCryptoPriceData(coin, vs_currency));
    }
  } catch (error) {
    console.error('Error generating cryptocurrency data:', error);
    return res.status(500).json({ error: 'Failed to generate cryptocurrency data' });
  }
}