import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, ShieldCheck, Mail, User } from "lucide-react";
import { logout } from "../features/authslice";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth || {});

  const fullName = user?.fullName || "—";
  const email = user?.emailAddress || user?.email || "—";
  const profileImg =
    user?.profileImg ||
    "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  const createdAt = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "—";
  const updatedAt = user?.updatedAt
    ? new Date(user.updatedAt).toLocaleDateString()
    : "—";

  return (
    <div className="space-y-12 text-white animate-fadeIn">

      {/* ================= HERO PROFILE ================= */}
      <div className="relative rounded-[28px] overflow-hidden border border-slate-700/60 bg-[#020617]/90 shadow-2xl">

        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-cyan-500/10" />
        <div className="absolute -top-24 -right-24 h-72 w-72 bg-pink-500/20 blur-3xl rounded-full" />

        <div className="relative p-10 flex flex-col lg:flex-row items-center gap-8">
          
          {/* Avatar */}
          <div className="relative">
            <img
              src={profileImg}
              alt="profile"
              className="h-32 w-32 rounded-full object-cover ring-4 ring-pink-500/40 shadow-xl"
            />
            <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full bg-emerald-400 ring-4 ring-[#020617]" />
          </div>

          {/* Info */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight">
              {fullName}
            </h1>
            <p className="text-gray-400 mt-2 flex items-center justify-center lg:justify-start gap-2">
              <Mail className="w-4 h-4" />
              {email}
            </p>

            <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full 
            bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
              <ShieldCheck className="w-4 h-4" />
              Verified & Active
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => dispatch(logout())}
            disabled={loading}
            className="flex items-center gap-2 px-7 py-3 rounded-xl 
            bg-gradient-to-r from-rose-600 to-pink-700 
            text-white font-medium shadow-xl 
            hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-rose-200 text-center font-medium">
          {String(error)}
        </div>
      )}

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <PremiumStat
          title="Member Since"
          value={createdAt}
          accent="from-fuchsia-500/20 to-purple-500/5"
        />
        <PremiumStat
          title="Last Updated"
          value={updatedAt}
          accent="from-cyan-500/20 to-blue-500/5"
        />
      </div>

      {/* ================= ACCOUNT DETAILS ================= */}
      <div className="rounded-[28px] border border-slate-700/60 
      bg-[#020617]/90 p-10 shadow-2xl">

        <h2 className="text-3xl font-semibold mb-10 tracking-tight">
          Account Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <PremiumField icon={User} label="Full Name" value={fullName} />
          <PremiumField icon={Mail} label="Email Address" value={email} />
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function PremiumStat({ title, value, accent }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-700/60 
    bg-gradient-to-br ${accent} bg-[#020617]/80 p-7 shadow-inner`}>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

function PremiumField({ label, value, icon: Icon }) {
  return (
    <div>
      <label className="block text-sm text-gray-200 mb-2">{label}</label>
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl 
      bg-[#020617]/90 border border-slate-700/60 text-gray-400">
        <Icon className="w-5 h-5 text-gray-500" />
        <input
          readOnly
          value={value}
          className="flex-1 bg-transparent  focus:outline-none cursor-not-allowed"
        />
      </div>
    </div>
  );
}
