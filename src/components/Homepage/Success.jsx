import Image from "next/image";
import React from "react";

const SuccessStories = () => {
  return (
    <section className="mt-10 px-6 py-20 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Success Stories ❤️
        </h2>
        <p className="text-gray-500 mt-3 text-lg">
          Real happy families with their adopted pets
        </p>
      </div>

      <div className="container mx-auto grid md:grid-cols-3 gap-10">
        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition">
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/100?img=5"
              className="w-14 h-14 rounded-full"
            />
            <div>
              <h4 className="font-bold text-gray-900">Ayesha Rahman</h4>
              <p className="text-sm text-gray-500">Dhaka</p>
            </div>
          </div>

          <p className="mt-5 text-gray-600 text-sm leading-relaxed">
            “Adopting Luna changed my life. She brings joy every single day.
            Thank you PrittyCats!”
          </p>
        </div>

        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition">
          <div className="flex items-center gap-4">
            <Image
              src="https://i.pravatar.cc/100?img=12"
              alt="avatar"
              width={56}
              height={56}
              className="rounded-full"
            />
            <div>
              <h4 className="font-bold text-gray-900">Tanvir Hasan</h4>
              <p className="text-sm text-gray-500">Gazipur</p>
            </div>
          </div>

          <p className="mt-5 text-gray-600 text-sm leading-relaxed">
            “Max is not just a pet, he is part of my family now. Amazing
            adoption experience.”
          </p>
        </div>

        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition">
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/100?img=20"
              className="w-14 h-14 rounded-full"
            />
            <div>
              <h4 className="font-bold text-gray-900">Nusrat Jahan</h4>
              <p className="text-sm text-gray-500">Dhaka</p>
            </div>
          </div>

          <p className="mt-5 text-gray-600 text-sm leading-relaxed">
            “Very smooth adoption process. My cat Simba is now my best friend
            ❤️”
          </p>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
