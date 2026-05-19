import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEye, FaPaw, FaCheckCircle } from "react-icons/fa";

const FeaturedPets = async () => {
  // ডামি ইউজার স্টেট (আপনার রিয়াল প্রজেক্টের Auth Context বা Cookie থেকে আসবে)
  // এটি অ্যাসাইনমেন্ট টেস্টিং এর জন্য চেক করার সুবিধার্থে কনফিগার করা
  const user = {
    email: "buyer1@gmail.com", // ওনার বা বায়ার ইমেইল দিয়ে টেস্ট করতে পারেন
    isLoggedIn: true,
  };

  let pets = [];
  try {
    const res = await fetch("http://localhost:5000/api/pets", {
      cache: "no-store", // ডাটা যেন সবসময় লাইভ আপডেট হয় (Reload Issue এড়াতে)
      method: "GET",
    });
    if (res.ok) {
      pets = await res.json();
    }
  } catch (error) {
    console.error("Error fetching pets:", error);
  }

  return (
    <section className="mt-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Featured Pets 🐾
        </h1>
        <p className="text-gray-500 mt-2">
          Meet adorable pets waiting for a loving home
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
        {pets.slice(0, 6).map((pet) => {
          // রিকোয়ারমেন্ট চেকস
          const isOwner = user.isLoggedIn && pet.ownerEmail === user.email;
          const isAdopted = pet.status === "adopted";

          // অ্যাডপ্ট বাটনের লিংক নির্ধারণ
          let adoptLink = `/pet-details/${pet._id}`;
          if (!user.isLoggedIn) {
            adoptLink = `/login?redirect=/pet-details/${pet._id}`; // লগইন না থাকলে রিডাইরেক্ট লগইন পেজে
          }

          return (
            <div
              key={pet._id}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 border border-gray-100"
            >
              <div className="h-64 overflow-hidden relative">
                <Image
                  src={pet.image}
                  alt={pet.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-gray-900">
                  {pet.species}
                </div>

                <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs">
                  ${pet.adoptionFee}
                </div>

                {/* পেট অলরেডি অ্যাডপ্টেড হলে ইমেজের ওপর রিবন বা ট্যাগ */}
                {isAdopted && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center">
                    <span className="bg-emerald-500 text-white px-4 py-2 rounded-full font-bold text-sm tracking-wide flex items-center gap-2 shadow-lg animate-pulse">
                      <FaCheckCircle /> Adopted
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-3">
                <h2 className="text-2xl font-bold text-gray-900">{pet.name}</h2>

                <p className="text-gray-600 text-sm">
                  <span className="font-semibold text-gray-900">Breed:</span>{" "}
                  {pet.breed}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">Location:</span>{" "}
                  {pet.location}
                </p>

                <div className="pt-4 flex gap-3">
                  {/* View Details Button */}
                  <Link href={`/pet-details/${pet._id}`} className="w-full">
                    <button className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2 cursor-pointer">
                      <FaEye />
                      View Details
                    </button>
                  </Link>

                  {/* Adaptive Adopt Button Based on Requirements */}
                  {isAdopted ? (
                    // ওনার যদি অ্যাপ্রুভ করে দেয় (Adopted State)
                    <button
                      disabled
                      className="w-full py-3 rounded-xl bg-gray-200 text-gray-400 font-bold flex items-center justify-center gap-2 cursor-not-allowed"
                    >
                      <FaCheckCircle />
                      Adopted
                    </button>
                  ) : isOwner ? (
                    // ওনার যদি নিজের পেট দেখে (Adoption Control Challenge)
                    <button
                      disabled
                      title="You cannot adopt your own listed pet"
                      className="w-full py-3 rounded-xl bg-gray-100 text-gray-400 font-semibold text-xs flex items-center justify-center gap-1 cursor-not-allowed border border-dashed border-gray-200"
                    >
                      Your Listing
                    </button>
                  ) : (
                    // রেগুলার ইউজার বা নন-লগডইন ইউজারের জন্য এক্টিভ বাটন
                    <Link href={adoptLink} className="w-full">
                      <button className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                        <FaPaw />
                        Adopt Now
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedPets;