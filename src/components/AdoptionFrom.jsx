"use client";
import { authClient } from "@/lib/auth-client";
import React from "react";

const AdoptionFrom = ({ pet }) => {
  const { data } = authClient.useSession();
  const user = data?.user;
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 h-fit sticky top-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Adoption Form</h2>

      <form className="space-y-5">
        <div>
          <label className="block mb-2 font-medium">Pet Name</label>

          <input
            type="text"
            name="petName"
            value={pet.name}
            readOnly
            className="w-full border rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">User Name</label>

          <input
            type="text"
            name="userName"
            value={user?.name || ""}
            readOnly
            className="w-full border rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">User Email</label>

          <input
            type="email"
            name="userEmail"
            value={user?.email || ""}
            readOnly
            className="w-full border rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Pickup Date</label>

          <input
            type="date"
            name="pickupDate"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Message</label>

          <textarea
            rows="5"
            name="message"
            placeholder="Why do you want to adopt this pet?"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          ></textarea>
        </div>

        <input type="hidden" name="status" value="pending" />

        <button
          type="submit"
          className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition"
        >
          Adopt Now
        </button>
      </form>
    </div>
  );
};

export default AdoptionFrom;
