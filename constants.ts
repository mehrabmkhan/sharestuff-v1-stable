
import { Listing, Trip } from './types';

export const COLORS = {
  primary: '#1E40AF',
  accent: '#059669',
  danger: '#DC2626',
  background: '#F8FAFC',
};

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'l1',
    hostId: 'h1',
    title: 'Financial District SafeVault',
    description: 'Premier high-security storage in Manhattan. 24/7 armed security and climate control.',
    pricePerHour: 5.00,
    capacity: 50,
    lat: 40.7075,
    lng: -74.0113,
    address: '15 Broad St, New York, NY',
    city: 'New York',
    amenities: ['CCTV', '24/7', 'Insurance'],
    rating: 5.0,
    reviewsCount: 412,
    image: 'https://images.unsplash.com/photo-1549194388-f61be84a6e9e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'can-1',
    hostId: 'h_can1',
    title: 'Dundas Square Transit Hub',
    description: 'Located in the heart of Toronto. Perfect for commuters and students. Secure and monitored.',
    pricePerHour: 3.50,
    capacity: 45,
    lat: 43.6561,
    lng: -79.3803,
    address: '350 Victoria St, Toronto, ON',
    city: 'Toronto',
    amenities: ['Verified', 'CCTV', '24/7'],
    rating: 4.8,
    reviewsCount: 124,
    image: 'https://images.unsplash.com/photo-1590483736622-39da8caf3501?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'can-2',
    hostId: 'h_can2',
    title: 'Union Station Premium Vault',
    description: 'High-end storage adjacent to the UP Express. Ideal for Pearson Airport travelers.',
    pricePerHour: 6.00,
    capacity: 120,
    lat: 43.6453,
    lng: -79.3806,
    address: '65 Front St W, Toronto, ON',
    city: 'Toronto',
    amenities: ['Biometric', 'Insurance', 'Climate Control'],
    rating: 5.0,
    reviewsCount: 856,
    image: 'https://images.unsplash.com/photo-1506143925201-0252c51780b0?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'can-5',
    hostId: 'h_can5',
    title: 'Gastown SafeHaven Vancouver',
    description: 'Secure, climate-controlled lockers in the heart of Gastown. steps from Waterfront Station.',
    pricePerHour: 5.00,
    capacity: 80,
    lat: 49.2828,
    lng: -123.1067,
    address: '300 Water St, Vancouver, BC',
    city: 'Vancouver',
    amenities: ['24/7', 'Insurance', 'Biometric'],
    rating: 4.7,
    reviewsCount: 245,
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'intl-1',
    hostId: 'h_intl1',
    title: 'Dubai Marina Nexus',
    description: 'Premium storage node in the heart of Dubai. Fully automated, climate-locked.',
    pricePerHour: 8.00,
    capacity: 200,
    lat: 25.0819,
    lng: 55.1367,
    address: 'Marina Walk, Dubai, UAE',
    city: 'Dubai',
    amenities: ['24/7', 'Biometric', 'Verified'],
    rating: 5.0,
    reviewsCount: 1204,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200'
  }
];

export const MOCK_TRIPS: Trip[] = [
  {
    id: 't1',
    travelerId: 'u2',
    origin: 'Toronto (YYZ)',
    destination: 'Vancouver (YVR)',
    departureDate: '2024-12-22',
    flightNumber: 'AC115',
    availableWeightKg: 8,
    pricePerKg: 12,
    minBid: 10,
    status: 'OPEN'
  },
  {
    id: 't_can_2',
    travelerId: 'u_can2',
    origin: 'Toronto (YYZ)',
    destination: 'London (LHR)',
    departureDate: '2025-01-10',
    flightNumber: 'AC848',
    availableWeightKg: 15,
    pricePerKg: 25,
    minBid: 20,
    status: 'OPEN'
  },
  {
    id: 't_intl_1',
    travelerId: 'u_intl1',
    origin: 'Paris (CDG)',
    destination: 'Tokyo (NRT)',
    departureDate: '2024-12-25',
    flightNumber: 'AF272',
    availableWeightKg: 10,
    pricePerKg: 35,
    minBid: 30,
    status: 'OPEN'
  }
];
