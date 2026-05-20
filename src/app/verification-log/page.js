"use client";

import { motion } from "framer-motion";
import { FaShieldAlt, FaClock, FaUser, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const logs = [
  { id: "LOG-8821", user: "John Doe", action: "Profile Verified", status: "Success", time: "2 hours ago" },
  { id: "LOG-8820", user: "Sarah Smith", action: "Pet Listing Audit", status: "Success", time: "5 hours ago" },
  { id: "LOG-8819", user: "Admin System", action: "Bulk Security Scan", status: "Warning", time: "12 hours ago" },
  { id: "LOG-8818", user: "Mike Ross", action: "Identity Verification", status: "Success", time: "1 day ago" },
];

export default function VerificationLogPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-4">Verification Log</h1>
          <p className="text-slate-400">Real-time audit of platform security and user verification activities.</p>
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <FaShieldAlt className="text-emerald-400 text-xl" />
            <h2 className="font-bold">System Audit Trail</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 text-xs uppercase tracking-wider border-b border-white/5">
                  <th className="px-6 py-4">Log ID</th>
                  <th className="px-6 py-4">User/Entity</th>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <motion.tr 
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">{log.id}</td>
                    <td className="px-6 py-4 font-bold text-sm flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px]"><FaUser /></div>
                      {log.user}
                    </td>
                    <td className="px-6 py-4 text-sm">{log.action}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase flex items-center w-fit gap-1 ${
                        log.status === "Success" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                      }`}>
                        {log.status === "Success" ? <FaCheckCircle /> : <FaExclamationTriangle />}
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 flex items-center gap-2"><FaClock /> {log.time}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}