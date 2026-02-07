
import React, { useState, useMemo } from 'react';
import { 
  X, 
  ChevronRight, 
  Weight, 
  DollarSign, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Plane,
  AlertCircle,
  TrendingDown,
  Package,
  Zap,
  CheckCircle2,
  Lock,
  Scale,
  ShieldAlert,
  Info,
  Camera,
  Image as ImageIcon,
  Activity
} from 'lucide-react';
import { Trip } from '../types';
import { calculateTotal, PricingResult } from '../services/pricingService';

interface ShipmentBookingModalProps {
  trip: Trip;
  negotiatedRate?: number;
  onClose: () => void;
  onBook: (result: PricingResult) => void;
}

const ShipmentBookingModal: React.FC<ShipmentBookingModalProps> = ({ 
  trip, 
  negotiatedRate, 
  onClose, 
  onBook 
}) => {
  const [weight, setWeight] = useState(1);
  const [value, setValue] = useState(100);
  const [urgency, setUrgency] = useState<'flexible' | 'express' | 'next-flight'>('flexible');
  const [insurance, setInsurance] = useState<'BASIC' | 'PRO' | 'PREMIUM'>('BASIC');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pricing = useMemo(() => {
    const rate = negotiatedRate || trip.pricePerKg;
    return calculateTotal(weight, rate, value, urgency, insurance);
  }, [weight, value, urgency, insurance, negotiatedRate, trip.pricePerKg]);

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onBook(pricing);
    }, 1800);
  };

  const urgencyLabels = {
    'flexible': 'Standard Processing',
    'express': 'Expedited Priority',
    'next-flight': 'Next-Flight Critical'
  };

  const urgencyBadges = {
    'flexible': 'Base Rate',
    'express': '1.25x Multiplier',
    'next-flight': '1.50x Multiplier'
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl bg-white rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[95vh] border border-white/10">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-[110] p-4 bg-white/10 hover:bg-indigo-500 backdrop-blur-xl text-white rounded-full transition-all group shadow-xl active:scale-90"
        >
          <X size={28} className="group-hover:rotate-90 transition-transform" />
        </button>

        {/* Left Panel: Trip Info Summary & Courier Proof */}
        <div className="w-full md:w-[38%] bg-slate-900 p-12 text-white flex flex-col overflow-y-auto scrollbar-hide">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-indigo-500/20 rounded-xl">
                <Plane size={24} className="text-indigo-400" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">Logistics Routing</span>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Departure</p>
                  <p className="text-2xl font-black tracking-tight">{trip.origin}</p>
                </div>
                <div className="flex flex-col items-center">
                   <div className="w-10 h-[2px] bg-indigo-500/30 mb-2"></div>
                   <ArrowRight size={18} className="text-slate-700" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Arrival</p>
                  <p className="text-2xl font-black tracking-tight">{trip.destination}</p>
                </div>
              </div>
              
              <div className="pt-8 border-t border-white/5 flex justify-between items-center bg-white/[0.02] p-6 rounded-3xl">
                 <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Carrier ID</p>
                    <p className="font-mono text-indigo-400 font-bold tracking-widest">{trip.flightNumber}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Vetted Capacity</p>
                    <p className="font-bold text-white">{trip.availableWeightKg}kg Spot</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Courier Verification Proof Section */}
          <div className="mb-10">
             <div className="flex items-center gap-2 mb-4">
               <Camera size={14} className="text-emerald-400" />
               <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-400">Courier Inspection Proof</span>
             </div>
             {trip.itemPhoto ? (
               <div className="rounded-[2rem] overflow-hidden border border-white/10 shadow-xl group/proof">
                  <img src={trip.itemPhoto} className="w-full aspect-video object-cover group-hover/proof:scale-105 transition-transform" alt="Courier Proof" />
                  <div className="p-4 bg-white/5 backdrop-blur-sm border-t border-white/5 flex items-center justify-between">
                     <p className="text-[10px] font-bold text-slate-300">Pre-flight Visual Match Verified</p>
                     <CheckCircle2 size={16} className="text-emerald-400" />
                  </div>
               </div>
             ) : (
               <div className="rounded-[2rem] border border-white/5 bg-white/[0.03] p-8 flex flex-col items-center justify-center text-center opacity-60">
                  <ImageIcon size={32} className="text-slate-500 mb-2" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Waiting for courier photo upload...</p>
               </div>
             )}
          </div>

          <div className="mt-auto space-y-4">
            <div className="p-6 bg-emerald-500/5 rounded-3xl border border-emerald-500/20 flex items-center gap-4 group">
               <ShieldCheck size={32} className="text-emerald-500 group-hover:scale-110 transition-transform" />
               <div>
                  <h4 className="font-black text-sm text-emerald-400 uppercase tracking-wide">Escrow Protected</h4>
                  <p className="text-[11px] text-slate-400 leading-tight">Funds released only upon verified delivery scan.</p>
               </div>
            </div>
            {negotiatedRate ? (
               <div className="p-6 bg-indigo-500/10 rounded-3xl border border-indigo-500/30 flex items-center gap-4">
                  <Zap size={32} className="text-indigo-400" />
                  <div>
                     <h4 className="font-black text-sm text-indigo-300 uppercase tracking-wide">Custom Rate Apply</h4>
                     <p className="text-[11px] text-indigo-400/70">Verified bid of ${negotiatedRate}/kg is active.</p>
                  </div>
               </div>
            ) : (
              <div className="p-6 bg-white/[0.03] rounded-3xl border border-white/5 flex items-center gap-4">
                <DollarSign size={32} className="text-slate-500" />
                <div>
                   <h4 className="font-black text-sm text-slate-300 uppercase tracking-wide">Market Rate</h4>
                   <p className="text-[11px] text-slate-500">Standard pricing at ${trip.pricePerKg}/kg.</p>
                </div>
             </div>
            )}
          </div>
        </div>

        {/* Right Panel: Configuration & Explicit Pricing */}
        <div className="flex-1 p-14 overflow-y-auto bg-white scrollbar-hide">
          <header className="mb-10">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Shipment Config</h2>
            <p className="text-slate-500 font-medium">Fine-tune your global shipment parameters.</p>
          </header>
          
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-1 border-2 border-slate-50 bg-slate-50/30 rounded-[2.5rem] focus-within:border-indigo-500/30 transition-all">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Weight size={14} className="text-indigo-500" /> Declared Weight
                    </p>
                    <span className="text-xl font-black text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-2xl">{weight}kg</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max={trip.availableWeightKg} 
                    value={weight} 
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-2"
                  />
                  <div className="flex justify-between text-[9px] font-black text-slate-300 uppercase tracking-tighter">
                    <span>Min (1kg)</span>
                    <span>Max ({trip.availableWeightKg}kg)</span>
                  </div>
                </div>
              </div>

              <div className="p-1 border-2 border-slate-50 bg-slate-50/30 rounded-[2.5rem] focus-within:border-emerald-500/30 transition-all">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-8">
                    <ShieldAlert size={14} className="text-amber-500" /> Declared Value
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-slate-300">$</span>
                    <input 
                      type="number" 
                      value={value} 
                      onChange={(e) => setValue(Number(e.target.value))}
                      className="w-full bg-transparent outline-none text-3xl font-black text-slate-900 placeholder:text-slate-200" 
                      placeholder="0.00"
                    />
                  </div>
                  <p className="text-[9px] font-bold text-slate-400 mt-4 italic">* High-value items ($500+) require extra vetting.</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Urgency Pipeline</p>
               <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'flexible', label: 'Flexible', rate: 'Standard', icon: Clock },
                    { id: 'express', label: 'Express', rate: '1.25x', icon: Zap },
                    { id: 'next-flight', label: 'Priority', rate: '1.50x', icon: Plane }
                  ].map(tier => (
                    <button
                      key={tier.id}
                      onClick={() => setUrgency(tier.id as any)}
                      className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 group ${urgency === tier.id ? 'bg-slate-900 border-slate-900 text-white shadow-2xl scale-[1.02]' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'}`}
                    >
                      <tier.icon size={20} className={urgency === tier.id ? 'text-indigo-400' : 'text-slate-400 group-hover:text-indigo-500'} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{tier.label}</span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg ${urgency === tier.id ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-400'}`}>{tier.rate}</span>
                    </button>
                  ))}
               </div>
            </div>

            <div className="space-y-5">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Protection Layer</p>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    { id: 'BASIC', label: 'Basic', desc: 'Up to $500 Coverage', cost: 'Included' },
                    { id: 'PRO', label: 'Elite Hand', desc: 'Verified Handover', cost: '$15.00' },
                    { id: 'PREMIUM', label: 'All-Risk', desc: 'Total Value Recovery', cost: '5% Val' }
                  ].map(tier => (
                    <button
                      key={tier.id}
                      onClick={() => setInsurance(tier.id as any)}
                      className={`p-6 rounded-[2rem] border-2 transition-all text-left relative overflow-hidden ${insurance === tier.id ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-100 bg-white hover:border-emerald-200'}`}
                    >
                      {insurance === tier.id && <CheckCircle2 size={48} className="absolute -bottom-4 -right-4 text-emerald-500/10" />}
                      <h5 className={`font-black text-xs uppercase tracking-[0.15em] mb-1 ${insurance === tier.id ? 'text-emerald-900' : 'text-slate-900'}`}>{tier.label}</h5>
                      <p className="text-[10px] text-slate-400 font-bold mb-4">{tier.desc}</p>
                      <span className={`text-[11px] font-black uppercase ${insurance === tier.id ? 'text-emerald-600' : 'text-slate-300'}`}>{tier.cost}</span>
                    </button>
                  ))}
               </div>
            </div>

            <div className="bg-white p-10 rounded-[3.5rem] border-2 border-slate-100 shadow-2xl space-y-10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-all pointer-events-none rotate-12 group-hover:scale-110">
                  <Activity size={160} />
               </div>
               
               <header className="flex items-center justify-between border-b border-slate-50 pb-6">
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <Info size={20} className="text-indigo-500" />
                    Finalized Logistics Quote
                  </h3>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    Real-time Audit Active
                  </div>
               </header>

               <div className="space-y-6">
                  {/* Base Line Item */}
                  <div className="flex justify-between items-center bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100/50 transition-all hover:bg-white hover:shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-slate-100">
                        <Scale size={20} className="text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">Base Logistics Fee</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{weight}kg @ ${negotiatedRate || trip.pricePerKg}/kg</p>
                      </div>
                    </div>
                    <span className="text-xl font-black text-slate-900">${pricing.baseFee.toFixed(2)}</span>
                  </div>

                  {/* Intelligence Breakdown (Urgency & Value) */}
                  {(pricing.urgencyPremium > 0 || pricing.valueSurcharge > 0 || pricing.insurancePremium > 0) && (
                    <div className="space-y-4 pt-4 px-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
                        <Activity size={14} className="text-indigo-500" />
                        Risk & Priority Adjustments
                      </p>
                      
                      {pricing.urgencyPremium > 0 && (
                        <div className="flex justify-between items-center px-6 py-4 bg-indigo-50/40 rounded-[1.5rem] border border-indigo-100/40 animate-in slide-in-from-left duration-300">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/20">
                              <Zap size={16} />
                            </div>
                            <div>
                              <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{urgencyLabels[urgency]}</p>
                              <div className="inline-flex items-center mt-1 px-2 py-0.5 bg-indigo-100 rounded text-[8px] font-black text-indigo-600 uppercase">
                                {urgencyBadges[urgency]}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                             <span className="text-sm font-black text-indigo-600">+${pricing.urgencyPremium.toFixed(2)}</span>
                             <p className="text-[8px] font-bold text-indigo-400 uppercase mt-0.5">Urgency Premium</p>
                          </div>
                        </div>
                      )}

                      {pricing.valueSurcharge > 0 && (
                        <div className="flex justify-between items-center px-6 py-4 bg-amber-50/40 rounded-[1.5rem] border border-amber-100/40 animate-in slide-in-from-left duration-500">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-amber-500 text-white rounded-xl shadow-lg shadow-amber-500/20">
                              <ShieldAlert size={16} />
                            </div>
                            <div>
                              <p className="text-xs font-black text-slate-900 uppercase tracking-widest">High-Value Custody Fee</p>
                              <div className="inline-flex items-center mt-1 px-2 py-0.5 bg-amber-100 rounded text-[8px] font-black text-amber-600 uppercase">
                                Declared  $500 Risk Adjust
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                             <span className="text-sm font-black text-amber-600">+${pricing.valueSurcharge.toFixed(2)}</span>
                             <p className="text-[8px] font-bold text-amber-400 uppercase mt-0.5">Security Surcharge</p>
                          </div>
                        </div>
                      )}

                      {pricing.insurancePremium > 0 && (
                        <div className="flex justify-between items-center px-6 py-4 bg-emerald-50/40 rounded-[1.5rem] border border-emerald-100/40 animate-in slide-in-from-left duration-700">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/20">
                              <ShieldCheck size={16} />
                            </div>
                            <div>
                              <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{insurance} Coverage Tier</p>
                              <div className="inline-flex items-center mt-1 px-2 py-0.5 bg-emerald-100 rounded text-[8px] font-black text-emerald-600 uppercase">
                                All-Risk Protection Active
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                             <span className="text-sm font-black text-emerald-600">+${pricing.insurancePremium.toFixed(2)}</span>
                             <p className="text-[8px] font-bold text-emerald-400 uppercase mt-0.5">Insurance Premium</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="pt-10 border-t-2 border-dashed border-slate-100 flex flex-col sm:flex-row justify-between items-end sm:items-center gap-8">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingDown size={14} className="text-emerald-500" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Guaranteed Escrow Total</p>
                      </div>
                      <p className="text-6xl font-black text-slate-900 tracking-tighter leading-none">
                        <span className="text-2xl align-top mr-1">$</span>{pricing.total.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                       <div className="bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-100/50">
                          <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">Traveler Payout (80%)</p>
                          <p className="text-2xl font-black text-emerald-600 tracking-tight">${pricing.travelerPayout.toFixed(2)}</p>
                       </div>
                    </div>
                  </div>
               </div>

               <div className="pt-4 space-y-4">
                 <button
                    disabled={isSubmitting}
                    onClick={handleConfirm}
                    className="w-full py-7 bg-slate-900 text-white font-black rounded-[2.5rem] hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-500/20 active:scale-[0.98] flex items-center justify-center gap-4 text-xl tracking-tight disabled:opacity-50 group/btn"
                 >
                    {isSubmitting ? (
                      <>
                        <Clock size={28} className="animate-spin" />
                        Initializing Smart Escrow...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={28} className="text-emerald-400 group-hover/btn:scale-110 transition-transform" />
                        Secure Shipment Node
                      </>
                    )}
                 </button>

                 <div className="flex items-center justify-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 py-3 rounded-2xl border border-slate-100">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    Global Liability Protection Active ($10,000 Cap)
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentBookingModal;
