"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCalendarAlt, 
  FaClock, 
  FaEye, 
  FaTrashAlt, 
  FaFolderOpen, 
  FaExclamationTriangle,
  FaCheckCircle,
  FaBan
} from "react-icons/fa";

const MyRequests = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const buyerEmail = "buyer1@gmail.com"; 

  useEffect(() => {
    fetch(`http://localhost:5000/api/my-requests?email=${buyerEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setApplications(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error reading application log", err);
        setLoading(false);
      });
  }, [buyerEmail]);

  const triggerDeleteConfirm = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const handleCancelRequest = async () => {
    const id = deleteModal.id;
    if (!id) return;

    try {
      const res = await fetch(`http://localhost:5000/api/requests/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setApplications(applications.filter((app) => app._id !== id));
      }
    } catch (error) {
      console.error("Failed to terminate validation request node", error);
    } finally {
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Compiling Sync Application History Matrix...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 relative">
      
      <AnimatePresence>
        {deleteModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteModal({ isOpen: false, id: null })}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl text-center space-y-5"
            >
              <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto text-xl">
                <FaExclamationTriangle />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Terminate Request Stream?</h3>
                <p className="text-slate-400 text-xs leading-relaxed max-w-xs mx-auto">
                  Are you absolutely certain you want to purge this application record? This operational node cannot be recovered.
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setDeleteModal({ isOpen: false, id: null })}
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Abort Action
                </button>
                <button 
                  onClick={handleCancelRequest}
                  className="w-full py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-rose-500/10"
                >
                  Confirm Purge
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-3">
            <FaFolderOpen className="text-emerald-400 text-xl" />
            Adoption{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Request Log
            </span>
          </h1>
          <p className="text-slate-400 text-xs font-medium tracking-wide mt-1">
            Track validation metrics, lifecycle intervals, and deployment schedules
          </p>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/10 border border-dashed border-white/5 rounded-2xl space-y-4">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">No Operational Deployment Logs Found</p>
          <Link href="/all-pets" className="inline-block">
            <button className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs font-bold uppercase tracking-wider hover:bg-emerald-500 hover:text-slate-950 hover:border-transparent transition-all duration-300 cursor-pointer">
              Explore Active Databases
            </button>
          </Link>
        </div>
      ) : (
        <div className="bg-slate-950/40 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/5 bg-slate-950 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  <th className="p-4.5 pl-6">Designated Companion</th>
                  <th className="p-4.5">Initialization Date</th>
                  <th className="p-4.5">Scheduled Dispatch</th>
                  <th className="p-4.5">Validation Status</th>
                  <th className="p-4.5 pr-6 text-right">Operation Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs font-medium text-slate-300">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4 pl-6 font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                      {app.petName || "Active Unit Node"}
                    </td>
                    <td className="p-4 text-slate-400 font-mono text-[11px]">
                      {app.requestDate ? new Date(app.requestDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "Timestamp Pending"}
                    </td>
                    <td className="p-4 text-slate-400 font-semibold flex items-center gap-2 mt-1">
                      <FaCalendarAlt className="text-slate-600 text-[11px]" />
                      <span>{app.pickupDate || "Awaiting Setup"}</span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border shadow-inner ${
                        app.status === "approved" ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20" :
                        app.status === "rejected" ? "bg-rose-500/5 text-rose-400 border-rose-500/20" :
                        "bg-amber-500/5 text-amber-400 border-amber-500/20"
                      }`}>
                        {app.status === "approved" && <FaCheckCircle className="text-[9px]" />}
                        {app.status === "rejected" && <FaBan className="text-[9px]" />}
                        {app.status !== "approved" && app.status !== "rejected" && <FaClock className="text-[9px]" />}
                        {app.status || "Pending"}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <Link href={`/pet-details/${app.petId}`}>
                          <button className="p-2.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl border border-white/5 transition-all cursor-pointer text-xs" title="View Specifications">
                            <FaEye />
                          </button>
                        </Link>
                        <button 
                          onClick={() => triggerDeleteConfirm(app._id)} 
                          className="p-2.5 bg-rose-500/5 hover:bg-rose-500 text-rose-400 hover:text-slate-950 rounded-xl border border-rose-500/10 hover:border-transparent transition-all cursor-pointer text-xs"
                          title="Cancel Application Node"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRequests;