// QR Code Generator API
export default function handler(req, res) {
  if (req.method === 'GET') {
    const { data, size = 200, format = 'svg', color = '000000', background = 'ffffff' } = req.query;
    
    if (!data) {
      return res.status(400).json({ 
        error: 'Data parameter is required for QR code generation' 
      });
    }
    
    try {
      // URL for Google Chart API QR code generation (simple external service for demo)
      // In a production app, you might use a library like `qrcode` to generate QR codes server-side
      const baseUrl = 'https://chart.googleapis.com/chart';
      const params = new URLSearchParams({
        cht: 'qr', // Chart type: QR code
        chs: `${size}x${size}`, // Chart size
        chl: data, // Data to encode
        chco: color, // Color
        chf: `bg,s,${background}` // Background color
      });
      
      const qrCodeUrl = `${baseUrl}?${params.toString()}`;
      
      if (format === 'json') {
        // Return URL as JSON
        return res.status(200).json({
          success: true,
          data: {
            qrCodeUrl,
            encodedData: data,
            size,
            format,
            color,
            background
          }
        });
      } else {
        // Redirect to the QR code image (for direct embedding in img tags)
        return res.redirect(307, qrCodeUrl);
      }
    } catch (error) {
      return res.status(500).json({ 
        error: 'Failed to generate QR code',
        details: error.message
      });
    }
  } else {
    // Return documentation for other methods
    return res.status(200).json({
      endpoint: '/api/services/qr-generator',
      description: 'Generates QR codes from provided data',
      method: 'GET',
      parameters: {
        data: 'String. Required. The data to encode in the QR code (URL, text, etc.)',
        size: 'Number. Optional. Size of the QR code in pixels (default: 200)',
        format: 'String. Optional. Output format "svg" or "json" (default: "svg")',
        color: 'String. Optional. Hex code for QR code color without # (default: "000000")',
        background: 'String. Optional. Hex code for background color without # (default: "ffffff")'
      },
      example: {
        request: 'GET /api/services/qr-generator?data=https://example.com&size=250&format=json',
        response: {
          success: true,
          data: {
            qrCodeUrl: 'https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=https://example.com&chco=000000&chf=bg,s,ffffff',
            encodedData: 'https://example.com',
            size: 250,
            format: 'json',
            color: '000000',
            background: 'ffffff'
          }
        }
      },
      usage: {
        direct: '<img src="/api/services/qr-generator?data=https://example.com" alt="QR Code" />',
        customized: '<img src="/api/services/qr-generator?data=https://example.com&size=300&color=3366FF&background=EEEEEE" alt="Custom QR Code" />'
      }
    });
  }
}