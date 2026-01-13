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
    <div className="min-h-screen relative bg-neutral-950 overflow-hidden border p-5">

      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-neutral-950 to-pink-900/20" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/20 blur-[140px] rounded-full" />

      <div className="relative z-10 min-h-screen grid lg:grid-cols-2">

        {/* ================= LEFT (FORM AREA) ================= */}
        <div className="flex items-center justify-center px-6 sm:px-10">
          <div className="w-full max-w-md">

            {/* BRAND */}
            <div className="mb-10 ml-3 text-left">
              <h1 className="text-5xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                  Expense
                </span>{" "}
                <span className="text-pink-400">Tracker</span>
              </h1>
              <p className="mt-3 text-gray-400 text-sm">
                Smart financial clarity for modern professionals
              </p>
            </div>

            {/* FORM CARD */}
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
              <Outlet />
            </div>
          </div>
        </div>

        {/* ================= RIGHT (VISUAL / INFO) ================= */}
        <div className="hidden lg:flex items-center justify-center px-12  py-15">
          <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 h-full py-10 mt-20 rounded-3xl p-8 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">

            <p className="text-xs uppercase tracking-widest text-gray-400">
              Monthly Overview
            </p>
            <h3 className="text-2xl font-bold text-white mt-2">
              Financial Insights
            </h3>

            {/* CHART */}
            <div className="mt-8 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="incomeGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 10" stroke="#334155" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />

                  <Tooltip
                    contentStyle={{
                      background: "rgba(2,6,23,0.95)",
                      border: "1px solid rgba(168,85,247,0.4)",
                      borderRadius: "14px",
                    }}
                  />

                  <Area
                    dataKey="income"
                    stroke="#a855f7"
                    strokeWidth={3}
                    fill="url(#incomeGlow)"
                  />
                  <Line
                    dataKey="expense"
                    stroke="#fb7185"
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-4 mt-8 text-center">
              <Stat title="Income" value="$20.8k" color="text-purple-300" />
              <Stat title="Spent" value="$18.1k" color="text-rose-300" />
              <Stat title="Saved" value="$2.7k" color="text-green-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== SMALL COMPONENT ===== */
function Stat({ title, value, color }) {
  return (
    <div>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-gray-400 mt-1">{title}</p>
    </div>
  );
}
