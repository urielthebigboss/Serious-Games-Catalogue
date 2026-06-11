// data.js

const games = [
  {
    id: '1',
    status: 'completed',
    title: 'Linguistic Laboratory',
    description: 'Master new languages through immersive gameplay and interactive challenges.',
    fullDescription: 'Linguistic Laboratory is an innovative educational game designed to help players master new languages through immersive gameplay and interactive challenges. The game combines cutting-edge AI technology with proven language learning methodologies.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop',
    category: 'Language',
    tags: ['Education', 'Language', 'AI-Powered'],
    rating: 4.8,
    players: '1-4',
    duration: '30-60 min',
    difficulty: 'Medium',
    releaseDate: '2024',
    developer: 'EduTech Studios',
    features: [
      'AI-powered conversation practice',
      'Real-time pronunciation feedback',
      'Cultural immersion scenarios',
      'Progress tracking dashboard',
      'Multiplayer language challenges'
    ]
  },
  {
    id: '2',
    title: 'Math Quest Adventures',
    status: 'waiting',
    description: 'Solve mathematical puzzles and embark on epic adventures.',
    fullDescription: 'Math Quest Adventures transforms mathematics learning into an exciting journey. Players solve increasingly complex mathematical puzzles to progress through magical realms.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop',
    category: 'Mathematics',
    tags: ['Math', 'Adventure', 'Puzzle'],
    rating: 4.6,
    players: '1-2',
    duration: '20-45 min',
    difficulty: 'Easy',
    releaseDate: '2024',
    developer: 'Number Ninjas',
    features: [
      'Adaptive difficulty system',
      'Visual problem solving',
      'Step-by-step explanations',
      'Achievement system'
    ]
  },
  {
    id: '3',
    title: 'History Explorer VR',
    status: 'failed',
    description: 'Travel back in time and experience historical events firsthand.',
    fullDescription: 'History Explorer VR offers an unprecedented opportunity to experience history firsthand. Using virtual reality technology, players can walk through ancient civilizations.',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&h=600&fit=crop',
    category: 'History',
    tags: ['VR', 'History', 'Immersive'],
    rating: 4.9,
    players: '1',
    duration: '45-90 min',
    difficulty: 'Medium',
    releaseDate: '2024',
    developer: 'Time Travel Tech',
    features: [
      'VR immersion technology',
      'Historically accurate environments',
      'Interactive historical figures',
      'Quiz mode for learning'
    ]
  },
  {
    id: '4',
    title: 'Science Lab Simulator',
    status: 'completed',
    description: 'Conduct virtual experiments and discover scientific principles.',
    fullDescription: 'Science Lab Simulator provides a safe and engaging virtual laboratory where players can conduct experiments across multiple scientific disciplines.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop',
    category: 'Science',
    tags: ['Science', 'Simulation', 'Experiment'],
    rating: 4.7,
    players: '1-3',
    duration: '30-60 min',
    difficulty: 'Hard',
    releaseDate: '2024',
    developer: 'Lab Innovations',
    features: [
      'Realistic physics simulation',
      'Multiple scientific disciplines',
      'Safe experiment environment',
      'Detailed result analysis'
    ]
  },
  {
    id: '5',
    title: 'Code Master Pro',
    status: 'waiting',
    description: 'Learn programming through interactive coding challenges.',
    fullDescription: 'Code Master Pro makes learning to code accessible and fun. Through gamified challenges and real-world projects, players develop programming skills.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    category: 'Programming',
    tags: ['Coding', 'Programming', 'Tech'],
    rating: 4.5,
    players: '1',
    duration: '15-45 min',
    difficulty: 'Hard',
    releaseDate: '2024',
    developer: 'Code Wizards',
    features: [
      'Multiple programming languages',
      'Real-world projects',
      'Code review system',
      'Peer collaboration'
    ]
  },
  {
    id: '6',
    status: 'completed',
    title: 'Art Studio Express',
    description: 'Unleash creativity with digital art tools and tutorials.',
    fullDescription: 'Art Studio Express provides a comprehensive digital art learning platform. From basic drawing to advanced digital painting.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop',
    category: 'Art',
    tags: ['Art', 'Creative', 'Design'],
    rating: 4.4,
    players: '1',
    duration: '20-60 min',
    difficulty: 'Easy',
    releaseDate: '2024',
    developer: 'Creative Minds',
    features: [
      'Professional art tools',
      'Step-by-step tutorials',
      'Community gallery',
      'Technique library'
    ]
  }
];

const categories = [
  { id: 'all', name: 'All Games', count: 6 },
  { id: 'language', name: 'Language', count: 1 },
  { id: 'mathematics', name: 'Mathematics', count: 1 },
  { id: 'history', name: 'History', count: 1 },
  { id: 'science', name: 'Science', count: 1 },
  { id: 'programming', name: 'Programming', count: 1 },
  { id: 'art', name: 'Art', count: 1 },
];
