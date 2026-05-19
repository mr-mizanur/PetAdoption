"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Button, 
  Avatar, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem 
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { FaPaw, FaChevronDown, FaBars, FaTimes, FaPlusCircle, FaList, FaSignOutAlt, FaHeart } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const { data } = authClient.useSession();
  const user = data?.user;

  const handleLogOut = async () => {
    await authClient.signOut();
  };

  const mainLinks = [
    { href: "/", label: "Home" },
    { href: "/all-pets", label: "All Pets" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-white">
        
        {/* Brand Logo & Name Updated to PetAdoption */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter group">
          <FaPaw className="text-emerald-400 text-xl group-hover:animate-bounce" />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-200 to-white bg-clip-text text-transparent">
            PetAdoption
          </span>
        </Link>

        {/* Cyberpunk Style Navigation Links */}
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
              {/* অ্যাক্টিভ লিংকের নিচে আন্ডারলাইন গ্লো */}
              {isActive(item.href) && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-400 shadow-[0_0_10px_#34d399]" />
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA / Profile Dropdown Menu */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Dropdown placement="bottom-end" className="bg-slate-900 border border-white/10 text-white rounded-xl shadow-xl">
              <DropdownTrigger>
                <div className="flex items-center gap-3 px-1 py-1 rounded-full bg-white/5 border border-white/5 hover:border-white/20 transition-all cursor-pointer group">
                  <Avatar size="sm" isBordered color="success" src={user.image} fallback={user.name?.slice(0, 2)} className="w-8 h-8" />
                  <span className="text-xs font-semibold pr-2 text-slate-300 group-hover:text-white transition-colors">{user.name}</span>
                  <FaChevronDown className="text-[10px] text-slate-500 mr-2 group-hover:text-white" />
                </div>
              </DropdownTrigger>
              
              <DropdownMenu aria-label="User Actions" variant="flat" className="p-2 gap-1">
                <DropdownItem key="profile_header" className="h-10 gap-2 opacity-100 cursor-default border-b border-white/5 mb-1">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Account</p>
                  <p className="text-xs font-medium text-emerald-400 truncate">{user.email}</p>
                </DropdownItem>
                <DropdownItem key="my-requests" startContent={<FaHeart className="text-emerald-400" />}>
                  <Link href="/dashboard/my-requests" className="w-full block text-xs text-slate-300">My Requests</Link>
                </DropdownItem>
                <DropdownItem key="add-pet" startContent={<FaPlusCircle className="text-teal-400" />}>
                  <Link href="/dashboard/add-pet" className="w-full block text-xs text-slate-300">Add Pet</Link>
                </DropdownItem>
                <DropdownItem key="my-listings" startContent={<FaList className="text-cyan-400" />}>
                  <Link href="/dashboard/my-listings" className="w-full block text-xs text-slate-300">My Listings</Link>
                </DropdownItem>
                <DropdownItem key="logout" color="danger" className="text-rose-400 mt-1 border-t border-white/5 pt-2" startContent={<FaSignOutAlt />} onClick={handleLogOut}>
                  <span className="text-xs font-bold">Log Out</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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

        {/* Mobile Menu Toggle Trigger */}
        <button
          className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {/* Mobile Layout Menu */}
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
                <Link href="/dashboard/my-listings" onClick={() => setIsMenuOpen(false)} className="pl-2 text-sm text-slate-400 hover:text-white flex items-center gap-3">
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