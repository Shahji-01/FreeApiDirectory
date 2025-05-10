// Custom Colors API - Provides color information, conversions, and palettes

// Color data with comprehensive information
const colors = [
  {
    id: 1,
    name: "Red",
    hex: "#FF0000",
    rgb: { r: 255, g: 0, b: 0 },
    hsl: { h: 0, s: 100, l: 50 },
    family: "primary",
    psychology: ["passion", "energy", "danger", "excitement"],
    complementary: "#00FFFF"
  },
  {
    id: 2,
    name: "Blue",
    hex: "#0000FF",
    rgb: { r: 0, g: 0, b: 255 },
    hsl: { h: 240, s: 100, l: 50 },
    family: "primary",
    psychology: ["trust", "loyalty", "wisdom", "confidence"],
    complementary: "#FFFF00"
  },
  {
    id: 3,
    name: "Green",
    hex: "#00FF00",
    rgb: { r: 0, g: 255, b: 0 },
    hsl: { h: 120, s: 100, l: 50 },
    family: "primary",
    psychology: ["growth", "harmony", "freshness", "safety"],
    complementary: "#FF00FF"
  },
  {
    id: 4,
    name: "Yellow",
    hex: "#FFFF00",
    rgb: { r: 255, g: 255, b: 0 },
    hsl: { h: 60, s: 100, l: 50 },
    family: "primary",
    psychology: ["happiness", "attention", "energy", "warmth"],
    complementary: "#0000FF"
  },
  {
    id: 5,
    name: "Purple",
    hex: "#800080",
    rgb: { r: 128, g: 0, b: 128 },
    hsl: { h: 300, s: 100, l: 25 },
    family: "secondary",
    psychology: ["creativity", "royalty", "wisdom", "mystery"],
    complementary: "#008000"
  },
  {
    id: 6,
    name: "Orange",
    hex: "#FFA500",
    rgb: { r: 255, g: 165, b: 0 },
    hsl: { h: 39, s: 100, l: 50 },
    family: "secondary",
    psychology: ["enthusiasm", "creativity", "determination", "stimulation"],
    complementary: "#0000FF"
  },
  {
    id: 7,
    name: "Pink",
    hex: "#FFC0CB",
    rgb: { r: 255, g: 192, b: 203 },
    hsl: { h: 350, s: 100, l: 88 },
    family: "tertiary",
    psychology: ["compassion", "nurturing", "playfulness", "sweet"],
    complementary: "#C0FFCB"
  },
  {
    id: 8,
    name: "Brown",
    hex: "#A52A2A",
    rgb: { r: 165, g: 42, b: 42 },
    hsl: { h: 0, s: 59, l: 41 },
    family: "tertiary",
    psychology: ["reliability", "stability", "earthy", "comfort"],
    complementary: "#2AA5A5"
  },
  {
    id: 9,
    name: "White",
    hex: "#FFFFFF",
    rgb: { r: 255, g: 255, b: 255 },
    hsl: { h: 0, s: 0, l: 100 },
    family: "neutral",
    psychology: ["purity", "innocence", "cleanliness", "simplicity"],
    complementary: "#000000"
  },
  {
    id: 10,
    name: "Black",
    hex: "#000000",
    rgb: { r: 0, g: 0, b: 0 },
    hsl: { h: 0, s: 0, l: 0 },
    family: "neutral",
    psychology: ["elegance", "power", "sophistication", "formality"],
    complementary: "#FFFFFF"
  },
  {
    id: 11,
    name: "Gray",
    hex: "#808080",
    rgb: { r: 128, g: 128, b: 128 },
    hsl: { h: 0, s: 0, l: 50 },
    family: "neutral",
    psychology: ["neutrality", "balance", "sophistication", "timelessness"],
    complementary: "#808080"
  },
  {
    id: 12,
    name: "Teal",
    hex: "#008080",
    rgb: { r: 0, g: 128, b: 128 },
    hsl: { h: 180, s: 100, l: 25 },
    family: "secondary",
    psychology: ["balance", "sophistication", "calming", "depth"],
    complementary: "#800000"
  },
  {
    id: 13,
    name: "Magenta",
    hex: "#FF00FF",
    rgb: { r: 255, g: 0, b: 255 },
    hsl: { h: 300, s: 100, l: 50 },
    family: "secondary",
    psychology: ["creativity", "energy", "harmony", "balance"],
    complementary: "#00FF00"
  },
  {
    id: 14,
    name: "Cyan",
    hex: "#00FFFF",
    rgb: { r: 0, g: 255, b: 255 },
    hsl: { h: 180, s: 100, l: 50 },
    family: "secondary",
    psychology: ["tranquility", "clarity", "refreshing", "calming"],
    complementary: "#FF0000"
  },
  {
    id: 15,
    name: "Lime",
    hex: "#BFFF00",
    rgb: { r: 191, g: 255, b: 0 },
    hsl: { h: 75, s: 100, l: 50 },
    family: "tertiary",
    psychology: ["energy", "vitality", "freshness", "youthfulness"],
    complementary: "#4D00FF"
  },
  {
    id: 16,
    name: "Maroon",
    hex: "#800000",
    rgb: { r: 128, g: 0, b: 0 },
    hsl: { h: 0, s: 100, l: 25 },
    family: "tertiary",
    psychology: ["confidence", "richness", "elegance", "luxury"],
    complementary: "#008080"
  },
  {
    id: 17,
    name: "Navy",
    hex: "#000080",
    rgb: { r: 0, g: 0, b: 128 },
    hsl: { h: 240, s: 100, l: 25 },
    family: "tertiary",
    psychology: ["discipline", "stability", "trust", "professionalism"],
    complementary: "#808000"
  },
  {
    id: 18,
    name: "Gold",
    hex: "#FFD700",
    rgb: { r: 255, g: 215, b: 0 },
    hsl: { h: 51, s: 100, l: 50 },
    family: "metallic",
    psychology: ["wealth", "success", "abundance", "prestige"],
    complementary: "#0027FF"
  },
  {
    id: 19,
    name: "Silver",
    hex: "#C0C0C0",
    rgb: { r: 192, g: 192, b: 192 },
    hsl: { h: 0, s: 0, l: 75 },
    family: "metallic",
    psychology: ["modernity", "sleekness", "sophistication", "technology"],
    complementary: "#C0C0C0"
  },
  {
    id: 20,
    name: "Coral",
    hex: "#FF7F50",
    rgb: { r: 255, g: 127, b: 80 },
    hsl: { h: 16, s: 100, l: 66 },
    family: "tertiary",
    psychology: ["energy", "warmth", "vibrancy", "enthusiasm"],
    complementary: "#50AFFF"
  }
];

