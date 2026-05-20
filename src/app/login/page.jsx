"use client";

import { authClient } from "@/lib/auth-client";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import axiosInstance from "@/utils/axiosInstance";
import {
  Button,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import { FaTerminal, FaShieldAlt, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const showToast = (msg, type) => {
    setNotification({ show: true, message: msg, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3500);
  };

  //const handleRegister = async (e) => {
  //  e.preventDefault();
  //  setLoading(true);
//
  //  const formData = new FormData(e.currentTarget);
  //  const userData = Object.fromEntries(formData.entries());
  //  
  //  try {
  //    const { data, error } = await authClient.signIn.email({
  //      email: userData.email,
  //      password: userData.password,
  //      rememberMe: true,
  //      callbackURL: "/",
  //    });
//
  //    if (data) {
  //      showToast("System handshake complete. Terminal unlocked! 🔓", "success");
  //    }
  //    if (error) {
  //      showToast(error.message || "Encryption key error. Access denied.", "error");
  //    }
  //  } catch (err) {
  //    showToast("Mainframe connection timeout.", "error");
  //  } finally {
  //    setLoading(false);
  //  }
  //};



const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    
    try {
      // ১. অথ ক্লায়েন্ট দিয়ে সাইন-ইন
      const { data, error } = await authClient.signIn.email({
        email: userData.email,
        password: userData.password,
        rememberMe: true,
        callbackURL: "/",
      });

      if (data) {
        // ২. লগইন সাকসেস হলে আমাদের সার্ভারে টোকেন কুকি সেট করার জন্য রিকোয়েস্ট পাঠান
        await axiosInstance.post('/api/jwt', { email: userData.email });
        
        showToast("System handshake complete. Terminal unlocked! 🔓", "success");
        window.location.href = "/"; // অথবা useRouter ব্যবহার করুন
      }
      if (error) {
        showToast(error.message || "Encryption key error. Access denied.", "error");
      }
    } catch (err) {
      showToast("Mainframe connection timeout.", "error");
    } finally {
      setLoading(false);
    }
  };



  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (err) {
      showToast("External federated ID bypass failed.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-24 px-4 flex items-center justify-center relative overflow-hidden">
     
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none" />

      
      <AnimatePresence>
        {notification.show && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: -20, scale: 0.9, x: "-50%" }}
            className={`fixed top-24 left-1/2 z-50 px-6 py-4 rounded-2xl shadow-2xl border text-xs font-black uppercase tracking-widest flex items-center gap-3 backdrop-blur-3xl min-w-[320px] ${
              notification.type === "success" 
                ? "bg-slate-950/90 text-emerald-400 border-emerald-500/30 shadow-emerald-500/10" 
                : "bg-slate-950/90 text-rose-500 border-rose-500/30 shadow-rose-500/10"
            }`}
          >
            {notification.type === "success" ? <FaCheckCircle className="text-sm shrink-0" /> : <FaExclamationTriangle className="text-sm shrink-0" />}
            <span className="text-slate-300 normal-case font-medium leading-relaxed">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
        className="w-full max-w-md relative z-10"
      >
        <Form
          className="flex w-full flex-col gap-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-2xl p-8 md:p-10 shadow-2xl"
          onSubmit={handleRegister}
        >
          <div className="text-center space-y-2 mb-2">
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2.5 uppercase">
              <FaShieldAlt className="text-emerald-400 text-2xl animate-pulse" />
              Secure{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Mainframe
              </span>
            </h1>
            <p className="text-slate-400 text-xs font-medium tracking-wide max-w-xs mx-auto">
              Provide authorization credentials to bypass firewall protocol and load dashboard architecture
            </p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full" />
          </div>

          {/* Email Field */}
          <TextField
            className="w-full space-y-2"
            name="email"
            type="email"
            validate={(value) => {
              if (!value) {
                return "Root identifier email is required";
              }
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Malformed system email string configuration.";
              }
              return null;
            }}
          >
            <Label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Operator Login ID</Label>
            <Input
              placeholder="root@system.io"
              className="h-12 w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 text-sm text-slate-200 placeholder-slate-700 outline-none focus:border-emerald-500/30 transition-all duration-300"
            />
            <FieldError className="mt-1 text-[10px] font-black uppercase tracking-wider text-rose-500" />
          </TextField>

         
          <TextField
            className="w-full space-y-2"
            name="password"
            validate={(value) => {
              if (!value) {
                return "Passphrase matrix required";
              }
              if (value.length < 8) {
                return "Security token hash mismatch. Minimum 8 chars.";
              }
              if (!/[A-Z]/.test(value)) {
                return "Missing high-priority capital sequence node";
              }
              if (!/[a-z]/.test(value)) {
                return "Missing low-priority normal sequence node";
              }
              return null;
            }}
          >
            <Label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">System Passkey</Label>
            <InputGroup className="relative">
              <InputGroup.Input
                name="password"
                className="h-12 w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 pr-12 text-sm text-slate-200 placeholder-slate-700 outline-none focus:border-emerald-500/30 transition-all duration-300"
                type={isVisible ? "text" : "password"}
                placeholder="••••••••••••"
              />
              <InputGroup.Suffix className="absolute top-1/2 right-3 -translate-y-1/2 z-20">
                <Button
                  isIconOnly
                  aria-label={isVisible ? "Mask password" : "Unmask password"}
                  size="sm"
                  variant="light"
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeSlash className="size-4" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <FieldError className="mt-1 text-[10px] font-black uppercase tracking-wider text-rose-500" />
          </TextField>

          {/* Submit Button */}
          <div className="pt-2">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01, boxShadow: loading ? "none" : "0 0 25px rgba(52, 211, 153, 0.35)" }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              className="w-full h-12 bg-emerald-500 text-slate-950 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors disabled:bg-slate-800 disabled:text-slate-600 border border-transparent disabled:border-white/5 cursor-pointer shadow-lg"
            >
              <FaTerminal className="text-sm" />
              {loading ? "Decrypting Token..." : "Initialize Session Pipeline"}
            </motion.button>
          </div>

          
          <div className="relative flex items-center my-1">
            <div className="grow border-t border-white/5"></div>
            <span className="mx-3 text-[10px] font-black tracking-widest text-slate-600">LINK TO SSO</span>
            <div className="grow border-t border-white/5"></div>
          </div>

         
          <div className="text-center">
            <motion.button
              type="button"
              onClick={handleGoogle}
              whileHover={{ scale: 1.01, bg: "rgba(255,255,255,0.04)" }}
              whileTap={{ scale: 0.99 }}
              className="h-12 w-full rounded-xl border border-white/5 bg-slate-950/40 text-slate-300 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:text-white transition-all cursor-pointer"
            >
              <FcGoogle size={20} className="shrink-0" />
              Inject Google Auth Protocol
            </motion.button>
          </div>

        
          <p className="text-center text-xs font-medium text-slate-500 pt-2">
            Identity registry missing?{" "}
            <Link
              href="/register"
              className="font-black text-slate-300 hover:text-emerald-400 hover:underline transition-colors uppercase tracking-wider ml-1"
            >
              Provision New Node
            </Link>
          </p>
        </Form>
      </motion.div>
    </div>
  );
};

export default LoginPage;