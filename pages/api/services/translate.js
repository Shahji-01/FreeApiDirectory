// Text Translation API
export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { text, targetLanguage = 'es', sourceLanguage = 'auto' } = req.body;
      
      if (!text) {
        return res.status(400).json({ 
          error: 'Text is required for translation' 
        });
      }
      
      if (!supportedLanguages[targetLanguage]) {
        return res.status(400).json({
          error: 'Unsupported target language',
          message: `The language '${targetLanguage}' is not supported. Please use one of: ${Object.keys(supportedLanguages).join(', ')}`
        });
      }
      
      // For demonstration purposes, we'll use a simple translation system
      // In a real-world application, you would use a translation service API
      const translatedText = translateText(text, targetLanguage);
      
      return res.status(200).json({
        success: true,
        data: {
          original: {
            text,
            language: detectLanguage(text),  // Simple detection
          },
          translation: {
            text: translatedText,
            language: targetLanguage,
            languageName: supportedLanguages[targetLanguage]
          }
        }
      });
    } catch (error) {
      return res.status(500).json({ 
        error: 'Translation failed',
        details: error.message
      });
    }
  } else {
    // Return API documentation for GET requests
    return res.status(200).json({
      endpoint: '/api/services/translate',
      description: 'Translates text to different languages',
      method: 'POST',
      parameters: {
        text: 'String. Required. The text content to translate.',
        targetLanguage: `String. Optional. The target language code (default: 'es'). Supported values: ${Object.keys(supportedLanguages).join(', ')}`,
        sourceLanguage: `String. Optional. The source language code (default: 'auto' for auto-detection).`
      },
      supportedLanguages: supportedLanguages,
      example: {
        request: {
          method: 'POST',
          body: {
            text: 'Hello, how are you today?',
            targetLanguage: 'es'
          }
        },
        response: {
          success: true,
          data: {
            original: {
              text: 'Hello, how are you today?',
              language: 'en'
            },
            translation: {
              text: '¡Hola! ¿Cómo estás hoy?',
              language: 'es',
              languageName: 'Spanish'
            }
          }
        }
      }
    });
  }
}

// Simple language detection based on character patterns
function detectLanguage(text) {
  // This is a very simplified implementation
  // Real language detection would use more sophisticated algorithms
  
  // Check for common Asian character ranges
  const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF]/.test(text);
  if (hasJapanese) return 'ja';
  
  const hasChinese = /[\u4E00-\u9FFF]/.test(text);
  if (hasChinese) return 'zh';
  
  const hasKorean = /[\uAC00-\uD7AF]/.test(text);
  if (hasKorean) return 'ko';
  
  // Check for Arabic
  const hasArabic = /[\u0600-\u06FF]/.test(text);
  if (hasArabic) return 'ar';
  
  // Check for Cyrillic (Russian, etc.)
  const hasCyrillic = /[\u0400-\u04FF]/.test(text);
  if (hasCyrillic) return 'ru';
  
  // Check for common Spanish words/patterns
  const spanishPatterns = ['qué', 'cómo', 'está', 'hola', 'buenos días', 'gracias'];
  if (spanishPatterns.some(pattern => text.toLowerCase().includes(pattern))) {
    return 'es';
  }
  
  // Check for common French words/patterns
  const frenchPatterns = ['bonjour', 'merci', 'comment', 'français', 'au revoir'];
  if (frenchPatterns.some(pattern => text.toLowerCase().includes(pattern))) {
    return 'fr';
  }
  
  // Check for common German words/patterns
  const germanPatterns = ['guten', 'danke', 'wie geht', 'sprechen', 'deutsch'];
  if (germanPatterns.some(pattern => text.toLowerCase().includes(pattern))) {
    return 'de';
  }
  
  // Default to English
  return 'en';
}

// Simple translation function with predefined translations
function translateText(text, targetLanguage) {
  // This is a demonstration implementation with a few hardcoded translations
  // A real implementation would use a translation service
  
  const commonPhrases = {
    'Hello': {
      'es': '¡Hola!',
      'fr': 'Bonjour!',
      'de': 'Hallo!',
      'it': 'Ciao!',
      'pt': 'Olá!',
      'ru': 'Привет!',
      'ja': 'こんにちは!',
      'zh': '你好!',
      'ar': 'مرحبا!'
    },
    'How are you?': {
      'es': '¿Cómo estás?',
      'fr': 'Comment allez-vous?',
      'de': 'Wie geht es dir?',
      'it': 'Come stai?',
      'pt': 'Como está?',
      'ru': 'Как дела?',
      'ja': 'お元気ですか?',
      'zh': '你好吗?',
      'ar': 'كيف حالك؟'
    },
    'Thank you': {
      'es': 'Gracias',
      'fr': 'Merci',
      'de': 'Danke',
      'it': 'Grazie',
      'pt': 'Obrigado',
      'ru': 'Спасибо',
      'ja': 'ありがとう',
      'zh': '谢谢',
      'ar': 'شكرا لك'
    },
    'Good morning': {
      'es': 'Buenos días',
      'fr': 'Bonjour',
      'de': 'Guten Morgen',
      'it': 'Buongiorno',
      'pt': 'Bom dia',
      'ru': 'Доброе утро',
      'ja': 'おはようございます',
      'zh': '早上好',
      'ar': 'صباح الخير'
    },
    'Goodbye': {
      'es': 'Adiós',
      'fr': 'Au revoir',
      'de': 'Auf Wiedersehen',
      'it': 'Arrivederci',
      'pt': 'Adeus',
      'ru': 'До свидания',
      'ja': 'さようなら',
      'zh': '再见',
      'ar': 'وداعا'
    }
  };
  
  // Check if text is a known phrase
  for (const [phrase, translations] of Object.entries(commonPhrases)) {
    if (text.includes(phrase) && translations[targetLanguage]) {
      return text.replace(phrase, translations[targetLanguage]);
    }
  }
  
  // If no match found, provide a mock translation by adding language-specific elements
  const languagePrefix = {
    'es': '[ES] ',
    'fr': '[FR] ',
    'de': '[DE] ',
    'it': '[IT] ',
    'pt': '[PT] ',
    'ru': '[RU] ',
    'ja': '[JA] ',
    'zh': '[ZH] ',
    'ar': '[AR] '
  };
  
  return `${languagePrefix[targetLanguage] || ''}${text} (translated to ${supportedLanguages[targetLanguage]})`;
}

// Supported languages dictionary
const supportedLanguages = {
  'en': 'English',
  'es': 'Spanish',
  'fr': 'French',
  'de': 'German',
  'it': 'Italian',
  'pt': 'Portuguese',
  'ru': 'Russian',
  'ja': 'Japanese',
  'zh': 'Chinese',
  'ar': 'Arabic'
};