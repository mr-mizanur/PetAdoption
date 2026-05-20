"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaPaw, FaMapMarkerAlt, FaSearch, FaFilter } from "react-icons/fa";

const AllPetsPage = () => {
  const [pets, setPets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Default");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets`);
        const data = await res.json();
        setPets(Array.isArray(data) ? data : []);
      } catch (error) { console.error("Error:", error); }
    };
    fetchPets();
  }, []);

  const filteredPets = useMemo(() => {
    let result = pets.filter((pet) => {
      const query = searchQuery.toLowerCase();
      return (pet.name?.toLowerCase().includes(query) || pet.species?.toLowerCase().includes(query));
    }).filter(p => speciesFilter === "All" || p.species === speciesFilter);

    if (sortOrder === "Low to High") result.sort((a, b) => a.adoptionFee - b.adoptionFee);
    if (sortOrder === "High to Low") result.sort((a, b) => b.adoptionFee - a.adoptionFee);
    return result;
  }, [pets, searchQuery, speciesFilter, sortOrder]);

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      
      {/* 1. Filter Section */}
      <div className="max-w-7xl mx-auto mb-16 bg-slate-900/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-2 mb-6 text-emerald-400 font-bold uppercase tracking-widest text-xs">
          <FaFilter /> Filter & Search
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative">
            <label className="text-[10px] text-slate-500 uppercase font-bold ml-1">Search by name</label>
            <div className="relative mt-2 flex items-center bg-slate-950 border border-white/5 rounded-xl px-4 py-3">
              <FaSearch className="text-slate-600 mr-2" />
              <input type="text" placeholder="Search pets..." className="bg-transparent w-full text-white text-sm outline-none" onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-500 uppercase font-bold ml-1">Filter by species</label>
            <select className="w-full mt-2 bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-white text-sm outline-none" onChange={(e) => setSpeciesFilter(e.target.value)}>
              <option value="All">All Species</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] text-slate-500 uppercase font-bold ml-1">Sort by fee</label>
            <select className="w-full mt-2 bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-white text-sm outline-none" onChange={(e) => setSortOrder(e.target.value)}>
              <option value="Default">Default</option>
              <option value="Low to High">Price: Low to High</option>
              <option value="High to Low">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Pet Cards (Rocky Style) */}
      <div className="max-w-7xl mx-auto">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPets.map((pet) => (
              <motion.div key={pet._id} layout whileHover={{ y: -6 }} className="bg-slate-900 rounded-3xl overflow-hidden border border-white/5 shadow-2xl flex flex-col">
                <div className="h-72 relative overflow-hidden bg-slate-950">
                  <Image src={pet.image} alt={pet.name} fill className="object-cover" />
                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white">{pet.species}</div>
                  <div className="absolute top-4 right-4 bg-emerald-500 text-black font-black px-4 py-1.5 rounded-full text-xs">${pet.adoptionFee}</div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-3xl font-black text-white">{pet.name}</h3>
                    <span className="bg-slate-950 border border-white/10 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-400">{pet.breed}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-8">
                    <FaMapMarkerAlt className="text-emerald-500" /> 
                    <span>{pet.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <Link href={`/pet-details/${pet._id}`}>
                      <button className="w-full py-3 rounded-xl border border-white/10 bg-slate-950 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
                        <FaEye /> DETAILS
                      </button>
                    </Link>
                    <Link href={`/adopt/${pet._id}`}>
                      <button className="w-full py-3 rounded-xl bg-emerald-500 text-black font-black text-sm flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all">
                        <FaPaw /> ADOPT NOW
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AllPetsPage;