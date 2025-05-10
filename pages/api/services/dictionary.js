// Custom Dictionary API - Provides word definitions, synonyms, and related information

// Function to get a random word from the dictionary
const getRandomWord = () => {
  return dictionary[Math.floor(Math.random() * dictionary.length)];
};

// Dictionary data with comprehensive word information
const dictionary = [
  {
    word: "serendipity",
    pronunciation: "/ˌsɛrənˈdɪpɪti/",
    type: "noun",
    definition: "The occurrence and development of events by chance in a happy or beneficial way.",
    example: "The discovery of penicillin was a serendipity.",
    synonyms: ["chance", "fate", "destiny", "luck", "happy accident"],
    antonyms: ["misfortune", "design", "intent"],
    origin: "1754: coined by Horace Walpole, suggested by The Three Princes of Serendip, the title of a fairy tale in which the heroes 'were always making discoveries, by accidents and sagacity, of things they were not in quest of'",
    pluralForm: "serendipities"
  },
  {
    word: "ephemeral",
    pronunciation: "/ɪˈfɛm(ə)rəl/",
    type: "adjective",
    definition: "Lasting for a very short time; transitory.",
    example: "Fashions are ephemeral: new ones regularly drive out the old.",
    synonyms: ["fleeting", "transient", "momentary", "brief", "short-lived"],
    antonyms: ["permanent", "enduring", "eternal", "everlasting"],
    origin: "Late 16th century: from Greek ephēmeros (from epi 'for' + hēmera 'day') + -al",
    pluralForm: null
  },
  {
    word: "ubiquitous",
    pronunciation: "/juːˈbɪkwɪtəs/",
    type: "adjective",
    definition: "Present, appearing, or found everywhere.",
    example: "Smartphones are becoming ubiquitous in modern society.",
    synonyms: ["omnipresent", "everywhere", "universal", "pervasive", "prevalent"],
    antonyms: ["rare", "scarce", "limited", "uncommon"],
    origin: "Mid 19th century: from Latin ubique 'everywhere' + -ous",
    pluralForm: null
  },
  {
    word: "perspicacious",
    pronunciation: "/ˌpəːspɪˈkeɪʃəs/",
    type: "adjective",
    definition: "Having a ready insight into and understanding of things.",
    example: "Her perspicacious comments revealed a deep understanding of the situation.",
    synonyms: ["insightful", "perceptive", "astute", "shrewd", "discerning"],
    antonyms: ["unperceptive", "undiscerning", "ignorant", "obtuse"],
    origin: "Early 17th century: from Latin perspicax, perspicac- 'seeing clearly' + -ious",
    pluralForm: null
  },
  {
    word: "eloquent",
    pronunciation: "/ˈɛləkwənt/",
    type: "adjective",
    definition: "Fluent or persuasive in speaking or writing.",
    example: "Her eloquent speech moved the audience to tears.",
    synonyms: ["fluent", "articulate", "expressive", "silver-tongued", "persuasive"],
    antonyms: ["inarticulate", "incoherent", "halting", "hesitant"],
    origin: "Late Middle English: via Old French from Latin eloquent- 'speaking out', from the verb eloqui",
    pluralForm: null
  },
  {
    word: "mellifluous",
    pronunciation: "/məˈlɪflʊəs/",
    type: "adjective",
    definition: "(of a sound) Sweet or musical; pleasant to hear.",
    example: "The singer's mellifluous voice captivated the audience.",
    synonyms: ["sweet-sounding", "dulcet", "honeyed", "mellow", "euphonious"],
    antonyms: ["harsh", "discordant", "cacophonous", "grating"],
    origin: "Late 15th century: from late Latin mellifluus, from Latin mel, mell- 'honey' + fluere 'to flow'",
    pluralForm: null
  },
  {
    word: "quintessential",
    pronunciation: "/ˌkwɪntɪˈsɛnʃəl/",
    type: "adjective",
    definition: "Representing the most perfect or typical example of a quality or class.",
    example: "He was the quintessential gentleman.",
    synonyms: ["typical", "classic", "archetypal", "model", "exemplary"],
    antonyms: ["atypical", "uncharacteristic", "unrepresentative"],
    origin: "Mid 16th century: from medieval Latin quintessentia 'fifth essence'",
    pluralForm: null
  },
  {
    word: "verisimilitude",
    pronunciation: "/ˌvɛrɪsɪˈmɪlɪtjuːd/",
    type: "noun",
    definition: "The appearance of being true or real.",
    example: "The film's documentary style gives it a sense of verisimilitude.",
    synonyms: ["realism", "believability", "plausibility", "credibility", "authenticity"],
    antonyms: ["implausibility", "unreality", "fantasy", "artificiality"],
    origin: "Mid 16th century: from Latin verisimilitudo, from verisimilis 'probable', from veri (genitive of verus 'true') + similis 'like'",
    pluralForm: "verisimilitudes"
  },
  {
    word: "magnanimous",
    pronunciation: "/maɡˈnanɪməs/",
    type: "adjective",
    definition: "Very generous or forgiving, especially toward a rival or less powerful person.",
    example: "She was magnanimous in victory, complimenting her opponent's performance.",
    synonyms: ["generous", "charitable", "benevolent", "unselfish", "forgiving"],
    antonyms: ["mean-spirited", "petty", "spiteful", "vindictive"],
    origin: "Mid 16th century: from Latin magnanimus (from magnus 'great' + animus 'soul') + -ous",
    pluralForm: null
  },
  {
    word: "pernicious",
    pronunciation: "/pəˈnɪʃəs/",
    type: "adjective",
    definition: "Having a harmful effect, especially in a gradual or subtle way.",
    example: "The pernicious effects of corruption were evident throughout the organization.",
    synonyms: ["harmful", "damaging", "destructive", "injurious", "malign"],
    antonyms: ["beneficial", "advantageous", "helpful", "constructive"],
    origin: "Late Middle English: from Latin perniciosus 'destructive', from pernicies 'ruin', from per- 'completely' + nex, nec- 'death'",
    pluralForm: null
  },
  {
    word: "obfuscate",
    pronunciation: "/ˈɒbfʌskeɪt/",
    type: "verb",
    definition: "Render obscure, unclear, or unintelligible.",
    example: "The report deliberately obfuscated the facts.",
    synonyms: ["obscure", "confuse", "complicate", "muddle", "blur"],
    antonyms: ["clarify", "elucidate", "illuminate", "explain"],
    origin: "Late 16th century: from late Latin obfuscat- 'darkened', from the verb obfuscare, based on Latin fuscus 'dark'",
    pluralForm: null
  },
  {
    word: "sycophant",
    pronunciation: "/ˈsɪkəfant/",
    type: "noun",
    definition: "A person who acts obsequiously toward someone important in order to gain advantage.",
    example: "The CEO was surrounded by sycophants who constantly praised his every decision.",
    synonyms: ["yes-man", "bootlicker", "flatterer", "fawner", "toady"],
    antonyms: ["critic", "detractor", "opponent"],
    origin: "Mid 16th century (denoting an informer): from French sycophante, or via Latin from Greek sukophantēs 'informer'",
    pluralForm: "sycophants"
  },
  {
    word: "insidious",
    pronunciation: "/ɪnˈsɪdɪəs/",
    type: "adjective",
    definition: "Proceeding in a gradual, subtle way, but with harmful effects.",
    example: "The insidious influence of propaganda gradually changed people's opinions.",
    synonyms: ["stealthy", "subtle", "surreptitious", "cunning", "treacherous"],
    antonyms: ["obvious", "overt", "apparent", "direct"],
    origin: "Mid 16th century: from Latin insidiosus, from insidiae 'ambush', from insidere 'lie in wait for'",
    pluralForm: null
  },
  {
    word: "paradigm",
    pronunciation: "/ˈparədʌɪm/",
    type: "noun",
    definition: "A typical example or pattern of something; a model.",
    example: "This research is a paradigm of how such studies should be conducted.",
    synonyms: ["model", "pattern", "archetype", "exemplar", "prototype"],
    antonyms: ["anomaly", "exception", "deviation"],
    origin: "Late 15th century: from French paradigme, via Latin from Greek paradeigma, from paradeiknunai 'show side by side'",
    pluralForm: "paradigms"
  },
  {
    word: "juxtapose",
    pronunciation: "/ˌdʒʌkstəˈpəʊz/",
    type: "verb",
    definition: "Place or deal with close together for contrasting effect.",
    example: "The exhibition juxtaposed paintings from different periods.",
    synonyms: ["contrast", "compare", "set side by side", "collocate"],
    antonyms: ["separate", "isolate", "segregate"],
    origin: "Mid 19th century: from French juxtaposer, from Latin juxta 'next' + French poser 'to place'",
    pluralForm: null
  },
  {
    word: "cacophony",
    pronunciation: "/kəˈkɒfəni/",
    type: "noun",
    definition: "A harsh, discordant mixture of sounds.",
    example: "The cacophony of the city's rush hour traffic was overwhelming.",
    synonyms: ["discord", "dissonance", "noise", "clamor", "din"],
    antonyms: ["harmony", "melody", "euphony", "symphony"],
    origin: "Mid 17th century: from French cacophonie, from Greek kakophōnia, from kakophōnos 'ill-sounding'",
    pluralForm: "cacophonies"
  },
  {
    word: "ineffable",
    pronunciation: "/ɪnˈɛfəbl/",
    type: "adjective",
    definition: "Too great or extreme to be expressed or described in words.",
    example: "The ineffable beauty of the sunset left us speechless.",
    synonyms: ["indescribable", "inexpressible", "unspeakable", "beyond words", "unutterable"],
    antonyms: ["describable", "expressible", "explicable"],
    origin: "Late Middle English: from Old French, or from Latin ineffabilis, from in- 'not' + effabilis 'able to be expressed'",
    pluralForm: null
  },
  {
    word: "panacea",
    pronunciation: "/ˌpanəˈsiːə/",
    type: "noun",
    definition: "A solution or remedy for all difficulties or diseases.",
    example: "The new policy is not a panacea for all economic problems.",
    synonyms: ["cure-all", "universal remedy", "elixir", "nostrum", "magic bullet"],
    antonyms: ["bane", "poison", "toxin"],
    origin: "Mid 16th century: via Latin from Greek panakeia, from panakēs 'all-healing', from pan 'all' + akos 'remedy'",
    pluralForm: "panaceas"
  },
  {
    word: "zeitgeist",
    pronunciation: "/ˈzʌɪtɡʌɪst/",
    type: "noun",
    definition: "The defining spirit or mood of a particular period of history as shown by the ideas and beliefs of the time.",
    example: "The book perfectly captured the zeitgeist of the 1960s.",
    synonyms: ["spirit of the age", "spirit of the time", "climate", "trend", "mood"],
    antonyms: [],
    origin: "Mid 19th century: from German Zeitgeist, from Zeit 'time' + Geist 'spirit'",
    pluralForm: "zeitgeists"
  },
  {
    word: "supercilious",
    pronunciation: "/ˌsuːpəˈsɪlɪəs/",
    type: "adjective",
    definition: "Behaving or looking as though one thinks one is superior to others.",
    example: "He had a supercilious attitude that alienated his colleagues.",
    synonyms: ["arrogant", "haughty", "disdainful", "patronizing", "condescending"],
    antonyms: ["humble", "modest", "unassuming", "respectful"],
    origin: "Late 16th century: from Latin superciliosus, from supercilium 'eyebrow'",
    pluralForm: null
  },
  {
    word: "quixotic",
    pronunciation: "/kwɪkˈsɒtɪk/",
    type: "adjective",
    definition: "Extremely idealistic; unrealistic and impractical.",
    example: "His quixotic quest to eliminate poverty seemed admirable but unfeasible.",
    synonyms: ["idealistic", "romantic", "visionary", "utopian", "dreamy"],
    antonyms: ["practical", "realistic", "pragmatic", "sensible"],
    origin: "Mid 19th century: from Don Quixote + -ic",
    pluralForm: null
  }
];

