// Text-to-Speech API - Provides base64 encoded audio from text input

// Helper function to generate a simple sine wave tone
const generateTone = (frequency, duration, volume = 0.5, sampleRate = 44100) => {
  const numSamples = Math.floor(duration * sampleRate);
  const buffer = new Array(numSamples);
  
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    buffer[i] = Math.sin(2 * Math.PI * frequency * t) * volume;
  }
  
  return buffer;
};

// Helper function to convert a buffer to WAV format
const bufferToWav = (buffer, sampleRate = 44100) => {
  const numSamples = buffer.length;
  const dataLength = numSamples * 2; // 16-bit PCM
  const totalLength = 44 + dataLength;
  
  const wav = new Uint8Array(totalLength);
  
  // WAV header
  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i++) {
      wav[offset + i] = string.charCodeAt(i);
    }
  };
  
  const writeUint32 = (offset, value) => {
    wav[offset] = value & 0xff;
    wav[offset + 1] = (value >> 8) & 0xff;
    wav[offset + 2] = (value >> 16) & 0xff;
    wav[offset + 3] = (value >> 24) & 0xff;
  };
  
  const writeUint16 = (offset, value) => {
    wav[offset] = value & 0xff;
    wav[offset + 1] = (value >> 8) & 0xff;
  };
  
  writeString(0, 'RIFF'); // ChunkID
  writeUint32(4, 36 + dataLength); // ChunkSize
  writeString(8, 'WAVE'); // Format
  writeString(12, 'fmt '); // Subchunk1ID
  writeUint32(16, 16); // Subchunk1Size
  writeUint16(20, 1); // AudioFormat (PCM)
  writeUint16(22, 1); // NumChannels (Mono)
  writeUint32(24, sampleRate); // SampleRate
  writeUint32(28, sampleRate * 2); // ByteRate
  writeUint16(32, 2); // BlockAlign
  writeUint16(34, 16); // BitsPerSample
  writeString(36, 'data'); // Subchunk2ID
  writeUint32(40, dataLength); // Subchunk2Size
  
  // Convert the float samples to 16-bit PCM
  for (let i = 0; i < numSamples; i++) {
    const sample = Math.max(-1, Math.min(1, buffer[i])); // Clamp to [-1, 1]
    const pcm = Math.floor(sample * 32767); // Convert to 16-bit PCM
    
    writeUint16(44 + i * 2, pcm < 0 ? 65536 + pcm : pcm);
  }
  
  return wav;
};

// Map characters to frequencies (simple version)
const charToFrequency = (char) => {
  const base = 220; // A3 note
  const code = char.toLowerCase().charCodeAt(0);
  
  if (code >= 97 && code <= 122) { // a-z
    return base * Math.pow(2, (code - 97) / 12);
  } else if (code >= 48 && code <= 57) { // 0-9
    return base * 2 * Math.pow(2, (code - 48) / 10);
  } else if (code === 32) { // space
    return 0; // silence
  } else {
    return base * 1.5; // other characters
  }
};

// Generate audio for text (very basic simulation)
const textToSpeech = (text, options = {}) => {
  const speed = options.speed || 1;
  const volume = options.volume || 0.5;
  const sampleRate = 44100;
  const charDuration = 0.15 / speed;
  const pauseDuration = 0.05 / speed;
  
  let buffers = [];
  
  // Generate tones for each character
  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    const frequency = charToFrequency(char);
    
    if (frequency > 0) {
      // Add tone for the character
      buffers.push(generateTone(frequency, charDuration, volume, sampleRate));
    }
    
    // Add a short pause between characters
    if (i < text.length - 1) {
      buffers.push(new Array(Math.floor(pauseDuration * sampleRate)).fill(0));
    }
    
    // Add a longer pause for spaces and punctuation
    if (char === ' ' || '.,:;!?'.includes(char)) {
      buffers.push(new Array(Math.floor(pauseDuration * 2 * sampleRate)).fill(0));
    }
  }
  
  // Concatenate all buffers
  const totalLength = buffers.reduce((sum, buffer) => sum + buffer.length, 0);
  const combinedBuffer = new Array(totalLength);
  
  let offset = 0;
  for (const buffer of buffers) {
    for (let i = 0; i < buffer.length; i++) {
      combinedBuffer[offset + i] = buffer[i];
    }
    offset += buffer.length;
  }
  
  // Convert to WAV format
  const wavBuffer = bufferToWav(combinedBuffer, sampleRate);
  
  // Convert to base64
  let binary = '';
  for (let i = 0; i < wavBuffer.length; i++) {
    binary += String.fromCharCode(wavBuffer[i]);
  }
  
  // Use Buffer in Node.js environment
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(wavBuffer).toString('base64');
  }
  
  // Fallback for other environments
  return btoa(binary);
};

