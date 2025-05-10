// Custom Joke API - Provides random jokes with various categories

// Function to get a random item from an array
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Collection of jokes with categories
const jokes = [
  {
    id: 1,
    text: "Why don't scientists trust atoms? Because they make up everything!",
    category: "science",
    safe: true,
    type: "question-answer"
  },
  {
    id: 2,
    text: "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
    category: "math",
    safe: true,
    type: "question-answer"
  },
  {
    id: 3,
    text: "Why was the math book sad? Because it had too many problems.",
    category: "math",
    safe: true,
    type: "question-answer"
  },
  {
    id: 4,
    text: "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    category: "pun",
    safe: true,
    type: "one-liner"
  },
  {
    id: 5,
    text: "What do you call a fake noodle? An impasta.",
    category: "food",
    safe: true,
    type: "question-answer"
  },
  {
    id: 6,
    text: "Why did the scarecrow win an award? Because he was outstanding in his field.",
    category: "pun",
    safe: true,
    type: "question-answer"
  },
  {
    id: 7,
    text: "I'm reading a book on anti-gravity. It's impossible to put down!",
    category: "science",
    safe: true,
    type: "one-liner"
  },
  {
    id: 8,
    text: "What do you call a bear with no teeth? A gummy bear.",
    category: "animal",
    safe: true,
    type: "question-answer"
  },
  {
    id: 9,
    text: "Why don't skeletons fight each other? They don't have the guts.",
    category: "halloween",
    safe: true,
    type: "question-answer"
  },
  {
    id: 10,
    text: "What kind of exercise do lazy people do? Diddly-squats.",
    category: "fitness",
    safe: true,
    type: "question-answer"
  },
  {
    id: 11,
    text: "Why did the bicycle fall over? Because it was two-tired!",
    category: "pun",
    safe: true,
    type: "question-answer"
  },
  {
    id: 12,
    text: "Why did the golfer bring two pairs of pants? In case he got a hole in one.",
    category: "sports",
    safe: true,
    type: "question-answer"
  },
  {
    id: 13,
    text: "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
    category: "programming",
    safe: true,
    type: "question-answer"
  },
  {
    id: 14,
    text: "Why don't scientists trust atoms? Because they make up everything!",
    category: "science",
    safe: true,
    type: "question-answer"
  },
  {
    id: 15,
    text: "A man walks into a bar and orders a fruit punch. The bartender says 'Pal, if you want a punch, you'll have to stand in line.' The man looks around. There is no punch line.",
    category: "bar",
    safe: true,
    type: "story"
  },
  {
    id: 16,
    text: "I used to be a baker, but I couldn't make enough dough.",
    category: "work",
    safe: true,
    type: "one-liner"
  },
  {
    id: 17,
    text: "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
    category: "geography",
    safe: true,
    type: "question-answer"
  },
  {
    id: 18,
    text: "Did you hear about the claustrophobic astronaut? He just needed a little space.",
    category: "space",
    safe: true,
    type: "question-answer"
  },
  {
    id: 19,
    text: "Why don't eggs tell jokes? They'd crack each other up.",
    category: "food",
    safe: true,
    type: "question-answer"
  },
  {
    id: 20,
    text: "I'm on a seafood diet. Every time I see food, I eat it.",
    category: "food",
    safe: true,
    type: "one-liner"
  },
  {
    id: 21,
    text: "What do you call a parade of rabbits hopping backwards? A receding hare-line.",
    category: "animal",
    safe: true,
    type: "question-answer"
  },
  {
    id: 22,
    text: "What's the difference between a poorly dressed man on a trampoline and a well-dressed man on a trampoline? Attire.",
    category: "wordplay",
    safe: true,
    type: "question-answer"
  },
  {
    id: 23,
    text: "How do you organize a space party? You planet.",
    category: "space",
    safe: true,
    type: "question-answer"
  },
  {
    id: 24,
    text: "I would tell you a joke about UDP, but you might not get it.",
    category: "programming",
    safe: true,
    type: "one-liner"
  },
  {
    id: 25,
    text: "Why did the chicken cross the road? To get to the other side.",
    category: "classic",
    safe: true,
    type: "question-answer"
  },
  {
    id: 26,
    text: "I told my doctor that I broke my arm in two places. He told me to stop going to those places.",
    category: "medical",
    safe: true,
    type: "one-liner"
  },
  {
    id: 27,
    text: "Parallel lines have so much in common. It's a shame they'll never meet.",
    category: "math",
    safe: true,
    type: "one-liner"
  },
  {
    id: 28,
    text: "My wife told me to stop impersonating a flamingo. I had to put my foot down.",
    category: "animal",
    safe: true,
    type: "one-liner"
  },
  {
    id: 29,
    text: "I'm reading a book about anti-gravity. It's impossible to put down!",
    category: "science",
    safe: true,
    type: "one-liner"
  },
  {
    id: 30,
    text: "What does a cloud wear under its raincoat? Thunderwear.",
    category: "weather",
    safe: true,
    type: "question-answer"
  }
];

// Get unique categories
const getAllCategories = () => {
  const categorySet = new Set();
  jokes.forEach(joke => {
    categorySet.add(joke.category);
  });
  return Array.from(categorySet);
};

// Get unique joke types
const getAllTypes = () => {
  const typeSet = new Set();
  jokes.forEach(joke => {
    typeSet.add(joke.type);
  });
  return Array.from(typeSet);
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
    const { id, category, type, safe } = req.query;
    
    // Return jokes metadata
    if (req.query.metadata === 'true') {
      return res.status(200).json({
        categories: getAllCategories(),
        types: getAllTypes(),
        total: jokes.length
      });
    }
    
    // Return a specific joke by ID
    if (id) {
      const joke = jokes.find(j => j.id.toString() === id.toString());
      
      if (!joke) {
        return res.status(404).json({ error: 'Joke not found' });
      }
      
      return res.status(200).json(joke);
    }
    
    // Filter jokes
    let filteredJokes = [...jokes];
    
    // Filter by category
    if (category) {
      filteredJokes = filteredJokes.filter(j => 
        j.category.toLowerCase() === category.toLowerCase()
      );
      
      if (filteredJokes.length === 0) {
        return res.status(200).json({ 
          status: 'success',
          message: 'No jokes found for the specified category',
          joke: null
        });
      }
    }
    
    // Filter by type
    if (type) {
      filteredJokes = filteredJokes.filter(j => 
        j.type.toLowerCase() === type.toLowerCase()
      );
      
      if (filteredJokes.length === 0) {
        return res.status(200).json({ 
          status: 'success',
          message: 'No jokes found for the specified type',
          joke: null
        });
      }
    }
    
    // Filter by safety (if explicitly requested)
    if (safe === 'true') {
      filteredJokes = filteredJokes.filter(j => j.safe === true);
    }
    
    // Return a random joke from filtered list
    const randomJoke = getRandomItem(filteredJokes);
    
    return res.status(200).json({
      status: 'success',
      joke: randomJoke
    });
  } catch (error) {
    console.error('Error fetching joke:', error);
    return res.status(500).json({ error: 'Failed to fetch joke' });
  }
}