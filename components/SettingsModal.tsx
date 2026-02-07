
import React, { useState, useRef } from 'react';
import { 
  X, User, ShieldCheck, Key, Bell, LogOut, ChevronRight, 
  CheckCircle2, CreditCard, Plus, Trash2, Camera, Loader2, Globe, Activity 
} from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
  onLogout: () => void;
}

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard';
  last4: string;
  expiry: string;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'protocol' | 'billing'>('profile');
  const [isUploading, setIsUploading] = useState(false);
  const [avatar, setAvatar] = useState("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', type: 'visa', last4: '4242', expiry: '12/26' },
    { id: '2', type: 'mastercard', last4: '8812', expiry: '09/25' }
  ]);

  const handleOpenKeyPicker = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTimeout(() => {
          setAvatar(reader.result as string);
          setIsUploading(false);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePayment = (id: string) => {
    setPaymentMethods(prev => prev.filter(p => p.id !== id));
  };

  const addPayment = () => {
    const newCard: PaymentMethod = {
      id: Date.now().toString(),
      type: Math.random() > 0.5 ? 'visa' : 'mastercard',
      last4: Math.floor(1000 + Math.random() * 9000).toString(),
      expiry: '01/29'
    };
    setPaymentMethods(prev => [...prev, newCard]);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-slate-900/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl bg-white rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] border border-white/10">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-[160] p-4 bg-slate-100 hover:bg-slate-900 text-slate-400 hover:text-white rounded-full transition-all active:scale-90"
        >
          <X size={28} />
        </button>

        {/* Sidebar */}
        <div className="w-full md:w-80 bg-slate-50 border-r p-12 flex flex-col">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="relative group mb-6">
              <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white shadow-xl ring-4 ring-emerald-500/10">
                {isUploading ? (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <Loader2 className="animate-spin text-indigo-500" />
                  </div>
                ) : (
                  <img src={avatar} className="w-full h-full object-cover" />
                )}
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 p-3 bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 transition-all active:scale-95"
              >
                <Camera size={16} />
              </button>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarUpload} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Alex Reed</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Global Node Verified</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { id: 'profile', label: 'Identity Node', icon: User },
              { id: 'billing', label: 'Wallet & Ledger', icon: CreditCard },
              { id: 'security', label: 'Global Security', icon: ShieldCheck },
              { id: 'protocol', label: 'Protocol Config', icon: Key }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-white shadow-xl text-indigo-600 border border-indigo-100' : 'text-slate-500 hover:bg-white/50 border border-transparent'}`}
              >
                <div className="flex items-center gap-4">
                  <tab.icon size={20} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                </div>
                {activeTab === tab.id && <ChevronRight size={14} />}
              </button>
            ))}
          </div>

          <button 
            onClick={onLogout}
            className="mt-auto w-full flex items-center gap-4 p-5 text-rose-500 font-black text-[10px] uppercase tracking-widest hover:bg-rose-50 rounded-2xl transition-all border border-transparent hover:border-rose-100"
          >
            <LogOut size={20} /> Terminate Session
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-16 overflow-y-auto bg-white">
          {activeTab === 'profile' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">Identity Node</h2>
              <p className="text-slate-500 mb-12 font-medium">Manage your personal identification and public alias.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                 <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Legal Name</label>
                   <input defaultValue="Alex Reed" className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl font-black text-slate-900 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all" />
                 </div>
                 <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Protocol Alias</label>
                   <input defaultValue="@traveler_alex" className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl font-black text-indigo-600 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all" />
                 </div>
              </div>

              <div className="p-10 bg-emerald-50 border border-emerald-100 rounded-[3rem] flex items-center gap-8 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:scale-110 transition-transform">
                    <ShieldCheck size={120} />
                 </div>
                 <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20 relative z-10">
                    <ShieldCheck size={32} />
                 </div>
                 <div className="relative z-10">
                    <h4 className="text-xl font-black text-emerald-900 mb-1">Passport Verified</h4>
                    <p className="text-sm text-emerald-600 font-medium max-w-sm">Your identity is cryptographically verified. Cross-border shipments are unlocked.</p>
                 </div>
                 <div className="ml-auto relative z-10">
                    <div className="bg-emerald-500 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Active Status</div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
               <div className="flex justify-between items-center mb-12">
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Financial Ledger</h2>
                    <p className="text-slate-500 font-medium">Manage your payment methods and payout settings.</p>
                  </div>
                  <button 
                    onClick={addPayment}
                    className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-slate-900/10"
                  >
                    <Plus size={16} /> Add Method
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {paymentMethods.map(method => (
                    <div key={method.id} className="p-10 bg-slate-50 border border-slate-200 rounded-[3rem] group relative hover:border-indigo-500/30 hover:bg-white hover:shadow-2xl transition-all">
                       <div className="flex justify-between items-start mb-10">
                          <div className={`p-4 rounded-2xl ${method.type === 'visa' ? 'bg-blue-100 text-blue-600' : 'bg-rose-100 text-rose-600'}`}>
                             <CreditCard size={28} />
                          </div>
                          <button 
                            onClick={() => removePayment(method.id)}
                            className="p-3 bg-white text-slate-300 hover:text-rose-500 rounded-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                       </div>
                       <h4 className="text-xl font-black text-slate-900 mb-1 capitalize">{method.type} Gold</h4>
                       <p className="text-slate-400 font-mono tracking-[0.2em]">•••• •••• •••• {method.last4}</p>
                       <div className="mt-10 flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expires {method.expiry}</span>
                          <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest border border-indigo-100 px-3 py-1 rounded-lg">Verified Method</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'protocol' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
               <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">Logistics Protocol</h2>
               <p className="text-slate-500 mb-12 font-medium">Connect your custom intelligence engine for high-resolution tracking.</p>
               
               <div className="space-y-8">
                  <div className="p-10 bg-slate-900 rounded-[3.5rem] text-white relative overflow-hidden group shadow-2xl">
                     <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-all">
                        <Activity size={180} />
                     </div>
                     <div className="relative z-10 flex items-center gap-3 mb-6">
                        <Key className="text-emerald-400" size={24} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Intelligence Node v2.0</span>
                     </div>
                     <h4 className="text-2xl font-black mb-4 relative z-10 tracking-tight">Connect Custom API Key</h4>
                     <p className="text-slate-400 text-base mb-10 max-w-lg relative z-10 leading-relaxed font-medium">
                       Power your dashboard with advanced logistics reasoning, 1080p video tracking, and real-time news grounding.
                     </p>
                     <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                       <button 
                          onClick={handleOpenKeyPicker}
                          className="w-full sm:w-auto px-12 py-6 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-[2rem] text-sm uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                       >
                          <Plus size={20} /> Configure Key
                       </button>
                       <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-[11px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
                         Billing Requirements
                       </a>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="p-10 border border-slate-100 rounded-[3rem] bg-slate-50 flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all">
                        <div className="flex items-center gap-5">
                           <div className="p-4 bg-white rounded-2xl shadow-sm">
                              <Bell size={24} className="text-indigo-500" />
                           </div>
                           <div>
                              <p className="font-black text-slate-900 text-sm">Real-time Webhook</p>
                              <p className="text-xs text-slate-400 font-medium">Status updates to mobile device.</p>
                           </div>
                        </div>
                        <div className="w-14 h-7 bg-emerald-500 rounded-full p-1 cursor-pointer">
                           <div className="w-5 h-5 bg-white rounded-full ml-auto shadow-sm"></div>
                        </div>
                     </div>
                     <div className="p-10 border border-slate-100 rounded-[3rem] bg-slate-50 flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all">
                        <div className="flex items-center gap-5">
                           <div className="p-4 bg-white rounded-2xl shadow-sm">
                              <Globe size={24} className="text-emerald-500" />
                           </div>
                           <div>
                              <p className="font-black text-slate-900 text-sm">Global Data Feed</p>
                              <p className="text-xs text-slate-400 font-medium">Access worldwide hub statuses.</p>
                           </div>
                        </div>
                        <div className="w-14 h-7 bg-slate-200 rounded-full p-1 cursor-pointer">
                           <div className="w-5 h-5 bg-white rounded-full shadow-sm"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