// Generate more realistic speech-like audio (still simple but better than pure tones)
const generateSpeechAudio = (text, options = {}) => {
  const voice = options.voice || 'neutral';
  const speed = options.speed || 1;
  const pitch = options.pitch || 1;
  const volume = options.volume || 0.5;
  const sampleRate = 44100;
  
  // Different voice profiles
  const voiceProfiles = {
    neutral: { baseFreq: 220, freqRange: 50, formant: 800 },
    male: { baseFreq: 120, freqRange: 40, formant: 700 },
    female: { baseFreq: 250, freqRange: 70, formant: 1100 },
    child: { baseFreq: 300, freqRange: 100, formant: 1300 },
    robot: { baseFreq: 180, freqRange: 20, formant: 500 }
  };
  
  const profile = voiceProfiles[voice] || voiceProfiles.neutral;
  const baseFreq = profile.baseFreq * pitch;
  const freqRange = profile.freqRange * pitch;
  const formant = profile.formant;
  
  // Build a more complex waveform for each syllable
  const generateSyllable = (duration, frequency) => {
    const samples = Math.floor(duration * sampleRate);
    const buffer = new Array(samples);
    
    // Add some randomization for more natural sound
    const freqJitter = Math.random() * 10 - 5;
    const actualFreq = frequency + freqJitter;
    
    // Simple ADSR envelope
    const attackTime = 0.1 * duration;
    const decayTime = 0.1 * duration;
    const sustainLevel = 0.7;
    const releaseTime = 0.2 * duration;
    
    // Formants (very simplified)
    const formantFreq = formant;
    const formantAmp = 0.3;
    
    for (let i = 0; i < samples; i++) {
      const t = i / sampleRate;
      let envelope = 0;
      
      // Apply ADSR envelope
      if (t < attackTime) {
        envelope = t / attackTime;
      } else if (t < attackTime + decayTime) {
        envelope = 1.0 - (1.0 - sustainLevel) * (t - attackTime) / decayTime;
      } else if (t < duration - releaseTime) {
        envelope = sustainLevel;
      } else {
        envelope = sustainLevel * (1 - (t - (duration - releaseTime)) / releaseTime);
      }
      
      // Basic waveform with some harmonics and formants
      const fundamental = Math.sin(2 * Math.PI * actualFreq * t);
      const harmonic1 = 0.5 * Math.sin(2 * Math.PI * actualFreq * 2 * t);
      const harmonic2 = 0.25 * Math.sin(2 * Math.PI * actualFreq * 3 * t);
      const formant1 = formantAmp * Math.sin(2 * Math.PI * formantFreq * t);
      
      buffer[i] = envelope * volume * (fundamental + harmonic1 + harmonic2 + formant1) / 2.75;
    }
    
    return buffer;
  };
  
  // Analyze text to determine syllables (very simplified)
  const syllables = [];
  const words = text.split(/\\s+/);
  
  const vowels = 'aeiouy';
  const consonantsFollowedByE = 'bcdfghjklmnpqrstvwxz';
  
  for (const word of words) {
    let syllableCount = 0;
    let inVowelGroup = false;
    
    for (let i = 0; i < word.length; i++) {
      const char = word[i].toLowerCase();
      const isVowel = vowels.includes(char);
      
      if (isVowel && !inVowelGroup) {
        syllableCount++;
        inVowelGroup = true;
      } else if (!isVowel) {
        inVowelGroup = false;
      }
      
      // Handle silent e at the end
      if (i === word.length - 1 && char === 'e' && consonantsFollowedByE.includes(word[i-1].toLowerCase())) {
        syllableCount--;
      }
    }
    
    // Ensure at least one syllable per word
    syllableCount = Math.max(syllableCount, 1);
    
    // Generate frequency sequence for the word
    const wordFrequencies = [];
    const baseSyllableFreq = baseFreq + (Math.random() * freqRange - freqRange/2);
    
    for (let i = 0; i < syllableCount; i++) {
      // Create a natural intonation pattern
      const position = i / syllableCount;
      let freqModifier = 1.0;
      
      // Rising and falling intonation
      if (position < 0.3) {
        freqModifier = 0.95 + position * 0.5; // Rising
      } else if (position > 0.7) {
        freqModifier = 1.1 - (position - 0.7) * 0.5; // Falling
      } else {
        freqModifier = 1.1;
      }
      
      wordFrequencies.push(baseSyllableFreq * freqModifier);
    }
    
    syllables.push({
      text: word,
      count: syllableCount,
      frequencies: wordFrequencies
    });
  }
  
  // Generate audio for each syllable
  let buffers = [];
  
  for (const word of syllables) {
    const syllableDuration = 0.2 / speed;
    const pauseDuration = 0.05 / speed;
    
    // Add each syllable
    for (let i = 0; i < word.count; i++) {
      buffers.push(generateSyllable(syllableDuration, word.frequencies[i]));
      
      // Small pause between syllables
      if (i < word.count - 1) {
        buffers.push(new Array(Math.floor(pauseDuration * sampleRate * 0.5)).fill(0));
      }
    }
    
    // Pause between words
    buffers.push(new Array(Math.floor(pauseDuration * sampleRate * 2)).fill(0));
  }
  
  // Concatenate all buffers
  const totalLength = buffers.reduce((sum, buffer) => sum + buffer.length, 0);
  const combinedBuffer = new Array(totalLength);
  
  let offset = 0;
  for (const buffer of buffers) {
    for (let i = 0; i < buffer.length; i++) {
      combinedBuffer[offset + i] = buffer[i];
    }
    offset += buffer.length;
  }
  
  // Convert to WAV format
  const wavBuffer = bufferToWav(combinedBuffer, sampleRate);
  
  // Convert to base64
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(wavBuffer).toString('base64');
  }
  
  // Fallback for other environments
  let binary = '';
  for (let i = 0; i < wavBuffer.length; i++) {
    binary += String.fromCharCode(wavBuffer[i]);
  }
  return btoa(binary);
};

