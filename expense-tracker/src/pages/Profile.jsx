import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, ShieldCheck, Mail, User, Calendar, Clock, BadgeCheck, Settings } from "lucide-react";
import { logout } from "../features/authslice";
import { motion } from "framer-motion";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth || {});

  const fullName = user?.fullName || "Guest User";
  const email = user?.emailAddress || user?.email || "No Email Provided";
  const profileImg = user?.profileImg || "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  const createdAt = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—";
  const updatedAt = user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "—";

  return (
    <div className="min-h-screen text-slate-200 p-2 md:p-6 space-y-8">
      
      {/* --- HERO SECTION --- */}
      {/* --- UPDATED HERO SECTION --- */}
<motion.div 
  initial={{ opacity: 0, scale: 0.98 }}
  animate={{ opacity: 1, scale: 1 }}
  className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#020617]/40 backdrop-blur-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
>
  {/* Abstract Background Accents */}
  <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent" />
  <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-500/10 blur-[120px] rounded-full" />

  <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">
    
    {/* Left: Avatar & Info Group */}
    <div className="flex flex-col md:flex-row items-center gap-8">
      
      {/* Premium Avatar Container */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-rose-500 rounded-full blur-md opacity-30 group-hover:opacity-60 transition duration-700 animate-spin-slow" />
        <div className="relative p-1 bg-[#020617] rounded-full">
          <img
            src={profileImg}
            alt="profile"
            className="h-32 w-32 md:h-36 md:w-36 rounded-full object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        {/* Status Indicator */}
        <div className="absolute bottom-2 right-2 h-7 w-7 rounded-full bg-emerald-500 border-[5px] border-[#0a0f1e] shadow-lg shadow-emerald-500/20" />
      </div>

      {/* Text Info */}
      <div className="text-center md:text-left space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-2">
          <BadgeCheck className="w-3 h-3" /> Professional Account
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
          {fullName}
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 text-slate-400 font-medium text-sm">
          <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
            <Mail className="w-4 h-4 text-rose-500" /> {email}
          </span>
        </div>
      </div>
    </div>

    {/* Right: Actions */}
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
      <button
        onClick={() => dispatch(logout())}
        disabled={loading}
        className="w-full md:w-auto group relative flex items-center justify-center gap-3 px-10 py-4 rounded-[1.5rem] bg-rose-500/10 border border-rose-500/30 text-rose-500 font-black shadow-2xl hover:bg-rose-500 hover:text-white transition-all duration-300 active:scale-95 disabled:opacity-50"
      >
        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="uppercase tracking-widest text-xs">
          {loading ? "Logging out..." : "Logout"}
        </span>
      </button>
    </div>

  </div>
</motion.div>

      {/* --- GRID LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Stats & Meta */}
        <div className="space-y-6">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Quick Stats</h3>
          <PremiumStat 
            icon={Calendar} 
            title="Joined On" 
            value={createdAt} 
            color="text-indigo-400"
            bg="bg-indigo-500/10"
          />
          <PremiumStat 
            icon={Clock} 
            title="Account Health" 
            value="Optimal" 
            color="text-emerald-400"
            bg="bg-emerald-500/10"
          />
          <div className="p-6 rounded-[2rem] border border-white/5 bg-white/[0.01] space-y-4">
             <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-400">Security Checkup</span>
                <BadgeCheck className="w-5 h-5 text-indigo-500" />
             </div>
             <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
             </div>
             <p className="text-[10px] text-slate-500 font-medium italic">Your account security is 85% - Add phone for 100%</p>
          </div>
        </div>

        {/* Right Column: Account Details (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between ml-2">
             <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Account Information</h3>
             <button className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2 hover:text-indigo-300">
                <Settings className="w-3 h-3" /> Edit Profile
             </button>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 md:p-10 shadow-xl space-y-10">
            {error && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-bold text-center">
                {String(error)}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <PremiumField icon={User} label="Full Name" value={fullName} />
              <PremiumField icon={Mail} label="Email Address" value={email} />
              <PremiumField icon={Calendar} label="Member Since" value={createdAt} />
              <PremiumField icon={BadgeCheck} label="Account Status" value="Verified Member" />
            </div>

            <div className="pt-8 border-t border-white/5">
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center">
                  Last profile sync: {updatedAt}
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- REUSABLE MINI COMPONENTS --- */

function PremiumStat({ icon: Icon, title, value, color, bg }) {
  return (
    <div className="group p-6 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex items-center gap-5">
      <div className={`p-4 rounded-2xl ${bg} ${color} transition-transform group-hover:scale-110 duration-500`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{title}</p>
        <p className="text-xl font-black text-white">{value}</p>
      </div>
    </div>
  );
}

function PremiumField({ label, value, icon: Icon }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">{label}</label>
      <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 text-slate-300 group focus-within:border-indigo-500/40 transition-all">
        <Icon className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
        <span className="text-sm font-bold truncate">{value}</span>
      </div>
    </div>
  );
}