"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FaPaw, 
  FaGithub, 
  FaLinkedinIn, 
  FaTwitter, 
  FaInstagram, 
  FaArrowRight 
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-slate-950 border-t border-white/5 pt-20 pb-10 overflow-hidden w-full">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.04)_0,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5 relative z-10">
        
        <div className="lg:col-span-4 space-y-6">
          <Link href="/" className="inline-flex items-center gap-2 text-white font-black text-xl tracking-tight group">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300">
              <FaPaw className="text-sm" />
            </div>
            Pet<span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Adoption</span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Automating biological sanctuary tracking and creating seamless transitions for domestic companions worldwide.
          </p>
          <div className="flex gap-3">
            {[
              { icon: <FaGithub />, link: "https://github.com/mr-mizanur" },
              { icon: <FaLinkedinIn />, link: "#" },
              { icon: <FaTwitter />, link: "#" },
              { icon: <FaInstagram />, link: "#" }
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3, scale: 1.05, borderColor: "rgba(52, 211, 153, 0.3)" }}
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">Platform</h4>
          <ul className="space-y-2.5">
            {[
              { text: "Explore Listings", href: "/all-pets" },
              { text: "Rehome Protocol", href: "/dashboard/add-pet" },
              { text: "Safety Metrics", href: "#" },
              { text: "Verification Log", href: "#" }
            ].map((item, idx) => (
              <li key={idx}>
                <Link href={item.href} className="text-slate-400 hover:text-emerald-400 text-sm tracking-wide transition-colors">
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">Resources</h4>
          <ul className="space-y-2.5">
            {[
              { text: "Sustenance Hub", href: "#" },
              { text: "Clinical Guides", href: "#" },
              { text: "Developer Core", href: "#" },
              { text: "System Status", href: "#" }
            ].map((item, idx) => (
              <li key={idx}>
                <Link href={item.href} className="text-slate-400 hover:text-emerald-400 text-sm tracking-wide transition-colors">
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">Data Streams</h4>
          <p className="text-slate-400 text-sm">
            Subscribe to our automated validation logs and emergency sanctuary alerts.
          </p>
          <div className="relative flex items-center group">
            <input 
              type="email" 
              placeholder="Secure Email Access" 
              className="w-full px-4 py-3.5 bg-slate-900/50 border border-white/5 focus:border-emerald-500/30 rounded-xl text-slate-200 placeholder-slate-600 text-xs focus:outline-none transition-all duration-300 backdrop-blur-md"
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-2 px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center cursor-pointer transition-colors"
            >
              <FaArrowRight className="text-xs" />
            </motion.button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-slate-600 relative z-10">
        <p>© 2026 PetAdoption Node. All Rights Reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="hover:text-slate-400 transition-colors">Privacy Paradigm</Link>
          <Link href="/terms-of-grid" className="hover:text-slate-400 transition-colors">Terms of Grid</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;