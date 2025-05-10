// Custom News API - Provides simulated news articles and headlines

// Function to get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// Function to get date N days ago in YYYY-MM-DD format
const getDateDaysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

// Collection of news sources
const sources = [
  {
    id: "tech-daily",
    name: "Tech Daily",
    description: "The latest technology news and information",
    category: "technology",
    country: "us",
    language: "en"
  },
  {
    id: "world-report",
    name: "World Report",
    description: "Global news and current events from around the world",
    category: "general",
    country: "uk",
    language: "en"
  },
  {
    id: "business-insider",
    name: "Business Insider",
    description: "Financial news and market updates",
    category: "business",
    country: "us",
    language: "en"
  },
  {
    id: "sports-center",
    name: "Sports Center",
    description: "Sports news and game coverage",
    category: "sports",
    country: "us",
    language: "en"
  },
  {
    id: "health-journal",
    name: "Health Journal",
    description: "Latest discoveries and developments in health and medicine",
    category: "health",
    country: "uk",
    language: "en"
  },
  {
    id: "science-today",
    name: "Science Today",
    description: "Scientific breakthroughs and research news",
    category: "science",
    country: "us",
    language: "en"
  },
  {
    id: "entertainment-weekly",
    name: "Entertainment Weekly",
    description: "Movies, TV, music, and celebrity news",
    category: "entertainment",
    country: "us",
    language: "en"
  }
];

// Collection of news categories
const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology"
];

// Collection of sample news articles
const articles = [
  {
    id: 1,
    title: "Tech Giants Unveil Revolutionary AI Assistant",
    description: "Major technology companies announce a new generation of AI assistants with unprecedented natural language capabilities.",
    content: "Leading technology companies have revealed their latest developments in artificial intelligence, showcasing assistants that can understand and respond to complex human instructions with remarkable accuracy. These new systems demonstrate significant improvements in reasoning, creativity, and factual knowledge compared to previous generations. Experts suggest these advancements could transform industries from customer service to content creation.",
    author: "Sarah Johnson",
    source: "tech-daily",
    url: "https://example.com/tech-giants-ai",
    imageUrl: "https://picsum.photos/id/1/800/450",
    publishedAt: getCurrentDate(),
    category: "technology",
    tags: ["AI", "machine learning", "technology"]
  },
  {
    id: 2,
    title: "Global Climate Summit Reaches Breakthrough Agreement",
    description: "World leaders negotiate landmark climate accord with binding emission targets.",
    content: "After intense negotiations, representatives from 195 countries have reached a historic agreement on climate change. The new accord establishes legally binding targets for greenhouse gas emissions reductions, with developed nations committing to more aggressive timelines. The agreement also includes unprecedented financial commitments to support developing nations in their transition to renewable energy sources. Environmental advocates have cautiously welcomed the deal, though some experts question whether the targets go far enough to address the climate crisis.",
    author: "Michael Chen",
    source: "world-report",
    url: "https://example.com/climate-summit",
    imageUrl: "https://picsum.photos/id/10/800/450",
    publishedAt: getDateDaysAgo(1),
    category: "general",
    tags: ["climate change", "environment", "politics"]
  },
  {
    id: 3,
    title: "Central Bank Signals Shift in Monetary Policy",
    description: "Economic indicators prompt reconsideration of interest rate strategy.",
    content: "The Central Bank has indicated a potential shift in its approach to monetary policy following recent economic data. In a statement released yesterday, bank officials suggested that improving employment figures and moderating inflation may allow for adjustments to the current interest rate strategy. Market analysts are divided on the implications, with some predicting a gradual lowering of rates while others caution that the bank may maintain its cautious stance given ongoing economic uncertainties.",
    author: "Alicia Rodriguez",
    source: "business-insider",
    url: "https://example.com/central-bank-policy",
    imageUrl: "https://picsum.photos/id/20/800/450",
    publishedAt: getDateDaysAgo(2),
    category: "business",
    tags: ["economy", "interest rates", "central bank"]
  },
  {
    id: 4,
    title: "Underdog Team Clinches Championship in Stunning Upset",
    description: "Historic victory defies expectations in season finale.",
    content: "In one of the most remarkable underdog stories in recent sports history, the previously unheralded team has secured the championship with a stunning victory over the heavily favored defending champions. Playing with extraordinary determination and tactical discipline, they overcame a significant deficit in the final minutes of the match. The team's journey from near-relegation last season to champions has captivated fans and commentators alike, with their coach crediting the transformation to improved team culture and strategic recruitment.",
    author: "James Wilson",
    source: "sports-center",
    url: "https://example.com/championship-upset",
    imageUrl: "https://picsum.photos/id/30/800/450",
    publishedAt: getDateDaysAgo(1),
    category: "sports",
    tags: ["championship", "upset", "sports"]
  },
  {
    id: 5,
    title: "Researchers Identify Promising Treatment for Chronic Condition",
    description: "Clinical trials show significant improvement for patients with long-term illness.",
    content: "Medical researchers have announced encouraging results from a large-scale clinical trial of a new treatment approach for a common chronic condition. The study, involving over 5,000 patients across multiple research centers, demonstrated significant improvements in symptoms and quality of life measures compared to standard treatments. The therapy combines existing medications with a novel delivery method that improves efficacy while reducing side effects. Healthcare professionals are cautiously optimistic, though note that further research is needed before the treatment becomes widely available.",
    author: "Dr. Emily Parker",
    source: "health-journal",
    url: "https://example.com/chronic-treatment",
    imageUrl: "https://picsum.photos/id/40/800/450",
    publishedAt: getDateDaysAgo(3),
    category: "health",
    tags: ["medical research", "treatment", "healthcare"]
  },
  {
    id: 6,
    title: "Astronomers Discover Earth-like Planet in Habitable Zone",
    description: "New exoplanet has conditions potentially suitable for life.",
    content: "A team of astronomers has identified an Earth-like planet orbiting within the habitable zone of a distant star. Using advanced observation techniques, researchers detected the planet approximately 40 light-years from our solar system. Preliminary analysis suggests the planet has a rocky composition similar to Earth and orbits its star at a distance that could allow for liquid water on its surface - a key requirement for life as we know it. The discovery marks an important step in the search for potentially habitable worlds beyond our solar system.",
    author: "Thomas Wright",
    source: "science-today",
    url: "https://example.com/exoplanet-discovery",
    imageUrl: "https://picsum.photos/id/50/800/450",
    publishedAt: getCurrentDate(),
    category: "science",
    tags: ["astronomy", "exoplanet", "space exploration"]
  },
  {
    id: 7,
    title: "Acclaimed Director Announces Ambitious New Project",
    description: "Award-winning filmmaker reveals plans for groundbreaking cinematic experience.",
    content: "One of the industry's most celebrated directors has unveiled plans for an innovative new film project that promises to push the boundaries of cinematic storytelling. The announcement comes after months of speculation about the filmmaker's next move following their critically acclaimed previous work. The project will reportedly employ cutting-edge visual technologies and narrative techniques to create an immersive viewing experience. Several high-profile actors are already attached to the project, which is scheduled to begin production later this year.",
    author: "Rebecca Torres",
    source: "entertainment-weekly",
    url: "https://example.com/director-project",
    imageUrl: "https://picsum.photos/id/60/800/450",
    publishedAt: getDateDaysAgo(2),
    category: "entertainment",
    tags: ["movies", "director", "film industry"]
  },
  {
    id: 8,
    title: "Major Cybersecurity Vulnerability Affects Millions of Devices",
    description: "Security researchers discover widespread flaw in common software.",
    content: "Security experts have identified a significant vulnerability in widely-used software that could potentially affect millions of devices worldwide. The flaw, present in a commonly implemented network protocol, could allow malicious actors to gain unauthorized access to affected systems. Major technology companies are rapidly developing and distributing patches to address the issue. Cybersecurity agencies from several countries have issued advisories urging users and organizations to update their systems immediately to mitigate the risk of exploitation.",
    author: "Daniel Lee",
    source: "tech-daily",
    url: "https://example.com/cybersecurity-flaw",
    imageUrl: "https://picsum.photos/id/70/800/450",
    publishedAt: getDateDaysAgo(1),
    category: "technology",
    tags: ["cybersecurity", "vulnerability", "software"]
  },
  {
    id: 9,
    title: "Landmark Infrastructure Bill Passes After Prolonged Negotiations",
    description: "Bipartisan legislation allocates significant funding for national infrastructure projects.",
    content: "After months of complex negotiations, lawmakers have passed a comprehensive infrastructure package that will direct substantial funding toward improving the nation's transportation systems, utilities, and public facilities. The legislation includes provisions for repairing aging roads and bridges, expanding broadband access in rural areas, modernizing the electrical grid, and enhancing water systems. Economic analysts predict the investments could create hundreds of thousands of jobs while addressing critical infrastructure needs. The bill's passage represents a rare moment of bipartisan cooperation on major legislation.",
    author: "Jonathan Miller",
    source: "world-report",
    url: "https://example.com/infrastructure-bill",
    imageUrl: "https://picsum.photos/id/80/800/450",
    publishedAt: getDateDaysAgo(4),
    category: "general",
    tags: ["politics", "infrastructure", "legislation"]
  },
  {
    id: 10,
    title: "Startup Secures Record-Breaking Funding Round",
    description: "Technology innovator attracts unprecedented investment for expansion.",
    content: "A promising startup has announced the completion of a record-setting funding round, securing investments that value the company at several billion dollars. The firm, which specializes in developing sustainable technology solutions, has attracted attention for its innovative approach to addressing environmental challenges through commercial applications. The new funding will reportedly accelerate product development, expand manufacturing capacity, and support international expansion efforts. Industry observers note that the investment represents growing confidence in commercially viable sustainability technologies.",
    author: "Sophia Kim",
    source: "business-insider",
    url: "https://example.com/startup-funding",
    imageUrl: "https://picsum.photos/id/90/800/450",
    publishedAt: getDateDaysAgo(3),
    category: "business",
    tags: ["startup", "investment", "technology"]
  },
  {
    id: 11,
    title: "Historic Olympic Performance Shatters Long-standing Record",
    description: "Athlete's remarkable achievement breaks record that stood for decades.",
    content: "In an extraordinary display of athletic excellence, a competitor at the Olympic Games has broken a record that had remained untouched for over forty years. The performance, which left spectators and commentators in awe, represented the culmination of years of dedicated training and innovative coaching methods. Sports historians are already describing the achievement as one of the most significant in Olympic history, noting both the margin by which the previous record was surpassed and the technical perfection demonstrated. The athlete's journey from relative obscurity to Olympic glory has captured international attention.",
    author: "Marcus Taylor",
    source: "sports-center",
    url: "https://example.com/olympic-record",
    imageUrl: "https://picsum.photos/id/100/800/450",
    publishedAt: getCurrentDate(),
    category: "sports",
    tags: ["Olympics", "record", "athletics"]
  },
  {
    id: 12,
    title: "Study Reveals Surprising Benefits of Common Dietary Component",
    description: "Researchers find unexpected health advantages from widely available nutrient.",
    content: "A comprehensive study published in a leading medical journal has uncovered previously unknown benefits associated with a common dietary component. The research, which analyzed health data from thousands of participants over a decade, found strong correlations between regular consumption of the nutrient and reduced risk of several chronic conditions. The findings challenge some existing nutritional guidelines and may have implications for dietary recommendations. Medical experts emphasize that the results should be considered alongside other aspects of a balanced diet rather than viewed in isolation.",
    author: "Dr. Lisa Chen",
    source: "health-journal",
    url: "https://example.com/dietary-study",
    imageUrl: "https://picsum.photos/id/110/800/450",
    publishedAt: getDateDaysAgo(5),
    category: "health",
    tags: ["nutrition", "medical research", "diet"]
  },
  {
    id: 13,
    title: "Revolutionary Energy Technology Demonstrates Breakthrough Efficiency",
    description: "Innovative power generation system achieves unprecedented conversion rates.",
    content: "Scientists have successfully demonstrated a novel energy technology that achieves significantly higher efficiency rates than conventional power generation methods. The system, which employs advanced materials and innovative engineering principles, represents a potential leap forward in sustainable energy production. During controlled tests, the technology consistently produced more usable energy from the same inputs compared to traditional methods. While still in the development phase, the breakthrough has attracted attention from energy industry leaders and environmental advocates alike for its potential to reduce resource consumption and environmental impact.",
    author: "Adam Foster",
    source: "science-today",
    url: "https://example.com/energy-breakthrough",
    imageUrl: "https://picsum.photos/id/120/800/450",
    publishedAt: getDateDaysAgo(2),
    category: "science",
    tags: ["energy", "technology", "sustainability"]
  },
  {
    id: 14,
    title: "Streaming Platform Announces Innovative Interactive Content Format",
    description: "New storytelling approach allows viewers to influence narrative development.",
    content: "A major streaming service has revealed plans to introduce an expanded interactive content format that will enable viewers to make choices affecting story progression. The announcement represents a significant evolution of previous interactive experiments, with the new technology offering more sophisticated narrative branching and personalization. Creative teams including acclaimed writers and directors have already begun developing projects specifically designed for the format. Industry analysts suggest the innovation could influence audience expectations and creative approaches across the entertainment landscape.",
    author: "Maria Lopez",
    source: "entertainment-weekly",
    url: "https://example.com/interactive-streaming",
    imageUrl: "https://picsum.photos/id/130/800/450",
    publishedAt: getDateDaysAgo(1),
    category: "entertainment",
    tags: ["streaming", "interactive", "entertainment"]
  },
  {
    id: 15,
    title: "Quantum Computing Milestone Achieved by Research Team",
    description: "Scientists demonstrate practical application of quantum processing techniques.",
    content: "Researchers have announced a significant advancement in quantum computing technology, successfully demonstrating a practical application that had previously remained theoretical. The team developed a specialized algorithm that leverages quantum principles to solve a specific class of problems substantially faster than conventional computing methods. While the achievement doesn't yet represent 'quantum supremacy' across all computing tasks, it provides compelling evidence of quantum computing's potential practical benefits. The research partnership between academic institutions and technology companies highlights the growing collaboration in this rapidly evolving field.",
    author: "Dr. Ryan Wong",
    source: "tech-daily",
    url: "https://example.com/quantum-milestone",
    imageUrl: "https://picsum.photos/id/140/800/450",
    publishedAt: getDateDaysAgo(4),
    category: "technology",
    tags: ["quantum computing", "research", "technology"]
  },
  {
    id: 16,
    title: "International Tensions Ease Following Diplomatic Breakthrough",
    description: "Negotiators reach agreement to resolve long-standing regional dispute.",
    content: "A diplomatic initiative has resulted in an unexpected breakthrough in relations between nations involved in a protracted regional conflict. The carefully negotiated agreement addresses several core issues that had previously hindered progress, establishing frameworks for ongoing dialogue and cooperation. International observers have cautiously welcomed the development while acknowledging that implementation challenges remain. The diplomatic effort, which involved mediation from neutral parties and multiple rounds of talks, demonstrates the potential of persistent engagement even in seemingly intractable situations.",
    author: "Elizabeth Green",
    source: "world-report",
    url: "https://example.com/diplomatic-breakthrough",
    imageUrl: "https://picsum.photos/id/150/800/450",
    publishedAt: getCurrentDate(),
    category: "general",
    tags: ["diplomacy", "international relations", "conflict resolution"]
  },
  {
    id: 17,
    title: "Market Volatility Increases Following Economic Data Release",
    description: "Unexpected indicators trigger significant financial market movements.",
    content: "Financial markets experienced heightened volatility in response to the release of economic indicators that deviated substantially from analyst expectations. The data, which included metrics related to employment, inflation, and economic growth, prompted traders to reassess previous assumptions about economic trajectories and potential policy responses. Several market sectors saw pronounced price movements as participants adjusted positions. Economic commentators offered varying interpretations of the figures, highlighting the complex interplay of factors influencing the current economic environment. Market observers anticipate continued fluctuations as additional data becomes available in coming weeks.",
    author: "Andrew Mitchell",
    source: "business-insider",
    url: "https://example.com/market-volatility",
    imageUrl: "https://picsum.photos/id/160/800/450",
    publishedAt: getDateDaysAgo(1),
    category: "business",
    tags: ["markets", "economy", "finance"]
  },
  {
    id: 18,
    title: "Team Announces Innovative Training Methodology After Successful Season",
    description: "Championship squad reveals unconventional approach to performance optimization.",
    content: "Following their impressive championship season, coaching staff have shared details of the innovative training methodology that contributed to their success. The approach integrates advanced data analytics, specialized physical conditioning techniques, and psychological performance strategies in ways that challenge conventional wisdom in the sport. Players have attributed significant performance improvements to the holistic system, which tailors training protocols to individual capabilities and development needs. Other teams are reportedly analyzing elements of the methodology for potential adaptation, though the championship squad's coaches emphasize that implementation requires specialized expertise and customization.",
    author: "Carlos Rivera",
    source: "sports-center",
    url: "https://example.com/training-innovation",
    imageUrl: "https://picsum.photos/id/170/800/450",
    publishedAt: getDateDaysAgo(3),
    category: "sports",
    tags: ["training", "sports", "performance"]
  },
  {
    id: 19,
    title: "Public Health Initiative Shows Promising Early Results",
    description: "Community-based program demonstrates effectiveness in addressing health disparities.",
    content: "A public health program designed to address persistent health disparities is showing encouraging initial outcomes according to preliminary data. The initiative, which emphasizes community engagement, preventive care access, and health education, has been implemented in several underserved regions. Early metrics indicate improvements in screening participation, preventive care utilization, and health literacy among targeted populations. Health officials attribute the positive trajectory to the program's collaborative approach, which involved extensive consultation with community members and organizations throughout development and implementation phases.",
    author: "Dr. Jasmine Patel",
    source: "health-journal",
    url: "https://example.com/health-initiative",
    imageUrl: "https://picsum.photos/id/180/800/450",
    publishedAt: getDateDaysAgo(6),
    category: "health",
    tags: ["public health", "healthcare", "community"]
  },
  {
    id: 20,
    title: "Marine Biologists Document Previously Unknown Species in Deep Ocean Exploration",
    description: "Research expedition discovers diverse life forms in unexplored oceanic region.",
    content: "A scientific expedition exploring deep ocean environments has documented multiple previously unidentified marine species, expanding our understanding of biodiversity in extreme habitats. Using advanced submersible technology, researchers were able to observe and collect specimens from ocean depths rarely accessed by scientific missions. Preliminary analysis suggests several of the discovered organisms exhibit unusual adaptations to the high-pressure, low-light conditions of their deep-sea environment. The findings highlight how much remains unknown about Earth's ocean ecosystems and the potential for significant scientific discoveries in these challenging-to-access regions.",
    author: "Dr. Nathan Peterson",
    source: "science-today",
    url: "https://example.com/marine-discovery",
    imageUrl: "https://picsum.photos/id/190/800/450",
    publishedAt: getDateDaysAgo(5),
    category: "science",
    tags: ["marine biology", "discovery", "ocean"]
  }
];

