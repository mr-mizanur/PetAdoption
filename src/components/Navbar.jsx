"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Avatar } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { 
  FaPaw, 
  FaChevronDown, 
  FaBars, 
  FaTimes, 
  FaSignOutAlt, 
  FaList,
  FaPlusCircle,
  FaHeart,
  FaUserShield
} from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  
  const { data } = authClient.useSession();
  const user = data?.user;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDashboardOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = async () => {
    await authClient.signOut();
    setIsDashboardOpen(false);
  };

  const mainLinks = [
    { href: "/", label: "Home" },
    { href: "/all-pets", label: "All Pets" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-white">
        
        <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter group">
          <FaPaw className="text-emerald-400 text-xl group-hover:animate-bounce" />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-200 to-white bg-clip-text text-transparent">
            PetAdoption
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {mainLinks.map((item) => (
            <li key={item.href} className="relative py-1">
              <Link
                href={item.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  isActive(item.href) ? "text-emerald-400" : "text-slate-400 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side Controls */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <div 
                onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-slate-900 transition-all cursor-pointer"
              >
                <Avatar size="sm" src={user.image} fallback={user.name?.slice(0, 2)} className="w-7 h-7 text-xs font-black bg-emerald-500 text-slate-950" />
                <span className="text-xs font-bold text-slate-300 truncate max-w-[100px]">{user.name}</span>
                <FaChevronDown className="text-[10px] text-slate-500" />
              </div>
              
              <AnimatePresence>
                {isDashboardOpen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-2 w-56 bg-slate-900 border border-white/10 p-2 rounded-2xl z-50 shadow-xl">
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-xl text-xs font-bold text-slate-300 transition-colors">
                      <FaUserShield className="text-emerald-400" /> Dashboard
                    </Link>
                    <button onClick={handleLogOut} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-xl text-rose-400 text-xs font-bold transition-colors"> 
                      <FaSignOutAlt /> Terminate Session 
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-xs font-bold uppercase text-slate-400 hover:text-white transition-colors">Login</Link>
              <Link href="/registration">
                <Button size="sm" className="rounded-lg bg-emerald-500 font-bold text-xs uppercase hover:bg-emerald-600 transition-colors">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-400 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;