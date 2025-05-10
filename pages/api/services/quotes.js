// Custom Quotes API - Provides inspirational and famous quotes

// Function to get a random item from an array
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Function to get multiple random items from an array
const getRandomItems = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, array.length));
};

// Collection of quotes with authors and tags
const quotes = [
  {
    id: 1,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    tags: ["inspiration", "work", "passion"]
  },
  {
    id: 2,
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    tags: ["life", "planning", "wisdom"]
  },
  {
    id: 3,
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    tags: ["inspiration", "future", "dreams"]
  },
  {
    id: 4,
    text: "In the end, it's not the years in your life that count. It's the life in your years.",
    author: "Abraham Lincoln",
    tags: ["life", "wisdom", "inspiration"]
  },
  {
    id: 5,
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    tags: ["resilience", "life", "inspiration"]
  },
  {
    id: 6,
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    tags: ["action", "motivation", "inspiration"]
  },
  {
    id: 7,
    text: "If life were predictable it would cease to be life, and be without flavor.",
    author: "Eleanor Roosevelt",
    tags: ["life", "wisdom", "unpredictability"]
  },
  {
    id: 8,
    text: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    author: "James Cameron",
    tags: ["goals", "success", "ambition"]
  },
  {
    id: 9,
    text: "Life is either a daring adventure or nothing at all.",
    author: "Helen Keller",
    tags: ["life", "adventure", "courage"]
  },
  {
    id: 10,
    text: "Many of life's failures are people who did not realize how close they were to success when they gave up.",
    author: "Thomas Edison",
    tags: ["failure", "success", "perseverance"]
  },
  {
    id: 11,
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    tags: ["journey", "beginning", "motivation"]
  },
  {
    id: 12,
    text: "In this life we cannot do great things. We can only do small things with great love.",
    author: "Mother Teresa",
    tags: ["love", "life", "kindness"]
  },
  {
    id: 13,
    text: "The mind is everything. What you think you become.",
    author: "Buddha",
    tags: ["mind", "thoughts", "wisdom"]
  },
  {
    id: 14,
    text: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.",
    author: "Dr. Seuss",
    tags: ["choice", "direction", "inspiration"]
  },
  {
    id: 15,
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
    tags: ["success", "failure", "courage"]
  },
  {
    id: 16,
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    tags: ["adversity", "hope", "wisdom"]
  },
  {
    id: 17,
    text: "Whoever is happy will make others happy too.",
    author: "Anne Frank",
    tags: ["happiness", "influence", "positivity"]
  },
  {
    id: 18,
    text: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson",
    tags: ["leadership", "innovation", "courage"]
  },
  {
    id: 19,
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    tags: ["happiness", "purpose", "life"]
  },
  {
    id: 20,
    text: "The best and most beautiful things in the world cannot be seen or even touched — they must be felt with the heart.",
    author: "Helen Keller",
    tags: ["beauty", "feelings", "heart"]
  },
  {
    id: 21,
    text: "It is never too late to be what you might have been.",
    author: "George Eliot",
    tags: ["potential", "opportunity", "inspiration"]
  },
  {
    id: 22,
    text: "The real test is not whether you avoid this failure, because you won't. It's whether you let it harden or shame you into inaction, or whether you learn from it.",
    author: "Barack Obama",
    tags: ["failure", "learning", "growth"]
  },
  {
    id: 23,
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
    tags: ["time", "life", "authenticity"]
  },
  {
    id: 24,
    text: "The question isn't who is going to let me; it's who is going to stop me.",
    author: "Ayn Rand",
    tags: ["determination", "challenge", "empowerment"]
  },
  {
    id: 25,
    text: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson",
    tags: ["destiny", "decision", "self-determination"]
  },
  {
    id: 26,
    text: "The two most important days in your life are the day you are born and the day you find out why.",
    author: "Mark Twain",
    tags: ["life", "purpose", "meaning"]
  },
  {
    id: 27,
    text: "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.",
    author: "Mark Twain",
    tags: ["regret", "action", "life"]
  },
  {
    id: 28,
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    tags: ["future", "creation", "action"]
  },
  {
    id: 29,
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
    tags: ["journey", "beginning", "progress"]
  },
  {
    id: 30,
    text: "What you seek is seeking you.",
    author: "Rumi",
    tags: ["seeking", "destiny", "spirituality"]
  }
];

// Get unique tags from all quotes
const getAllTags = () => {
  const tagSet = new Set();
  quotes.forEach(quote => {
    quote.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet);
};

// Get unique authors from all quotes
const getAllAuthors = () => {
  const authorSet = new Set();
  quotes.forEach(quote => {
    authorSet.add(quote.author);
  });
  return Array.from(authorSet);
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
    const { id, author, tag, count: countParam } = req.query;
    
    // Set count parameter with a max limit to prevent abuse
    const count = countParam ? Math.min(parseInt(countParam) || 1, 10) : 1;
    
    // Return quotes metadata (tags, authors)
    if (req.query.metadata === 'true') {
      return res.status(200).json({
        tags: getAllTags(),
        authors: getAllAuthors(),
        total: quotes.length
      });
    }
    
    // Return a specific quote by ID
    if (id) {
      const quote = quotes.find(q => q.id.toString() === id.toString());
      
      if (!quote) {
        return res.status(404).json({ error: 'Quote not found' });
      }
      
      return res.status(200).json(quote);
    }
    
    // Filter quotes by author
    let filteredQuotes = [...quotes];
    
    if (author) {
      // Case-insensitive author filter
      filteredQuotes = filteredQuotes.filter(q => 
        q.author.toLowerCase().includes(author.toLowerCase())
      );
      
      if (filteredQuotes.length === 0) {
        return res.status(200).json({ 
          status: 'success',
          count: 0,
          quotes: [],
          message: 'No quotes found for the specified author'
        });
      }
    }
    
    // Filter quotes by tag
    if (tag) {
      // Case-insensitive tag filter
      filteredQuotes = filteredQuotes.filter(q => 
        q.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
      
      if (filteredQuotes.length === 0) {
        return res.status(200).json({ 
          status: 'success',
          count: 0,
          quotes: [],
          message: 'No quotes found for the specified tag'
        });
      }
    }
    
    // Return random quotes from filtered list
    let result;
    if (count === 1) {
      // Single quote
      result = getRandomItem(filteredQuotes);
    } else {
      // Multiple quotes
      result = getRandomItems(filteredQuotes, count);
    }
    
    return res.status(200).json({
      status: 'success',
      count: Array.isArray(result) ? result.length : 1,
      quotes: Array.isArray(result) ? result : [result]
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return res.status(500).json({ error: 'Failed to fetch quotes' });
  }
}