"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaLock, FaUserShield, FaDatabase } from "react-icons/fa";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Data Collection",
      icon: <FaDatabase />,
      content: "We only collect information that is absolutely necessary to facilitate pet adoptions, such as contact details and verification documents."
    },
    {
      title: "Data Security",
      icon: <FaLock />,
      content: "Your data is protected using industry-standard encryption protocols. We treat your information as an extension of your digital identity."
    },
    {
      title: "User Rights",
      icon: <FaUserShield />,
      content: "You have the right to view, edit, or request the permanent deletion of your personal data from our systems at any time."
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
          <div className="text-emerald-500 text-5xl mb-4 flex justify-center"><FaShieldAlt /></div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Privacy Paradigm</h1>
          <p className="text-slate-400 text-lg">Our commitment to protecting your digital footprint and ensuring a secure adoption journey.</p>
        </motion.div>

        {/* Sections */}
        <div className="grid gap-8">
          {sections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-slate-900/50 border border-white/10 p-8 rounded-2xl hover:border-emerald-500/30 transition-all"
            >
              <div className="text-emerald-400 text-2xl mb-4">{section.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{section.title}</h3>
              <p className="text-slate-400 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        
        <div className="mt-16 text-center text-slate-600 text-sm">
          <p>© 2026 PetAdoption Platform. Privacy by Design approach.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;