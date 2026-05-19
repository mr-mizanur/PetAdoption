"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Lottie from "lottie-react";
import animationData from "../../assets/cat_full.json";
import { motion } from "framer-motion";
import { FaArrowRight, FaMagic, FaShieldAlt, FaHeartbeat } from "react-icons/fa";

const BannerPage = () => {
  // Framer Motion Variants (স্মুথ এন্ট্রির জন্য)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
  };

  const floatVariants = {
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 min-h-screen flex items-center justify-center pt-32 pb-16 px-6 md:px-12">
      
      {/* নিওন ব্যাকগ্রাউন্ড ওআরবিটস (Ambient Glow) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-teal-500/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 lg:gap-6 justify-between items-center">
        
        {/* বাম পাশের কন্টেন্ট এরিয়া (Text & CTA) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left space-y-6"
        >
          {/* ব্যাজ */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.05)]"
          >
            <FaMagic className="animate-pulse duration-1000" /> Revolutionizing Animal Rescue
          </motion.div>

          {/* মেইন প্রিমিয়াম হেডলাইন */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.1]"
          >
            Connect With Your <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(52,211,153,0.2)]">
              Ultimate Soulmate
            </span>
          </motion.h1>

          {/* সাব-কন্টেন্ট */}
          <motion.p 
            variants={itemVariants}
            className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            Bridge the gap between abandoned innocence and a lifelong sanctuary. Our smart ecosystem ensures transparent adoption metrics and matches you with pets tailored to your lifestyle.
          </motion.p>

          {/* অ্যাকশন বাটনসমূহ */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
          >
            <Link href="/all-pets">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(52, 211, 153, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 text-slate-950 font-bold tracking-wide text-sm uppercase flex items-center justify-center gap-2 shadow-lg transition-shadow cursor-pointer"
              >
                Explore Listing <FaArrowRight className="text-xs" />
              </motion.button>
            </Link>

            <Link href="/dashboard/add-pet">
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.08)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold tracking-wide text-sm uppercase transition-colors cursor-pointer"
              >
                Rehome a Pet
              </motion.button>
            </Link>
          </motion.div>

          {/* স্ট্যাটিস্টিকস কাউন্টার ম্যাট্রিক্স */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5 max-w-md mx-auto lg:mx-0"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-white bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">1.2k+</h3>
              <p className="text-slate-500 text-xs font-semibold tracking-wider uppercase mt-1">Rescued</p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-white bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">99.4%</h3>
              <p className="text-slate-500 text-xs font-semibold tracking-wider uppercase mt-1">Match Rate</p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-white bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">50+</h3>
              <p className="text-slate-500 text-xs font-semibold tracking-wider uppercase mt-1">Partners</p>
            </div>
          </motion.div>
        </motion.div>

        {/* ডান পাশের ভিজ্যুয়াল এরিয়া (Lottie & Floating Elements) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* মেইন ইমেজ গ্লাস বক্স */}
          <div className="relative w-full max-w-lg bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[32px] p-6 md:p-8 overflow-hidden group hover:border-emerald-500/30 transition-colors duration-500">
            
            {/* ব্যাকগ্রাউন্ড ইন্টারনাল গ্লো */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full"></div>

            {/* লট্টি অ্যানিমেশন কন্টেইনার */}
            <div className="w-full max-w-sm mx-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              <Lottie animationData={animationData} loop={true} />
            </div>

            {/* ফ্ল পোলোটিং কার্ড ১ (টপ-লেফট) */}
            <motion.div 
              variants={floatVariants}
              animate="animate"
              className="absolute top-8 -left-4 bg-slate-950/90 border border-white/10 shadow-2xl px-4 py-2.5 rounded-xl flex items-center gap-2.5 backdrop-blur-lg"
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs">
                <FaShieldAlt />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Verified</p>
                <p className="text-xs font-bold text-slate-200">100% Legal Safe Vet</p>
              </div>
            </motion.div>

            {/* ফ্লোটিং কার্ড ২ (বটম-রাইট) */}
            <motion.div 
              variants={floatVariants}
              animate="animate"
              className="absolute bottom-8 -right-4 bg-slate-950/90 border border-white/10 shadow-2xl px-4 py-2.5 rounded-xl flex items-center gap-2.5 backdrop-blur-lg"
            >
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 text-xs">
                <FaHeartbeat className="animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Medical</p>
                <p className="text-xs font-bold text-slate-200">Vaccinated Listings</p>
              </div>
            </motion.div>

            {/* ছোট স্কয়ার আইকন ফ্লট */}
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -left-6 bg-gradient-to-tr from-slate-900 to-slate-950 shadow-xl rounded-xl p-3.5 border border-white/10"
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/512/616/616430.png"
                alt="pet footprint"
                width={40}
                height={40}
                className="w-10 h-10 object-contain brightness-95 contrast-105"
              />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default BannerPage;