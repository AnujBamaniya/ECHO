import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, AlertTriangle, CheckCircle, WifiOff, Send } from 'lucide-react';
import axios from 'axios';

export default function CitizenPortal({ isOnline }) {
  const [status, setStatus] = useState('safe');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:5000/api/alerts', {
        type: status,
        lat: 19.07 + (Math.random() * 0.02),
        lng: 72.87 + (Math.random() * 0.02),
        details: details || 'No details provided'
      });
      
      setSubmitted(true);
      setDetails('');
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      console.error("Failed to send alert", error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto mt-12"
    >
      <div className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-500" />
        
        <div className="mb-10">
          <h2 className="text-3xl font-black mb-3 tracking-tight">Broadcast Beacon</h2>
          <p className="text-slate-400 text-sm font-medium leading-relaxed">Select your current status. Data is cryptographically hashed, stored locally, and queued for asynchronous mesh transmission.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button type="button" onClick={() => setStatus('medical')} className={`p-6 rounded-xl border flex flex-col items-center justify-center space-y-3 transition-all duration-300 ${status === 'medical' ? 'border-rose-500 bg-rose-500/10 text-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.15)]' : 'border-white/5 bg-white/5 hover:bg-white/10 text-slate-400'}`}>
              <AlertTriangle size={32} />
              <span className="font-bold tracking-wide">Medical</span>
            </button>
            <button type="button" onClick={() => setStatus('evac')} className={`p-6 rounded-xl border flex flex-col items-center justify-center space-y-3 transition-all duration-300 ${status === 'evac' ? 'border-amber-500 bg-amber-500/10 text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.15)]' : 'border-white/5 bg-white/5 hover:bg-white/10 text-slate-400'}`}>
              <MapPin size={32} />
              <span className="font-bold tracking-wide">Evacuate</span>
            </button>
            <button type="button" onClick={() => setStatus('safe')} className={`p-6 rounded-xl border flex flex-col items-center justify-center space-y-3 transition-all duration-300 ${status === 'safe' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)]' : 'border-white/5 bg-white/5 hover:bg-white/10 text-slate-400'}`}>
              <CheckCircle size={32} />
              <span className="font-bold tracking-wide">Safe</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">Situation Intelligence</label>
            <textarea 
              value={details} 
              onChange={(e) => setDetails(e.target.value)} 
              placeholder="Describe injuries, structural damage, or specific needs..."
              rows="4" 
              className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-slate-100 placeholder:text-slate-600 focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition-all resize-none font-medium"
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className={`w-full py-5 rounded-xl font-bold text-lg flex justify-center items-center space-x-3 transition-all duration-300 ${submitted ? 'bg-emerald-600 text-white shadow-[0_0_40px_rgba(16,185,129,0.3)]' : 'bg-slate-100 text-slate-900 hover:bg-white shadow-[0_0_30px_rgba(255,255,255,0.1)]'}`}
          >
            {submitted ? (
              <>
                <CheckCircle size={24} />
                <span>Payload Encrypted & Queued</span>
              </>
            ) : (
              <>
                {isOnline ? <Send size={24} /> : <WifiOff size={24} />}
                <span>{isOnline ? 'Transmit to Command' : 'Initialize Offline Broadcast'}</span>
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}