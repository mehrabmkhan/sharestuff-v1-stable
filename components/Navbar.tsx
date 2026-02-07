
import React, { useState } from 'react';
import { Shield, Settings, PlusCircle, LogIn, User as UserIcon } from 'lucide-react';
import { AppState } from '../types';

interface NavbarProps {
  activeView: AppState['view'];
  isLoggedIn: boolean;
  onLogin: () => void;
  onSettings: () => void;
  onChangeView: (view: AppState['view']) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, isLoggedIn, onLogin, onSettings, onChangeView }) => {
  return (
    <nav className="sticky top-0 z-50 w-full glass-dark px-6 py-4 flex items-center justify-between border-b border-white/10">
      <div 
        className="flex items-center space-x-3 cursor-pointer group"
        onClick={() => onChangeView('search')}
      >
        <div className="bg-emerald-500 p-2 rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          <Shield size={24} className="text-white" />
        </div>
        <span className="text-2xl font-black tracking-tighter text-white">Sharestuff</span>
      </div>

      <div className="hidden md:flex items-center bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-xl">
        <button 
          onClick={() => onChangeView('search')}
          className={`px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${activeView === 'search' ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          Explore
        </button>
        <button 
          onClick={() => onChangeView('post')}
          className={`px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${activeView === 'post' ? 'bg-indigo-500 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <div className="flex items-center gap-2">
            <PlusCircle size={16} /> Post
          </div>
        </button>
        <button 
          onClick={() => onChangeView('bookings')}
          className={`px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${activeView === 'bookings' ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          Activity
        </button>
        <button 
          onClick={() => onChangeView('host')}
          className={`px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${activeView === 'host' ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          Partner
        </button>
      </div>

      <div className="flex items-center space-x-5">
        {!isLoggedIn ? (
          <button 
            onClick={onLogin}
            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-black rounded-xl text-xs uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-xl active:scale-95"
          >
            <LogIn size={16} /> Login
          </button>
        ) : (
          <>
            <button 
              onClick={onSettings}
              className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all active:scale-95"
            >
              <Settings size={22} />
            </button>
            <div 
              onClick={onSettings}
              className="h-11 w-11 rounded-full border-2 border-emerald-500/50 p-0.5 overflow-hidden cursor-pointer hover:border-emerald-400 hover:scale-110 transition-all shadow-lg ring-4 ring-emerald-500/5"
            >
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="rounded-full w-full h-full object-cover" />
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
