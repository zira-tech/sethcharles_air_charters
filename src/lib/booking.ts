export interface Passenger {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  passportNumber?: string;
}

export interface BookingLeg {
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departureDate: string;
  departureTime?: string;
}

export interface ConciergeService {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'ground' | 'catering' | 'accommodation' | 'other';
}

export interface BookingAircraft {
  id: string;
  name: string;
  category: string;
  passengers: number;
  range: number;
  speed: number;
  price: number;
}

export interface Booking {
  id: string;
  reference: string;
  aircraft: BookingAircraft;
  legs: BookingLeg[];
  passengers: Passenger[];
  conciergeServices: ConciergeService[];
  subtotal: number;
  taxes: number;
  total: number;
  currency: 'USD' | 'KES';
  status: 'pending' | 'confirmed' | 'paid' | 'completed' | 'cancelled';
  createdAt: Date;
  paymentMethod?: 'mpesa' | 'paystack';
  paymentStatus?: 'pending' | 'completed' | 'failed';
}

export const conciergeServices: ConciergeService[] = [
  {
    id: 'ground-transport',
    name: 'Luxury Ground Transport',
    description: 'Mercedes S-Class or similar executive vehicle',
    price: 250,
    type: 'ground',
  },
  {
    id: 'catering-champagne',
    name: 'Premium Champagne Service',
    description: 'Dom Pérignon with gourmet selection',
    price: 450,
    type: 'catering',
  },
  {
    id: 'catering-full',
    name: 'Full Catering Service',
    description: 'Multi-course meal prepared by private chef',
    price: 800,
    type: 'catering',
  },
  {
    id: 'hotel-safari',
    name: 'Safari Lodge Partnership',
    description: 'Curated luxury lodge accommodation',
    price: 1500,
    type: 'accommodation',
  },
  {
    id: 'game-drive',
    name: 'Private Game Drive',
    description: 'Exclusive guided safari experience',
    price: 600,
    type: 'other',
  },
];

export function calculateBookingTotal(
  aircraft: { startingPrice?: number; price?: number },
  legs: BookingLeg[],
  services: ConciergeService[],
  currency: 'USD' | 'KES' = 'USD'
): { subtotal: number; taxes: number; total: number } {
  const basePricePerLeg = aircraft.startingPrice ?? aircraft.price ?? 0;
  const legMultiplier = legs.length === 1 ? 1 : legs.length === 2 ? 1.8 : 2.5;
  const subtotal = basePricePerLeg * legMultiplier + services.reduce((sum, s) => sum + s.price, 0);
  const taxes = subtotal * 0.16;
  const total = subtotal + taxes;

  return { subtotal, taxes, total };
}

export function generateBookingReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'SETH-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function formatCurrency(amount: number, currency: 'USD' | 'KES'): string {
  if (currency === 'KES') {
    return `KES ${amount.toLocaleString()}`;
  }
  return `$${amount.toLocaleString()} USD`;
}

export const KES_TO_USD_RATE = 155;
export const USD_TO_KES_RATE = 1 / KES_TO_USD_RATE;

export function convertCurrency(amount: number, from: 'USD' | 'KES', to: 'USD' | 'KES'): number {
  if (from === to) return amount;
  if (from === 'USD' && to === 'KES') return amount * KES_TO_USD_RATE;
  return amount * USD_TO_KES_RATE;
}
