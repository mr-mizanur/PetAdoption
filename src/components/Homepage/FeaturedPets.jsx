"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCheckCircle, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const FeaturedPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState([]);
  
  const user = { email: "mizanur@gmail.com", isLoggedIn: true };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        
       
        const petsRes = await fetch(`${baseUrl}/api/pets`);
        const petsData = petsRes.ok ? await petsRes.json() : [];
        setPets(petsData);

        try {
          const wishRes = await fetch(`${baseUrl}/api/wishlist/${user.email}`);
          if (wishRes.ok) {
            const wishData = await wishRes.json();
            setWishlistIds(wishData.map(item => item.petId));
          }
        } catch (err) {
          console.warn("Wishlist fetch skipped");
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
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
    } catch (err) { toast.error("Failed to add!"); }
  };

  if (loading) return <div className="text-center text-emerald-400 p-10">Syncing Registry...</div>;

  //return (
  //  <section className="mt-32 pb-20 relative px-4">
  //    <Toaster position="top-right" />
  //    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
  //      {pets.slice(0, 6).map((pet) => (
  //        <motion.div key={pet._id} className="bg-slate-900/40 rounded-2xl overflow-hidden border border-white/5 flex flex-col">
  //          <div className="h-64 relative">
  //            <Image src={pet.image} alt={pet.name} width={500} height={500} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-full object-cover" />
  //            <button onClick={() => handleWishlist(pet._id)} 
  //              className={`absolute top-4 left-4 p-2.5 rounded-full border border-white/10 ${wishlistIds.includes(pet._id) ? "text-rose-500 bg-slate-950/80" : "text-white bg-slate-950/60"}`}>
  //              <FaHeart />
  //            </button>
  //          </div>
  //          <div className="p-6">
  //            <h3 className="text-xl font-bold text-white">{pet.name}</h3>
  //            <Link href={`/pet-details/${pet._id}`} className="block mt-4"><button className="w-full py-3 bg-emerald-500 rounded-xl text-xs font-black uppercase">Adopt Now</button></Link>
  //          </div>
  //        </motion.div>
  //      ))}
  //    </div>
  //  </section>
  //);



// ... (পূর্বের ইমপোর্টগুলো ঠিক থাকবে)

return (
  <section className="mt-32 pb-20 relative px-4">
    <Toaster position="top-right" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {pets.slice(0, 6).map((pet) => (
        <motion.div key={pet._id} className="bg-slate-900/40 rounded-2xl overflow-hidden border border-white/5 flex flex-col hover:border-emerald-500/30 transition-all">
          
          <div className="h-64 relative">
            <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-[10px] font-bold text-emerald-400 uppercase">
              {pet.status || "Available"}
            </div>
            <Image src={pet.image} alt={pet.name} width={500} height={500} className="w-full h-full object-cover" />
            <button onClick={() => handleWishlist(pet._id)} 
              className={`absolute top-4 left-4 p-2.5 rounded-full border border-white/10 ${wishlistIds.includes(pet._id) ? "text-rose-500 bg-slate-950/80" : "text-white bg-slate-950/60"}`}>
              <FaHeart />
            </button>
          </div>

        
          <div className="p-6 flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-black text-white">{pet.name}</h3>
              <p className="text-slate-400 text-sm mt-1">
                {pet.age} years old • {pet.gender}
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-emerald-500" />
                <span>{pet.location}</span>
              </div>
              <div className="text-emerald-400 font-bold text-sm">
                ${pet.adoptionFee} adoption fee
              </div>
            </div>
          </div>

         
          <div className="p-6 pt-0 flex gap-2">
            <Link href={`/pet-details/${pet._id}`} className="flex-1">
              <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-wider text-white transition-all">
                View Details
              </button>
            </Link>
            <Link href={`/pet-details/${pet._id}`} className="flex-1">
              <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-950 transition-all">
                Adopt Now
              </button>
            </Link>
          </div>




    
        </motion.div>
      ))}
    </div>
    <div className="flex justify-center mt-12">
      <Link href="/all-pets">
        <button className="px-8 py-4 bg-transparent border border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-400 font-bold uppercase tracking-widest text-sm rounded-xl transition-all">
          View All Pets
        </button>
      </Link>
    </div>
  </section>
);


};

export default FeaturedPets;