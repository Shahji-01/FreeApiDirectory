// Custom Random User API - Generates random user data for testing and prototyping

// Function to generate a random integer between min and max (inclusive)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to get a random item from an array
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Data for random user generation
const firstNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 
  'William', 'Elizabeth', 'David', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah',
  'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty',
  'Anthony', 'Dorothy', 'Donald', 'Sandra', 'Mark', 'Ashley', 'Paul', 'Kimberly',
  'Steven', 'Donna', 'Andrew', 'Emily', 'Kenneth', 'Carol', 'Joshua', 'Michelle',
  'Kevin', 'Amanda', 'Brian', 'Melissa', 'George', 'Deborah', 'Timothy', 'Stephanie'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
  'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
  'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young',
  'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell'
];

const domains = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com',
  'mail.com', 'protonmail.com', 'example.com', 'company.com', 'business.org'
];

const cities = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
  'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
  'Fort Worth', 'Columbus', 'San Francisco', 'Charlotte', 'Indianapolis', 'Seattle',
  'Denver', 'Boston', 'Portland', 'Atlanta', 'Miami', 'Detroit', 'Minneapolis'
];

const states = [
  { name: 'Alabama', abbr: 'AL' }, { name: 'Alaska', abbr: 'AK' }, { name: 'Arizona', abbr: 'AZ' },
  { name: 'Arkansas', abbr: 'AR' }, { name: 'California', abbr: 'CA' }, { name: 'Colorado', abbr: 'CO' },
  { name: 'Connecticut', abbr: 'CT' }, { name: 'Delaware', abbr: 'DE' }, { name: 'Florida', abbr: 'FL' },
  { name: 'Georgia', abbr: 'GA' }, { name: 'Hawaii', abbr: 'HI' }, { name: 'Idaho', abbr: 'ID' },
  { name: 'Illinois', abbr: 'IL' }, { name: 'Indiana', abbr: 'IN' }, { name: 'Iowa', abbr: 'IA' },
  { name: 'Kansas', abbr: 'KS' }, { name: 'Kentucky', abbr: 'KY' }, { name: 'Louisiana', abbr: 'LA' },
  { name: 'Maine', abbr: 'ME' }, { name: 'Maryland', abbr: 'MD' }, { name: 'Massachusetts', abbr: 'MA' },
  { name: 'Michigan', abbr: 'MI' }, { name: 'Minnesota', abbr: 'MN' }, { name: 'Mississippi', abbr: 'MS' },
  { name: 'Missouri', abbr: 'MO' }, { name: 'Montana', abbr: 'MT' }, { name: 'Nebraska', abbr: 'NE' },
  { name: 'Nevada', abbr: 'NV' }, { name: 'New Hampshire', abbr: 'NH' }, { name: 'New Jersey', abbr: 'NJ' },
  { name: 'New Mexico', abbr: 'NM' }, { name: 'New York', abbr: 'NY' }, { name: 'North Carolina', abbr: 'NC' },
  { name: 'North Dakota', abbr: 'ND' }, { name: 'Ohio', abbr: 'OH' }, { name: 'Oklahoma', abbr: 'OK' },
  { name: 'Oregon', abbr: 'OR' }, { name: 'Pennsylvania', abbr: 'PA' }, { name: 'Rhode Island', abbr: 'RI' },
  { name: 'South Carolina', abbr: 'SC' }, { name: 'South Dakota', abbr: 'SD' }, { name: 'Tennessee', abbr: 'TN' },
  { name: 'Texas', abbr: 'TX' }, { name: 'Utah', abbr: 'UT' }, { name: 'Vermont', abbr: 'VT' },
  { name: 'Virginia', abbr: 'VA' }, { name: 'Washington', abbr: 'WA' }, { name: 'West Virginia', abbr: 'WV' },
  { name: 'Wisconsin', abbr: 'WI' }, { name: 'Wyoming', abbr: 'WY' }
];

const countries = [
  { name: 'United States', code: 'US' }, { name: 'Canada', code: 'CA' }, 
  { name: 'United Kingdom', code: 'GB' }, { name: 'Australia', code: 'AU' }, 
  { name: 'Germany', code: 'DE' }, { name: 'France', code: 'FR' }, 
  { name: 'Spain', code: 'ES' }, { name: 'Italy', code: 'IT' }, 
  { name: 'Japan', code: 'JP' }, { name: 'Brazil', code: 'BR' }
];

// Generate a single random user
const generateRandomUser = () => {
  const firstName = getRandomItem(firstNames);
  const lastName = getRandomItem(lastNames);
  const state = getRandomItem(states);
  const country = getRandomItem(countries);
  const age = randomInt(18, 80);
  const gender = randomInt(0, 1) === 0 ? 'male' : 'female';
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${getRandomItem(domains)}`;
  
  // Generate phone number
  const areaCode = randomInt(100, 999);
  const prefix = randomInt(100, 999);
  const lineNumber = randomInt(1000, 9999);
  const phone = `(${areaCode}) ${prefix}-${lineNumber}`;
  
  // Generate address
  const streetNumber = randomInt(1, 9999);
  const streetName = `${getRandomItem(lastNames)} ${getRandomItem(['St', 'Rd', 'Ave', 'Blvd', 'Ln', 'Dr', 'Way', 'Ct'])}`;
  const city = getRandomItem(cities);
  const zipCode = randomInt(10000, 99999);
  
  // Generate avatar URL (using placeholder service)
  const avatarId = randomInt(1, 70);
  const avatarUrl = `https://i.pravatar.cc/300?img=${avatarId}`;
  
  return {
    id: randomInt(1000, 9999),
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    email,
    gender,
    age,
    phone,
    address: {
      street: `${streetNumber} ${streetName}`,
      city,
      state: state.name,
      stateCode: state.abbr,
      zipCode,
      country: country.name,
      countryCode: country.code
    },
    avatar: avatarUrl,
    username: `${firstName.toLowerCase()}${randomInt(1, 999)}`,
    registeredDate: new Date(Date.now() - randomInt(1, 1000) * 24 * 60 * 60 * 1000).toISOString()
  };
};

// Generate multiple random users
const generateRandomUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(generateRandomUser());
  }
  return users;
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
    const count = parseInt(req.query.count) || 1;
    const gender = req.query.gender; // Optional gender filter
    const minAge = parseInt(req.query.minAge) || null; // Optional min age
    const maxAge = parseInt(req.query.maxAge) || null; // Optional max age
    
    // Validate count value (limit to 100 to prevent abuse)
    const validCount = Math.min(Math.max(count, 1), 100);
    
    // Generate users
    let users = generateRandomUsers(validCount);
    
    // Apply filters
    if (gender === 'male' || gender === 'female') {
      users = users.filter(user => user.gender === gender);
    }
    
    if (minAge !== null) {
      users = users.filter(user => user.age >= minAge);
    }
    
    if (maxAge !== null) {
      users = users.filter(user => user.age <= maxAge);
    }
    
    // Return the result
    return res.status(200).json({
      info: {
        count: users.length,
        parameters: {
          count: validCount,
          ...(gender && { gender }),
          ...(minAge !== null && { minAge }),
          ...(maxAge !== null && { maxAge })
        },
        version: '1.0'
      },
      results: users
    });
  } catch (error) {
    console.error('Error generating random users:', error);
    return res.status(500).json({ error: 'Failed to generate random users' });
  }
}