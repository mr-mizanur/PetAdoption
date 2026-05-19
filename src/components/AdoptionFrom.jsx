"use client";

import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCalendarAlt, 
  FaPaperPlane, 
  FaShieldAlt, 
  FaExclamationTriangle, 
  FaCheckCircle 
} from "react-icons/fa";

const AdoptionFrom = ({ pet }) => {
  const router = useRouter();
  const { data } = authClient.useSession();
  const user = data?.user;

  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const showNotification = (msg, type) => {
    setNotification({ show: true, message: msg, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 4000);
  };

  const handleAdoptionRequestSubmit = async (e) => {
    e.preventDefault();

    const currentBuyerEmail = user?.email; 
    const currentBuyerName = user?.name || "Applicant Unit";

    if (!currentBuyerEmail) {
      showNotification("Authentication missing. Please sign in.", "error");
      return;
    }

    setLoading(true);

    const targetOwnerEmail = pet?.ownerEmail; 
    const targetPetId = pet?._id;
    const targetPetName = pet?.name;

    const requestPayload = {
      petId: targetPetId,
      petName: targetPetName,
      ownerEmail: targetOwnerEmail,       
      requesterEmail: currentBuyerEmail,   
      userName: currentBuyerName,
      pickupDate: pickupDate,            
      message: message,          
      requestDate: new Date().toISOString()
    };

    try {
      const res = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });

      if (res.ok) {
        showNotification("Transmission secure. Adoption initialization data synchronized! 🎉", "success");
        setPickupDate("");
        setMessage("");
        
        setTimeout(() => {
          router.push("/dashboard/my-requests");
        }, 1800);
      } else {
        showNotification("Data block configuration rejected. Ingestion loop failed.", "error");
      }
    } catch (error) {
      showNotification("Ecosystem pipeline error. Connection timeout.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl h-fit sticky top-28 overflow-hidden">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

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

      <div className="text-center mb-8 space-y-2">
        <h2 className="text-2xl font-black text-white tracking-tight">
          Initialize{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Adoption Matrix
          </span>
        </h2>
        <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full" />
      </div>

      <form onSubmit={handleAdoptionRequestSubmit} className="space-y-5 text-white">
        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Target Node Identifier</label>
          <input
            type="text"
            value={pet?.name || ""}
            readOnly
            className="w-full bg-slate-950/30 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-slate-500 font-bold cursor-not-allowed outline-none select-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Applicant Identity Sign</label>
          <input
            type="text"
            value={user?.name || ""}
            readOnly
            className="w-full bg-slate-950/30 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-slate-500 font-bold cursor-not-allowed outline-none select-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Core Contact Routing Mail</label>
          <div className="relative flex items-center">
            <div className="absolute left-4 text-slate-600 text-xs"><FaShieldAlt /></div>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full bg-slate-950/30 border border-white/5 rounded-xl pl-10 pr-4 py-3.5 text-sm text-slate-500 font-bold tracking-wide cursor-not-allowed outline-none select-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Scheduled Extraction Date</label>
          <div className="relative flex items-center">
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              required
              className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-slate-200 outline-none focus:border-emerald-500/30 transition-all duration-300 calendar-dark appearance-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Alignment Intent Statement</label>
          <textarea
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Detail systemic motivations, architectural compatibility alignment, and adaptation logistics blueprints..."
            className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-700 outline-none focus:border-emerald-500/30 transition-all duration-300 resize-none font-medium"
          ></textarea>
        </div>

        <input type="hidden" value="pending" />

        <div className="pt-2">
          <motion.button
            type="submit"
            disabled={loading || !user?.email}
            whileHover={{ scale: loading ? 1 : 1.01, boxShadow: loading ? "none" : "0 0 25px rgba(52, 211, 153, 0.35)" }}
            whileTap={{ scale: loading ? 1 : 0.99 }}
            className="w-full bg-emerald-500 text-slate-950 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors disabled:bg-slate-800 disabled:text-slate-600 border border-transparent disabled:border-white/5 cursor-pointer"
          >
            <FaPaperPlane className="text-xs" />
            {loading ? "Transmitting Packet..." : "Dispatch Request Protocol"}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default AdoptionFrom;