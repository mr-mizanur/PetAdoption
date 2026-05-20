"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaEye, FaPaw, FaCheckCircle, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const FeaturedPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const user = {
    email: "buyer1@gmail.com",
    isLoggedIn: true,
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${baseUrl}/api/pets`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setPets(data);
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  const handleWishlist = async (petId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user.email, petId }),
      });
      
      if (res.ok) {
        toast.success("Successfully added to wishlist!");
      } else {
        toast.error("Failed to add to wishlist.");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-emerald-400 font-bold uppercase tracking-widest text-xs">Syncing Companion Registry...</p>
      </div>
    );
  }

  return (
    <section className="mt-32 pb-20 relative px-4">
      <Toaster position="top-right" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center mb-16 space-y-3">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Featured <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Companions</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {pets.slice(0, 6).map((pet) => (
          <motion.div 
            key={pet._id} 
            whileHover={{ y: -6 }} 
            className="group relative bg-slate-900/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/5 hover:border-emerald-500/20 shadow-2xl flex flex-col"
          >
            <div className="h-64 overflow-hidden relative bg-slate-950">
              <Image src={pet.image} alt={pet.name} width={500} height={500} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
              <button 
                onClick={() => handleWishlist(pet._id)} 
                className="absolute top-4 left-4 p-2.5 bg-slate-950/60 backdrop-blur-md rounded-full text-white hover:text-rose-500 transition-all border border-white/10"
              >
                <FaHeart />
              </button>
              <div className="absolute top-4 right-4 bg-emerald-500 text-slate-950 font-black px-3 py-1 rounded-lg text-xs">${pet.adoptionFee}</div>
              {pet.status === "adopted" && (
                <div className="absolute inset-0 bg-slate-950/70 flex items-center justify-center text-emerald-400 font-bold text-xs uppercase">
                  <FaCheckCircle className="mr-2"/> Adopted
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col flex-grow space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-extrabold text-white">{pet.name}</h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/5 text-slate-400">{pet.breed}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-xs"><FaMapMarkerAlt className="text-emerald-500" /> {pet.location}</div>
              
              <div className="pt-2 mt-auto flex gap-3">
                <Link href={`/pet-details/${pet._id}`} className="w-full">
                  <button className="w-full py-3 rounded-xl border border-white/10 bg-white/5 text-slate-200 text-xs font-bold uppercase hover:bg-white/10">Details</button>
                </Link>
                {pet.status !== "adopted" && (
                  <Link href={`/pet-details/${pet._id}`} className="w-full">
                    <button className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black uppercase">Adopt Now</button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPets;