"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const SuccessStories = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 60, damping: 14 } 
    }
  };

  return (
    <section className="py-20 relative overflow-hidden w-full">
      <div className="absolute top-0 right-10 w-96 h-96 bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="text-center mb-16 space-y-3">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Validation{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Network
          </span>
        </h2>
        <p className="text-slate-400 text-sm font-medium tracking-wide max-w-sm mx-auto">
          Verified system transitions documented by global sanctuary handlers
        </p>
        <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
      >
   
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -6, borderColor: "rgba(52, 211, 153, 0.2)" }}
          className="group relative p-8 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl flex flex-col transition-all duration-300"
        >
          <div className="absolute top-6 right-6 text-emerald-500/10 group-hover:text-emerald-400/20 text-3xl transition-colors">
            <FaQuoteLeft />
          </div>

          <div>
            <h4 className="font-extrabold text-white tracking-tight group-hover:text-emerald-400 transition-colors">Elena Vance</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Sanctuary Alpha</p>
          </div>

          <p className="mt-6 text-slate-400 text-sm leading-relaxed italic">
            "The integration matrix is flawless. Onboarding Milo through the verified metrics cleared all diagnostic bottlenecks instantly. Exceptional pipeline execution."
          </p>
        </motion.div>

       
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -6, borderColor: "rgba(45, 212, 191, 0.2)" }}
          className="group relative p-8 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl flex flex-col transition-all duration-300"
        >
          <div className="absolute top-6 right-6 text-teal-500/10 group-hover:text-teal-400/20 text-3xl transition-colors">
            <FaQuoteLeft />
          </div>

          <div>
            <h4 className="font-extrabold text-white tracking-tight group-hover:text-teal-400 transition-colors">Marcus Brody</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Core Vector Node</p>
          </div>

          <p className="mt-6 text-slate-400 text-sm leading-relaxed italic">
            "Bypassing legacy documentation hurdles made ownership transfer completely transparent. Zero communication lag. Highly recommended framework."
          </p>
        </motion.div>

       
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -6, borderColor: "rgba(34, 211, 238, 0.2)" }}
          className="group relative p-8 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl flex flex-col transition-all duration-300"
        >
          <div className="absolute top-6 right-6 text-cyan-500/10 group-hover:text-cyan-400/20 text-3xl transition-colors">
            <FaQuoteLeft />
          </div>

          <div>
            <h4 className="font-extrabold text-white tracking-tight group-hover:text-cyan-400 transition-colors">Nadia Sterling</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Lifestyle Sync Mod</p>
          </div>

          <p className="mt-6 text-slate-400 text-sm leading-relaxed italic">
            "The demographic match engine synchronized our environment logs beautifully. Simba is fully acclimated to the grid structure. Magnificent optimization."
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SuccessStories;