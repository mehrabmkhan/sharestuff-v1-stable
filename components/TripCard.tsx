
import React, { useState, useRef } from 'react';
import { 
  Plane, 
  Weight, 
  ShieldCheck, 
  ArrowRight, 
  UserCheck, 
  Gavel, 
  CheckCircle, 
  RefreshCcw, 
  AlertCircle, 
  ArrowDownUp, 
  TrendingDown, 
  Minus, 
  Plus,
  MapPin,
  Zap,
  Tag,
  Clock,
  Globe,
  Flag,
  Camera,
  Image as ImageIcon,
  // Fix: Added missing 'X' icon to imports to resolve the reference error on line 153.
  X,
  XCircle,
  Calendar,
  UploadCloud,
  ExternalLink
} from 'lucide-react';
import { Trip } from '../types';

interface TripCardProps {
  trip: Trip;
  onSelect: (trip: Trip, bid?: number) => void;
}

const TripCard: React.FC<TripCardProps> = ({ trip, onSelect }) => {
  const [showBidTray, setShowBidTray] = useState(false);
  const [bidValue, setBidValue] = useState(trip.pricePerKg - 2); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBid, setSubmittedBid] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [itemPhoto, setItemPhoto] = useState<string | null>(trip.itemPhoto || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Advanced Status Configuration for "Series-A" aesthetic
  const statusConfig = {
    OPEN: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-600',
      dot: 'bg-emerald-500',
      icon: CheckCircle,
      label: 'Spot Open',
      pulse: true
    },
    FULL: {
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      text: 'text-rose-600',
      dot: 'bg-rose-500',
      icon: AlertCircle,
      label: 'Fully Booked',
      pulse: false
    },
    COMPLETED: {
      bg: 'bg-slate-500/10',
      border: 'border-slate-500/30',
      text: 'text-slate-600',
      dot: 'bg-slate-500',
      icon: Flag,
      label: 'Completed',
      pulse: false
    }
  };

  const currentStatus = statusConfig[trip.status] || statusConfig.OPEN;
  const StatusIcon = currentStatus.icon;

  const avatars: Record<string, string> = {
    't1': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    't_can_1': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    't_can_2': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    't_can_3': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
  };

  const travelerAvatar = avatars[trip.id] || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150`;

  const destParts = trip.destination.match(/(.*)\((.*)\)/);
  const destCity = destParts ? destParts[1].trim() : trip.destination;
  const destCode = destParts ? destParts[2].trim() : 'UNK';

  const handleBidSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setError(null);
    if (trip.minBid && bidValue < trip.minBid) {
      setError(`Traveler's floor price is $${trip.minBid}/kg`);
      return;
    }
    if (bidValue > trip.pricePerKg) {
      setError(`Your offer is higher than the asking price.`);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedBid(bidValue);
      setShowBidTray(false);
    }, 1200);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTimeout(() => {
          setItemPhoto(reader.result as string);
          setIsUploading(false);
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const savingsPerKg = trip.pricePerKg - bidValue;
  const totalSavings = savingsPerKg * trip.availableWeightKg;

  return (
    <div 
      className="group relative p-8 rounded-[3rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:border-indigo-500/30 transition-all cursor-pointer overflow-hidden flex flex-col"
      role="article"
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handlePhotoUpload} 
      />

      {/* Fullscreen Photo View */}
      {isPhotoExpanded && itemPhoto && (
        <div 
          className="fixed inset-0 z-[200] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-12 animate-in fade-in duration-300"
          onClick={(e) => { e.stopPropagation(); setIsPhotoExpanded(false); }}
        >
          <img src={itemPhoto} className="max-w-full max-h-full rounded-[2rem] shadow-2xl object-contain" alt="Inspection Full" />
          <button className="absolute top-8 right-8 text-white bg-white/10 p-4 rounded-full"><X size={32} /></button>
        </div>
      )}

      {/* Decorative Branding Watermark */}
      <div className="absolute -top-6 -right-6 p-8 opacity-[0.03] group-hover:opacity-10 transition-all group-hover:scale-110 pointer-events-none group-hover:rotate-12">
        <Plane size={140} className="-rotate-45" />
      </div>

      {/* Header: Profile & Dynamic Status Indicator */}
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-[2rem] border-4 border-indigo-50 p-1 bg-white shadow-inner">
            <img 
              src={travelerAvatar} 
              className="w-full h-full rounded-[1.5rem] object-cover" 
              alt="Traveler Profile" 
            />
          </div>
          <div>
            <h4 className="text-xl font-black text-slate-900 flex items-center gap-2 tracking-tight">
              Alex R.
              <UserCheck size={18} className="text-indigo-500" />
            </h4>
            <div className="flex items-center gap-1.5 text-[10px] text-amber-500 font-black uppercase tracking-widest">
              ★ 4.95 <span className="text-slate-400 font-bold ml-1">Elite Courier</span>
            </div>
          </div>
        </div>

        {/* The Status Node */}
        <div className="flex flex-col items-end">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all duration-500 ${currentStatus.bg} ${currentStatus.border} ${currentStatus.text}`}>
            {currentStatus.pulse && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
            {!currentStatus.pulse && <div className={`w-2 h-2 rounded-full ${currentStatus.dot}`}></div>}
            <StatusIcon size={14} className={currentStatus.pulse ? 'animate-pulse' : ''} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{currentStatus.label}</span>
          </div>
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1.5 mr-1">Global Node</span>
        </div>
      </div>

      {/* Flight Route Visualizer */}
      <div className="flex items-center justify-between mb-6 bg-slate-50 p-6 rounded-[2.5rem] border-2 border-dashed border-slate-200 relative z-10 transition-colors group-hover:bg-slate-100/50">
        <div className="text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Origin</p>
          <p className="text-xl font-black text-slate-900">{trip.origin.split(' ')[0]}</p>
        </div>
        <div className="flex-grow flex flex-col items-center px-4">
          <div className="w-full h-[2px] bg-slate-300 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 group-hover:scale-110 transition-transform">
              <Plane size={16} className="text-indigo-500" />
            </div>
          </div>
          <p className="text-[10px] font-black text-slate-400 mt-4 uppercase tracking-widest font-mono">{trip.flightNumber}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Dest</p>
          <p className="text-xl font-black text-slate-900">{trip.destination.split(' ')[0]}</p>
        </div>
      </div>

      {/* Destination Hub Intelligence Stub */}
      <div className="mb-6 relative z-10 group/stub">
        <div className="bg-slate-900 border border-slate-700 rounded-[2rem] p-5 relative overflow-hidden shadow-xl shadow-slate-900/10">
          <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white rounded-full -translate-y-1/2 border border-slate-100 shadow-inner group-hover/stub:scale-110 transition-transform"></div>
          <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white rounded-full -translate-y-1/2 border border-slate-100 shadow-inner group-hover/stub:scale-110 transition-transform"></div>
          
          <div className="flex justify-between items-center relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Globe size={12} className="text-indigo-400" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.25em]">Arrival Hub Intelligence</span>
              </div>
              <h5 className="text-2xl font-black text-white leading-none mb-1 tracking-tight">{destCity}</h5>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-indigo-500/10 rounded-md border border-indigo-500/20">
                <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.15em] font-mono">{destCode} NODE ACCESS</span>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-black text-white tracking-wide">
                {new Date(trip.departureDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
              <div className="mt-1 flex items-center justify-end gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.2em]">Verified Route</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Evidence Area: Enhanced Visibility */}
      <div className="mb-8 relative z-10">
        <div className={`group/evidence p-6 rounded-[2.5rem] border-2 border-dashed transition-all duration-300 ${itemPhoto ? 'bg-indigo-50/50 border-indigo-500/30' : 'bg-slate-50 border-slate-200 hover:border-indigo-500/40 hover:bg-slate-100/50'}`}>
          <div className="flex items-center justify-between mb-4">
             <div>
                <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.15em] flex items-center gap-2">
                  <Camera size={14} className={itemPhoto ? 'text-indigo-600' : 'text-slate-400'} />
                  Visual Asset Validation
                </p>
             </div>
             {itemPhoto && (
               <div className="flex gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsPhotoExpanded(true); }}
                    className="p-2 bg-white text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-all shadow-sm border border-slate-100"
                    title="Expand View"
                  >
                    <ExternalLink size={16} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setItemPhoto(null); }}
                    className="p-2 bg-rose-500/10 text-rose-600 rounded-full hover:bg-rose-500 hover:text-white transition-all active:scale-90"
                    title="Remove Photo"
                  >
                    <XCircle size={16} />
                  </button>
               </div>
             )}
          </div>

          {itemPhoto ? (
            <div 
              onClick={(e) => { e.stopPropagation(); setIsPhotoExpanded(true); }}
              className="relative group/photo overflow-hidden rounded-[1.5rem] h-40 border-2 border-white bg-white shadow-xl cursor-zoom-in"
            >
               <img src={itemPhoto} className="w-full h-full object-cover transition-transform duration-700 group-hover/photo:scale-110" alt="Inspection Proof" />
               <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                  <ShieldCheck size={10} className="text-emerald-400" /> Vetted Item Photo
               </div>
            </div>
          ) : (
            <div 
              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              className="flex flex-col items-center justify-center py-8 cursor-pointer border-2 border-dashed border-transparent hover:border-indigo-500/20 rounded-2xl transition-all"
            >
               <div className="w-16 h-16 bg-white text-indigo-500 rounded-[1.5rem] flex items-center justify-center mb-4 group-hover/evidence:scale-110 transition-transform shadow-sm">
                  {isUploading ? <RefreshCcw size={28} className="animate-spin" /> : <UploadCloud size={28} />}
               </div>
               <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 mb-1">
                 {isUploading ? 'Validating Asset...' : 'Upload Item Verification'}
               </p>
               <p className="text-[10px] font-bold text-slate-400">Essential for payout release.</p>
            </div>
          )}
        </div>
      </div>

      {/* Pricing Dashboard */}
      <div className="grid grid-cols-2 gap-px bg-slate-100 rounded-[2.5rem] overflow-hidden mb-8 relative z-10 border border-slate-100 shadow-inner">
        <div className="bg-white p-6 flex flex-col justify-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Asking Rate</p>
          <p className="text-2xl font-black text-slate-900 tracking-tighter">
            ${trip.pricePerKg}<span className="text-xs font-normal text-slate-400 ml-1">/kg</span>
          </p>
        </div>
        <div className={`p-6 flex flex-col justify-center transition-all ${submittedBid ? 'bg-emerald-50' : 'bg-slate-50'}`}>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            {submittedBid ? 'Active Offer' : 'No Offer'}
          </p>
          {submittedBid ? (
            <div className="flex items-center gap-2">
              <p className="text-2xl font-black text-emerald-600 tracking-tighter">
                ${submittedBid}<span className="text-xs font-normal text-emerald-400">/kg</span>
              </p>
              <CheckCircle size={18} className="text-emerald-500" />
            </div>
          ) : (
            <p className="text-sm font-bold text-slate-300 uppercase tracking-widest italic">--</p>
          )}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full border-4 border-slate-50 flex items-center justify-center shadow-lg group-hover:rotate-180 transition-transform duration-500">
          <ArrowDownUp size={16} className="text-indigo-500" />
        </div>
      </div>

      {/* Primary Actions Area */}
      <div className="flex flex-col gap-3 relative z-10 mt-auto">
        <div className="flex gap-3">
          <button 
            disabled={trip.status !== 'OPEN'}
            onClick={() => onSelect({...trip, itemPhoto: itemPhoto || undefined}, submittedBid || undefined)}
            className={`flex-[2] py-5 font-black rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 group/btn ${trip.status === 'OPEN' ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20' : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'}`}
          >
            {submittedBid ? (
              <><Zap size={20} className="text-amber-400 animate-pulse" /> Confirm Offer</>
            ) : (
              <><Zap size={20} /> {trip.status === 'OPEN' ? 'Book Shipment' : 'Not Available'}</>
            )}
            {trip.status === 'OPEN' && <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />}
          </button>
          <button 
            disabled={trip.status !== 'OPEN'}
            onClick={(e) => { e.stopPropagation(); setShowBidTray(!showBidTray); }}
            className={`flex-1 py-5 font-black rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-95 ${trip.status !== 'OPEN' ? 'bg-slate-50 text-slate-200 cursor-not-allowed' : (showBidTray ? 'bg-rose-100 text-rose-600' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10')}`}
          >
            {showBidTray ? 'Close' : submittedBid ? 'Revise' : 'Bid'}
          </button>
        </div>
      </div>

      {/* Interactive Negotiation Tray */}
      {showBidTray && (
        <div className="mt-6 p-6 bg-slate-900 rounded-[2.5rem] border border-slate-800 animate-in slide-in-from-top duration-300 relative z-20 shadow-2xl">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <TrendingDown size={14} className="text-emerald-400" />
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Potential Save: ${savingsPerKg.toFixed(2)}/kg</p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 bg-slate-800 p-2 rounded-[2rem] border border-slate-700 focus-within:border-indigo-500 transition-all">
              <button 
                onClick={(e) => { e.stopPropagation(); setBidValue(Math.max(1, bidValue - 1)); }}
                className="w-12 h-12 flex items-center justify-center bg-slate-700 text-white rounded-full hover:bg-slate-600 transition-colors"
              ><Minus size={20} /></button>
              <div className="flex-1 flex items-center justify-center">
                <span className="text-slate-500 font-bold text-2xl mr-2">$</span>
                <input 
                  autoFocus
                  type="number" 
                  value={bidValue} 
                  onChange={(e) => setBidValue(Number(e.target.value))}
                  className="w-20 bg-transparent outline-none font-black text-3xl text-white text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                />
                <span className="text-slate-500 font-bold text-sm ml-2">/ kg</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setBidValue(bidValue + 1); }}
                className="w-12 h-12 flex items-center justify-center bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors"
              ><Plus size={20} /></button>
            </div>
            <button 
              disabled={isSubmitting}
              onClick={handleBidSubmit}
              className="w-full py-5 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20 disabled:opacity-50 active:scale-[0.98]"
            >
              {isSubmitting ? <><RefreshCcw size={20} className="animate-spin" /> Updating...</> : <><CheckCircle size={22} /> Confirm Bid Offer</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripCard;
