"use client";

import React from "react";
import CountUp from "react-countup"; // To animate numbers (install it)
import { motion } from "framer-motion";
import { 
  FaPaw, 
  FaChartArea, 
  FaGlobe, 
  FaHeartCircleCheck, 
  FaUsers 
} from "react-icons/fa6";
import Link from "next/link";

const ImpactPage = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 70, damping: 14 } 
    }
  };

  const metrics = [
    { value: 15430, label: "Pets Rehomed", icon: FaPaw, suffix: "+" },
    { value: 99.7, label: "Match Efficiency", icon: FaChartArea, suffix: "%" },
    { value: 120, label: "Verified Shelters", icon: FaGlobe, suffix: "" },
    { value: 18500, label: "Vaccinations Administered", icon: FaHeartCircleCheck, suffix: "+" },
  ];

  return (
    <main className="relative overflow-hidden bg-slate-950 min-h-screen pt-32 pb-16 px-6">
      
      {/* --- Exact same Background as BannerPage --- */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-500/10 blur-[160px] rounded-full" />
      </div>

      <div className="w-full max-w-7xl mx-auto z-10 relative">
        
        {/* Header Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="text-center mb-16 space-y-4"
        >
          <motion.div variants={itemVariants} className="inline-flex">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-md shadow-[0_0_20px_rgba(52,211,153,0.1)]">
              <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 flex items-center gap-1.5">
                <FaUsers /> Impact & Metrics
              </span>
            </div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight"
          >
            Our Global Pet <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]">
              Rehoming Footprint.
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-slate-400 text-lg max-w-xl mx-auto font-medium"
          >
            Transparent data driving our immutable safety and premium companion matching standards worldwide.
          </motion.p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {metrics.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, borderColor: "rgba(52, 211, 153, 0.4)" }}
              className="bg-slate-900 p-8 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-3xl group transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle gradient inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center text-emerald-400 text-2xl mb-6 relative z-10 shadow-inner group-hover:bg-emerald-950 transition-colors duration-300">
                <item.icon />
              </div>
              
              <h3 className="text-5xl font-black text-white relative z-10 mb-1 leading-none">
                <CountUp 
                  end={item.value} 
                  duration={2.5} 
                  decimals={item.value % 1 === 0 ? 0 : 1}
                  separator="," 
                />
                <span className="text-emerald-400">{item.suffix}</span>
              </h3>
              
              <p className="text-slate-400 text-base font-semibold uppercase tracking-wider relative z-10">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Box */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-16 text-center"
        >
          <motion.div 
            variants={itemVariants}
            whileHover={{ borderColor: "rgba(52, 211, 153, 0.3)" }}
            className="p-10 bg-slate-900 border border-white/5 rounded-[2rem] shadow-3xl inline-block max-w-2xl backdrop-blur-2xl"
          >
            <h2 className="text-3xl font-black mb-4">Ready to Create Your Own Metric?</h2>
            <p className="text-slate-400 mb-8 font-medium">Join thousands of happy families by exploring our verified listings or helping rehome a premium companion pet.</p>
            <div className="flex gap-4 justify-center">
              <Link href="/all-pets" className="px-8 py-4 bg-emerald-500 text-slate-950 font-extrabold tracking-wider text-xs uppercase rounded-xl hover:bg-emerald-400 transition-colors">
                Adopt a Pet
              </Link>
              <Link href="/dashboard/add-pet" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-extrabold tracking-wider text-xs uppercase rounded-xl hover:bg-slate-800 transition-colors">
                List a Pet
              </Link>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </main>
  );
};

export default ImpactPage;