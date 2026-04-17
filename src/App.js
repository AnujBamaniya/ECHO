import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './Home';
import CitizenPortal from './CitizenPortal';
import RescueDashboard from './RescueDashboard';
import { Activity, ShieldAlert, WifiOff } from 'lucide-react';

function RouteManager({ isOnline }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/citizen" element={<CitizenPortal isOnline={isOnline} />} />
        <Route path="/dashboard" element={<RescueDashboard />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen relative font-sans selection:bg-rose-500/30">
        {/* Animated tactical background layer */}
        <div className="fixed inset-0 z-[-2] bg-[#02040a]"></div>
        <div className="fixed inset-[-100%] z-[-1] bg-tactical-grid opacity-70"></div>
        {/* Soft glowing orbs for visual depth without looking cheap */}
        <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] pointer-events-none z-[-1]"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none z-[-1]"></div>

        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#050505]/60 border-b border-white/5 p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-rose-500/10 border border-rose-500/20 rounded-lg group-hover:bg-rose-500/20 transition-all">
                <ShieldAlert size={24} className="text-rose-500" />
              </div>
              <span className="text-2xl font-black tracking-widest text-slate-100">E.C.H.O.</span>
            </Link>
            <div className="flex space-x-8 items-center">
              <Link to="/citizen" className="text-sm font-semibold tracking-wide text-slate-400 hover:text-slate-100 transition-colors uppercase">Citizen Node</Link>
              <Link to="/dashboard" className="text-sm font-semibold tracking-wide text-slate-400 hover:text-slate-100 transition-colors uppercase">Command Center</Link>
              <div className={`px-4 py-2 rounded-lg text-xs font-bold tracking-widest flex items-center space-x-2 shadow-lg backdrop-blur-md ${isOnline ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/30'}`}>
                {isOnline ? <Activity size={14} /> : <WifiOff size={14} />}
                <span>{isOnline ? 'SYS. ONLINE' : 'SYS. OFFLINE'}</span>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto p-6 overflow-hidden relative z-10">
          <RouteManager isOnline={isOnline} />
        </main>
      </div>
    </Router>
  );
}