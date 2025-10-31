import { Outlet } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0f172a] text-white">
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Expense<span className="text-indigo-400">Pro</span>
            </h1>
            <p className="mt-2 text-gray-400">
              Smart finance tracking for professionals
            </p>
          </div>

          <div className="bg-[#1e293b] border border-gray-700 rounded-2xl p-8 shadow-lg">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Right: Chart */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-[#1e293b] border-l border-gray-700">
        <div className="w-full max-w-3xl p-10">
          <h2 className="text-2xl font-semibold mb-2">Financial Overview</h2>
          <p className="text-gray-400 mb-6">Last 5 months performance</p>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="4 4" stroke="#334155" />
                <XAxis dataKey="month" tick={{ fill: "#cbd5e1" }} />
                <YAxis tick={{ fill: "#cbd5e1" }} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "10px",
                  }}
                  itemStyle={{ color: "#f1f5f9" }}
                />
                <Legend wrapperStyle={{ color: "#f8fafc" }} />
                <Bar dataKey="income" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6 text-center">
            <div>
              <p className="text-sm text-gray-400 uppercase">Total Income</p>
              <p className="text-3xl font-bold text-green-400">$32,800</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 uppercase">Total Expense</p>
              <p className="text-3xl font-bold text-red-400">$18,100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
