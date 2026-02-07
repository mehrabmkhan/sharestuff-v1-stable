
import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Scale, 
  DollarSign, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Camera, 
  PlaneTakeoff,
  AlertOctagon,
  Lock
} from 'lucide-react';
import { COLORS } from '../constants';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'disputes' | 'kyc' | 'payouts'>('disputes');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      {/* Admin Header */}
      <div className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3">
            <Lock className="text-emerald-500" />
            SHARESTUFF <span className="text-slate-500 font-light italic">Command Center</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Authorized Personnel Only • Node: NYC-01</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-slate-800 rounded-xl border border-slate-700 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-bold uppercase tracking-widest">Platform Healthy</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Escrow Volume', val: '$1.2M', icon: DollarSign, color: 'text-emerald-400' },
          { label: 'Active Disputes', val: '14', icon: ShieldAlert, color: 'text-rose-400' },
          { label: 'KYC Pending', val: '128', icon: FileText, color: 'text-blue-400' },
          { label: 'In-Transit', val: '412', icon: PlaneTakeoff, color: 'text-indigo-400' },
        ].map(s => (
          <div key={s.label} className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
            <div className={`mb-3 ${s.color}`}><s.icon size={24} /></div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
            <p className="text-2xl font-black mt-1">{s.val}</p>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-4 mb-2">
            <button 
              onClick={() => setActiveTab('disputes')}
              className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${activeTab === 'disputes' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              Dispute Queue
            </button>
            <button 
              onClick={() => setActiveTab('kyc')}
              className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${activeTab === 'kyc' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              KYC Verification
            </button>
          </div>

          {/* Dispute Card (Series-A Standard) */}
          <div className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 bg-rose-500/10 border-b border-rose-500/20 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <AlertOctagon className="text-rose-500" />
                <h3 className="font-bold">CASE #DS-9281: Mismatched Description</h3>
              </div>
              <span className="text-xs font-mono bg-slate-900 px-3 py-1 rounded">PRIORITY: HIGH</span>
            </div>
            
            <div className="p-8 grid grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">Sender's Declared Photo</p>
                  <div className="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-700">
                    <img src="https://picsum.photos/seed/iphone-box/300/200" className="rounded-xl object-cover w-full h-full opacity-80" alt="Declared" />
                  </div>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
                  <h4 className="text-xs font-bold mb-2">SENDER STATEMENT</h4>
                  <p className="text-sm text-slate-400">"The iPhone box was factory sealed when I handed it over in London."</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">Courier's Receipt Photo (Destination)</p>
                  <div className="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-700">
                    <img src="https://picsum.photos/seed/iphone-broken/300/200" className="rounded-xl object-cover w-full h-full border-2 border-rose-500/50" alt="Receiver" />
                  </div>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
                  <h4 className="text-xs font-bold mb-2">RECIPIENT STATEMENT</h4>
                  <p className="text-sm text-slate-400">"The seal was broken and there are scratches on the screen. Not as described."</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-900/50 border-t border-slate-700 flex justify-between items-center">
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm flex items-center gap-2 transition-all">
                  <XCircle size={18} /> Refund Sender
                </button>
                <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl text-sm flex items-center gap-2 transition-all">
                  Partial Settlement
                </button>
              </div>
              <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20">
                <CheckCircle size={18} /> Release to Traveler
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar: Audit Logs & Policy */}
        <div className="space-y-6">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-3xl">
            <h3 className="font-bold text-sm mb-6 flex items-center gap-2">
              <Scale size={18} className="text-emerald-500" />
              Policy Quick-Action
            </h3>
            <div className="space-y-4">
              <button className="w-full text-left p-4 bg-slate-900/50 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all">
                <p className="text-xs font-bold text-white mb-1">Invoke "Traveler's Veto"</p>
                <p className="text-[10px] text-slate-500">Auto-cancel order due to safety concerns at meetup.</p>
              </button>
              <button className="w-full text-left p-4 bg-slate-900/50 rounded-xl border border-slate-700 hover:border-rose-500/50 transition-all">
                <p className="text-xs font-bold text-white mb-1">Freeze Traveler Payout</p>
                <p className="text-[10px] text-slate-500">Hold funds pending KYC re-verification.</p>
              </button>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 p-6 rounded-3xl">
            <h3 className="font-bold text-sm mb-6">Recent Platform Audit</h3>
            <div className="space-y-4 font-mono text-[10px]">
              <div className="flex gap-2">
                <span className="text-emerald-500">[09:41]</span>
                <span className="text-slate-400">Escrow released: #ORD-772</span>
              </div>
              <div className="flex gap-2">
                <span className="text-blue-500">[09:38]</span>
                <span className="text-slate-400">KYC Verified: @traveler_42</span>
              </div>
              <div className="flex gap-2">
                <span className="text-rose-500">[09:12]</span>
                <span className="text-slate-400">Fraud Flag: IP Mismatch (LHR)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
