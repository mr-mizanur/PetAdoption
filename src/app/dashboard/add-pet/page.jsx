
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddPetPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const showNotification = (msg, type) => {
    setNotification({ show: true, message: msg, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const petData = Object.fromEntries(formData.entries());
    
    // ডাটা টাইপ কনভার্সন
    petData.age = Number(petData.age);
    petData.adoptionFee = Number(petData.adoptionFee);

    try {
      const res = await fetch("http://localhost:5000/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      if (res.ok) {
        showNotification("Pet listed for adoption successfully! 🐾", "success");
        e.target.reset();
        // রিকোয়ারমেন্ট অনুযায়ী সাকসেসফুল হলে My Listings পেজে রিডাইরেক্ট
        setTimeout(() => {
          router.push("/dashboard/my-listings");
        }, 1500);
      } else {
        showNotification("Failed to add pet. Please check fields.", "error");
      }
    } catch (error) {
      showNotification("Server communication error. Try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
      
      {/* UI Notification Alert Instead of default alert() */}
      {notification.show && (
        <div className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-xl shadow-xl text-white font-semibold transition-all duration-300 ${
          notification.type === "success" ? "bg-emerald-500" : "bg-rose-500"
        }`}>
          {notification.message}
        </div>
      )}

      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-8 border border-gray-100">
        <h1 className="text-3xl font-extrabold mb-2 text-gray-900 text-center">Add Pet For Adoption</h1>
        <p className="text-gray-500 text-center mb-8 text-sm">Fill in the details to find a sweet home for this little partner.</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Pet Name</label>
            <input type="text" name="name" required placeholder="e.g., Buddy" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Species</label>
            <select name="species" required className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition bg-white">
              <option value="">Select Species</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Breed</label>
            <input type="text" name="breed" required placeholder="e.g., Golden Retriever" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Age (Years)</label>
            <input type="number" name="age" required placeholder="e.g., 2" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Gender</label>
            <select name="gender" required className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition bg-white">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Image Base64/URL</label>
            <input type="text" name="image" required placeholder="Paste direct image string or URL" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Health Status</label>
            <input type="text" name="healthStatus" required placeholder="e.g., Healthy / Mild allergy" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Vaccination Status</label>
            <select name="vaccinationStatus" required className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition bg-white">
              <option value="">Select Status</option>
              <option value="Fully Vaccinated">Fully Vaccinated</option>
              <option value="Not Vaccinated">Not Vaccinated</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Location</label>
            <input type="text" name="location" required placeholder="e.g., Dhaka, Bangladesh" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Adoption Fee ($)</label>
            <input type="number" name="adoptionFee" required placeholder="Enter fee or 0" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition" />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-gray-700">Owner Email (Read-Only)</label>
            <input type="email" name="ownerEmail" value="shelter1@gmail.com" readOnly className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-500 font-medium cursor-not-allowed outline-none" />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-gray-700">Description</label>
            <textarea rows="4" name="description" required placeholder="Describe habits, friendliness, playful temperament..." className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition resize-none"></textarea>
          </div>

          <div className="md:col-span-2 mt-2">
            <button type="submit" disabled={loading} className="w-full bg-black text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 tracking-wide transition disabled:bg-gray-400">
              {loading ? "Processing..." : "Submit Pet Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetPage;