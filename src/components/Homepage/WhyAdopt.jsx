"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaHome, FaShieldAlt } from "react-icons/fa";

const WhyAdopt = () => {
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
    <section className="py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="text-center mb-16 space-y-3">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Ecosystem{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Core Values
          </span>
        </h2>
        <p className="text-slate-400 text-sm font-medium tracking-wide max-w-sm mx-auto">
          Redefining animal welfare through transparency, safety, and ultimate companion metrics
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
          whileHover={{ y: -8, borderColor: "rgba(52, 211, 153, 0.2)" }}
          className="group relative p-10 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl text-center transition-all duration-300"
        >
          <div className="w-16 h-16 mx-auto rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300 shadow-[0_0_15px_rgba(52,211,153,0.05)]">
            <FaHeart className="text-2xl transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h3 className="mt-6 font-extrabold text-xl text-white tracking-tight group-hover:text-emerald-400 transition-colors">
            Impact Driven
          </h3>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed">
            Every entry on our platform is structured to provide vulnerable souls with permanent, fully certified sanctuaries.
          </p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          whileHover={{ y: -8, borderColor: "rgba(45, 212, 191, 0.2)" }}
          className="group relative p-10 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl text-center transition-all duration-300"
        >
          <div className="w-16 h-16 mx-auto rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition-all duration-300 shadow-[0_0_15px_rgba(45,212,191,0.05)]">
            <FaHome className="text-2xl transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h3 className="mt-6 font-extrabold text-xl text-white tracking-tight group-hover:text-teal-400 transition-colors">
            Seamless Matching
          </h3>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed">
            Our optimized dashboard metrics align personality and environment parameters for absolute family synchronization.
          </p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          whileHover={{ y: -8, borderColor: "rgba(34, 211, 238, 0.2)" }}
          className="group relative p-10 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl text-center transition-all duration-300"
        >
          <div className="w-16 h-16 mx-auto rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.05)]">
            <FaShieldAlt className="text-2xl transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h3 className="mt-6 font-extrabold text-xl text-white tracking-tight group-hover:text-cyan-400 transition-colors">
            Immutable Security
          </h3>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed">
            We bypass unverified transactions through deep integration of veterinary history checks and owner transparency logs.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WhyAdopt;