"use client";

import { motion } from "framer-motion";
import { FaCode, FaGithub, FaServer, FaBook } from "react-icons/fa";

const sections = [
  { 
    title: "API Documentation", 
    desc: "Access our RESTful API endpoints for pet data integration.", 
    icon: FaServer, 
    link: "#" 
  },
  { 
    title: "Open Source", 
    desc: "View our codebase and contribute to the PetAdoption project.", 
    icon: FaGithub, 
    link: "#" 
  },
  { 
    title: "Developer Tools", 
    desc: "SDKs and libraries to simplify your integration process.", 
    icon: FaCode, 
    link: "#" 
  },
  { 
    title: "Integration Guides", 
    desc: "Step-by-step tutorials for third-party developers.", 
    icon: FaBook, 
    link: "#" 
  },
];

export default function DeveloperCorePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-black mb-6">Developer Core</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Building the future of pet adoption through robust architecture and community-driven innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-slate-900 p-8 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all"
            >
              <div className="text-4xl text-emerald-400 mb-6">
                <section.icon />
              </div>
              <h3 className="text-xl font-bold mb-3">{section.title}</h3>
              <p className="text-slate-400 text-sm mb-6">{section.desc}</p>
              <a 
                href={section.link} 
                className="text-sm font-bold text-white hover:text-emerald-400 underline decoration-emerald-500 underline-offset-4"
              >
                Explore →
              </a>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Section */}
        <div className="mt-20 border-t border-white/10 pt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Built With Modern Tech</h2>
          <div className="flex flex-wrap justify-center gap-4 text-slate-500">
            <span className="font-bold text-sm border border-white/10 px-4 py-2 rounded-lg bg-white/5">Next.js</span>
            <span className="font-bold text-sm border border-white/10 px-4 py-2 rounded-lg bg-white/5">TailwindCSS</span>
            <span className="font-bold text-sm border border-white/10 px-4 py-2 rounded-lg bg-white/5">PostgreSQL</span>
            <span className="font-bold text-sm border border-white/10 px-4 py-2 rounded-lg bg-white/5">Framer Motion</span>
          </div>
        </div>
      </div>
    </main>
  );
}