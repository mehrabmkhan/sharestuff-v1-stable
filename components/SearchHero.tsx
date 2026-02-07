
import React, { useState } from 'react';
import { Search, MapPin, Calendar, Plane, Package, Globe } from 'lucide-react';

interface SearchHeroProps {
  mode: 'storage' | 'delivery';
  onModeChange: (mode: 'storage' | 'delivery') => void;
  onSearch: (query: string) => void;
}

const SearchHero: React.FC<SearchHeroProps> = ({ mode, onModeChange, onSearch }) => {
  const [query, setQuery] = useState('');

  const isCourier = mode === 'delivery';

  return (
    <section className="relative h-[650px] bg-slate-900 overflow-hidden flex flex-col items-center justify-center px-6">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[80%] blur-[120px] rounded-full animate-pulse transition-colors duration-1000 ${isCourier ? 'bg-indigo-500/30' : 'bg-teal-500/30'}`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[70%] blur-[120px] rounded-full animate-pulse delay-1000 transition-colors duration-1000 ${isCourier ? 'bg-emerald-500/20' : 'bg-blue-500/20'}`}></div>
      </div>

      {/* Mode Switcher - REORDERED */}
      <div className="relative z-20 flex bg-white/5 backdrop-blur-xl p-1.5 rounded-3xl border border-white/10 mb-12 shadow-2xl">
        <button 
          onClick={() => onModeChange('delivery')}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${isCourier ? 'bg-white text-slate-900 shadow-2xl scale-105' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <Globe size={20} className={isCourier ? 'text-indigo-600' : 'text-slate-400'} />
          International Courier
        </button>
        <button 
          onClick={() => onModeChange('storage')}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${!isCourier ? 'bg-white text-slate-900 shadow-2xl scale-105' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <Package size={20} className={!isCourier ? 'text-teal-600' : 'text-slate-400'} />
          Luggage Storage
        </button>
      </div>

      <div className="relative z-10 max-w-5xl w-full text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9] animate-in slide-in-from-bottom duration-700">
          {isCourier ? 'World-Class Courier via' : 'Secure Storage for'} <br/>
          <span className={`transition-colors duration-700 ${isCourier ? 'text-indigo-400' : 'text-teal-400'}`}>
            {isCourier ? 'Trusted Global Travelers' : 'Travelers in every Hub'}
          </span>
        </h1>
        
        <div className="bg-white p-3 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col md:flex-row gap-3 max-w-5xl mx-auto border-4 border-white/20 animate-in fade-in zoom-in duration-1000">
          <div className="flex-[2] flex items-center px-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 group focus-within:bg-white focus-within:border-indigo-500/50 transition-all">
            <MapPin className={isCourier ? 'text-indigo-500' : 'text-teal-500'} size={24} />
            <input 
              type="text" 
              placeholder={isCourier ? "Origin Hub (e.g. Toronto YYZ)" : "Search destination (e.g. Ginza, Tokyo)"} 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-6 bg-transparent outline-none text-slate-900 font-black text-lg placeholder:text-slate-400 ml-3"
            />
          </div>
          
          {isCourier && (
             <div className="flex-[2] flex items-center px-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 group focus-within:bg-white focus-within:border-indigo-500/50 transition-all">
              <Plane className="text-indigo-500" size={24} />
              <input 
                type="text" 
                placeholder="Destination Hub"
                className="w-full py-6 bg-transparent outline-none text-slate-900 font-black text-lg placeholder:text-slate-400 ml-3"
              />
            </div>
          )}

          <button 
            onClick={() => onSearch(query)}
            className={`px-12 py-6 rounded-[2.5rem] text-white font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 group ${isCourier ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20' : 'bg-teal-500 hover:bg-teal-600 shadow-teal-500/20'}`}
          >
            <Search size={24} className="group-hover:rotate-12 transition-transform" />
            {isCourier ? 'Search Trips' : 'Find Storage'}
          </button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-10">
          {[
            { label: 'Escrow Secured', color: 'text-emerald-400' },
            { label: 'Identity Verified', color: 'text-indigo-400' },
            { label: 'Full Insurance', color: 'text-blue-400' }
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-2 group cursor-default">
              <div className={`w-1.5 h-1.5 rounded-full bg-current ${feat.color} animate-pulse`}></div>
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">{feat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchHero;
