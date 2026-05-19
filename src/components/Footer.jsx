import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="pt-28 bg-black text-white">
      <div className="container mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-2xl font-bold">🐱 PrittyCats</h2>
          <p className="text-gray-400 mt-4 text-sm leading-relaxed">
            Adopt love, share happiness. Find your perfect furry friend today.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>

          <div className="space-y-3 text-gray-400 text-sm">
            <p className="flex items-center gap-2">
              <FaEnvelope /> support@prittycats.com
            </p>

            <p className="flex items-center gap-2">
              <FaPhone /> +880 1234-567890
            </p>

            <p>📍 Dhaka, Bangladesh</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>

          <div className="flex gap-4 text-gray-300">
            <a href="#" className="hover:text-white transition">
              <FaFacebook size={20} />
            </a>

            <a href="#" className="hover:text-white transition">
              <FaInstagram size={20} />
            </a>

            <a href="#" className="hover:text-white transition">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-5 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} PrittyCats. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
