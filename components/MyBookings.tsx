
import React from 'react';
import { Booking, BookingStatus } from '../types';
import { MOCK_LISTINGS } from '../constants';
import { QrCode, MapPin, Clock, ArrowRight, PackageOpen, Search, Compass } from 'lucide-react';

interface MyBookingsProps {
  bookings: Booking[];
  onFindStorage: () => void;
}

const MyBookings: React.FC<MyBookingsProps> = ({ bookings, onFindStorage }) => {
  if (bookings.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center animate-in fade-in duration-700">
        <div className="relative w-40 h-40 mx-auto mb-12">
          <div className="absolute inset-0 bg-emerald-100 rounded-full animate-pulse opacity-40"></div>
          <div className="relative z-10 w-full h-full bg-white text-slate-200 rounded-full flex items-center justify-center border-8 border-slate-50 shadow-2xl overflow-hidden group">
             <Clock size={72} className="text-slate-200 group-hover:text-emerald-500 transition-colors duration-500" />
             <Compass size={120} className="absolute opacity-5 -bottom-4 -right-4 rotate-12" />
          </div>
        </div>
        <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter">No active bookings found</h2>
        <p className="text-slate-500 mb-14 text-xl max-w-lg mx-auto leading-relaxed font-medium">
          Ready to explore the city luggage-free? Find your first verified storage spot in major hubs across the globe.
        </p>
        <button 
          onClick={onFindStorage}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-16 py-6 rounded-[2.5rem] shadow-2xl shadow-emerald-500/30 transition-all hover:scale-105 hover:-translate-y-1 flex items-center gap-4 mx-auto group active:scale-95"
        >
          <Search size={28} className="group-hover:rotate-12 transition-transform" />
          <span className="text-lg">Find Storage Now</span>
          <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">My Active Storage</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your currently stored items and pickup codes.</p>
        </div>
        <div className="px-6 py-3 bg-emerald-100 text-emerald-700 rounded-2xl text-sm font-black uppercase tracking-widest shadow-sm">
          {bookings.length} {bookings.length === 1 ? 'Item' : 'Items'} Stored
        </div>
      </div>
      
      <div className="space-y-10">
        {bookings.map(booking => {
          const listing = MOCK_LISTINGS.find(l => l.id === booking.listingId);
          if (!listing) return null;

          return (
            <div key={booking.id} className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-2xl hover:border-emerald-500/20 transition-all duration-500 group">
              <div className="p-12 flex-grow">
                <div className="flex items-center gap-4 mb-8">
                  <span className="px-5 py-1.5 bg-emerald-100 text-emerald-600 text-[11px] font-black rounded-full uppercase tracking-widest shadow-sm">
                    {booking.status}
                  </span>
                  <span className="text-xs text-slate-400 font-mono tracking-wider">REF: {booking.id.toUpperCase()}</span>
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-8 group-hover:text-emerald-600 transition-colors leading-tight">{listing.title}</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 group-hover:bg-white group-hover:border-emerald-50 transition-colors">
                    <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mb-2">Estimated Pickup</p>
                    <p className="text-2xl text-slate-900 font-black flex items-center gap-2">
                       <Clock size={20} className="text-emerald-500" />
                       2h 41m remaining
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 group-hover:bg-white group-hover:border-emerald-50 transition-colors">
                    <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mb-2">Item Count</p>
                    <p className="text-2xl text-slate-900 font-black flex items-center gap-2">
                       <PackageOpen size={20} className="text-emerald-500" />
                       {booking.bagsCount} Luggage Units
                    </p>
                  </div>
                </div>

                <div className="pt-10 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Transaction Total</p>
                    <div className="text-4xl font-black text-emerald-600 flex items-baseline gap-1">
                      ${booking.totalPrice.toFixed(2)}
                      <span className="text-sm font-bold text-slate-400 uppercase ml-2 tracking-widest">Paid</span>
                    </div>
                  </div>
                  <button className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white font-black rounded-[2rem] text-sm flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-xl active:scale-95">
                    Contact Support <ArrowRight size={20} />
                  </button>
                </div>
              </div>
              
              <div className="bg-slate-50 md:w-96 p-12 flex flex-col items-center justify-center text-center border-t md:border-t-0 md:border-l border-slate-100">
                <div className="relative group/qr cursor-pointer">
                  <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-0 group-hover/qr:opacity-10 transition-opacity"></div>
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl mb-8 ring-8 ring-white/50 group-hover:scale-105 transition-all duration-500 relative z-10">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${booking.qrCode}`} 
                      alt="Checkout Token" 
                      className="w-44 h-44 opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-black mb-10 uppercase tracking-widest">Scan to Check-out</p>
                <div className="w-full space-y-4">
                  <button className="w-full py-5 bg-white border-2 border-slate-200 text-slate-900 text-sm font-black rounded-2xl flex items-center justify-center gap-3 hover:border-emerald-500 hover:text-emerald-600 transition-all active:scale-95">
                    <MapPin size={20} /> Open Navigation
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;
