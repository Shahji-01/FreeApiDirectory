// Image Generation API - Provides SVG image generation

// Helper function to generate a random number between min and max
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate a random color
const randomColor = () => {
  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#33A8FF', 
    '#A833FF', '#FF8333', '#33FFE3', '#FFE333', '#8AFF33',
    '#4D8AF0', '#F0E68C', '#6A5ACD', '#7B68EE', '#9370DB',
    '#8A2BE2', '#9ACD32', '#32CD32', '#00FA9A', '#20B2AA',
    '#48D1CC', '#40E0D0', '#00CED1', '#5F9EA0', '#4682B4',
    '#6495ED', '#00BFFF', '#1E90FF', '#FF69B4', '#FF1493'
  ];
  return colors[random(0, colors.length - 1)];
};

// Helper function to generate a random shape
const generateShape = (type, options = {}) => {
  const { width, height, cx, cy, x, y, size } = options;
  
  switch (type) {
    case 'circle':
      return `<circle cx="${cx || 50}" cy="${cy || 50}" r="${size || 20}" fill="${options.fill || randomColor()}" />`;
    case 'rect':
      return `<rect x="${x || 10}" y="${y || 10}" width="${width || 40}" height="${height || 40}" fill="${options.fill || randomColor()}" />`;
    case 'ellipse':
      return `<ellipse cx="${cx || 50}" cy="${cy || 50}" rx="${options.rx || 25}" ry="${options.ry || 15}" fill="${options.fill || randomColor()}" />`;
    case 'line':
      return `<line x1="${options.x1 || 10}" y1="${options.y1 || 10}" x2="${options.x2 || 90}" y2="${options.y2 || 90}" stroke="${options.stroke || randomColor()}" stroke-width="${options.strokeWidth || 2}" />`;
    case 'polygon':
      return `<polygon points="${options.points || '50,10 90,90 10,90'}" fill="${options.fill || randomColor()}" />`;
    case 'path':
      return `<path d="${options.d || 'M20,20 L80,20 L80,80 L20,80 Z'}" fill="${options.fill || randomColor()}" />`;
    default:
      return `<circle cx="50" cy="50" r="20" fill="${randomColor()}" />`;
  }
};

// Generate an SVG with multiple shapes
const generateSVG = (width = 200, height = 200, numShapes = 5, seed = Date.now()) => {
  // Using the seed to maintain deterministic outputs
  Math.seedrandom = (s) => {
    let mask = 0xffffffff;
    let m_w = (123456789 + s) & mask;
    let m_z = (987654321 - s) & mask;
    
    return function() {
      m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask;
      m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask;
      return (((m_z << 16) + (m_w & 65535)) >>> 0) / 4294967296;
    };
  };
  
  // Set random seed
  Math.random = Math.seedrandom(seed);
  
  const shapes = [];
  const shapeTypes = ['circle', 'rect', 'ellipse', 'line', 'polygon', 'path'];
  
  for (let i = 0; i < numShapes; i++) {
    const shapeType = shapeTypes[random(0, shapeTypes.length - 1)];
    
    const options = {
      x: random(0, width),
      y: random(0, height),
      cx: random(0, width),
      cy: random(0, height),
      width: random(10, 50),
      height: random(10, 50),
      size: random(5, 30),
      rx: random(10, 40),
      ry: random(10, 40),
      x1: random(0, width),
      y1: random(0, height),
      x2: random(0, width),
      y2: random(0, height),
      strokeWidth: random(1, 5),
      points: `${random(0, width)},${random(0, height)} ${random(0, width)},${random(0, height)} ${random(0, width)},${random(0, height)}`,
      d: `M${random(0, width)},${random(0, height)} L${random(0, width)},${random(0, height)} L${random(0, width)},${random(0, height)} Z`
    };
    
    shapes.push(generateShape(shapeType, options));
  }
  
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${options.background || 'white'}" />
    ${shapes.join('\n    ')}
  </svg>`;
};

// Generate a pattern SVG
const generatePatternSVG = (type = 'grid', options = {}) => {
  const width = options.width || 200;
  const height = options.height || 200;
  const color1 = options.color1 || randomColor();
  const color2 = options.color2 || randomColor();
  const backgroundColor = options.backgroundColor || '#ffffff';
  
  let pattern = '';
  
  switch (type) {
    case 'grid':
      const gridSize = options.gridSize || 20;
      pattern = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${backgroundColor}" />
        <pattern id="grid" width="${gridSize}" height="${gridSize}" patternUnits="userSpaceOnUse">
          <path d="M ${gridSize} 0 L 0 0 0 ${gridSize}" fill="none" stroke="${color1}" stroke-width="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>`;
      break;
      
    case 'dots':
      const dotSize = options.dotSize || 5;
      const dotSpacing = options.dotSpacing || 20;
      pattern = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${backgroundColor}" />
        <pattern id="dots" width="${dotSpacing}" height="${dotSpacing}" patternUnits="userSpaceOnUse">
          <circle cx="${dotSpacing/2}" cy="${dotSpacing/2}" r="${dotSize}" fill="${color1}" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>`;
      break;
      
    case 'stripes':
      const stripeWidth = options.stripeWidth || 10;
      pattern = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${backgroundColor}" />
        <pattern id="stripes" width="${stripeWidth * 2}" height="${stripeWidth * 2}" patternUnits="userSpaceOnUse">
          <rect width="${stripeWidth}" height="${stripeWidth * 2}" fill="${color1}" />
          <rect x="${stripeWidth}" width="${stripeWidth}" height="${stripeWidth * 2}" fill="${color2}" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#stripes)" />
      </svg>`;
      break;
      
    case 'zigzag':
      const zigzagSize = options.zigzagSize || 20;
      pattern = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${backgroundColor}" />
        <pattern id="zigzag" width="${zigzagSize}" height="${zigzagSize}" patternUnits="userSpaceOnUse">
          <path d="M0,0 L${zigzagSize/2},${zigzagSize/2} L${zigzagSize},0" fill="none" stroke="${color1}" stroke-width="2" />
          <path d="M0,${zigzagSize} L${zigzagSize/2},${zigzagSize/2} L${zigzagSize},${zigzagSize}" fill="none" stroke="${color1}" stroke-width="2" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#zigzag)" />
      </svg>`;
      break;
      
    case 'checkerboard':
      const checkSize = options.checkSize || 20;
      pattern = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${backgroundColor}" />
        <pattern id="checkerboard" width="${checkSize * 2}" height="${checkSize * 2}" patternUnits="userSpaceOnUse">
          <rect width="${checkSize}" height="${checkSize}" fill="${color1}" />
          <rect x="${checkSize}" width="${checkSize}" height="${checkSize}" fill="${color2}" />
          <rect y="${checkSize}" width="${checkSize}" height="${checkSize}" fill="${color2}" />
          <rect x="${checkSize}" y="${checkSize}" width="${checkSize}" height="${checkSize}" fill="${color1}" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#checkerboard)" />
      </svg>`;
      break;
      
    default:
      pattern = generateSVG(width, height, 5);
  }
  
  return pattern;
};

