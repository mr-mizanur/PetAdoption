"use client";

import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaServer, 
  FaCheckCircle, 
  FaClock, 
  FaEye, 
  FaTrashAlt, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaTimes, 
  FaExclamationTriangle
} from "react-icons/fa";

const MyListings = () => {
  const { data } = authClient.useSession();
  const user = data?.user;
  const ownerEmail = user?.email; 

  const [pets, setPets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({ totalListings: 0, availableCount: 0, adoptedCount: 0 });
  const [loading, setLoading] = useState(true);
  const [activePetId, setActivePetId] = useState(null); 
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const showToast = (msg, type) => {
    setNotification({ show: true, message: msg, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3500);
  };

  const fetchDashboardData = async () => {
    if (!ownerEmail) return;
    try {
      const [listingsRes, requestsRes, statsRes] = await Promise.all([
        fetch(`http://localhost:5000/api/my-listings?email=${ownerEmail}`),
        fetch(`http://localhost:5000/api/owner-requests?email=${ownerEmail}`),
        fetch(`http://localhost:5000/api/owner-stats?email=${ownerEmail}`)
      ]);

      const dataListings = await listingsRes.json();
      const dataRequests = await requestsRes.json();
      const dataStats = await statsRes.json();

      setPets(Array.isArray(dataListings) ? dataListings : []);
      setRequests(Array.isArray(dataRequests) ? dataRequests : []);
      setStats(dataStats);
    } catch (error) {
      console.error("Dashboard calculation issue", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ownerEmail) {
      fetchDashboardData();
    }
  }, [ownerEmail]);

  const openRequestsModal = (petId) => {
    setActivePetId(petId);
    setShowRequestsModal(true);
  };

  const handleApprove = async (reqId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/requests/approve/${reqId}`, { method: "PATCH" });
      if (res.ok) {
        showToast("Adoption application verified & deployed successfully! 🎉", "success");
        setShowRequestsModal(false);
        fetchDashboardData(); 
      }
    } catch (err) {
      showToast("Authentication sequence failed.", "error");
    }
  };

  const handleReject = async (reqId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/requests/reject/${reqId}`, { method: "PATCH" });
      if (res.ok) {
        showToast("Application stream rejected successfully.", "success");
        setShowRequestsModal(false);
        fetchDashboardData(); 
      }
    } catch (err) {
      showToast("Action rejected by target node.", "error");
    }
  };

  const triggerDeleteConfirm = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const handleDeletePet = async () => {
    const petId = deleteModal.id;
    if (!petId) return;

    try {
      const res = await fetch(`http://localhost:5000/api/pets/${petId}`, { method: "DELETE" });
      if (res.ok) {
        setPets(pets.filter(p => p._id !== petId));
        showToast("Listing record purged from global engine.", "success");
        fetchDashboardData();
      }
    } catch (err) {
      showToast("System failed to clear targeted configuration block.", "error");
    } finally {
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  if (!ownerEmail && !loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-[10px] font-black uppercase tracking-widest text-rose-500">Authentication Required: Please Login to View Dashboard</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Calculating Core Analytics Matrix...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-10 relative text-slate-200 p-4 max-w-6xl mx-auto">
      
      <AnimatePresence>
        {notification.show && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: -20, scale: 0.9, x: "-50%" }}
            className={`fixed top-24 left-1/2 z-50 px-6 py-4 rounded-2xl shadow-2xl border text-xs font-black uppercase tracking-widest flex items-center gap-3 backdrop-blur-3xl min-w-[320px] ${
              notification.type === "success" 
                ? "bg-slate-950/90 text-emerald-400 border-emerald-500/30 shadow-emerald-500/10" 
                : "bg-slate-950/90 text-rose-500 border-rose-500/30 shadow-rose-500/10"
            }`}
          >
            {notification.type === "success" ? <FaCheckCircle className="text-sm" /> : <FaExclamationTriangle className="text-sm" />}
            <span className="text-slate-300 normal-case font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteModal({ isOpen: false, id: null })} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl text-center space-y-5">
              <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto text-xl"><FaExclamationTriangle /></div>
              <div className="space-y-2">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Purge Listing Record?</h3>
                <p className="text-slate-400 text-xs max-w-xs mx-auto leading-relaxed">Are you absolutely certain you want to terminate this pet listing? This record data stream cannot be recovered.</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setDeleteModal({ isOpen: false, id: null })} className="w-full py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer">Abort</button>
                <button onClick={handleDeletePet} className="w-full py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer shadow-lg">Confirm Purge</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div>
        <h1 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-3">
          <FaServer className="text-emerald-400 text-xl" />
          My Listings{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Dashboard</span>
        </h1>
        <p className="text-slate-400 text-xs font-medium tracking-wide mt-1">Manage database records, monitor request stacks, and verify lifecycle allocations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-5 shadow-inner">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Total Listings</p>
          <p className="text-3xl font-black text-white mt-1.5 font-mono">{stats.totalListings}</p>
        </div>
        <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-5 shadow-inner">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Active Units (Available)</p>
          <p className="text-3xl font-black text-cyan-400 mt-1.5 font-mono">{stats.availableCount}</p>
        </div>
        <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-5 shadow-inner">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Deployed Units (Adopted)</p>
          <p className="text-3xl font-black text-emerald-400 mt-1.5 font-mono">{stats.adoptedCount}</p>
        </div>
      </div>

      {pets.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/10 border border-dashed border-white/5 rounded-2xl space-y-4">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">No Active Asset Modules Found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div key={pet._id} className="bg-slate-900/20 border border-white/5 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-white/10 transition-all duration-300">
              <div>
                <div className="h-44 w-full bg-slate-950 relative overflow-hidden">
                  <img src={pet.image || "/placeholder.jpg"} alt={pet.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
                  <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider border ${
                    pet.status === "adopted" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                  }`}>
                    {pet.status || "available"}
                  </span>
                </div>
                <div className="p-5 space-y-1.5">
                  <h3 className="text-base font-black text-white tracking-wide group-hover:text-emerald-400 transition-colors">{pet.name}</h3>
                  <p className="text-slate-400 text-xs font-semibold">Transfer Fee: <span className="text-white font-mono">${pet.adoptionFee}</span></p>
                </div>
              </div>

              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button onClick={() => openRequestsModal(pet._id)} className="col-span-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-200 transition-all cursor-pointer text-center">
                  Requests Stream ({requests.filter(r => r.petId === pet._id).length})
                </button>
                <Link href={`/pet-details/${pet._id}`} className="py-2 bg-slate-950/60 border border-white/5 hover:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-400 hover:text-white transition-all text-center flex items-center justify-center gap-1.5">
                  <FaEye /> View Profile
                </Link>
                <button onClick={() => triggerDeleteConfirm(pet._id)} className="py-2 bg-rose-500/5 hover:bg-rose-500 border border-rose-500/10 hover:border-transparent rounded-xl text-[10px] font-black uppercase tracking-wider text-rose-400 hover:text-slate-950 transition-all cursor-pointer flex items-center justify-center gap-1.5">
                  <FaTrashAlt /> Delete Node
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showRequestsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowRequestsModal(false)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <FaClock className="text-cyan-400" /> Incoming Adoption Inbound Streams
                </h3>
                <button onClick={() => setShowRequestsModal(false)} className="p-1.5 hover:bg-white/5 text-slate-500 hover:text-white rounded-lg transition-colors cursor-pointer"><FaTimes /></button>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {requests.filter(r => r.petId === activePetId).length === 0 ? (
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest text-center py-8">Zero validation pipelines routing to this key index.</p>
                ) : (
                  requests.filter(r => r.petId === activePetId).map((req) => (
                    <div key={req._id} className="p-4 bg-slate-950/40 border border-white/5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="space-y-1">
                        <p className="font-extrabold text-white text-sm tracking-wide">{req.userName || "Anonymous Agent"}</p>
                        <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5"><FaEnvelope className="text-[10px]" /> {req.requesterEmail}</p>
                        <p className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5 pt-1"><FaCalendarAlt className="text-[10px] text-slate-600" /> Target Date: <span className="text-slate-300 font-mono">{req.pickupDate || "Unassigned"}</span></p>
                        {req.message && <p className="text-[11px] italic text-slate-500 mt-2 border-l border-white/10 pl-2">"{req.message}"</p>}
                      </div>

                      <div className="flex gap-2 shrink-0">
                        {req.status === "pending" ? (
                          <>
                            <button onClick={() => handleApprove(req._id)} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer shadow-md">Approve</button>
                            <button onClick={() => handleReject(req._id)} className="px-3 py-1.5 bg-white/5 hover:bg-rose-500/20 border border-white/5 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer">Reject</button>
                          </>
                        ) : (
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 border rounded-md ${
                            req.status === "approved" ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20" : "bg-rose-500/5 text-rose-400 border-rose-500/20"
                          }`}>{req.status}</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyListings;