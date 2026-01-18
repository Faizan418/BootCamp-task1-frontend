import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Menu, X, LayoutDashboard, Wallet, CreditCard, User, Sparkles } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/dashboard/income", label: "Income", icon: Wallet },
    { to: "/dashboard/expenses", label: "Expenses", icon: CreditCard },
    { to: "/dashboard/profile", label: "Settings", icon: User },
  ];

  return (
    <div className="min-h-screen  flex bg-[#020411] text-white font-sans selection:bg-indigo-500/30">
      
      {/* ===== DESKTOP SIDEBAR ===== */}
      <Sidebar />

      {/* ===== MOBILE HEADER ===== */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-[#0a0f1e]/80 backdrop-blur-xl border-b border-white/5 z-50">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-black tracking-tighter">
              Expense<span className="text-indigo-500">Tracker</span>
            </h1>
          </div>
          <button
            className="p-2 rounded-xl bg-white/5 text-slate-300 active:scale-90 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE MENU NAV */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col px-4 pb-6 space-y-1 bg-[#0a0f1e] border-t border-white/5 overflow-hidden"
            >
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    end
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                        : "text-slate-400 border border-transparent hover:bg-white/5"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-bold text-sm tracking-tight">{link.label}</span>
                  </NavLink>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* ===== MAIN VIEWPORT ===== */}
      <main className="flex-1 relative h-screen overflow-y-auto overflow-x-hidden">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-24 md:py-12">
          
          {/* Main Content Wrapper (Matching Modals Style) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-[85vh] rounded-[3rem] p-4 sm:p-10 lg:p-8 
                       bg-[#0a0f1e]/40 backdrop-blur-sm border border-white/5 
                       shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden"
          >
            {/* Subtle Inner Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            {/* Child Routes Render Here */}
            <Outlet />
          </motion.div>

          {/* Page Footer */}
          <footer className="mt-12 text-center">
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.4em]">
              Crafted by Muhammad Faizan...
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}