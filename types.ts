
export enum UserRole {
  TRAVELER = 'TRAVELER',
  HOST = 'HOST',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  verified: boolean;
  passportVerified: boolean;
  rating: number;
  deliveriesCount: number;
}

export interface Listing {
  id: string;
  hostId: string;
  title: string;
  description: string;
  pricePerHour: number;
  capacity: number;
  lat: number;
  lng: number;
  address: string;
  city: string;
  amenities: string[];
  rating: number;
  reviewsCount: number;
  image: string;
}

export interface Trip {
  id: string;
  travelerId: string;
  origin: string;
  destination: string;
  departureDate: string;
  flightNumber: string;
  availableWeightKg: number;
  pricePerKg: number;
  minBid?: number;
  status: 'OPEN' | 'FULL' | 'COMPLETED';
  itemPhoto?: string;
}

export enum OrderStatus {
  POSTED = 'POSTED',
  MATCHED = 'MATCHED',
  FUNDED = 'FUNDED',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  PAID = 'PAID',
  DISPUTED = 'DISPUTED'
}

export interface ShipmentRequest {
  id: string;
  senderId: string;
  origin: string;
  destination: string;
  itemDescription: string;
  weightKg: number;
  declaredValue: number;
  status: OrderStatus;
  escrowStatus: 'NONE' | 'PENDING' | 'SECURED' | 'DISPUTED' | 'RELEASED';
}

export type DeliveryOrder = ShipmentRequest;

export enum BookingStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Booking {
  id: string;
  listingId: string;
  travelerId: string;
  startTime: string;
  endTime: string;
  bagsCount: number;
  totalPrice: number;
  status: BookingStatus;
  qrCode: string;
}

export interface AppState {
  view: 'search' | 'host' | 'admin' | 'bookings' | 'post' | 'requests';
  mode: 'storage' | 'delivery';
  selectedListing: Listing | null;
  selectedTrip: Trip | null;
  activeBid: number | null;
  searchQuery: string;
  activeFilters: string[];
  isLoggedIn: boolean;
  showAuthModal: boolean;
  showSettingsModal: boolean;
}
