"use client";

import { motion } from "framer-motion";
import { FaCheckCircle, FaExclamationTriangle, FaServer, FaDatabase, FaShieldAlt, FaGlobe } from "react-icons/fa";

const services = [
  { name: "API Gateway", status: "Operational", icon: FaGlobe },
  { name: "Authentication Service", status: "Operational", icon: FaShieldAlt },
  { name: "Database Cluster", status: "Operational", icon: FaDatabase },
  { name: "Image Processing Engine", status: "Degraded", icon: FaServer },
];

export default function SystemStatusPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black mb-4">System Status</h1>
          <p className="text-slate-400">Current operational status of our infrastructure.</p>
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
            <h2 className="text-xl font-bold">Services</h2>
            <div className="flex items-center gap-2 text-emerald-400">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-bold">All systems stable</span>
            </div>
          </div>

          <div className="space-y-4">
            {services.map((service, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-4">
                  <service.icon className="text-slate-400" />
                  <span className="font-semibold">{service.name}</span>
                </div>
                <div className={`flex items-center gap-2 text-sm font-bold ${
                  service.status === "Operational" ? "text-emerald-400" : "text-amber-400"
                }`}>
                  {service.status === "Operational" ? <FaCheckCircle /> : <FaExclamationTriangle />}
                  {service.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incident History */}
        <div className="mt-12">
          <h3 className="text-lg font-bold mb-6">Recent Incidents</h3>
          <div className="p-6 bg-slate-900 border border-white/10 rounded-2xl text-slate-400 text-sm">
            <p>May 18, 2026: Resolved latency issues with Image Processing Engine.</p>
            <p className="mt-2">May 10, 2026: Scheduled maintenance for Database Cluster completed successfully.</p>
          </div>
        </div>
      </div>
    </main>
  );
}