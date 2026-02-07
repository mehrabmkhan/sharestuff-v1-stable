
import React from 'react';
import { X, Package, ShieldCheck, Camera, CheckCircle2, ArrowRight, Globe, Users, ArrowDown, Search, Link, Truck } from 'lucide-react';

interface HowItWorksModalProps {
  onClose: () => void;
}

const FlowStep = ({ icon: Icon, title, desc, color }: any) => (
  <div className="flex flex-col items-center text-center max-w-[200px] relative">
    <div className={`w-20 h-20 ${color} rounded-[2rem] flex items-center justify-center text-white shadow-2xl mb-4 group-hover:scale-110 transition-transform`}>
      <Icon size={32} />
    </div>
    <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">{title}</h4>
    <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase tracking-widest">{desc}</p>
  </div>
);

const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-slate-900/95 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="relative w-full max-w-7xl bg-white rounded-[4rem] overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-[130] p-4 bg-slate-100 hover:bg-slate-900 text-slate-400 hover:text-white rounded-full transition-all active:scale-90"
        >
          <X size={28} />
        </button>

        <div className="flex flex-col md:flex-row flex-1 overflow-y-auto">
          {/* Left Visual Banner */}
          <div className="hidden md:flex w-[35%] bg-slate-900 p-16 flex-col justify-between relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-[150%] h-[100%] bg-indigo-500/10 blur-[100px] -rotate-45"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <Globe className="text-indigo-400 animate-spin-slow" size={40} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">Protocol v1.5</span>
              </div>
              <h2 className="text-6xl font-black text-white leading-none tracking-tighter mb-6">P2P Flow<br/>Dynamics.</h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-xs">
                Visualizing the decentralized logistics lifecycle from match to payout.
              </p>
            </div>
            <div className="relative z-10 p-8 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-md">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">Network Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-sm font-black text-white">12,402 Active Nodes</span>
              </div>
            </div>
          </div>

          {/* Flowchart Content */}
          <div className="flex-1 p-16 bg-slate-50 overflow-y-auto">
            <header className="mb-16 text-center md:text-left">
              <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">The Protocol Flowchart</span>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">How an Asset moves globally.</h3>
            </header>

            {/* Visual Flowchart */}
            <div className="bg-white p-12 rounded-[3.5rem] border-2 border-slate-100 shadow-sm mb-16 overflow-x-auto">
              <div className="flex items-center justify-between min-w-[800px] relative">
                <FlowStep icon={Search} title="Matching" desc="AI Identifies Hubs & Routes" color="bg-indigo-600" />
                <ArrowRight size={32} className="text-slate-200 mt-[-40px]" />
                <FlowStep icon={ShieldCheck} title="Escrow" desc="Funds Locked in Protocol" color="bg-emerald-600" />
                <ArrowRight size={32} className="text-slate-200 mt-[-40px]" />
                <FlowStep icon={Camera} title="Validation" desc="Visual Proof & Custody" color="bg-blue-600" />
                <ArrowRight size={32} className="text-slate-200 mt-[-40px]" />
                <FlowStep icon={Truck} title="Transit" desc="Live Node-to-Node tracking" color="bg-amber-600" />
                <ArrowRight size={32} className="text-slate-200 mt-[-40px]" />
                <FlowStep icon={CheckCircle2} title="Payout" desc="Verification & Release" color="bg-slate-900" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                <h4 className="text-xl font-black text-slate-900 mb-4">Security Thresholds</h4>
                <ul className="space-y-4">
                  {[
                    "Biometric ID Verification",
                    "Customs Compliance Audit",
                    "Damage Waiver Protocol",
                    "Escrow Release Hold"
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-xs font-bold text-slate-500">
                      <CheckCircle2 size={16} className="text-emerald-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-10 bg-indigo-600 rounded-[3rem] text-white shadow-2xl">
                <h4 className="text-xl font-black mb-4">Ready to Node?</h4>
                <p className="text-indigo-100 text-sm font-medium mb-8 leading-relaxed">
                  Join the network as a Courier or a Storage Hub and start optimizing global logistics.
                </p>
                <button 
                  onClick={onClose}
                  className="w-full py-5 bg-white text-indigo-600 font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-slate-50 active:scale-95 transition-all"
                >
                  Enter Pipeline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksModal;