// Generate a QR Code SVG (simplified version for demo)
const generateQRCode = (text = 'Hello World', options = {}) => {
  // This is a simplified representation - a real QR code would need proper encoding
  const size = options.size || 200;
  const darkColor = options.darkColor || '#000000';
  const lightColor = options.lightColor || '#ffffff';
  const moduleSize = size / 25; // QR codes are typically 25x25 for version 1
  
  // Create a pseudo-random pattern based on the text
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  
  // Use the hash to seed our random number generator
  Math.seedrandom = (s) => {
    let seed = s;
    return function() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
  };
  
  Math.random = Math.seedrandom(hash);
  
  // Generate a QR-like pattern
  let modules = [];
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 25; j++) {
      // Always have fixed position detection patterns in corners
      if ((i < 7 && j < 7) || // Top-left
          (i < 7 && j > 17) || // Top-right
          (i > 17 && j < 7)) { // Bottom-left
        
        // Draw the outer square
        if (i === 0 || i === 6 || i === 18 || i === 24 || 
            j === 0 || j === 6 || j === 18 || j === 24) {
          modules.push(`<rect x="${j * moduleSize}" y="${i * moduleSize}" width="${moduleSize}" height="${moduleSize}" fill="${darkColor}" />`);
        }
        // Draw the inner square
        else if (i >= 2 && i <= 4 && j >= 2 && j <= 4 || // Top-left
                 i >= 2 && i <= 4 && j >= 20 && j <= 22 || // Top-right
                 i >= 20 && i <= 22 && j >= 2 && j <= 4) { // Bottom-left
          modules.push(`<rect x="${j * moduleSize}" y="${i * moduleSize}" width="${moduleSize}" height="${moduleSize}" fill="${darkColor}" />`);
        }
        else {
          modules.push(`<rect x="${j * moduleSize}" y="${i * moduleSize}" width="${moduleSize}" height="${moduleSize}" fill="${lightColor}" />`);
        }
      }
      // Random data modules
      else if (Math.random() > 0.5) {
        modules.push(`<rect x="${j * moduleSize}" y="${i * moduleSize}" width="${moduleSize}" height="${moduleSize}" fill="${darkColor}" />`);
      }
    }
  }
  
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${lightColor}" />
    ${modules.join('\n    ')}
  </svg>`;
};

// Generate a bar chart SVG
const generateBarChart = (data = null, options = {}) => {
  const width = options.width || 400;
  const height = options.height || 300;
  const marginTop = options.marginTop || 20;
  const marginRight = options.marginRight || 20;
  const marginBottom = options.marginBottom || 40;
  const marginLeft = options.marginLeft || 40;
  const backgroundColor = options.backgroundColor || '#ffffff';
  
  // Generate random data if none is provided
  if (!data) {
    data = [];
    const categories = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    for (let i = 0; i < random(3, 8); i++) {
      data.push({
        label: categories[i],
        value: random(10, 100)
      });
    }
  }
  
  // Calculate chart dimensions
  const chartWidth = width - marginLeft - marginRight;
  const chartHeight = height - marginTop - marginBottom;
  
  // Calculate bar width
  const barWidth = chartWidth / data.length * 0.8;
  const barSpacing = chartWidth / data.length * 0.2;
  
  // Find the maximum value for scaling
  const maxValue = Math.max(...data.map(d => d.value));
  
  // Generate bars
  let bars = [];
  let xLabels = [];
  let yLabels = [];
  
  // Generate y-axis labels (5 evenly spaced)
  for (let i = 0; i <= 5; i++) {
    const value = Math.round(maxValue / 5 * i);
    const y = chartHeight - (value / maxValue * chartHeight) + marginTop;
    yLabels.push(`
      <line x1="${marginLeft - 5}" y1="${y}" x2="${marginLeft}" y2="${y}" stroke="#666" />
      <text x="${marginLeft - 10}" y="${y}" text-anchor="end" alignment-baseline="middle" font-size="10">${value}</text>
    `);
  }
  
  // Generate bars and x-axis labels
  data.forEach((d, i) => {
    const barHeight = d.value / maxValue * chartHeight;
    const x = marginLeft + (chartWidth / data.length * i) + barSpacing / 2;
    const y = marginTop + chartHeight - barHeight;
    
    bars.push(`<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="${d.color || randomColor()}" />`);
    
    xLabels.push(`
      <line x1="${x + barWidth/2}" y1="${marginTop + chartHeight}" x2="${x + barWidth/2}" y2="${marginTop + chartHeight + 5}" stroke="#666" />
      <text x="${x + barWidth/2}" y="${marginTop + chartHeight + 20}" text-anchor="middle" font-size="10">${d.label}</text>
    `);
  });
  
  // Create the SVG
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${backgroundColor}" />
    
    <!-- Y-axis -->
    <line x1="${marginLeft}" y1="${marginTop}" x2="${marginLeft}" y2="${marginTop + chartHeight}" stroke="#666" />
    ${yLabels.join('')}
    
    <!-- X-axis -->
    <line x1="${marginLeft}" y1="${marginTop + chartHeight}" x2="${marginLeft + chartWidth}" y2="${marginTop + chartHeight}" stroke="#666" />
    ${xLabels.join('')}
    
    <!-- Chart title -->
    ${options.title ? `<text x="${width/2}" y="${marginTop/2}" text-anchor="middle" font-size="14" font-weight="bold">${options.title}</text>` : ''}
    
    <!-- Bars -->
    ${bars.join('\n    ')}
  </svg>`;
};

