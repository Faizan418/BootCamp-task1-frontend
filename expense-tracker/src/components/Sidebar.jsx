import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Wallet, CreditCard, User, Sparkles, ChevronRight, Signature } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/income", label: "Income", icon: Wallet },
  { to: "/dashboard/expenses", label: "Expenses", icon: CreditCard },
  { to: "/dashboard/profile", label: "Settings", icon: User },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex rounded-[3rem] mt-10 mb-10 ml-8 rounded-4xl h-screen w-72 sticky top-0 z-40 bg-[#0a0f1e] border-r border-white/5 flex-col shadow-[20px_0_50px_rgba(0,0,0,0.2)]">
      
      {/* --- BRAND / LOGO (Matching Dashboard Header) --- */}
      <div className="px-8 py-10">
        <div className="flex items-center gap-3 group cursor-default">
          <div className="w-11 h-11 rounded-[1.25rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
            <Signature className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tighter leading-none">
              Expense<span className="text-indigo-500">Tracker</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1.5">Executive Suite</p>
          </div>
        </div>
      </div>

      {/* --- NAVIGATION (Matching Modal/Card Spacing) --- */}
      <nav className="flex-1 px-4 space-y-1.5 mt-4">
        <p className="px-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-6 opacity-50">Main Menu</p>
        
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to;
          
          return (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `group relative flex items-center gap-4 px-5 py-4 rounded-[1.5rem] transition-all duration-300
                ${isActive 
                  ? "bg-white/[0.03] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                  : "text-slate-500 hover:text-slate-200 hover:bg-white/[0.02]"}`
              }
            >
              {/* Sliding Active Indicator (Framer Motion) */}
              {isActive && (
                <motion.div 
                  layoutId="activeNavHighlight"
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-transparent rounded-[1.5rem] border-l-[3px] border-indigo-500"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Icon Container (Matching Modal Inputs) */}
              <div className={`relative z-10 p-2.5 rounded-xl transition-all duration-500
                ${isActive 
                  ? "bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-110" 
                  : "bg-white/5 text-slate-500 group-hover:bg-white/10 group-hover:text-slate-300"}`}>
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              </div>

              {/* Label */}
              <span className={`relative z-10 text-[13px] font-bold tracking-tight transition-all duration-300
                ${isActive ? "text-white" : "group-hover:translate-x-1 text-slate-400 group-hover:text-slate-200"}`}>
                {label}
              </span>

              {/* Chevron Arrow for Active Item */}
              {isActive && (
                <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="ml-auto relative z-10">
                  <ChevronRight size={14} className="text-indigo-500" />
                </motion.div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* --- FOOTER (Matching TransactionCard Design) --- */}
      <div className="p-6">
        
        <div className="mt-8 flex flex-col items-center gap-1 opacity-20">
            <p className="text-[8px] text-slate-400 font-bold uppercase tracking-[0.4em]">© 2026 ExpenseTracker <br />

Crafted by Muhammad Faizan...</p>
        </div>
      </div>
    </aside>
  );
}