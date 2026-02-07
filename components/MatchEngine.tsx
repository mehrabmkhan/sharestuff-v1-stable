
import React from 'react';
import { Trip, DeliveryOrder, OrderStatus } from '../types';

/**
 * PRODUCTION-READY ESCROW LOGIC CONCEPT:
 * The backend controller for `releaseFunds(orderId)` checks for the delivery QR match.
 * Security Note: Carrying items for strangers involves risks. We enforce:
 * 1. MANDATORY ITEM INSPECTION: Traveler must photograph item content.
 * 2. IDENTITY LOCK: Traveler and Sender passport hashes must be on-file.
 * 3. ESCROW: Traveler only gets paid when the RECIPIENT scans the Travelers phone.
 */

export const matchTrips = (trips: Trip[], origin: string, destination: string, date?: string) => {
  return trips.filter(trip => {
    const originMatch = trip.origin.toLowerCase().includes(origin.toLowerCase());
    const destMatch = trip.destination.toLowerCase().includes(destination.toLowerCase());
    // Simple logic: Origin and Destination must match if provided
    return (!origin || originMatch) && (!destination || destMatch);
  });
};

export const EscrowBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  const colors = {
    [OrderStatus.MATCHED]: 'bg-blue-100 text-blue-700',
    [OrderStatus.IN_TRANSIT]: 'bg-indigo-100 text-indigo-700 animate-pulse',
    [OrderStatus.DELIVERED]: 'bg-teal-100 text-teal-700',
    [OrderStatus.DISPUTED]: 'bg-rose-100 text-rose-700',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${colors[status]}`}>
      {status === OrderStatus.MATCHED ? 'Escrow Secured' : status}
    </span>
  );
};