// Color palettes - predefined color schemes
const palettes = [
  {
    id: 1,
    name: "Sunset",
    colors: ["#FF7F50", "#FFD700", "#FF0000", "#800000"],
    mood: "warm",
    description: "Warm colors reminiscent of a beautiful sunset"
  },
  {
    id: 2,
    name: "Ocean",
    colors: ["#000080", "#0000FF", "#00FFFF", "#008080"],
    mood: "cool",
    description: "Cool blues and teals that evoke the feeling of the ocean"
  },
  {
    id: 3,
    name: "Forest",
    colors: ["#006400", "#00FF00", "#808000", "#556B2F"],
    mood: "natural",
    description: "Various shades of green representing a lush forest"
  },
  {
    id: 4,
    name: "Monochrome",
    colors: ["#000000", "#333333", "#666666", "#999999", "#CCCCCC", "#FFFFFF"],
    mood: "neutral",
    description: "A grayscale palette from black to white"
  },
  {
    id: 5,
    name: "Pastel",
    colors: ["#FFD1DC", "#FFECB3", "#E6F6D7", "#B5EAD7", "#C7CEEA"],
    mood: "soft",
    description: "Soft, muted colors that are easy on the eyes"
  }
];

// Generate a random color
const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  
  // Convert RGB to hex
  const toHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  
  // Calculate HSL values
  const calculateHSL = (r, g, b) => {
    // Convert RGB to values between 0 and 1
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h /= 6;
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };
  
  const hsl = calculateHSL(r, g, b);
  
  // Calculate complementary color
  const complementary = `#${toHex(255 - r)}${toHex(255 - g)}${toHex(255 - b)}`;
  
  return {
    hex,
    rgb: { r, g, b },
    hsl,
    complementary
  };
};

// Get color families
const getColorFamilies = () => {
  const families = new Set();
  colors.forEach(color => {
    families.add(color.family);
  });
  return Array.from(families);
};

