"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaRegFileAlt, FaUserCheck, FaPaw, FaBalanceScale } from "react-icons/fa";

const TermsOfGrid = () => {
  const terms = [
    {
      title: "User Eligibility",
      icon: <FaUserCheck />,
      content: "You must be at least 18 years old or have legal guardian consent to use this platform for pet adoption or listing services."
    },
    {
      title: "Listing Accuracy",
      icon: <FaRegFileAlt />,
      content: "All pet listings must provide accurate medical history and behavioral information. Misrepresentation will result in immediate account suspension."
    },
    {
      title: "Adoption Ethics",
      icon: <FaPaw />,
      content: "Adoption is a commitment. Users agree to prioritize the welfare of the animal above all else throughout the rehoming process."
    },
    {
      title: "Platform Accountability",
      icon: <FaBalanceScale />,
      content: "While we facilitate connections, the final responsibility for pet welfare and legal compliance lies with the adopters and rehomers."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="text-emerald-500 text-5xl mb-4 flex justify-center"><FaBalanceScale /></div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Terms of Grid</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            These terms define the operational grid of our community. By engaging with our platform, you agree to uphold these standards.
          </p>
        </motion.div>

        {/* Terms Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {terms.map((term, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/40 border border-white/10 p-8 rounded-2xl hover:border-emerald-500/50 transition-all duration-300"
            >
              <div className="text-emerald-400 text-3xl mb-6">{term.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{term.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{term.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm mb-6">Last updated: May 20, 2026</p>
          <div className="inline-block p-[1px] bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl">
            <button className="px-8 py-3 bg-slate-950 text-white font-bold rounded-xl hover:bg-slate-900 transition-all">
              Accept Terms & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfGrid;