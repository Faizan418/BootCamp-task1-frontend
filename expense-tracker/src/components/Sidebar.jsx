import { NavLink } from "react-router-dom";
import { House } from "lucide-react";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { VscAccount } from "react-icons/vsc";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: House },
  { to: "/dashboard/income", label: "Income", icon: FaArrowTrendUp },
  { to: "/dashboard/expenses", label: "Expenses", icon: FaArrowTrendDown },
  { to: "/dashboard/profile", label: "Profile", icon: VscAccount },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex h-screen w-72 sticky top-0 z-40
      bg-white/5 backdrop-blur-2xl border-r border-white/10
      text-white flex-col">

      {/* ===== BRAND ===== */}
      <div className="px-8 py-7 border-b border-white/10">
        <h1 className="text-3xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Expense
          </span>
          <span className="text-pink-400">Tracker</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1 tracking-wide">
          Smart Finance Dashboard
        </p>
      </div>

      {/* ===== NAVIGATION ===== */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `
              group relative flex items-center gap-4 px-5 py-3.5 rounded-xl
              transition-all duration-300 overflow-hidden
              ${
                isActive
                  ? "bg-gradient-to-r from-pink-500/20 to-purple-500/10 text-pink-300"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }
              `
            }
          >
            {/* Active Glow Bar */}
            <span
              className={`
                absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-full
                transition-all duration-300
                ${
                  location.pathname === to
                    ? "bg-gradient-to-b from-pink-400 to-purple-500 opacity-100"
                    : "opacity-0 group-hover:opacity-40 bg-white"
                }
              `}
            />

            {/* Icon */}
            <div
              className={`
                text-xl transition-all duration-300
                group-hover:scale-110
                ${
                  location.pathname === to
                    ? "text-pink-400 drop-shadow-[0_0_12px_rgba(236,72,153,0.6)]"
                    : "text-gray-400 group-hover:text-pink-300"
                }
              `}
            >
              <Icon />
            </div>

            {/* Label */}
            <span className="font-medium tracking-wide">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* ===== FOOTER ===== */}
      <div className="px-8 py-5 border-t border-white/10 text-xs text-gray-400 space-y-2">
        <p>
          © {new Date().getFullYear()} ExpenseTracker
        </p>
        <p className="italic text-gray-500">
          Crafted by <span className="text-pink-400">Muhammad Faizan</span>
        </p>
      </div>
    </aside>
  );
}
