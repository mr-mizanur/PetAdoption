"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const MyRequests = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const buyerEmail = "buyer1@gmail.com"; 

  useEffect(() => {
    fetch(`http://localhost:5000/api/my-requests?email=${buyerEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error reading application log", err));
  }, [buyerEmail]);

  const handleCancelRequest = async (id) => {
    if (confirm("Are you sure you want to completely cancel this application?")) {
      const res = await fetch(`http://localhost:5000/api/requests/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setApplications(applications.filter((app) => app._id !== id));
      }
    }
  };

  if (loading) return <div className="text-center pt-36 font-semibold text-gray-500">Fetching your application history...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-6 pb-20">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h1 className="text-3xl font-black text-gray-900 mb-2">My Adoption Applications</h1>
        <p className="text-gray-500 text-sm mb-8">Track status updates, timeline and coordinate schedules for your upcoming partners.</p>

        {applications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-base">You haven't initiated any adoption files yet.</p>
            <Link href="/all-pets" className="inline-block mt-4 text-xs font-bold tracking-wide uppercase bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition">
              Explore Available Pets
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider bg-gray-50/50">
                  <th className="p-4">Pet Details</th>
                  <th className="p-4">Requested On</th>
                  <th className="p-4">Pickup Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50/60 transition duration-150">
                    <td className="p-4 font-bold text-gray-900">
                      {app.petName || "Adorable Friend"}
                    </td>
                    <td className="p-4 text-gray-500">
                      {app.requestDate ? new Date(app.requestDate).toLocaleDateString() : "Recently"}
                    </td>
                    <td className="p-4 font-medium text-gray-700">
                      {app.pickupDate || "To be arranged"}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold shadow-sm ${
                        app.status === "approved" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" :
                        app.status === "rejected" ? "bg-rose-100 text-rose-800 border border-rose-200" :
                        "bg-amber-100 text-amber-800 border border-amber-200"
                      }`}>
                        {app.status || "pending"}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link href={`/pet-details/${app.petId}`}>
                        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-xs text-gray-700 rounded-xl transition">
                          View Details
                        </button>
                      </Link>
                      <button onClick={() => handleCancelRequest(app._id)} className="px-4 py-2 bg-rose-50 hover:bg-rose-100 font-bold text-xs text-rose-600 rounded-xl transition">
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;