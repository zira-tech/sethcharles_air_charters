export interface Aircraft {
  id: string;
  name: string;
  category: 'light' | 'midsize' | 'heavy';
  passengers: number;
  range: number;
  speed: number;
  baggage: number;
  startingPrice: number;
  image: string;
  features: string[];
}

export interface Route {
  id: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  flightTime: string;
  description: string;
}

export const fleet: Aircraft[] = [
  {
    id: 'citation-mustang',
    name: 'Citation Mustang',
    category: 'light',
    passengers: 4,
    range: 2150,
    speed: 630,
    baggage: 6,
    startingPrice: 4500,
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80',
    features: ['WiFi', 'Pressurized Cabin', 'Lavatory', 'Club Seating'],
  },
  {
    id: 'learjet-75',
    name: 'Learjet 75',
    category: 'light',
    passengers: 8,
    range: 3700,
    speed: 860,
    baggage: 8,
    startingPrice: 6800,
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=80',
    features: ['WiFi', 'Full Stand-Up Cabin', 'Galley', 'Entertainment System'],
  },
  {
    id: 'citation-xls',
    name: 'Citation XLS+',
    category: 'midsize',
    passengers: 9,
    range: 3800,
    speed: 800,
    baggage: 10,
    startingPrice: 8500,
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&q=80',
    features: ['WiFi', 'Satellite Phone', 'Full Galley', 'Private Lavatory'],
  },
  {
    id: 'gulfstream-g280',
    name: 'Gulfstream G280',
    category: 'midsize',
    passengers: 10,
    range: 6000,
    speed: 850,
    baggage: 14,
    startingPrice: 12000,
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80',
    features: ['WiFi', 'Bed Configuration', 'Shower Available', 'Catering Service'],
  },
  {
    id: 'gulfstream-g450',
    name: 'Gulfstream G450',
    category: 'heavy',
    passengers: 16,
    range: 8100,
    speed: 850,
    baggage: 20,
    startingPrice: 18000,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    features: ['WiFi', 'Multiple Living Areas', 'Full Galley', 'Crew Rest Area'],
  },
  {
    id: 'global-6000',
    name: 'Global 6000',
    category: 'heavy',
    passengers: 17,
    range: 11400,
    speed: 900,
    baggage: 24,
    startingPrice: 22000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    features: ['WiFi', 'Stand-Up Cabin', 'Private Stateroom', 'Gourmet Galley'],
  },
];

export const routes: Route[] = [
  {
    id: 'nbo-mra',
    origin: 'Nairobi',
    originCode: 'NBO',
    destination: 'Masai Mara',
    destinationCode: 'MRA',
    flightTime: '1h 15m',
    description: 'Gateway to the iconic Masai Mara National Reserve',
  },
  {
    id: 'nbo-aso',
    origin: 'Nairobi',
    originCode: 'NBO',
    destination: 'Amboseli',
    destinationCode: 'ASO',
    flightTime: '45m',
    description: 'Witness Mount Kilimanjaro from the sky',
  },
  {
    id: 'nbo-mba',
    origin: 'Nairobi',
    originCode: 'NBO',
    destination: 'Mombasa',
    destinationCode: 'MBA',
    flightTime: '1h 10m',
    description: 'Kenya\'s stunning coastal paradise',
  },
  {
    id: 'nbo-lamu',
    origin: 'Nairobi',
    originCode: 'NBO',
    destination: 'Lamu',
    destinationCode: 'LAU',
    flightTime: '1h 30m',
    description: 'Historic Lamu Island and Swahili culture',
  },
  {
    id: 'nbo-jnb',
    origin: 'Nairobi',
    originCode: 'NBO',
    destination: 'Johannesburg',
    destinationCode: 'JNB',
    flightTime: '4h 30m',
    description: 'Connect to Southern Africa\'s economic hub',
  },
  {
    id: 'nbo-kgl',
    origin: 'Nairobi',
    originCode: 'NBO',
    destination: 'Kigali',
    destinationCode: 'KGL',
    flightTime: '2h 00m',
    description: 'Explore Rwanda\'s stunning landscapes',
  },
];

export const testimonials = [
  {
    id: 1,
    quote: "Sethcharles Air Charters transformed our safari into an unforgettable journey. From Nairobi to the Masai Mara in absolute comfort.",
    author: "James M.",
    title: "Private Equity Partner, London",
    initials: "JM",
  },
  {
    id: 2,
    quote: "The attention to detail is remarkable. They coordinated our entire East African expedition seamlessly.",
    author: "Sarah K.",
    title: "CEO, Tech Startup",
    initials: "SK",
  },
  {
    id: 3,
    quote: "When time matters, Sethcharles delivers. Last-minute booking, flawless execution.",
    author: "David O.",
    title: "Film Producer, Los Angeles",
    initials: "DO",
  },
];