// Word types for categorization
const wordTypes = [
  "noun",
  "verb",
  "adjective",
  "adverb",
  "pronoun",
  "preposition",
  "conjunction",
  "interjection"
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
    const { word, type, random, synonymsFor, antonymsFor, search, limit: limitParam } = req.query;
    const limit = limitParam ? parseInt(limitParam) : 10;
    
    // Return dictionary metadata
    if (req.query.metadata === 'true') {
      return res.status(200).json({
        wordCount: dictionary.length,
        wordTypes,
        exampleWords: dictionary.slice(0, 5).map(item => item.word)
      });
    }
    
    // Return a random word
    if (random === 'true') {
      return res.status(200).json(getRandomWord());
    }
    
    // Return synonyms for a specific word
    if (synonymsFor) {
      const wordEntry = dictionary.find(item => 
        item.word.toLowerCase() === synonymsFor.toLowerCase()
      );
      
      if (!wordEntry) {
        return res.status(404).json({ error: 'Word not found' });
      }
      
      return res.status(200).json({
        word: wordEntry.word,
        synonyms: wordEntry.synonyms || []
      });
    }
    
    // Return antonyms for a specific word
    if (antonymsFor) {
      const wordEntry = dictionary.find(item => 
        item.word.toLowerCase() === antonymsFor.toLowerCase()
      );
      
      if (!wordEntry) {
        return res.status(404).json({ error: 'Word not found' });
      }
      
      return res.status(200).json({
        word: wordEntry.word,
        antonyms: wordEntry.antonyms || []
      });
    }
    
    // Search for words in the dictionary
    if (search) {
      const searchTerm = search.toLowerCase();
      const results = dictionary.filter(item => 
        item.word.toLowerCase().includes(searchTerm) ||
        item.definition.toLowerCase().includes(searchTerm) ||
        (item.example && item.example.toLowerCase().includes(searchTerm))
      );
      
      // Limit results
      const limitedResults = results.slice(0, limit);
      
      return res.status(200).json({
        term: search,
        count: results.length,
        results: limitedResults
      });
    }
    
    // Return a specific word
    if (word) {
      const wordEntry = dictionary.find(item => 
        item.word.toLowerCase() === word.toLowerCase()
      );
      
      if (!wordEntry) {
        return res.status(404).json({ error: 'Word not found' });
      }
      
      return res.status(200).json(wordEntry);
    }
    
    // Filter words by type
    if (type) {
      const filteredWords = dictionary.filter(item => 
        item.type.toLowerCase() === type.toLowerCase()
      );
      
      if (filteredWords.length === 0) {
        return res.status(404).json({ error: 'No words found for the specified type' });
      }
      
      // Limit results
      const limitedResults = filteredWords.slice(0, limit);
      
      return res.status(200).json({
        type,
        count: filteredWords.length,
        words: limitedResults
      });
    }
    
    // Return all words (with limit applied)
    const limitedResults = dictionary.slice(0, limit);
    
    return res.status(200).json({
      count: dictionary.length,
      limit,
      words: limitedResults
    });
  } catch (error) {
    console.error('Error handling dictionary request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}