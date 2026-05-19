"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  FaArrowRight, 
  FaPaw, 
  FaShieldAlt, 
  FaBriefcaseMedical, 
  FaHeart, 
  FaChartLine, 
  FaUsers 
} from "react-icons/fa";

const BannerPage = () => {

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

  const badgeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 min-h-[90vh] flex items-center justify-center pt-20 pb-16">
      

      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-500/10 blur-[160px] rounded-full" />
      </div>

      <div className="w-full mx-auto grid lg:grid-cols-12 gap-12 items-center">
        
  
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-7 space-y-8 text-center lg:text-left z-10"
        >
        
          <motion.div variants={badgeVariants} className="inline-flex">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-md shadow-[0_0_20px_rgba(52,211,153,0.1)]">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 flex items-center gap-1.5">
                <FaPaw /> Revolutionizing Global Pet Rehomeing Metrics
              </span>
            </div>
          </motion.div>


          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]"
          >
            Embrace The Journey.<br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]">
              Adopt Your <br className="hidden sm:inline" />True Companion.
            </span>
          </motion.h1>

        
          <motion.p 
            variants={itemVariants}
            className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed"
          >
            Explore verified listings. Make lifelong connections. Our immutable safety standard ensures premium veterinary clearance and seamless legal ownership transitions.
          </motion.p>

    
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link href="/all-pets" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(52, 211, 153, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-emerald-500 text-slate-950 font-extrabold tracking-wider text-xs uppercase rounded-xl flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(52,211,153,0.2)]"
              >
                Explore Listing <FaArrowRight className="text-[10px]" />
              </motion.button>
            </Link>

            <Link href="/dashboard/add-pet" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-white/5 border border-white/10 text-white font-extrabold tracking-wider text-xs uppercase rounded-xl transition-all duration-200 cursor-pointer"
              >
                Rehome a Pet
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

       
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[450px]">
          
         
          <div className="relative w-full max-w-[420px] aspect-square rounded-[40px] border border-white/10 bg-slate-900/30 backdrop-blur-2xl p-6 flex items-center justify-center shadow-2xl group hover:border-emerald-500/30 transition-colors duration-500">
            
         
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 60, delay: 0.3 }}
              className="w-full h-full relative rounded-[32px] overflow-hidden bg-slate-950 border border-white/5"
            >
              <Image 
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600" 
                alt="Premium Companion"
                fill
                className="object-cover object-center grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-80 group-hover:opacity-100"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
            </motion.div>

           
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 bg-slate-950/90 border border-white/10 backdrop-blur-xl px-4 py-3 rounded-xl flex items-center gap-3 shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm">
                <FaShieldAlt />
              </div>
              <div className="text-left">
                <p className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Verified</p>
                <p className="text-xs font-extrabold text-slate-200">100% Legal Safe Vet</p>
              </div>
            </motion.div>

          
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-slate-950/90 border border-white/10 backdrop-blur-xl px-4 py-3 rounded-xl flex items-center gap-3 shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 text-sm">
                <FaBriefcaseMedical />
              </div>
              <div className="text-left">
                <p className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Medical</p>
                <p className="text-xs font-extrabold text-slate-200">Vaccinated & Checked</p>
              </div>
            </motion.div>

   
            <motion.div 
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -right-10 -translate-y-1/2 bg-slate-950/90 border border-white/10 backdrop-blur-xl px-4 py-3 rounded-xl flex items-center gap-3 shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm">
                <FaChartLine />
              </div>
              <div className="text-left">
                <p className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Match Rate</p>
                <p className="text-xs font-extrabold text-emerald-400">99.7% Efficient</p>
              </div>
            </motion.div>

            
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-2 bg-slate-950/90 border border-white/10 backdrop-blur-xl px-4 py-3 rounded-xl flex items-center gap-3 shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm">
                <FaUsers />
              </div>
              <div className="text-left">
                <p className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Global Impact</p>
                <p className="text-xs font-bold text-slate-200">15k+ Happy Families</p>
              </div>
            </motion.div>

          
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-4 bg-gradient-to-tr from-slate-900 to-slate-950 border border-white/10 p-3.5 rounded-xl shadow-2xl"
            >
              <FaHeart className="text-rose-500 text-lg animate-pulse" />
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default BannerPage;