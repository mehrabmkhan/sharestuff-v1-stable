
import React, { useState, useMemo } from 'react';
import { Shield, Package, Plane, SlidersHorizontal, Info, Lock, Facebook, Twitter, Instagram } from 'lucide-react';
import { Listing, Booking, AppState } from './types';
import { MOCK_LISTINGS, MOCK_TRIPS } from './constants';
import Navbar from './components/Navbar';
import SearchHero from './components/SearchHero';
import MapInterface from './components/MapInterface';
import ListingDetailModal from './components/ListingDetailModal';
import HostDashboard from './components/HostDashboard';
import AdminDashboard from './components/AdminDashboard';
import MyBookings from './components/MyBookings';
import TripCard from './components/TripCard';
import ProhibitedItemsModal from './components/ProhibitedItemsModal';
import PostWizard from './components/PostWizard';
import StatusTimeline from './components/StatusTimeline';
import ShipmentBookingModal from './components/ShipmentBookingModal';
import HowItWorksModal from './components/HowItWorksModal';
import LoginModal from './components/LoginModal';
import SettingsModal from './components/SettingsModal';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    view: 'search',
    mode: 'delivery',
    selectedListing: null,
    selectedTrip: null,
    activeBid: null,
    searchQuery: '',
    activeFilters: [],
    isLoggedIn: false,
    showAuthModal: false,
    showSettingsModal: false
  });

  const [showSafetyFirewall, setShowSafetyFirewall] = useState(false);
  const [showShipmentModal, setShowShipmentModal] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter(l => 
      (l.city.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
       l.title.toLowerCase().includes(state.searchQuery.toLowerCase())) &&
      (state.activeFilters.length === 0 || state.activeFilters.every(f => l.amenities.includes(f)))
    );
  }, [state.searchQuery, state.activeFilters]);

  const filteredTrips = useMemo(() => {
    return MOCK_TRIPS.filter(t => 
      t.origin.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
      t.destination.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }, [state.searchQuery]);

  const toggleFilter = (filter: string) => {
    setState(prev => {
      const isExist = prev.activeFilters.includes(filter);
      const newFilters = isExist 
        ? prev.activeFilters.filter(f => f !== filter)
        : [...prev.activeFilters, filter];
      return { ...prev, activeFilters: newFilters };
    });
  };

  const handleSearch = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query, view: 'search' }));
  };

  const handleSafetyAccept = () => {
    setShowSafetyFirewall(false);
    setShowShipmentModal(true);
  };

  const renderContent = () => {
    if (state.view === 'host') return <HostDashboard />;
    if (state.view === 'admin') return <AdminDashboard />;
    if (state.view === 'post') return <PostWizard onComplete={() => setState(prev => ({...prev, view: 'search'}))} />;
    if (state.view === 'bookings') return (
      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-4xl font-black text-slate-900 mb-12 tracking-tighter">Activity Stream</h2>
        <div className="bg-white p-12 rounded-[3rem] border mb-12 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Pipeline</p>
              <h3 className="text-2xl font-black">YYZ → LHR Transit Node</h3>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Logistics Status</p>
              <span className="px-4 py-1.5 bg-emerald-100 text-emerald-600 rounded-full font-black text-xs">Funds Secured</span>
            </div>
          </div>
          <StatusTimeline currentStatus="FUNDED" />
        </div>
        <MyBookings bookings={activeBookings} onFindStorage={() => setState(prev => ({...prev, view: 'search', mode: 'storage'}))} />
      </div>
    );
    
    return (
      <div className="flex flex-col">
        <SearchHero 
          mode={state.mode}
          onModeChange={(m) => setState(prev => ({ ...prev, mode: m }))}
          onSearch={handleSearch} 
        />
        
        <div className="bg-white border-b sticky top-[72px] z-40 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
            <button 
              onClick={() => setState(prev => ({...prev, activeFilters: []}))}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${state.activeFilters.length === 0 ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10' : 'bg-white text-slate-500 border-slate-200'}`}
            >
              Global Hubs
            </button>
            {['CCTV', '24/7', 'Verified', 'Insurance', 'Climate Control'].map(f => (
              <button 
                key={f}
                onClick={() => toggleFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${state.activeFilters.includes(f) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-500'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="hidden md:flex items-center gap-2 text-slate-500 text-xs font-black uppercase tracking-widest border rounded-xl px-4 py-2 hover:bg-slate-50">
            <SlidersHorizontal size={14} /> Filter Set
          </button>
        </div>

        {state.mode === 'storage' ? (
          <div className="flex flex-col lg:flex-row h-[800px] bg-white overflow-hidden">
            <div className="w-full lg:w-[480px] overflow-y-auto p-6 bg-slate-50 border-r">
              <div className="mb-8">
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Verified Hub Storage</h2>
                <p className="text-sm text-slate-500">{filteredListings.length} nodes available near "{state.searchQuery || 'Global'}"</p>
              </div>
              
              <div className="space-y-5">
                {filteredListings.map(listing => (
                  <div 
                    key={listing.id}
                    onClick={() => setState(prev => ({ ...prev, selectedListing: listing }))}
                    className="p-5 rounded-[2rem] bg-white border border-slate-100 shadow-sm cursor-pointer hover:border-indigo-500/50 hover:shadow-2xl transition-all group"
                  >
                    <div className="flex gap-5">
                      <div className="relative shrink-0">
                        <img src={listing.image} className="w-28 h-28 rounded-3xl object-cover" alt={listing.title} />
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-black text-indigo-600 shadow-sm border border-indigo-100">
                          NODE ACTIVE
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors truncate">{listing.title}</h3>
                        <p className="text-xs text-slate-400 mt-1 truncate">{listing.city} • {listing.address}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-indigo-600 font-black text-lg">${listing.pricePerHour.toFixed(2)}<span className="text-xs font-normal text-slate-400">/hr</span></p>
                          <div className="flex items-center gap-1 text-amber-500 font-black text-sm">
                            ★ {listing.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 hidden lg:block bg-slate-100 relative">
              <MapInterface 
                listings={filteredListings} 
                selectedListing={state.selectedListing} 
                activeFilters={state.activeFilters}
                onToggleFilter={toggleFilter}
                onSelect={(l) => setState(prev => ({ ...prev, selectedListing: l }))} 
              />
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-6 py-16 w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
              <div>
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Global Courier Pipeline</h2>
                <p className="text-slate-500 text-xl mt-2 max-w-lg font-medium">Decentralized logistics for the modern traveler.</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                 <button 
                  onClick={() => setShowHowItWorks(true)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-5 bg-white border-2 border-slate-100 text-slate-900 font-black rounded-3xl hover:bg-slate-50 hover:border-indigo-500/30 transition-all shadow-sm active:scale-95"
                 >
                  <Info size={20} className="text-indigo-500" />
                  How it Works
                </button>
                <button 
                  onClick={() => setState(prev => ({...prev, view: 'post'}))}
                  className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-5 bg-indigo-600 text-white font-black rounded-3xl shadow-2xl shadow-indigo-500/20 hover:scale-105 transition-all"
                >
                  <Plane size={20} /> Register Route
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredTrips.map(trip => (
                <TripCard key={trip.id} trip={trip} onSelect={(t, bid) => {
                   setState(prev => ({ ...prev, selectedTrip: t, activeBid: bid || null }));
                   setShowSafetyFirewall(true);
                }} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar 
        activeView={state.view} 
        isLoggedIn={state.isLoggedIn}
        onLogin={() => setState(prev => ({...prev, showAuthModal: true}))}
        onSettings={() => setState(prev => ({...prev, showSettingsModal: true}))}
        onChangeView={(v) => setState(prev => ({ ...prev, view: v }))} 
      />
      
      <main className="flex-grow">{renderContent()}</main>

      <footer className="bg-slate-900 text-white pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 text-emerald-400 mb-8">
              <Shield size={36} />
              <span className="text-3xl font-black tracking-tighter text-white">Sharestuff</span>
            </div>
            <p className="text-slate-400 text-base leading-relaxed mb-10">
              Transforming global logistics through a secure, peer-to-peer protocol. Anywhere, on-demand.
            </p>
            <div className="flex gap-4">
              <button className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-500 transition-all text-slate-300 hover:text-white"><Facebook size={20} /></button>
              <button className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-500 transition-all text-slate-300 hover:text-white"><Twitter size={20} /></button>
              <button className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-500 transition-all text-slate-300 hover:text-white"><Instagram size={20} /></button>
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-widest mb-8 text-slate-500">Logistics Hubs</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-bold">
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Toronto Hub (YYZ)</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">London Nexus (LHR)</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Tokyo Terminal (NRT)</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Vancouver Node (YVR)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-widest mb-8 text-slate-500">Protocol & Trust</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-bold">
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Escrow Protection</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Asset Insurance</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Verification Center</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">Help & Docs</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 p-8 rounded-[2rem] border border-white/5 shadow-2xl">
            <h4 className="font-black text-[10px] uppercase tracking-widest mb-6 text-emerald-400">Node Management</h4>
            <button 
              onClick={() => { setState(prev => ({...prev, view: 'admin'})); window.scrollTo(0, 0); }}
              className="w-full flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Lock size={18} className="text-slate-500 group-hover:text-emerald-400" />
                <span className="text-sm font-black text-slate-200">Terminal</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </button>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center mt-6">Protocol Active: SS-YYZ-V2</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-slate-600 text-[11px] font-black uppercase tracking-[0.2em]">© 2024 Sharestuff - Demo Beta Mehrab M Khan</p>
            <p className="text-slate-700 text-[8px] font-black uppercase tracking-[0.3em] opacity-50">this web app is in beta mood and still on going mode</p>
          </div>
          <div className="flex gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-600">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Protocol</a>
          </div>
        </div>
      </footer>

      {state.showAuthModal && (
        <LoginModal 
          onClose={() => setState(prev => ({...prev, showAuthModal: false}))}
          onSuccess={() => setState(prev => ({...prev, isLoggedIn: true, showAuthModal: false}))}
        />
      )}

      {state.showSettingsModal && (
        <SettingsModal 
          onClose={() => setState(prev => ({...prev, showSettingsModal: false}))}
          onLogout={() => setState(prev => ({...prev, isLoggedIn: false, showSettingsModal: false}))}
        />
      )}

      {showSafetyFirewall && (
        <ProhibitedItemsModal 
          onAccept={handleSafetyAccept}
          onCancel={() => { setShowSafetyFirewall(false); setState(prev => ({ ...prev, selectedTrip: null })); }}
        />
      )}

      {showShipmentModal && state.selectedTrip && (
        <ShipmentBookingModal 
          trip={state.selectedTrip}
          negotiatedRate={state.activeBid || undefined}
          onClose={() => { setShowShipmentModal(false); setState(prev => ({ ...prev, selectedTrip: null })); }}
          onBook={() => setState(prev => ({ ...prev, view: 'bookings', selectedTrip: null }))}
        />
      )}

      {state.selectedListing && (
        <ListingDetailModal 
          listing={state.selectedListing} 
          onClose={() => setState(prev => ({ ...prev, selectedListing: null }))}
          onBook={(b) => { setActiveBookings(prev => [...prev, b]); setState(prev => ({ ...prev, view: 'bookings', selectedListing: null })); }}
        />
      )}

      {showHowItWorks && <HowItWorksModal onClose={() => setShowHowItWorks(false)} />}
    </div>
  );
};

export default App;