// Main API handler
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
      text = 'Hello World',
      voice = 'neutral',
      speed = '1',
      pitch = '1',
      volume = '0.5',
      format = 'json',
      quality = 'standard'
    } = req.query;
    
    if (!text) {
      return res.status(400).json({ 
        error: 'Missing text parameter',
        message: 'Please provide text to convert to speech'
      });
    }
    
    // Limit text length to prevent abuse
    if (text.length > 200) {
      return res.status(400).json({
        error: 'Text too long',
        message: 'Text must be 200 characters or less'
      });
    }
    
    // Convert parameters
    const options = {
      voice,
      speed: parseFloat(speed),
      pitch: parseFloat(pitch),
      volume: parseFloat(volume)
    };
    
    // Generate speech audio
    let audioBase64;
    if (quality === 'enhanced') {
      audioBase64 = generateSpeechAudio(text, options);
    } else {
      audioBase64 = textToSpeech(text, options);
    }
    
    // Respond with base64 or raw audio
    if (format === 'json') {
      res.status(200).json({
        status: 'success',
        text,
        audio: {
          format: 'wav',
          encoding: 'base64',
          data: audioBase64
        },
        parameters: {
          voice,
          speed: options.speed,
          pitch: options.pitch,
          volume: options.volume
        }
      });
    } else if (format === 'audio') {
      // Return audio data directly
      const audioBuffer = Buffer.from(audioBase64, 'base64');
      res.setHeader('Content-Type', 'audio/wav');
      res.setHeader('Content-Length', audioBuffer.length);
      res.status(200).send(audioBuffer);
    } else {
      return res.status(400).json({
        error: 'Invalid format',
        message: 'Format must be one of: json, audio'
      });
    }
  } catch (error) {
    console.error('Error generating speech:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to generate speech',
      error: error.message
    });
  }
}