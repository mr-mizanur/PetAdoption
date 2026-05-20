"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaCheckCircle, FaMapMarkerAlt, FaSearch, FaFilter } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const AllPetsPage = () => {
  const [pets, setPets] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Default");

  const user = { email: "buyer1@gmail.com", isLoggedIn: true };

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      // Fetch Pets
      try {
        const res = await fetch(`${baseUrl}/api/pets`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setPets(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      }

      // Fetch Wishlist
      try {
        const res = await fetch(`${baseUrl}/api/wishlist/${user.email}`);
        if (res.ok) {
          const data = await res.json();
          setWishlistIds(data.map((item) => item.petId));
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchData();
  }, []);

  const handleWishlist = async (petId) => {
    if (wishlistIds.includes(petId)) return toast.error("Already in wishlist!");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user.email, petId }),
      });
      if (res.ok) {
        setWishlistIds([...wishlistIds, petId]);
        toast.success("Added to wishlist!");
      }
    } catch (err) {
      toast.error("Failed to add!");
    }
  };

  const filteredPets = useMemo(() => {
    let result = pets.filter((pet) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        pet.name?.toLowerCase().includes(query) ||
        pet.species?.toLowerCase().includes(query) ||
        pet.breed?.toLowerCase().includes(query) ||
        pet.location?.toLowerCase().includes(query);
      const matchesSpecies = speciesFilter === "All" || pet.species === speciesFilter;
      return matchesSearch && matchesSpecies;
    });

    if (sortOrder === "Low to High")
      result.sort((a, b) => (Number(a.adoptionFee) || 0) - (Number(b.adoptionFee) || 0));
    if (sortOrder === "High to Low")
      result.sort((a, b) => (Number(b.adoptionFee) || 0) - (Number(a.adoptionFee) || 0));

    return result;
  }, [pets, searchQuery, speciesFilter, sortOrder]);

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto mb-16 relative z-10 space-y-8">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Global <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Registry Database</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/40 border border-white/5 p-6 rounded-2xl backdrop-blur-xl">
          <input type="text" placeholder="Search..." className="bg-slate-950 border border-white/10 text-white px-4 py-3 rounded-xl outline-none" onChange={(e) => setSearchQuery(e.target.value)} />
          <select className="bg-slate-950 border border-white/10 text-white px-4 py-3 rounded-xl outline-none" onChange={(e) => setSpeciesFilter(e.target.value)}>
            <option value="All">All Species</option>
            {[...new Set(pets.map((p) => p.species))].map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
          <select className="bg-slate-950 border border-white/10 text-white px-4 py-3 rounded-xl outline-none" onChange={(e) => setSortOrder(e.target.value)}>
            <option value="Default">Sort: Default</option>
            <option value="Low to High">Fee: Low to High</option>
            <option value="High to Low">Fee: High to Low</option>
          </select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPets.map((pet, index) => {
              const isOwner = user.isLoggedIn && pet.ownerEmail === user.email;
              const isAdopted = pet.status === "adopted";
              let adoptLink = user.isLoggedIn ? `/pet-details/${pet._id}` : `/login?redirect=/pet-details/${pet._id}`;

              return (
                <motion.div key={`${pet._id}-${index}`} layout whileHover={{ y: -6 }} className="group relative bg-slate-900/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/5 hover:border-emerald-500/20 shadow-2xl flex flex-col">
                  <div className="h-64 overflow-hidden relative bg-slate-950">
                    <Image src={pet.image} alt={pet.name} width={500} height={500} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                    
                    <button 
                      onClick={() => handleWishlist(pet._id)} 
                      className={`absolute top-4 left-4 p-2.5 backdrop-blur-md rounded-full transition-all border border-white/10 ${wishlistIds.includes(pet._id) ? "text-rose-500 bg-slate-950/80" : "text-white bg-slate-950/60 hover:text-rose-500"}`}
                    >
                      <FaHeart />
                    </button>

                    <div className="absolute top-4 right-4 bg-emerald-500 text-slate-950 font-black px-3 py-1 rounded-lg text-xs">${pet.adoptionFee}</div>
                    {isAdopted && <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center"><span className="bg-slate-900/90 text-emerald-400 px-4 py-2 rounded-xl font-bold text-xs uppercase flex items-center gap-2"><FaCheckCircle /> Adopted</span></div>}
                  </div>

                  <div className="p-6 flex flex-col flex-grow space-y-4">
                    <h3 className="text-xl font-extrabold text-white">{pet.name}</h3>
                    <div className="flex items-center gap-2 text-slate-400 text-xs"><FaMapMarkerAlt className="text-emerald-500" /> {pet.location}</div>
                    <div className="pt-2 mt-auto flex gap-3">
                      <Link href={`/pet-details/${pet._id}`} className="w-full"><button className="w-full py-3 rounded-xl border border-white/10 bg-white/5 text-slate-200 text-xs font-bold uppercase hover:bg-white/10">Details</button></Link>
                      {!isAdopted && !isOwner && <Link href={adoptLink} className="w-full"><button className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black uppercase">Adopt Now</button></Link>}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AllPetsPage;