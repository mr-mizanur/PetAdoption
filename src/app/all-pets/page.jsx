import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaSearch } from "react-icons/fa";

// সার্ভার কম্পোনেন্টে ডাটা ফেচিং ফাংশন
async function getPets() {
  try {
    const res = await fetch("http://localhost:5000/api/pets", {
      cache: "no-store", // রাউট রিলোড ইস্যু ও ক্যাশিং এড়াতে
      method: "GET",
    });

    // রেসপন্স যদি সাকসেসফুল (200-299) না হয়
    if (!res.ok) {
      console.error(`Server responded with status: ${res.status}`);
      return [];
    }

    // রেসপন্সের টাইপ JSON কিনা নিশ্চিত হওয়া
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Received non-JSON response from server");
      return [];
    }

    return await res.json();
  } catch (error) {
    // নেটওয়ার্ক ডাউন বা সার্ভার বন্ধ থাকলে ক্র্যাশ না করে কনসোলে দেখাবে
    console.error("Network error or server is down:", error);
    return [];
  }
}

const AllPetsPage = async () => {
  const pets = await getPets();

  return (
    <section className="mt-24 px-6 py-10 max-w-7xl mx-auto min-h-screen">
      {/* Header & Search UI Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900">All Available Pets 🐾</h1>
          <p className="text-gray-500 mt-1">Discover all furry and feathered friends ready for a home.</p>
        </div>
        
        {/* Search & Filter Controls Placeholder for Challenge */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search by name..." 
              className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black w-64 transition"
            />
            <FaSearch className="absolute left-3.5 top-3.5 text-gray-400 text-xs" />
          </div>
          <select className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none bg-white focus:ring-2 focus:ring-black transition">
            <option value="">All Species</option>
            <option value="Dog">Dogs</option>
            <option value="Cat">Cats</option>
            <option value="Bird">Birds</option>
          </select>
        </div>
      </div>

      {/* Fallback Condition: সার্ভার ডাটা না দিলে বা খালি থাকলে রিক্রুটার-ফ্রেন্ডলি UI */}
      {pets.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-xs">
          <p className="text-gray-400 text-lg font-medium">No pets found or unable to connect to the server.</p>
          <p className="text-gray-400 text-sm mt-1">Please ensure your backend server is running on port 5000.</p>
        </div>
      ) : (
        /* Pet Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="group bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="h-64 overflow-hidden relative bg-gray-50">
                  {pet.image ? (
                    <Image
                      src={pet.image}
                      alt={pet.name || "Pet"}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      unoptimized // যদি এক্সটার্নাল ইমেজ হোস্ট (imgbb) নেক্সট কনফিগে সেট করা না থাকে
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                  )}
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                    {pet.species}
                  </span>
                  <span className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                    ${pet.adoptionFee}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">{pet.name}</h2>
                  <p className="text-sm text-gray-600"><span className="font-semibold text-gray-900">Breed:</span> {pet.breed}</p>
                  <p className="text-sm text-gray-600"><span className="font-semibold text-gray-900">Location:</span> {pet.location}</p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-4">
                <Link href={`/pet-details/${pet._id}`} className="w-full">
                  <button className="w-full py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer">
                    <FaEye />
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllPetsPage;