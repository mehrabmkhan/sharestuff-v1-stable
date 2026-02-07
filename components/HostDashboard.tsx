
import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Wallet, 
  Clock, 
  CheckCircle, 
  ChevronRight, 
  QrCode, 
  Settings2, 
  Package, 
  Plus, 
  TrendingUp, 
  Calendar,
  MoreVertical,
  Edit3,
  Power,
  Activity,
  Layers,
  Thermometer,
  ShieldCheck
} from 'lucide-react';
import { MOCK_LISTINGS } from '../constants';

const HostDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'activity'>('overview');

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 animate-in fade-in duration-700">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <span className="px-4 py-1.5 bg-emerald-100 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-200">Certified Hub Partner</span>
             <span className="text-slate-300 font-bold">•</span>
             <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-black uppercase tracking-widest">
               <ShieldCheck size={12} className="text-indigo-500" />
               Node Active: SS-YYZ-C1
             </div>
          </div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter">Partner Terminal</h1>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-8 py-5 bg-white border border-slate-200 text-slate-900 font-black rounded-3xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm active:scale-95">
            <Settings2 size={20} className="text-indigo-500" />
            Config Terminal
          </button>
          <button className="flex-1 md:flex-none px-8 py-5 bg-emerald-600 text-white font-black rounded-3xl flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/20 hover:scale-[1.03] active:scale-95 transition-all">
            <QrCode size={20} />
            Handover Scan
          </button>
        </div>
      </div>

      {/* Analytics Tickers */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
         {[
           { label: 'Yield 24h', val: '$412.00', trend: '+12%', color: 'text-emerald-500', icon: Wallet },
           { label: 'Utilization', val: '84%', trend: 'Peak', color: 'text-indigo-500', icon: Layers },
           { label: 'Compliance', val: '99.9%', trend: 'Elite', color: 'text-blue-500', icon: ShieldCheck },
           { label: 'Next Pickup', val: '14m', trend: 'Soon', color: 'text-amber-500', icon: Clock }
         ].map(stat => (
           <div key={stat.label} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm flex flex-col justify-between hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl bg-slate-50 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg bg-slate-100 ${stat.color}`}>{stat.trend}</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.val}</h3>
              </div>
           </div>
         ))}
      </div>

      {/* Internal Navigation */}
      <div className="flex gap-10 mb-12 border-b border-slate-100">
        {[
          { id: 'overview', label: 'Dashboard', icon: Activity },
          { id: 'listings', label: 'Hub Nodes', icon: Package },
          { id: 'activity', label: 'Logistics Stream', icon: Calendar }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-3 pb-6 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <tab.icon size={16} />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-full animate-in slide-in-from-left duration-300" />
            )}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-slate-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden group">
               <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform">
                  <BarChart3 size={280} />
               </div>
               <div className="relative z-10">
                  <h3 className="text-3xl font-black mb-2 tracking-tight">Node Yield Optimizer</h3>
                  <p className="text-slate-400 text-lg mb-10 max-w-sm">Smart pricing is currently active. Your rates are 5% above market due to high demand.</p>
                  <div className="flex gap-10">
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Estimated Monthly Revenue</p>
                      <p className="text-5xl font-black text-emerald-400 tracking-tighter">$4,281.50</p>
                    </div>
                    <div className="border-l border-white/10 pl-10">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Platform Rank</p>
                      <p className="text-2xl font-black text-white tracking-tight">Top 1% Global Hub</p>
                    </div>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[3.5rem] border border-slate-100 p-10 flex flex-col justify-between shadow-sm">
               <div>
                  <h4 className="text-xl font-black text-slate-900 mb-2">Hub Environment</h4>
                  <p className="text-sm text-slate-400 font-medium mb-8">Live metrics for your primary node.</p>
                  <div className="space-y-6">
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                           <Thermometer size={20} className="text-rose-500" />
                           <span className="text-xs font-black text-slate-700 uppercase tracking-widest">Temp Node</span>
                        </div>
                        <span className="text-sm font-black text-slate-900">22.4°C</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                           <Activity size={20} className="text-indigo-500" />
                           <span className="text-xs font-black text-slate-700 uppercase tracking-widest">Network Latency</span>
                        </div>
                        <span className="text-sm font-black text-slate-900">12ms</span>
                     </div>
                  </div>
               </div>
               <button className="w-full py-4 bg-slate-50 text-slate-900 font-black rounded-2xl text-[10px] uppercase tracking-widest border border-slate-100 hover:bg-slate-100 transition-all">
                  Request Full Hub Audit
               </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
             <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
               <h2 className="text-xl font-black text-slate-900 tracking-tight">Logistics Manifest</h2>
               <div className="flex gap-4">
                 <button className="px-4 py-2 bg-white border rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Export Ledger</button>
               </div>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="bg-slate-50/50">
                     <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Node User</th>
                     <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pipeline Status</th>
                     <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assets</th>
                     <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Yield Payout</th>
                     <th className="p-8"></th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {[1, 2, 3, 4].map(i => (
                     <tr key={i} className="hover:bg-slate-50 transition-colors">
                       <td className="p-8">
                         <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200">
                             <img src={`https://picsum.photos/seed/user${i*9}/100/100`} />
                           </div>
                           <div>
                             <p className="text-sm font-black text-slate-900">Sarah Jenkins</p>
                             <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Verified Traveler • ID-A82</p>
                           </div>
                         </div>
                       </td>
                       <td className="p-8">
                         <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                           <Activity size={12} className="animate-pulse" /> In Custody
                         </div>
                       </td>
                       <td className="p-8">
                         <p className="text-xs font-black text-slate-700 uppercase tracking-widest">2 Units (XL-Tier)</p>
                       </td>
                       <td className="p-8">
                         <p className="text-lg font-black text-emerald-600">$48.00</p>
                       </td>
                       <td className="p-8 text-right">
                         <button className="p-3 text-slate-300 hover:text-indigo-600 transition-colors"><ChevronRight size={20} /></button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostDashboard;
