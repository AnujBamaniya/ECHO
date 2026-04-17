import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RadioTower, Map, Zap } from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.6 } }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      exit={{ opacity: 0, y: -20 }} 
      variants={containerVariants}
      className="flex flex-col items-center justify-center min-h-[85vh] text-center"
    >
      <motion.div variants={itemVariants} className="mb-4 px-4 py-1.5 rounded-full border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm text-xs font-bold tracking-widest text-slate-400 uppercase">
        Emergency Communication & Hazard Orchestration
      </motion.div>
      
      <motion.h1 variants={itemVariants} className="text-5xl md:text-[5rem] leading-tight font-black tracking-tighter mb-6 text-slate-50">
        Disaster resilience, <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500">
          without internet.
        </span>
      </motion.h1>
      
      <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 max-w-2xl mb-14 font-medium leading-relaxed">
        When cellular infrastructure collapses, E.C.H.O. establishes localized peer-to-peer data routing, ensuring zero distress signals are lost in the dark.
      </motion.p>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-16">
        <Link to="/citizen" className="group relative p-8 bg-[#0a0a0a]/80 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-rose-500/40 transition-all overflow-hidden flex flex-col items-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Zap size={36} className="text-rose-500 mb-5" />
          <h2 className="text-2xl font-bold mb-2 tracking-tight">Citizen Node</h2>
          <p className="text-slate-400 text-sm font-medium">Deploy an offline SOS beacon and queue encrypted signals via local mesh.</p>
        </Link>
        
        <Link to="/dashboard" className="group relative p-8 bg-[#0a0a0a]/80 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-blue-500/40 transition-all overflow-hidden flex flex-col items-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Map size={36} className="text-blue-500 mb-5" />
          <h2 className="text-2xl font-bold mb-2 tracking-tight">Command Center</h2>
          <p className="text-slate-400 text-sm font-medium">Access live geospatial triage mapping and orchestrate rescue logistics.</p>
        </Link>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-8 text-slate-500 text-xs font-bold tracking-widest uppercase">
        <span className="flex items-center"><RadioTower size={14} className="mr-2" /> P2P Routing</span>
        <span className="flex items-center"><Zap size={14} className="mr-2" /> Async Background Sync</span>
        <span className="flex items-center"><Map size={14} className="mr-2" /> Geospatial Triage</span>
      </motion.div>
    </motion.div>
  );
}