// Generate a color palette based on seed color
const generatePalette = (seedColor, type = 'complementary', count = 4) => {
  // Clean up the hex color format if needed
  if (!seedColor.startsWith('#')) {
    seedColor = `#${seedColor}`;
  }
  
  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  
  // RGB to HSL conversion for color manipulation
  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h /= 6;
    }
    
    return { h: h * 360, s: s * 100, l: l * 100 };
  };
  
  // HSL to RGB conversion
  const hslToRgb = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;
    
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };
  
  // RGB to Hex
  const rgbToHex = (r, g, b) => {
    const toHex = c => {
      const hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };
  
  const rgb = hexToRgb(seedColor);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  const palette = [seedColor];
  
  // Generate different palette types
  switch (type) {
    case 'complementary':
      // Add the complementary color (opposite on the color wheel)
      const complementary = (hsl.h + 180) % 360;
      const compRgb = hslToRgb(complementary, hsl.s, hsl.l);
      palette.push(rgbToHex(compRgb.r, compRgb.g, compRgb.b));
      
      // Add a couple variations
      if (count > 2) {
        // Lighter version of the original
        const lightRgb = hslToRgb(hsl.h, Math.max(0, hsl.s - 20), Math.min(100, hsl.l + 20));
        palette.push(rgbToHex(lightRgb.r, lightRgb.g, lightRgb.b));
        
        // Lighter version of the complementary
        const lightCompRgb = hslToRgb(complementary, Math.max(0, hsl.s - 20), Math.min(100, hsl.l + 20));
        palette.push(rgbToHex(lightCompRgb.r, lightCompRgb.g, lightCompRgb.b));
      }
      break;
      
    case 'analogous':
      // Add colors adjacent on the color wheel
      for (let i = 1; i < count; i++) {
        const angle = (hsl.h + (i * 30)) % 360;
        const analogRgb = hslToRgb(angle, hsl.s, hsl.l);
        palette.push(rgbToHex(analogRgb.r, analogRgb.g, analogRgb.b));
      }
      break;
      
    case 'triadic':
      // Add two colors evenly spaced on the color wheel (120 degrees apart)
      const triadic1 = (hsl.h + 120) % 360;
      const triadic2 = (hsl.h + 240) % 360;
      
      const tri1Rgb = hslToRgb(triadic1, hsl.s, hsl.l);
      const tri2Rgb = hslToRgb(triadic2, hsl.s, hsl.l);
      
      palette.push(rgbToHex(tri1Rgb.r, tri1Rgb.g, tri1Rgb.b));
      palette.push(rgbToHex(tri2Rgb.r, tri2Rgb.g, tri2Rgb.b));
      
      // Add variations if more colors are needed
      if (count > 3) {
        const lightRgb = hslToRgb(hsl.h, hsl.s, Math.min(100, hsl.l + 20));
        palette.push(rgbToHex(lightRgb.r, lightRgb.g, lightRgb.b));
      }
      break;
      
    case 'monochromatic':
      // Create variations with the same hue but different saturation/lightness
      for (let i = 1; i < count; i++) {
        const l = Math.max(0, Math.min(100, hsl.l - 15 + (i * 30)));
        const s = Math.max(0, Math.min(100, hsl.s - 10 + (i * 20)));
        
        const monoRgb = hslToRgb(hsl.h, s, l);
        palette.push(rgbToHex(monoRgb.r, monoRgb.g, monoRgb.b));
      }
      break;
      
    default:
      // Random palette as fallback
      for (let i = 1; i < count; i++) {
        const randomRgb = {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256)
        };
        palette.push(rgbToHex(randomRgb.r, randomRgb.g, randomRgb.b));
      }
  }
  
  return palette.slice(0, count);
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
    const { id, name, family, random, palette, seed, type, count: countParam } = req.query;
    const count = countParam ? parseInt(countParam) : 4;
    
    // Return color metadata
    if (req.query.metadata === 'true') {
      return res.status(200).json({
        families: getColorFamilies(),
        count: colors.length,
        paletteTypes: ["complementary", "analogous", "triadic", "monochromatic"],
        palettes: palettes.map(p => ({ id: p.id, name: p.name, mood: p.mood }))
      });
    }
    
    // Generate a random color
    if (random === 'true') {
      return res.status(200).json(generateRandomColor());
    }
    
    // Return a specific predefined palette
    if (palette) {
      const selectedPalette = palettes.find(p => 
        p.id.toString() === palette || 
        p.name.toLowerCase() === palette.toLowerCase()
      );
      
      if (!selectedPalette) {
        return res.status(404).json({ error: 'Palette not found' });
      }
      
      return res.status(200).json(selectedPalette);
    }
    
    // Generate a custom palette based on a seed color
    if (seed) {
      const paletteType = type || 'complementary';
      const paletteCount = count > 10 ? 10 : count; // Limit to 10 colors max
      
      const generatedPalette = generatePalette(seed, paletteType, paletteCount);
      
      return res.status(200).json({
        seed,
        type: paletteType,
        count: generatedPalette.length,
        colors: generatedPalette
      });
    }
    
    // Return a specific color by ID
    if (id) {
      const color = colors.find(c => c.id.toString() === id);
      
      if (!color) {
        return res.status(404).json({ error: 'Color not found' });
      }
      
      return res.status(200).json(color);
    }
    
    // Return a specific color by name
    if (name) {
      const color = colors.find(c => 
        c.name.toLowerCase() === name.toLowerCase()
      );
      
      if (!color) {
        return res.status(404).json({ error: 'Color not found' });
      }
      
      return res.status(200).json(color);
    }
    
    // Filter colors by family
    if (family) {
      const filteredColors = colors.filter(c => 
        c.family.toLowerCase() === family.toLowerCase()
      );
      
      if (filteredColors.length === 0) {
        return res.status(404).json({ error: 'No colors found for the specified family' });
      }
      
      return res.status(200).json({
        family,
        count: filteredColors.length,
        colors: filteredColors
      });
    }
    
    // Return all colors
    return res.status(200).json({
      count: colors.length,
      colors
    });
  } catch (error) {
    console.error('Error handling colors request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}