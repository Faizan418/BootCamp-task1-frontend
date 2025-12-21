import { Outlet } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", income: 4200, expense: 2400 },
  { month: "Feb", income: 5800, expense: 3200 },
  { month: "Mar", income: 7200, expense: 4100 },
  { month: "Apr", income: 8900, expense: 4800 },
  { month: "May", income: 6700, expense: 3600 },
];

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 overflow-hidden relative">
      {/* Ultra Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-neutral-950 to-pink-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-pink-800/20 via-transparent to-transparent" />

      <div className="relative w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center z-10">
        {/* Left — Branding & Form */}
        <div className="flex flex-col justify-center space-y-12">
          {/* Logo & Tagline */}
          <div className="text-center lg:text-left">
            <h1 className="text-6xl lg:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Expense
              </span>
              <span className="text-pink-400">Tracker</span>
            </h1>
            <p className="mt-6 text-xl lg:text-2xl text-gray-300 font-light max-w-lg mx-auto lg:mx-0">
              The only expense tracker you'll ever need.
            </p>
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Real-time sync</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75" />
                <span>Bank-grade security</span>
              </div>
            </div>
          </div>

          {/* Form Card — Ultimate Glass */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 lg:p-12 shadow-2xl">
            <Outlet />
          </div>
        </div>

        {/* Right — Preview Panel (Only Desktop) */}
        <div className="hidden lg:block">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl h-full flex flex-col justify-between">
            {/* Top Stats */}
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-widest">Monthly Overview</p>
              <h3 className="text-4xl font-bold text-white mt-2">May 2025 Report</h3>

              <div className="mt-10 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 8" stroke="#374151" />
                    <XAxis dataKey="month" tick={{ fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                    <Tooltip
                      contentStyle={{ background: "#0f172a", border: "1px solid #4c1d95", borderRadius: "16px" }}
                      labelStyle={{ color: "#e9d5ff" }}
                      formatter={(value) => `$${Number(value).toLocaleString()}`}
                    />
                    <Bar dataKey="income" fill="#c084fc" radius={[12, 12, 0, 0]} />
                    <Bar dataKey="expense" fill="#fb7185" radius={[12, 12, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="space-y-8">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-purple-300">$20,800</p>
                  <p className="text-sm text-gray-400 mt-1">Income</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-rose-300">$18,100</p>
                  <p className="text-sm text-gray-400 mt-1">Spent</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
                  <p className="text-3xl font-bold text-transparent">$2,700</p>
                  <p className="text-sm text-gray-400 mt-1">Saved</p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-center text-gray-300 italic text-lg">
                  “I saved <span className="text-green-400 font-bold">$5,800</span> last quarter thanks to ExpensePro.”
                </p>
                <p className="text-center text-gray-500 text-sm mt-3">— Alex Rivera, Product Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Badge */}
      <div className="lg:hidden fixed bottom-6 left-0 right-0 p-6 pointer-events-none">
        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 text-center">
          <p className="text-white font-medium">Join 20,000+ professionals already tracking smarter</p>
        </div>
      </div>
    </div>
  );
}