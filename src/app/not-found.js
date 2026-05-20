"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaPaw, FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        {/* Error Icon */}
        <div className="text-emerald-500 text-9xl mb-6 flex justify-center animate-bounce">
          <FaPaw />
        </div>

        {/* Error Text */}
        <h1 className="text-8xl font-black text-white mb-2">404</h1>
        <h2 className="text-2xl font-bold text-slate-300 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved. 
          Let's get you back to safety.
        </p>

        {/* Back Home Button */}
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-emerald-500 text-slate-950 font-bold uppercase text-sm rounded-xl flex items-center justify-center gap-2 mx-auto transition-all"
          >
            <FaHome /> Back to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;