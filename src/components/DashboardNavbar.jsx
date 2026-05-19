import Link from "next/link";
import React from "react";
import { FaList, FaPlus, FaPaw } from "react-icons/fa";

const DashboardNavbar = () => {
  return (
    <div className="w-full">
      <nav className="flex flex-col gap-3">
        <Link
          href={"/dashboard/my-requests"}
          className="flex items-center gap-3 px-4 py-3 rounded-xl 
          text-gray-700 bg-gray-50 hover:bg-pink-50 hover:text-pink-600
          transition font-medium"
        >
          <FaList />
          My Requests
        </Link>

        <Link
          href={"/dashboard/add-pet"}
          className="flex items-center gap-3 px-4 py-3 rounded-xl 
          text-gray-700 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600
          transition font-medium"
        >
          <FaPlus />
          Add Pet
        </Link>

        <Link
          href={"/dashboard/my-listing"}
          className="flex items-center gap-3 px-4 py-3 rounded-xl 
          text-gray-700 bg-gray-50 hover:bg-green-50 hover:text-green-600
          transition font-medium"
        >
          <FaPaw />
          My Listings
        </Link>
      </nav>
    </div>
  );
};

export default DashboardNavbar;
