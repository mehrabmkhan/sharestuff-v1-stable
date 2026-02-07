
import React, { useState, useEffect } from 'react';
import { X, Star, Clock, ShieldCheck, MapPin, Plus, Minus, CreditCard, ChevronRight, CheckCircle2, Sparkles, DollarSign, Scale, Info, ShieldAlert, Gavel } from 'lucide-react';
import { Listing, Booking, BookingStatus } from '../types';
import { getStorageSummary } from '../services/geminiService';

interface ListingDetailModalProps {
  listing: Listing;
  onClose: () => void;
  onBook: (booking: Booking) => void;
}

const ListingDetailModal: React.FC<ListingDetailModalProps> = ({ listing, onClose, onBook }) => {
  const [bags, setBags] = useState(1);
  const [hours, setHours] = useState(4);
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [intelligenceSummary, setIntelligenceSummary] = useState<string>('');
  const [loadingIntel, setLoadingIntel] = useState(true);
  const [insuranceTier, setInsuranceTier] = useState<'Basic' | 'Elite'>('Basic');
  const [showPolicy, setShowPolicy] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoadingIntel(true);
      const summary = await getStorageSummary(listing.title, listing.amenities);
      setIntelligenceSummary(summary);
      setLoadingIntel(false);
    };
    fetchSummary();
  }, [listing]);

  const basePrice = bags * listing.pricePerHour * hours;
  const serviceFee = basePrice * 0.12;
  const insuranceFee = insuranceTier === 'Basic' ? 2.50 * bags : 8.50 * bags;
  const totalPrice = basePrice + serviceFee + insuranceFee;

  const handleProcessBooking = () => {
    if (step === 'details') setStep('payment');
    else {
      setStep('success');
      setTimeout(() => {
        onBook({
          id: `b-${Date.now()}`,
          listingId: listing.id,
          travelerId: 'u1',
          startTime: new Date().toISOString(),
          endTime: new Date(Date.now() + hours * 3600000).toISOString(),
          bagsCount: bags,
          totalPrice,
          status: BookingStatus.ACTIVE,
          qrCode: 'SS-LOGISTICS-TOKEN-' + Math.random().toString(36).substring(7).toUpperCase()
        });
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl bg-white rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[95vh] border border-white/10">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-[110] p-4 bg-white/10 hover:bg-indigo-500 backdrop-blur-xl text-white rounded-full transition-all group shadow-xl active:scale-90"
        >
          <X size={28} className="group-hover:rotate-90 transition-transform" />
        </button>

        {step === 'success' ? (
          <div className="w-full p-20 text-center flex flex-col items-center justify-center bg-white">
             <div className="relative mb-12">
              <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-30"></div>
              <div className="relative z-10 w-32 h-32 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl">
                <CheckCircle2 size={64} />
              </div>
            </div>
            <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-none">Node Activation Successful</h2>
            <p className="text-slate-500 mb-12 max-w-lg mx-auto text-xl font-medium leading-relaxed">
              Logistics node <strong>{listing.title}</strong> has been secured for your duration. Access your verification token in the Activity Hub.
            </p>
            <button 
              onClick={onClose}
              className="bg-slate-900 text-white font-black px-20 py-6 rounded-[2.5rem] shadow-2xl hover:bg-indigo-600 transition-all flex items-center gap-3 active:scale-95"
            >
              Return to Pipeline <ChevronRight size={24} />
            </button>
          </div>
        ) : (
          <>
            <div className="w-full lg:w-[45%] relative">
              <img src={listing.image} className="w-full h-full object-cover" alt={listing.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent flex flex-col justify-end p-12">
                <div className="flex items-center gap-3 mb-6">
                   <span className="bg-emerald-500 text-white text-[11px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-xl ring-4 ring-emerald-500/20">VERIFIED HUB</span>
                   <span className="bg-white/10 backdrop-blur-md text-white text-[11px] font-black px-5 py-2 rounded-full uppercase tracking-widest border border-white/20">SS-NETWORK-{listing.city.toUpperCase()}</span>
                </div>
                <h2 className="text-5xl font-black text-white mb-4 tracking-tighter leading-[0.9]">{listing.title}</h2>
                <div className="flex flex-wrap gap-8 text-white text-base font-bold">
                  <div className="flex items-center gap-2"><Star size={20} className="text-amber-400" fill="currentColor" /> {listing.rating} (Certified)</div>
                  <div className="flex items-center gap-2"><MapPin size={20} className="text-emerald-400" /> {listing.city} Hub</div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[55%] p-14 overflow-y-auto bg-slate-50/50">
              <div className="space-y-12">
                <div className="bg-white p-10 rounded-[2.5rem] border border-indigo-100 shadow-sm relative overflow-hidden group">
                  <h4 className="flex items-center gap-2 text-indigo-800 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                    <Sparkles size={16} className="text-indigo-500" />
                    Logistics Intelligence Summary
                  </h4>
                  {loadingIntel ? (
                    <div className="space-y-3">
                      <div className="h-4 animate-pulse bg-indigo-50 rounded-full w-[90%]" />
                      <div className="h-4 animate-pulse bg-indigo-50 rounded-full w-[70%]" />
                    </div>
                  ) : (
                    <p className="text-indigo-900 text-lg font-bold italic leading-relaxed">"{intelligenceSummary}"</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Quantity (Units)</p>
                    <div className="flex items-center justify-between bg-slate-50 p-2 rounded-2xl">
                      <button onClick={() => setBags(Math.max(1, bags - 1))} className="p-3 hover:bg-white hover:text-indigo-600 rounded-xl transition-all shadow-sm active:scale-90"><Minus size={22} /></button>
                      <span className="text-2xl font-black text-slate-900 px-4">{bags}</span>
                      <button onClick={() => setBags(bags + 1)} className="p-3 hover:bg-white hover:text-indigo-600 rounded-xl transition-all shadow-sm active:scale-90"><Plus size={22} /></button>
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Window (Hours)</p>
                    <div className="flex items-center justify-between bg-slate-50 p-2 rounded-2xl">
                      <button onClick={() => setHours(Math.max(1, hours - 1))} className="p-3 hover:bg-white hover:text-indigo-600 rounded-xl transition-all shadow-sm active:scale-90"><Minus size={22} /></button>
                      <span className="text-2xl font-black text-slate-900 px-4">{hours}</span>
                      <button onClick={() => setHours(hours + 1)} className="p-3 hover:bg-white hover:text-indigo-600 rounded-xl transition-all shadow-sm active:scale-90"><Plus size={22} /></button>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-2xl space-y-8 relative group">
                   <h3 className="font-black text-slate-900 text-xl flex items-center gap-3">
                    <DollarSign size={24} className="text-emerald-500" /> Dynamic Quote Analysis
                   </h3>
                   <div className="space-y-4">
                     <div className="flex justify-between text-base text-slate-500 font-bold">
                       <span>Standard Hub Fee ({hours}h x {bags})</span>
                       <span className="text-slate-900">${basePrice.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between text-base text-slate-500 font-bold">
                       <span>Protocol Service Fee (12%)</span>
                       <span className="text-slate-900">${serviceFee.toFixed(2)}</span>
                     </div>
                     <div className="pt-8 border-t flex justify-between items-center">
                       <span className="font-black text-slate-900 text-xl">Guaranteed Total</span>
                       <span className="text-4xl font-black text-indigo-600 tracking-tighter">${totalPrice.toFixed(2)}</span>
                     </div>
                   </div>
                </div>

                <button 
                  onClick={handleProcessBooking}
                  className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-8 rounded-[2.5rem] shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4 text-xl tracking-tight"
                >
                  Confirm Hub Reservation
                  <ChevronRight size={28} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListingDetailModal;
