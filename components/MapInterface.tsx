
import React from 'react';
import { Listing } from '../types';
import { MapPin, Navigation, Camera, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface MapInterfaceProps {
  listings: Listing[];
  selectedListing: Listing | null;
  activeFilters: string[];
  onToggleFilter: (filter: string) => void;
  onSelect: (listing: Listing) => void;
}

const MapInterface: React.FC<MapInterfaceProps> = ({ 
  listings, 
  selectedListing, 
  activeFilters, 
  onToggleFilter, 
  onSelect 
}) => {
  const amenityOptions = [
    { id: 'CCTV', label: 'CCTV', icon: Camera },
    { id: '24/7', label: '24/7 Access', icon: Clock },
    { id: 'Insurance', label: 'Insurance', icon: ShieldCheck },
    { id: 'Verified', label: 'Verified', icon: CheckCircle2 }
  ];

  return (
    <div className="w-full h-full bg-[#e5e7eb] relative overflow-hidden">
      {/* Simulated Map Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Filter Bar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 p-1.5 glass rounded-2xl shadow-2xl border border-white/50">
        {amenityOptions.map(option => {
          const isActive = activeFilters.includes(option.id);
          const Icon = option.icon;
          
          return (
            <button
              key={option.id}
              onClick={() => onToggleFilter(option.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 active:scale-95
                ${isActive 
                  ? 'bg-slate-900 text-white shadow-lg' 
                  : 'bg-white/40 text-slate-600 hover:bg-white hover:text-slate-900'}
              `}
            >
              <Icon size={14} className={isActive ? 'text-emerald-400' : 'text-slate-400'} />
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Markers */}
      {listings.map((l, i) => (
        <div 
          key={l.id}
          className="absolute transition-all duration-300 transform"
          style={{ 
            top: `${20 + (i * 15 % 60)}%`, 
            left: `${15 + (i * 18 % 70)}%`,
            zIndex: selectedListing?.id === l.id ? 50 : 10
          }}
        >
          <div 
            onClick={() => onSelect(l)}
            className={`
              relative cursor-pointer flex flex-col items-center group
              ${selectedListing?.id === l.id ? 'scale-110' : 'hover:scale-105'}
            `}
          >
            <div className={`
              px-3 py-1.5 rounded-full font-bold shadow-xl border-2 transition-all
              ${selectedListing?.id === l.id 
                ? 'bg-emerald-500 text-white border-white' 
                : 'bg-white text-slate-900 border-slate-100 group-hover:border-emerald-500'}
            `}>
              ${l.pricePerHour.toFixed(2)}
            </div>
            <div className={`
              w-4 h-4 rounded-full border-2 border-white -mt-1 shadow-lg
              ${selectedListing?.id === l.id ? 'bg-emerald-500' : 'bg-slate-900'}
            `}></div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-2">
        <button className="p-3 bg-white rounded-xl shadow-lg hover:bg-slate-50 text-slate-600 transition-colors">
          <Navigation size={20} />
        </button>
        <div className="flex flex-col bg-white rounded-xl shadow-lg divide-y">
          <button className="p-3 text-xl font-bold text-slate-600">+</button>
          <button className="p-3 text-xl font-bold text-slate-600">-</button>
        </div>
      </div>

      {/* Selected Listing Floating Card (Mini) */}
      {selectedListing && (
        <div className="absolute top-24 left-8 w-72 glass p-4 rounded-3xl shadow-2xl animate-in slide-in-from-left duration-300 border border-white/50">
          <div className="flex gap-3 mb-3">
            <img src={selectedListing.image} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
            <div>
              <h4 className="font-bold text-slate-900 leading-tight">{selectedListing.title}</h4>
              <div className="flex items-center text-emerald-500 mt-1">
                <MapPin size={12} className="mr-1" />
                <span className="text-[10px] font-black uppercase tracking-widest">{selectedListing.city}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-black text-emerald-600 tracking-tighter">
              ${selectedListing.pricePerHour.toFixed(2)}<span className="text-xs text-slate-400 font-normal">/hr</span>
            </p>
            <button 
              onClick={() => onSelect(selectedListing)}
              className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl hover:bg-emerald-600 transition-colors"
            >
              Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapInterface;
