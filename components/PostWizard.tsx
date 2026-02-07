
import React, { useState } from 'react';
import { Plane, Package, ArrowRight, ShieldCheck, Weight, DollarSign, Globe, Calendar, MapPin, Scale, AlertTriangle, FileText } from 'lucide-react';

interface PostWizardProps {
  onComplete: () => void;
}

const PostWizard: React.FC<PostWizardProps> = ({ onComplete }) => {
  const [type, setType] = useState<'trip' | 'request' | null>(null);
  const [step, setStep] = useState(1);

  if (!type) {
    return (
      <div className="max-w-4xl mx-auto py-32 px-6 animate-in fade-in duration-700">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">New Network Entry</span>
          <h2 className="text-6xl font-black text-slate-900 tracking-tighter">Choose your node role.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <button 
            onClick={() => setType('trip')}
            className="group p-12 bg-white border border-slate-100 rounded-[4rem] hover:border-indigo-500 hover:shadow-2xl transition-all text-left relative overflow-hidden"
          >
             <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
               <Plane size={240} className="-rotate-12" />
             </div>
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
              <Plane size={40} />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">Register as Courier</h3>
            <p className="text-slate-500 font-medium leading-relaxed max-w-xs">Earn money by transporting verified assets on your existing flight route.</p>
          </button>

          <button 
            onClick={() => setType('request')}
            className="group p-12 bg-white border border-slate-100 rounded-[4rem] hover:border-emerald-500 hover:shadow-2xl transition-all text-left relative overflow-hidden"
          >
             <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
               <Package size={240} />
             </div>
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
              <Package size={40} />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">Register as Sender</h3>
            <p className="text-slate-500 font-medium leading-relaxed max-w-xs">Ship cross-border at 80% lower cost using our decentralized traveler network.</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-20 px-6 animate-in slide-in-from-bottom-8 duration-500">
      <div className="bg-white rounded-[3.5rem] p-16 border border-slate-100 shadow-2xl relative">
        <button 
          onClick={() => { setType(null); setStep(1); }}
          className="absolute top-10 left-10 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
        >
          ← Back to Role
        </button>

        <header className="mb-12 text-center">
           <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center ${type === 'trip' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white shadow-emerald-500/20 shadow-xl'}`}>
             {type === 'trip' ? <Plane size={28} /> : <Package size={28} />}
           </div>
           <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">
             {type === 'trip' ? 'Publish Route' : 'Request Shipment'}
           </h2>
           <p className="text-slate-400 font-medium">Node Registration Step {step} of 2</p>
        </header>
        
        <div className="space-y-8">
          {/* Section 1: Route & Time */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Origin Node (Airport/Hub)</label>
              <div className="relative">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input type="text" placeholder="Toronto (YYZ)" className="w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 font-bold" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Destination Node</label>
              <div className="relative">
                <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input type="text" placeholder="London (LHR)" className="w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 font-bold" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Schedule Date</label>
                <div className="relative">
                  <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input type="date" className="w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-bold" />
                </div>
             </div>
             {type === 'trip' && (
               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Flight Number</label>
                  <input type="text" placeholder="AC848" className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-bold uppercase" />
               </div>
             )}
          </div>

          {/* Section 2: Asset Details */}
          <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
             <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Asset Specifications</h4>
                <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-slate-100 shadow-sm">
                   <Scale size={14} className="text-indigo-500" />
                   <span className="text-[10px] font-black text-slate-900 tracking-widest">Weight-Tier: L-3</span>
                </div>
             </div>
             
             <div className="space-y-6">
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{type === 'trip' ? 'Available P2P Capacity (KG)' : 'Item Weight (KG)'}</label>
                   <div className="flex items-center gap-4">
                      <input type="range" min="1" max="25" className="flex-1 h-2 bg-slate-200 rounded-full appearance-none accent-indigo-600" />
                      <span className="text-lg font-black text-slate-900 w-12 text-center">5kg</span>
                   </div>
                </div>

                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{type === 'trip' ? 'Pricing Strategy (Rate/KG)' : 'Item Description'}</label>
                   <div className="relative">
                      {type === 'trip' ? (
                        <>
                          <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input type="number" placeholder="15" className="w-full pl-12 pr-6 py-5 bg-white border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-black" />
                        </>
                      ) : (
                        <>
                          <FileText className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input type="text" placeholder="e.g. Unlocked iPhone 16 - Boxed" className="w-full pl-12 pr-6 py-5 bg-white border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-bold" />
                        </>
                      )}
                   </div>
                </div>
             </div>
          </div>

          <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] flex items-center gap-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <ShieldCheck size={100} />
            </div>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
              <ShieldCheck className="text-emerald-400" size={24} />
            </div>
            <div className="relative z-10">
               <p className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-1">Compliance Waiver</p>
               <p className="text-[11px] font-medium text-slate-400 max-w-sm">I certify this shipment contains no prohibited assets and satisfies Global Protocol v1.5 standards.</p>
            </div>
          </div>

          <button 
            onClick={onComplete}
            className="w-full py-7 bg-slate-900 text-white font-black rounded-[2.5rem] flex items-center justify-center gap-4 hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-500/20 active:scale-95 text-xl tracking-tight"
          >
            Authenticate & Post to Network
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostWizard;
