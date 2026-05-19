import DashboardNavbar from "@/components/DashboardNavbar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 mt-20 relative">
      <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-r from-pink-100/40 via-indigo-100/30 to-transparent blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="lg:hidden mb-6">
          <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-md p-4">
            <h2 className="text-lg font-bold text-gray-900">🐱 PrittyCats</h2>
            <p className="text-xs text-gray-500 mb-3">Dashboard Panel</p>

            <DashboardNavbar />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-10 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-lg p-6 hover:shadow-2xl transition">
              <div className="mb-6 pb-4 border-b border-gray-100">
                <h2 className="text-xl font-extrabold text-gray-900">
                  🐱 PrittyCats
                </h2>
                <p className="text-xs text-gray-500 mt-1">Dashboard Panel</p>
              </div>

              <DashboardNavbar />
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-lg p-5 sm:p-6 md:p-10 min-h-[80vh] hover:shadow-2xl transition">
              <div className="mb-6">
                <div className="h-1 w-20 bg-linear-to-r from-pink-500 to-indigo-500 rounded-full mb-4" />
              </div>

              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
