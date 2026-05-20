"use client";

import { motion } from "framer-motion";
import { FaShieldAlt, FaCheckCircle, FaUserCheck, FaChartLine } from "react-icons/fa";

const MetricCard = ({ title, value, description, icon: Icon }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="bg-slate-900 border border-white/10 p-6 rounded-2xl hover:border-emerald-500/50 transition-all"
  >
    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 text-xl">
      <Icon />
    </div>
    <h3 className="text-white font-bold text-lg">{title}</h3>
    <p className="text-3xl font-black text-emerald-400 my-2">{value}</p>
    <p className="text-slate-400 text-sm">{description}</p>
  </motion.div>
);

export default function SafetyMetricsPage() {
  const metrics = [
    { title: "Verification Rate", value: "99.2%", description: "Users verified through our rigorous security protocols.", icon: FaUserCheck },
    { title: "Successful Rehomes", value: "12,450+", description: "Safe and successful pet adoptions recorded this year.", icon: FaCheckCircle },
    { title: "Incident Reports", value: "0.01%", description: "Extremely low rate of reported issues or disputes.", icon: FaShieldAlt },
    { title: "System Reliability", value: "99.99%", description: "Platform uptime ensures 24/7 safe access for all users.", icon: FaChartLine },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-emerald-400">Safety Metrics</span> & Transparency
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We prioritize the safety of pets and adopters through data-driven monitoring and transparent verification processes.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((m, i) => (
            <MetricCard key={i} {...m} />
          ))}
        </div>

        {/* Security Note */}
        <div className="bg-gradient-to-r from-emerald-900/20 to-slate-900 p-8 rounded-3xl border border-white/5">
          <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
          <p className="text-slate-300 leading-relaxed">
            Safety is not just a feature; it is the foundation of PetAdoption. Every listing undergoes automated verification, and our community-driven reporting system ensures that all users maintain the highest standards of animal welfare. We continuously update our security protocols based on real-time threat intelligence and user feedback.
          </p>
        </div>
      </div>
    </main>
  );
}