"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaTerminal } from "react-icons/fa";
import DashboardNavbar from "@/components/DashboardNavbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full">
      <div className="absolute top-10 left-10 w-[450px] h-[450px] bg-emerald-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="lg:hidden mb-6">
          <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <FaTerminal className="text-emerald-400 text-sm" />
              <div>
                <h2 className="text-sm font-black text-white tracking-tight uppercase">PetAdoption</h2>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Control Interface Node</p>
              </div>
            </div>
            <DashboardNavbar />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <aside className="hidden lg:block w-72 shrink-0 lg:sticky lg:top-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 shadow-2xl flex flex-col space-y-6"
            >
              <div className="pb-4 border-b border-white/5 flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400">
                  <FaTerminal className="text-xs" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-white tracking-tight uppercase">PetAdoption</h2>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Control Interface Node</p>
                </div>
              </div>

              <DashboardNavbar />
            </motion.div>
          </aside>

          <main className="flex-1 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.1 }}
              className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 sm:p-8 md:p-10 min-h-[75vh] shadow-2xl relative flex flex-col"
            >
              <div className="absolute top-0 left-0 w-24 h-[2px] bg-gradient-to-r from-emerald-500 via-cyan-500 to-transparent rounded-full shadow-[0_0_15px_rgba(52,211,153,0.4)]" />
              
              <div className="flex-grow w-full">
                {children}
              </div>
            </motion.div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;