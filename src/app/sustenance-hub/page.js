"use client";

import { motion } from "framer-motion";
// FaHeartbeat এর পরিবর্তে FaHeartPulse ব্যবহার করুন, যা fa6 এ আছে
import { FaBone, FaLeaf, FaBowlRice, FaHeartPulse } from "react-icons/fa6";

const resources = [
  { title: "Nutritional Basics", desc: "Understanding the essential macros for your pet's growth.", icon: FaBone },
  { title: "Dietary Restrictions", desc: "Common allergens and foods that are toxic to pets.", icon: FaLeaf },
  { title: "Meal Planning", desc: "How to balance portion sizes based on weight and activity.", icon: FaBowlRice },
  { title: "Health & Vitality", desc: "How nutrition impacts your pet's long-term wellness.", icon: FaHeartPulse },
];

export default function SustenanceHubPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
            Sustenance Hub
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">
            A comprehensive guide to optimal pet nutrition. Empowering owners to make informed dietary choices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resources.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-400 text-2xl mb-6 group-hover:scale-110 transition-transform">
                <item.icon />
              </div>
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}