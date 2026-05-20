"use client";

import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaPlusCircle, 
  FaTerminal, 
  FaShieldAlt, 
  FaExclamationTriangle, 
  FaCheckCircle 
} from "react-icons/fa";

const AddPetPage = () => {
  const router = useRouter();
  const { data } = authClient.useSession();
  const user = data?.user;
  const ownerEmail = user?.email;

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const showNotification = (msg, type) => {
    setNotification({ show: true, message: msg, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!ownerEmail) {
      showNotification("Authentication missing. Please sign in.", "error");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const petData = Object.fromEntries(formData.entries());
    
    petData.age = Number(petData.age);
    petData.adoptionFee = Number(petData.adoptionFee);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      if (res.ok) {
        showNotification("Companion registry data initialized successfully! Node updated. 🎉", "success");
        e.target.reset();
        
        setTimeout(() => {
          router.push("/dashboard/my-listing");
        }, 1800);
      } else {
        showNotification("Data block configuration rejected. Check required matrix inputs.", "error");
      }
    } catch (error) {
      showNotification("Ecosystem pipeline error. Connection timeout.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="fixed top-24 right-6 z-50 pointer-events-none">
        <AnimatePresence>
          {notification.show && (
            <motion.div 
              initial={{ opacity: 0, x: 50, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              className={`px-6 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] border text-xs font-black uppercase tracking-widest flex items-center gap-3 backdrop-blur-3xl pointer-events-auto min-w-[320px] ${
                notification.type === "success" 
                  ? "bg-slate-950/90 text-emerald-400 border-emerald-500/30 shadow-emerald-500/10" 
                  : "bg-slate-950/90 text-rose-500 border-rose-500/30 shadow-rose-500/10"
              }`}
            >
              {notification.type === "success" ? (
                <FaCheckCircle className="text-base shrink-0 animate-pulse" />
              ) : (
                <FaExclamationTriangle className="text-base shrink-0" />
              )}
              <span className="text-slate-300 normal-case font-medium leading-relaxed">{notification.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
        className="w-full max-w-3xl bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10"
      >
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center justify-center gap-3">
            <FaPlusCircle className="text-emerald-400 text-2xl" />
            Ingest{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Companion Profile
            </span>
          </h1>
          <p className="text-slate-400 text-xs font-medium tracking-wide max-w-md mx-auto">
            Deploy dynamic bio-demographics to update the permanent global validation log architecture
          </p>
          <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full" />
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Designated Identity</label>
            <input type="text" name="name" required placeholder="e.g., Orion Node" className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-700 outline-none focus:border-emerald-500/30 transition-all duration-300" />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Biological Species Class</label>
            <div className="relative">
              <select name="species" required className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-slate-400 outline-none focus:border-emerald-500/30 transition-all duration-300 appearance-none cursor-pointer">
                <option value="" className="bg-slate-950 text-slate-600">Select Parameter</option>
                <option value="Dog" className="bg-slate-950 text-slate-200">Canine Module (Dog)</option>
                <option value="Cat" className="bg-slate-950 text-slate-200">Feline Module (Cat)</option>
                <option value="Bird" className="bg-slate-950 text-slate-200">Avian Module (Bird)</option>
                <option value="Rabbit" className="bg-slate-950 text-slate-200">Lagomorph Module (Rabbit)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Genetic Breed Taxonomy</label>
            <input type="text" name="breed" required placeholder="e.g., Siberian Lineage" className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-700 outline-none focus:border-emerald-500/30 transition-all duration-300" />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Lifespan Metric (Years)</label>
            <input type="number" name="age" required placeholder="e.g., 3" className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-700 outline-none focus:border-emerald-500/30 transition-all duration-300" />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Gender Allocation</label>
            <select name="gender" required className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-slate-400 outline-none focus:border-emerald-500/30 transition-all duration-300 appearance-none cursor-pointer">
              <option value="" className="bg-slate-950 text-slate-600">Select Sequence</option>
              <option value="Male" className="bg-slate-950 text-slate-200">Male Matrix</option>
              <option value="Female" className="bg-slate-950 text-slate-200">Female Matrix</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Image Base64 / Vector Link</label>
            <input type="text" name="image" required placeholder="Paste secure image string matrix" className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-700 outline-none focus:border-emerald-500/30 transition-all duration-300" />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Vitality & Health Parameters</label>
            <input type="text" name="healthStatus" required placeholder="e.g., Absolute Clearance / Optimal" className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-700 outline-none focus:border-emerald-500/30 transition-all duration-300" />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Biosecurity Immunization</label>
            <select name="vaccinationStatus" required className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-slate-400 outline-none focus:border-emerald-500/30 transition-all duration-300 appearance-none cursor-pointer">
              <option value="" className="bg-slate-950 text-slate-600">Select Clearance Status</option>
              <option value="Fully Vaccinated" className="bg-slate-950 text-slate-200">Fully Certified & Vaccinated</option>
              <option value="Not Vaccinated" className="bg-slate-950 text-slate-200">Zero Documentation / Unvaccinated</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Grid Coordinates Location</label>
            <input type="text" name="location" required placeholder="e.g., Dhaka HQ, Section 04" className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-700 outline-none focus:border-emerald-500/30 transition-all duration-300" />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Ecosystem Transfer Fee ($)</label>
            <input type="number" name="adoptionFee" required placeholder="Set parameter fee or 0 for free" className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-700 outline-none focus:border-emerald-500/30 transition-all duration-300" />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Custodian Core Registry Email (Read-Only)</label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-slate-600 text-xs"><FaShieldAlt /></div>
              <input type="email" name="ownerEmail" value={ownerEmail || ""} readOnly className="w-full bg-slate-950/30 border border-white/5 rounded-xl pl-10 pr-4 py-3.5 text-sm text-slate-500 font-bold tracking-wide cursor-not-allowed outline-none select-none" />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Behavioral Matrix & Log Summary</label>
            <textarea rows="4" name="description" required placeholder="Detail specific psychological patterns, environmental alignment metrics, and companion synchronization traits..." className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-700 outline-none focus:border-emerald-500/30 transition-all duration-300 resize-none font-medium"></textarea>
          </div>

          <div className="md:col-span-2 pt-4">
            <motion.button 
              type="submit" 
              disabled={loading || !ownerEmail} 
              whileHover={{ scale: loading ? 1 : 1.01, boxShadow: loading ? "none" : "0 0 25px rgba(52, 211, 153, 0.35)" }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              className="w-full bg-emerald-500 text-slate-950 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors disabled:bg-slate-800 disabled:text-slate-600 border border-transparent disabled:border-white/5 cursor-pointer"
            >
              <FaTerminal className="text-sm" />
              {loading ? "Injecting Data Packet..." : "Commit Asset Registry Data"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddPetPage;