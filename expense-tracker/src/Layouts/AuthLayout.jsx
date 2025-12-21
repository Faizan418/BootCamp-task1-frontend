import { Outlet } from "react-router-dom";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", income: 4200, expense: 2400 },
  { month: "Feb", income: 5800, expense: 3200 },
  { month: "Mar", income: 7200, expense: 4100 },
  { month: "Apr", income: 8900, expense: 4800 },
  { month: "May", income: 6700, expense: 3600 },
];

export default function AuthLayout() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-neutral-950 flex items-center justify-center px-4 sm:px-6 lg:px-12">

      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-neutral-950 to-pink-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent" />

      <div className="relative w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10">

        {/* ================= LEFT (AUTH FORM + Brand) ================= */}
        <div className="space-y-10 lg:space-y-14">

          {/* BRAND */}
          <div className="text-center lg:text-left space-y-4 sm:space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Expense
              </span>{" "}
              <span className="text-pink-400">Tracker</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-light max-w-md mx-auto lg:mx-0">
              Smart financial clarity for modern professionals.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm sm:text-base text-gray-400 pt-2 sm:pt-4">
              <FeatureDot text="Real-time analytics" color="bg-green-400" />
              <FeatureDot text="Secure & encrypted" color="bg-blue-400" />
              <FeatureDot text="Cloud synced" color="bg-purple-400" />
            </div>
          </div>

          {/* FORM CARD */}
          <div className="relative  bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
            <div className="absolute -top-6 -left-6 w-24 h-24 sm:w-32 sm:h-32 bg-pink-500/20 blur-3xl rounded-full" />
            <Outlet />
          </div>
        </div>

        {/* ================= RIGHT (DESKTOP CHART + STATS) ================= */}
        <div className="hidden h-full pt-50 lg:flex flex-col gap-6">

          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] h-full flex flex-col justify-between">
            
            {/* HEADER */}
            <div>
              <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-widest">
                Monthly Overview
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1 sm:mt-2">
                May 2025 Report
              </h3>

              {/* CHART */}
              <div className="mt-6 sm:mt-10 h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="incomeGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="expenseGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fb7185" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#fb7185" stopOpacity={0} />
                      </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="2 12" stroke="#334155" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />

                    <Tooltip
                      cursor={{ stroke: "#a855f7", strokeDasharray: "4 6" }}
                      contentStyle={{
                        background: "rgba(2,6,23,0.96)",
                        border: "1px solid rgba(168,85,247,0.45)",
                        borderRadius: "16px",
                      }}
                      formatter={(v, n) => [`$${v.toLocaleString()}`, n === "income" ? "Income" : "Expense"]}
                    />

                    <Area dataKey="income" stroke="#a855f7" strokeWidth={3} fill="url(#incomeGlow)" />
                    <Line dataKey="expense" stroke="#fb7185" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* STATS */}
            <div className="space-y-6 mt-4 sm:mt-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                <Stat title="Income" value="$20,800" color="text-purple-300" />
                <Stat title="Spent" value="$18,100" color="text-rose-300" />
                <Stat title="Saved" value="$2,700" color="text-green-400" />
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-center text-gray-300 italic text-sm sm:text-base">
                  “Managing money has never felt this simple.”
                </p>
                <p className="text-center text-gray-500 text-xs sm:text-sm mt-1">
                  — Verified User
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE BADGE */}
      <div className="lg:hidden fixed bottom-6 left-4 right-4 px-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 text-center">
          <p className="text-white text-sm sm:text-base font-medium">
            Join 20,000+ professionals tracking smarter
          </p>
        </div>
      </div>
    </div>
  );
}

/* ===== SMALL COMPONENTS ===== */
function FeatureDot({ text, color }) {
  return (
    <div className="flex items-center gap-2 text-sm sm:text-base text-gray-300">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span>{text}</span>
    </div>
  );
}

function Stat({ title, value, color }) {
  return (
    <div>
      <p className={`text-xl sm:text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs sm:text-sm text-gray-400 mt-1">{title}</p>
    </div>
  );
}