// Generate a brief headline from full article
const generateHeadline = (article) => {
  return {
    id: article.id,
    title: article.title,
    description: article.description,
    source: article.source,
    category: article.category,
    publishedAt: article.publishedAt,
    url: article.url
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
    const { 
      id, 
      category, 
      source: sourceId, 
      q: query, 
      from, 
      to, 
      sortBy = 'publishedAt', 
      order = 'desc',
      headlines = 'false',
      limit: limitParam = '10',
      page: pageParam = '1'
    } = req.query;
    
    // Convert parameters
    const limit = parseInt(limitParam) || 10;
    const page = parseInt(pageParam) || 1;
    
    // Return metadata
    if (req.query.metadata === 'true') {
      return res.status(200).json({
        sources,
        categories,
        articleCount: articles.length,
        latestPublishedDate: getCurrentDate()
      });
    }
    
    // Return sources list
    if (req.query.sources === 'true') {
      return res.status(200).json({
        status: 'ok',
        sources
      });
    }
    
    // Return specific source
    if (req.query.sourceDetails) {
      const source = sources.find(s => s.id === req.query.sourceDetails);
      
      if (!source) {
        return res.status(404).json({ status: 'error', message: 'Source not found' });
      }
      
      return res.status(200).json({
        status: 'ok',
        source
      });
    }
    
    // Return a specific article by ID
    if (id) {
      const article = articles.find(a => a.id.toString() === id.toString());
      
      if (!article) {
        return res.status(404).json({ status: 'error', message: 'Article not found' });
      }
      
      return res.status(200).json({
        status: 'ok',
        article
      });
    }
    
    // Filter articles based on query parameters
    let filteredArticles = [...articles];
    
    // Filter by category
    if (category) {
      filteredArticles = filteredArticles.filter(a => 
        a.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by source
    if (sourceId) {
      filteredArticles = filteredArticles.filter(a => 
        a.source === sourceId
      );
    }
    
    // Filter by text search
    if (query) {
      const searchQuery = query.toLowerCase();
      filteredArticles = filteredArticles.filter(a => 
        a.title.toLowerCase().includes(searchQuery) || 
        a.description.toLowerCase().includes(searchQuery) || 
        a.content.toLowerCase().includes(searchQuery)
      );
    }
    
    // Filter by date range
    if (from) {
      filteredArticles = filteredArticles.filter(a => 
        a.publishedAt >= from
      );
    }
    
    if (to) {
      filteredArticles = filteredArticles.filter(a => 
        a.publishedAt <= to
      );
    }
    
    // Sort articles
    filteredArticles.sort((a, b) => {
      if (sortBy === 'publishedAt') {
        if (order === 'desc') {
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        } else {
          return new Date(a.publishedAt) - new Date(b.publishedAt);
        }
      } else if (sortBy === 'title') {
        if (order === 'desc') {
          return b.title.localeCompare(a.title);
        } else {
          return a.title.localeCompare(b.title);
        }
      }
      
      // Default sorting
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    });
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
    
    // Return headlines only if requested
    let responseArticles = paginatedArticles;
    if (headlines === 'true') {
      responseArticles = paginatedArticles.map(generateHeadline);
    }
    
    return res.status(200).json({
      status: 'ok',
      totalResults: filteredArticles.length,
      page,
      limit,
      totalPages: Math.ceil(filteredArticles.length / limit),
      articles: responseArticles
    });
  } catch (error) {
    console.error('Error handling news request:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}