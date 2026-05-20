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
  FaPlusCircle, 
  FaList, 
  FaSignOutAlt, 
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

  const handleLogOut = async () => {
    await authClient.signOut();
    setIsDashboardOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDashboardOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              {isActive(item.href) && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-400 shadow-[0_0_10px_#34d399]" />
              )}
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <div 
                onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-slate-900 transition-all duration-300 cursor-pointer group select-none max-w-[220px]"
              >
                <Avatar size="sm" src={user.image} fallback={user.name?.slice(0, 2)} className="w-7 h-7 text-xs font-black bg-emerald-500 text-slate-950 shrink-0" />
                <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors truncate max-w-[120px]">{user.name}</span>
                <motion.div
                  animate={{ rotate: isDashboardOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[10px] text-slate-500 group-hover:text-white shrink-0 ml-1"
                >
                  <FaChevronDown />
                </motion.div>
              </div>
              
              <AnimatePresence>
                {isDashboardOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="absolute right-0 mt-2 w-64 bg-slate-950/95 backdrop-blur-2xl border border-white/10 text-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden z-50 p-2 space-y-1"
                  >
                    <div className="px-3 py-2.5 bg-white/5 rounded-xl border border-white/5 mb-1 flex items-center gap-3">
                      <div className="text-emerald-400 text-sm shrink-0">
                        <FaUserShield />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Secure Access</p>
                        <p className="text-xs font-bold text-slate-300 truncate mt-0.5">{user.email}</p>
                      </div>
                    </div>

                    {[
                      { href: "/dashboard/my-requests", label: "My Requests", icon: <FaHeart className="text-emerald-400" /> },
                      { href: "/dashboard/add-pet", label: "Add Asset Node", icon: <FaPlusCircle className="text-teal-400" /> },
                      { href: "/dashboard/my-listing", label: "My Listings Hub", icon: <FaList className="text-cyan-400" /> }
                    ].map((link, i) => (
                      <Link 
                        key={i} 
                        href={link.href}
                        onClick={() => setIsDashboardOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5 text-xs font-semibold tracking-wide transition-all duration-200"
                      >
                        {link.icon}
                        <span>{link.label}</span>
                      </Link>
                    ))}

                    <button 
                      onClick={handleLogOut}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-400 hover:text-white hover:bg-rose-500/20 border border-transparent hover:border-rose-500/30 text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer mt-1 pt-2.5 border-t border-white/5"
                    >
                      <FaSignOutAlt />
                      <span>Terminate Session</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <Link href="/login" className="text-xs font-bold tracking-wider uppercase text-slate-400 hover:text-white transition-colors">
                Login
              </Link>
              <Link href="/registration">
                <Button size="sm" className="rounded-lg bg-emerald-500 font-bold text-xs tracking-wider uppercase text-slate-950 hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        <button
          className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden px-6 pb-8 pt-4 text-white bg-slate-950 border-t border-white/5">
          <div className="flex flex-col gap-4">
            {mainLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-base font-medium tracking-wide transition-all ${
                  isActive(item.href) ? "text-emerald-400 border-l-2 border-emerald-400 pl-2" : "text-slate-400 pl-2"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <>
                <div className="my-1 border-t border-white/5" />
                <p className="text-[10px] font-bold tracking-widest text-slate-600 uppercase pl-2">Dashboard</p>
                
                <Link href="/dashboard/my-requests" onClick={() => setIsMenuOpen(false)} className="pl-2 text-sm text-slate-400 hover:text-white flex items-center gap-3">
                  <FaHeart className="text-emerald-400 text-xs" /> My Requests
                </Link>
                <Link href="/dashboard/add-pet" onClick={() => setIsMenuOpen(false)} className="pl-2 text-sm text-slate-400 hover:text-white flex items-center gap-3">
                  <FaPlusCircle className="text-teal-400 text-xs" /> Add Pet
                </Link>
                <Link href="/dashboard/my-listing" onClick={() => setIsMenuOpen(false)} className="pl-2 text-sm text-slate-400 hover:text-white flex items-center gap-3">
                  <FaList className="text-cyan-400 text-xs" /> My Listings
                </Link>

                <div className="my-2 border-t border-white/5" />
                <Button
                  size="sm"
                  onClick={() => { handleLogOut(); setIsMenuOpen(false); }}
                  className="w-full rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold text-xs uppercase tracking-wider py-5"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <div className="my-1 border-t border-white/5" />
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="py-2.5 text-center rounded-lg text-sm font-bold text-slate-300 border border-white/10 hover:bg-white/5 transition-all">
                  Login
                </Link>
                <Link href="/registration" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full rounded-lg bg-emerald-500 text-slate-950 font-bold text-sm tracking-wide uppercase py-5">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;