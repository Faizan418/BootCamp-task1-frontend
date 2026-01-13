import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import CountUp from "react-countup";
import { FaRupeeSign } from "react-icons/fa6";
import TransactionCard from "../components/Transactioncard";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
  PolarAngleAxis,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { openModal, closeModal } from "../features/modalslice";
import Addexpense from "./Addexpense";
import Addincome from "./Addincome";
import { Toaster } from "react-hot-toast";
 <Toaster
        position="top-right"
        toastOptions={{
          style: {
            zIndex: 99999, // ✅ modal ke upar
          },
        }}
      />

/* ===== HELPERS ===== */
const formatDateKey = (d) => new Date(d).toISOString().slice(0, 10);

/* ===== COLORS ===== */
const COLORS = ["#22c55e", "#fb7185", "#38bdf8", "#a78bfa", "#facc15"];

export default function Home() {
  const dispatch = useDispatch();
  const dashboard = useSelector((s) => s.dashboard);
  const modal = useSelector((s) => s.modal);

  const { totalIncome = 0, totalExpense = 0, balance = 0 } = dashboard || {};
  const incomeArr = dashboard?.income || [];
  const expenseArr = dashboard?.expense || [];

  /* ===== 30 DAY TREND ===== */
  const chartData = useMemo(() => {
    const today = new Date();
    return [...Array(30)].map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (29 - i));
      const key = formatDateKey(d);

      return {
        date: key,
        shortDate: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        income: incomeArr
          .filter((t) => formatDateKey(t.createdAt || t.date) === key)
          .reduce((s, t) => s + Number(t.amount || 0), 0),
        expense: expenseArr
          .filter((t) => formatDateKey(t.createdAt || t.date) === key)
          .reduce((s, t) => s + Number(t.amount || 0), 0),
      };
    });
  }, [incomeArr, expenseArr]);

  /* ===== CATEGORY DONUT ===== */
  const categoryData = useMemo(() => {
    const map = {};
    expenseArr.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + Number(e.amount || 0);
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [expenseArr]);

  /* ===== RADIAL ===== */
  const max = Math.max(totalIncome, totalExpense, 1);
  const radialData = [
    { name: "Income", value: totalIncome, fill: "#22c55e" },
    { name: "Expense", value: totalExpense, fill: "#fb7185" },
  ];

  return (
    <div className="space-y-10">
       <Toaster
        position="top-right"
        toastOptions={{
          style: {
            zIndex: 99999, // ✅ modal ke upar
          },
        }}
      />

      {/* ===== MODAL ===== */}
      {modal.isOpen && (
  <div
    className="
      fixed inset-0 z-50  h-full
      backdrop-blur-sm
      flex items-center justify-center
      px-4
    "
  >
    
      {/* Close Button */}
      <button
        onClick={() => dispatch(closeModal())}
        className="
          absolute top-3 right-3
          w-8 h-8
          rounded-full
          bg-white/10
          text-white/70
          flex items-center justify-center
          hover:bg-white/20 hover:text-white
          transition
        "
      >
        ✕
      </button>

      {modal.type === "income" && <Addincome />}
      {modal.type === "expense" && <Addexpense />}
    </div>

)}


      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-4xl font-black text-white">Dashboard Overview</h1>
        <p className="text-gray-400">Smart financial insights at a glance</p>
      </div>

      {/* ===== ACTIONS ===== */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => dispatch(openModal("income"))}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-lg">
          + Add Income
        </button>
        <button
          onClick={() => dispatch(openModal("expense"))}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-lg">
          + Add Expense
        </button>
      </div>

      {/* ===== KPI ===== */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: "Total Income", value: totalIncome, color: "text-green-400" },
          { label: "Total Expense", value: totalExpense, color: "text-rose-400" },
          { label: "Balance", value: balance, color: "text-cyan-400" },
        ].map((k) => (
          <div key={k.label} className="rounded-3xl p-6 bg-white/5 border border-white/10">
            <p className="text-gray-400 text-sm">{k.label}</p>
            <p className={`text-3xl font-extrabold flex items-center gap-1 ${k.color}`}>
              <FaRupeeSign />
              <CountUp end={k.value} duration={1.4} separator="," />
            </p>
          </div>
        ))}
      </div>

      {/* ===== CHARTS ===== */}
      <div className="grid xl:grid-cols-3 gap-8">

        {/* RADIAL */}
        <div className="xl:col-span-1 bg-white/5 p-6 rounded-3xl border border-white/10">
          <h3 className="text-center text-white font-semibold mb-4">Income vs Expense</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <RadialBarChart data={radialData} innerRadius="60%" outerRadius="100%" startAngle={210} endAngle={-30}>
                <PolarAngleAxis type="number" domain={[0, max]} tick={false} />
                <RadialBar dataKey="value" cornerRadius={15} />
                <text x="50%" y="50%" textAnchor="middle" fill="white" fontSize="22" fontWeight="700">
                  Rs.{balance.toLocaleString()}
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LINE + AREA */}
        <div className="xl:col-span-2 bg-white/5 p-6 rounded-3xl border border-white/10">
          <h3 className="text-center text-white font-semibold mb-4">30-Day Trend</h3>
          <div className="h-80">
            <ResponsiveContainer>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="incomeG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 10" stroke="#334155" />
                <XAxis dataKey="shortDate" tick={{ fill: "#9ca3af", fontSize: 11 }} />
                <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="income" stroke="#22c55e" fill="url(#incomeG)" />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#fb7185"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#fb7185" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ===== DONUT ===== */}
      <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
        <h3 className="text-center text-white font-semibold mb-4">Expense Categories</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={categoryData} innerRadius={70} outerRadius={110} dataKey="value">
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== TRANSACTIONS ===== */}
      <div className="grid md:grid-cols-2 gap-6">
        <TransactionCard title="Recent Expenses" transactions={expenseArr.slice(0, 5)} type="expense" />
        <TransactionCard title="Recent Income" transactions={incomeArr.slice(0, 5)} type="income" />
      </div>

    </div>
  );
}
