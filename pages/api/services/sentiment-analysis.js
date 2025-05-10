// API endpoint for sentiment analysis
export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { text } = req.body;
      
      if (!text) {
        return res.status(400).json({ 
          error: 'Text is required for sentiment analysis' 
        });
      }
      
      // Simple sentiment analysis algorithm
      const result = analyzeSentiment(text);
      
      return res.status(200).json({
        success: true,
        data: {
          text,
          sentiment: result.sentiment,
          score: result.score,
          keywords: result.keywords,
          analysis: {
            positive: result.positive,
            negative: result.negative,
            neutral: result.neutral
          }
        }
      });
    } catch (error) {
      return res.status(500).json({ 
        error: 'Failed to analyze sentiment',
        details: error.message
      });
    }
  } else {
    // Return documentation for GET requests
    return res.status(200).json({
      endpoint: '/api/services/sentiment-analysis',
      description: 'Analyzes the sentiment of provided text content',
      method: 'POST',
      parameters: {
        text: 'String. Required. Text content to analyze for sentiment.'
      },
      example: {
        request: {
          method: 'POST',
          body: {
            text: 'I really love this product! It works amazingly well.'
          }
        },
        response: {
          success: true,
          data: {
            text: 'I really love this product! It works amazingly well.',
            sentiment: 'positive',
            score: 0.87,
            keywords: ['love', 'amazingly', 'well'],
            analysis: {
              positive: 0.87,
              negative: 0.02,
              neutral: 0.11
            }
          }
        }
      }
    });
  }
}

// Simple sentiment analysis function
function analyzeSentiment(text) {
  // Basic positive and negative word lists
  const positiveWords = [
    'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
    'love', 'happy', 'best', 'beautiful', 'awesome', 'nice', 'perfect',
    'brilliant', 'outstanding', 'superb', 'impressive', 'joy', 'excited',
    'thank', 'thanks', 'pleased', 'delighted', 'glad', 'well', 'positive'
  ];
  
  const negativeWords = [
    'bad', 'terrible', 'awful', 'horrible', 'hate', 'worst', 'poor',
    'disappointed', 'disappointing', 'fail', 'failed', 'failure', 'problem',
    'difficult', 'sad', 'unhappy', 'angry', 'negative', 'sucks', 'suck',
    'annoying', 'frustrating', 'useless', 'broken', 'damage', 'damaged'
  ];
  
  // Convert to lowercase for comparison
  const lowerText = text.toLowerCase();
  
  // Tokenize text into words (simple implementation)
  const words = lowerText.match(/\b(\w+)\b/g) || [];
  
  // Count positive and negative words
  let positiveCount = 0;
  let negativeCount = 0;
  
  // Detected keywords
  const keywords = [];
  
  for (const word of words) {
    if (positiveWords.includes(word)) {
      positiveCount++;
      if (!keywords.includes(word)) keywords.push(word);
    } else if (negativeWords.includes(word)) {
      negativeCount++;
      if (!keywords.includes(word)) keywords.push(word);
    }
  }
  
  // Calculate scores
  const total = words.length || 1; // Avoid division by zero
  const positive = positiveCount / total;
  const negative = negativeCount / total;
  const neutral = 1 - positive - negative;
  
  // Determine overall sentiment
  let sentiment = 'neutral';
  let score = neutral;
  
  if (positive > negative && positive > neutral) {
    sentiment = 'positive';
    score = positive;
  } else if (negative > positive && negative > neutral) {
    sentiment = 'negative';
    score = negative;
  }
  
  // Return analysis results
  return {
    sentiment,
    score: parseFloat(score.toFixed(2)),
    keywords: keywords.slice(0, 5), // Return top 5 sentiment keywords
    positive: parseFloat(positive.toFixed(2)),
    negative: parseFloat(negative.toFixed(2)),
    neutral: parseFloat(neutral.toFixed(2))
  };
}