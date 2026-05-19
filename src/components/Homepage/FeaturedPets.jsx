"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaEye, FaPaw, FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";

const FeaturedPets = () => {
  const [pets, setPets] = useState([]);
  
  const user = {
    email: "buyer1@gmail.com",
    isLoggedIn: true,
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/pets", {
          cache: "no-store",
          method: "GET",
        });
        if (res.ok) {
          const data = await res.json();
          setPets(data);
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };
    fetchPets();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 80, damping: 15 } 
    }
  };

  return (
    <section className="mt-32 pb-20 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center mb-16 space-y-3">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Featured{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Companions
          </span>
        </h2>
        <p className="text-slate-400 text-sm font-medium tracking-wide max-w-md mx-auto">
          Meet exceptional life partners awaiting a secure sanctuary transition
        </p>
        <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {pets.slice(0, 6).map((pet) => {
          const isOwner = user.isLoggedIn && pet.ownerEmail === user.email;
          const isAdopted = pet.status === "adopted";

          let adoptLink = `/pet-details/${pet._id}`;
          if (!user.isLoggedIn) {
            adoptLink = `/login?redirect=/pet-details/${pet._id}`;
          }

          return (
            <motion.div
              key={pet._id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group relative bg-slate-900/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/5 hover:border-emerald-500/20 shadow-2xl transition-all duration-300 flex flex-col"
            >
              <div className="h-64 overflow-hidden relative bg-slate-950">
                <Image
                  src={pet.image}
                  alt={pet.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-105 opacity-80 group-hover:opacity-100 transition-all duration-500"
                />

                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 shadow-md">
                  {pet.species}
                </div>

                <div className="absolute top-4 right-4 bg-emerald-500 text-slate-950 font-black px-3 py-1 rounded-lg text-xs shadow-lg">
                  ${pet.adoptionFee}
                </div>

                {isAdopted && (
                  <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center">
                    <span className="bg-slate-900/90 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-xl font-bold text-xs tracking-widest uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(52,211,153,0.15)] animate-pulse">
                      <FaCheckCircle className="text-emerald-400 text-sm" /> Adopted
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-grow space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-extrabold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                    {pet.name}
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                    {pet.breed}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <FaMapMarkerAlt className="text-emerald-500 text-xs shrink-0" />
                  <span className="truncate">{pet.location}</span>
                </div>

                <div className="pt-2 mt-auto flex gap-3">
                  <Link href={`/pet-details/${pet._id}`} className="w-full">
                    <button className="w-full py-3 rounded-xl border border-white/10 bg-white/5 text-slate-200 text-xs font-bold uppercase tracking-wider hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer">
                      <FaEye className="text-sm" /> Details
                    </button>
                  </Link>

                  {isAdopted ? (
                    <button
                      disabled
                      className="w-full py-3 rounded-xl bg-slate-950 text-slate-600 border border-white/5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed"
                    >
                      <FaCheckCircle /> Adopted
                    </button>
                  ) : isOwner ? (
                    <button
                      disabled
                      className="w-full py-3 rounded-xl bg-slate-950/50 border border-dashed border-white/10 text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center cursor-not-allowed"
                    >
                      Your Listing
                    </button>
                  ) : (
                    <Link href={adoptLink} className="w-full">
                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(52, 211, 153, 0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                      >
                        <FaPaw className="text-sm" /> Adopt Now
                      </motion.button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default FeaturedPets;