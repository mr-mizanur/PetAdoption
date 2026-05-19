"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaBowlFood, FaShower, FaKitMedical } from "react-icons/fa6";

const PetCareTips = () => {
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
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="text-center mb-16 space-y-3">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Sustenance{" "}
          <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Protocols
          </span>
        </h2>
        <p className="text-slate-400 text-sm font-medium tracking-wide max-w-sm mx-auto">
          Optimizing companion longevity through precise daily maintenance habits
        </p>
        <div className="w-12 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
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
          whileHover={{ y: -8, borderColor: "rgba(249, 115, 22, 0.2)" }}
          className="group relative p-10 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl text-center transition-all duration-300"
        >
          <div className="w-16 h-16 mx-auto rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-slate-950 transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.05)]">
            <FaBowlFood className="text-2xl transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h3 className="mt-6 font-extrabold text-xl text-white tracking-tight group-hover:text-orange-400 transition-colors">
            Precision Nutrition
          </h3>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed">
            Deploy balanced metabolic formulas engineered specifically for your companion's exact bio-demographics.
          </p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          whileHover={{ y: -8, borderColor: "rgba(59, 130, 246, 0.2)" }}
          className="group relative p-10 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl text-center transition-all duration-300"
        >
          <div className="w-16 h-16 mx-auto rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-slate-950 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.05)]">
            <FaShower className="text-2xl transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h3 className="mt-6 font-extrabold text-xl text-white tracking-tight group-hover:text-blue-400 transition-colors">
            Hygiene Maintenance
          </h3>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed">
            Enforce scheduled sanitization routines to minimize contaminant load and maintain ultimate coat integrity.
          </p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          whileHover={{ y: -8, borderColor: "rgba(34, 197, 94, 0.2)" }}
          className="group relative p-10 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl text-center transition-all duration-300"
        >
          <div className="w-16 h-16 mx-auto rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-slate-950 transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.05)]">
            <FaKitMedical className="text-2xl transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h3 className="mt-6 font-extrabold text-xl text-white tracking-tight group-hover:text-green-400 transition-colors">
            Clinical Diagnostics
          </h3>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed">
            Integrate systematized veterinary diagnostics to run preemptive biosecurity checks and screening operations.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PetCareTips;