// Handle API requests
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
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only GET requests are supported'
    });
  }
  
  try {
    // Get query parameters
    const { 
      type = 'shape', 
      width = '200', 
      height = '200',
      patternType = 'grid',
      text = 'Hello World',
      numShapes = '5',
      seed = Date.now().toString(),
      format = 'svg'
    } = req.query;
    
    // Convert parameters
    const widthNum = parseInt(width);
    const heightNum = parseInt(height);
    const numShapesNum = parseInt(numShapes);
    const seedNum = parseInt(seed);
    
    // Handle options
    const options = { ...req.query };
    
    // Generate the appropriate image based on the type
    let svgContent = '';
    
    switch (type) {
      case 'shape':
        svgContent = generateSVG(widthNum, heightNum, numShapesNum, seedNum);
        break;
      case 'pattern':
        svgContent = generatePatternSVG(patternType, { 
          width: widthNum, 
          height: heightNum,
          color1: options.color1,
          color2: options.color2,
          backgroundColor: options.backgroundColor
        });
        break;
      case 'qrcode':
        svgContent = generateQRCode(text, { 
          size: widthNum,
          darkColor: options.darkColor,
          lightColor: options.lightColor
        });
        break;
      case 'chart':
        svgContent = generateBarChart(null, {
          width: widthNum,
          height: heightNum,
          title: options.title,
          backgroundColor: options.backgroundColor
        });
        break;
      default:
        svgContent = generateSVG(widthNum, heightNum);
    }
    
    // Respond based on the requested format
    if (format === 'json') {
      res.status(200).json({
        status: 'success',
        svg: svgContent,
        parameters: {
          type,
          width: widthNum,
          height: heightNum,
          ...options
        }
      });
    } else {
      // Return the SVG directly with proper content type
      res.setHeader('Content-Type', 'image/svg+xml');
      res.status(200).send(svgContent);
    }
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to generate image',
      error: error.message
    });
  }
}