import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { Users, Activity, Radio, AlertOctagon, Navigation, Crosshair } from 'lucide-react';

const createIcon = (color) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 18px; height: 18px; border-radius: 50%; border: 3px solid #0f172a; box-shadow: 0 0 15px ${color};"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });
};

export default function RescueDashboard() {
  const [tickets] = useState([
    { id: 'ECHO-992', type: 'medical', lat: 19.0760, lng: 72.8777, time: '2 mins ago', details: 'Trapped under rubble, broken leg', color: '#e11d48' },
    { id: 'ECHO-993', type: 'evac', lat: 19.0822, lng: 72.8812, time: '14 mins ago', details: 'Water level rising rapidly, 4 people', color: '#d97706' },
    { id: 'ECHO-994', type: 'safe', lat: 19.0910, lng: 72.8655, time: '1 hr ago', details: 'Reached sector 4 relief camp', color: '#059669' },
    { id: 'ECHO-995', type: 'medical', lat: 19.0710, lng: 72.8900, time: '4 mins ago', details: 'Asthma attack, requires oxygen', color: '#e11d48' }
  ]);

  const mapCenter = [19.0780, 72.8780];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Signals', val: '1,204', icon: <AlertOctagon size={24}/>, color: 'text-rose-500', border: 'border-rose-500/20', shadow: 'shadow-[0_0_20px_rgba(225,29,72,0.1)]' },
          { label: 'Nodes Synced', val: '8,432', icon: <Activity size={24}/>, color: 'text-emerald-500', border: 'border-emerald-500/20', shadow: 'shadow-[0_0_20px_rgba(16,185,129,0.1)]' },
          { label: 'Active Rescuers', val: '142', icon: <Users size={24}/>, color: 'text-blue-500', border: 'border-blue-500/20', shadow: 'shadow-[0_0_20px_rgba(59,130,246,0.1)]' },
          { label: 'Mesh Coverage', val: '68%', icon: <Radio size={24}/>, color: 'text-purple-500', border: 'border-purple-500/20', shadow: 'shadow-[0_0_20px_rgba(168,85,247,0.1)]' }
        ].map((stat, i) => (
          <div key={i} className={`bg-[#0a0a0a]/80 backdrop-blur-xl border ${stat.border} ${stat.shadow} p-6 rounded-2xl flex items-center justify-between`}>
            <div>
              <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-50 tracking-tight">{stat.val}</p>
            </div>
            <div className={`${stat.color}`}>{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden h-[550px] relative shadow-2xl">
          <div className="absolute top-4 left-4 z-[400] bg-[#050505]/90 border border-white/10 px-4 py-2.5 rounded-lg backdrop-blur-md flex items-center space-x-3 shadow-lg">
            <Crosshair size={16} className="text-slate-400" />
            <span className="text-xs font-bold tracking-widest text-slate-200">MUMBAI SECTOR // GRID 04</span>
          </div>
          {/* Map Setup - ZoomControl moved to bottomright to avoid clipping label */}
          <MapContainer center={mapCenter} zoom={13} zoomControl={false} scrollWheelZoom={false} className="w-full h-full">
            <ZoomControl position="bottomright" />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {tickets.map(t => (
              <Marker key={t.id} position={[t.lat, t.lng]} icon={createIcon(t.color)}>
                <Popup>
                  <div className="font-sans">
                    <strong className="block text-base font-bold mb-1 tracking-wider text-slate-100">{t.id}</strong>
                    <span className="text-sm font-medium text-slate-300">{t.details}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Triage Queue */}
        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col h-[550px] shadow-2xl">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#050505]/50">
            <h3 className="text-sm font-bold tracking-widest uppercase text-slate-200">Live Triage Queue</h3>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
          </div>
          <div className="overflow-y-auto p-4 space-y-4 flex-1 custom-scrollbar">
            {tickets.map((t) => (
              <div key={t.id} className="bg-[#050505] border border-white/5 p-5 rounded-xl hover:border-white/20 transition-all duration-300">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono font-bold tracking-wider text-slate-200 text-sm">{t.id}</span>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest ${t.type === 'medical' ? 'bg-rose-500/20 text-rose-400' : t.type === 'evac' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {t.type}
                  </span>
                </div>
                <p className="text-slate-400 text-sm font-medium mb-4 leading-snug">{t.details}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-mono font-medium">{t.time}</span>
                  <button className="flex items-center space-x-1.5 text-[10px] font-black tracking-widest text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded transition-colors uppercase border border-white/5">
                    <Navigation size={12} />
                    <span>Dispatch</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}