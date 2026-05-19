"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const MyListings = () => {
  const [pets, setPets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePetId, setActivePetId] = useState(null); 
  const [showModal, setShowModal] = useState(false);

  const ownerEmail = "shelter1@gmail.com"; 

  useEffect(() => {
    // একই সাথে ওনারের নিজের পেট ডাটা ও তার রিকোয়েস্ট ফেচ করা
    const fetchOwnerDashboard = async () => {
      try {
        const [petsRes, reqsRes] = await Promise.all([
          fetch(`http://localhost:5000/api/pets`), // রিয়াল এনভায়রনমেন্টে এটি ওনার ইমেইল দিয়ে ফিল্টার হবে
          fetch(`http://localhost:5000/api/owner-requests?email=${ownerEmail}`)
        ]);

        const allPets = await petsRes.json();
        const allRequests = await reqsRes.json();

        // ওনারের ইমেইলের সাথে ফিল্টার মিলানো
        const ownerPets = allPets.filter(p => p.ownerEmail === ownerEmail);
        setPets(ownerPets);
        setRequests(allRequests);
      } catch (error) {
        console.error("Dashboard calculation issue", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerDashboard();
  }, [ownerEmail]);

  // স্ট্যাটস ক্যালকুলেশন (Requirement: Stats)
  const totalListings = pets.length;
  const availableCount = pets.filter(p => p.status === "available" || p.status !== "adopted").length;
  const adoptedCount = pets.filter(p => p.status === "adopted").length;

  const openRequestsModal = (petId) => {
    setActivePetId(petId);
    setShowModal(true);
  };

  const handleApprove = async (reqId) => {
    const res = await fetch(`http://localhost:5000/api/requests/approve/${reqId}`, { method: "PATCH" });
    if (res.ok) {
      alert("Adoption application approved! 🎉");
      window.location.reload();
    }
  };

  const handleReject = async (reqId) => {
    const res = await fetch(`http://localhost:5000/api/requests/reject/${reqId}`, { method: "PATCH" });
    if (res.ok) {
      alert("Application successfully rejected.");
      window.location.reload();
    }
  };

  const handleDeletePet = async (petId) => {
    if (confirm("Are you absolutely sure you want to remove this listing?")) {
      const res = await fetch(`http://localhost:5000/api/pets/${petId}`, { method: "DELETE" });
      if (res.ok) {
        setPets(pets.filter(p => p._id !== petId));
      }
    }
  };

  if (loading) return <div className="text-center pt-36 font-semibold text-gray-500">Calculating platform data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-8">My Listings Dashboard</h1>

        {/* Stats Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Listings</h3>
            <p className="text-4xl font-black text-gray-900 mt-1">{totalListings}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Available</h3>
            <p className="text-4xl font-black text-indigo-600 mt-1">{availableCount}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Adopted</h3>
            <p className="text-4xl font-black text-emerald-600 mt-1">{adoptedCount}</p>
          </div>
        </div>

        {/* Pet Grid Management */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div key={pet._id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-48 w-full bg-gray-100 relative">
                  <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow ${
                    pet.status === "adopted" ? "bg-emerald-500" : "bg-blue-500"
                  }`}>
                    {pet.status || "available"}
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{pet.name}</h2>
                  <p className="text-sm text-gray-500 font-medium">Adoption Fee: <span className="text-gray-900 font-bold">${pet.adoptionFee}</span></p>
                </div>
              </div>

              {/* Action Operations Controller */}
              <div className="p-5 pt-0 border-t border-gray-50 grid grid-cols-2 gap-2 mt-4">
                <button onClick={() => openRequestsModal(pet._id)} className="col-span-2 py-2 rounded-xl text-xs font-bold bg-gray-900 hover:bg-black text-white transition text-center">
                  Requests ({requests.filter(r => r.petId === pet._id).length})
                </button>
                <Link href={`/pet-details/${pet._id}`} className="py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-700 text-center transition">
                  View Profile
                </Link>
                <button onClick={() => handleDeletePet(pet._id)} className="py-2 border border-rose-200 hover:bg-rose-50 rounded-xl text-xs font-bold text-rose-600 text-center transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Requests Modal (Requirement Specific) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold text-lg">✕</button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Incoming Adoption Requests</h2>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {requests.filter(r => r.petId === activePetId).length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-6">No adoption applications received for this profile yet.</p>
              ) : (
                requests.filter(r => r.petId === activePetId).map((req) => (
                  <div key={req._id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <p className="font-bold text-gray-900 text-base">{req.userName || "Applicant"}</p>
                      <p className="text-xs text-gray-500">{req.requesterEmail}</p>
                      <p className="text-xs text-gray-700 mt-2">Target Date: <span className="font-semibold">{req.pickupDate || "Not Specified"}</span></p>
                      {req.message && <p className="text-xs italic text-gray-500 mt-1">"{req.message}"</p>}
                    </div>

                    <div className="flex gap-2">
                      {req.status === "pending" ? (
                        <>
                          <button onClick={() => handleApprove(req._id)} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold shadow">Approve</button>
                          <button onClick={() => handleReject(req._id)} className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-bold shadow">Reject</button>
                        </>
                      ) : (
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          req.status === "approved" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                        }`}>{req.status}</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;