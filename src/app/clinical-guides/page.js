"use client";

import { motion } from "framer-motion";
import { FaStethoscope, FaFileMedical, FaSyringe, FaNotesMedical } from "react-icons/fa";

const guides = [
  { title: "Emergency Triage", info: "Steps for handling acute trauma or poisoning.", icon: FaStethoscope },
  { title: "Vaccination Protocol", info: "Standardized timelines for feline and canine boosters.", icon: FaSyringe },
  { title: "Diagnostic Standards", info: "Pre-operative checklists and blood panel interpretation.", icon: FaFileMedical },
  { title: "Post-Op Care", info: "Guidelines for recovery and wound management at home.", icon: FaNotesMedical },
];

// এই ফাংশনটিই হলো আপনার ডিফল্ট এক্সপোর্ট (React Component)
export default function ClinicalGuidesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl font-black mb-4">Clinical Guides</h1>
          <p className="text-slate-400">Professional veterinary standards and evidence-based care protocols.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {guides.map((guide, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-start gap-6 p-8 bg-slate-900/50 border border-white/10 rounded-2xl"
            >
              <div className="text-emerald-400 text-3xl mt-1">
                <guide.icon />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{guide.info}</p>
                <button className="text-xs font-bold uppercase tracking-widest text-emerald-400 hover:text-white transition-colors">
                  View Protocol
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-8 border-l-4 border-emerald-500 bg-emerald-500/5 rounded-r-2xl">
          <h4 className="font-bold text-lg mb-2">Disclaimer</h4>
          <p className="text-slate-400 text-sm">
            These guides are intended for informational purposes for trained professionals and informed owners. Always consult with a licensed veterinarian before applying any clinical intervention.
          </p>
        </div>
      </div>
    </main>
  );
}