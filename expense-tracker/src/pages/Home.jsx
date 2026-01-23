import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import CountUp from "react-countup";
import { FaRupeeSign } from "react-icons/fa6";
import { Plus, Wallet, TrendingUp, TrendingDown, LayoutDashboard, X, PieChart as PieIcon } from "lucide-react";
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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { openModal, closeModal } from "../features/modalslice";
import Addexpense from "./Addexpense";
import Addincome from "./Addincome";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const formatDateKey = (d) => new Date(d).toISOString().slice(0, 10);
const COLORS = ["#10b981", "#fb7185", "#3b82f6", "#a855f7", "#eab308"];

export default function Home() {
  const dispatch = useDispatch();
  const dashboard = useSelector((s) => s.dashboard);
  const modal = useSelector((s) => s.modal);

  const { totalIncome = 0, totalExpense = 0, balance = 0 } = dashboard || {};
  const incomeArr = dashboard?.income || [];
  const expenseArr = dashboard?.expense || [];

  const chartData = useMemo(() => {
    const today = new Date();
    return [...Array(30)].map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (29 - i));
      const key = formatDateKey(d);
      return {
        shortDate: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        income: incomeArr.filter((t) => formatDateKey(t.createdAt || t.date) === key).reduce((s, t) => s + Number(t.amount || 0), 0),
        expense: expenseArr.filter((t) => formatDateKey(t.createdAt || t.date) === key).reduce((s, t) => s + Number(t.amount || 0), 0),
      };
    });
  }, [incomeArr, expenseArr]);

  const categoryData = useMemo(() => {
    const map = {};
    expenseArr.forEach((e) => { map[e.category] = (map[e.category] || 0) + Number(e.amount || 0); });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);
  }, [expenseArr]);

  const max = Math.max(totalIncome, totalExpense, 1);
  const radialData = [
    { name: "Income", value: totalIncome, fill: "#10b981" },
    { name: "Expense", value: totalExpense, fill: "#fb7185" },
  ];

  return (
    <div className="space-y-10 pb-20 ">
      <Toaster position="top-right" toastOptions={{ style: { zIndex: 99999 } }} />

      {/* ===== PREMIUM MODAL ===== */}
      <AnimatePresence>
        {modal.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center h-[100%] justify-center backdrop-blur-md bg-black/70"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative w-full h-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              
              <div className="p-2 custom-scrollbar max-h-[100vh] overflow-y-auto">
                {modal.type === "income" ? <Addincome /> : <Addexpense />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== HEADER & QUICK ACTIONS ===== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <LayoutDashboard className="text-indigo-500" /> Dashboard
          </h1>
          <p className="text-slate-500 font-medium mt-1">Welcome back! Here's your financial pulse.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(openModal("income"))}
            className="flex-1 md:flex-none px-6 py-3.5 rounded-2xl bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" /> Add Income
          </button>
          <button
            onClick={() => dispatch(openModal("expense"))}
            className="flex-1 md:flex-none px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5 text-rose-500" /> Add Expense
          </button>
        </div>
      </div>

      {/* ===== KPI CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Revenue", value: totalIncome, color: "text-emerald-400", icon: TrendingUp, bg: "bg-emerald-500/10" },
          { label: "Total Spending", value: totalExpense, color: "text-rose-400", icon: TrendingDown, bg: "bg-rose-500/10" },
          { label: "Net Balance", value: balance, color: "text-indigo-400", icon: Wallet, bg: "bg-indigo-500/10" },
        ].map((k) => (
          <motion.div whileHover={{ y: -5 }} key={k.label} className="relative overflow-hidden rounded-[2rem] p-7 bg-white/[0.03] border border-white/10 shadow-xl">
            <div className={`absolute -right-4 -top-4 w-24 h-24 blur-3xl rounded-full ${k.bg.replace('/10', '/20')}`} />
            <div className="flex items-center gap-4 mb-4">
               <div className={`p-3 rounded-xl ${k.bg} ${k.color}`}> <k.icon className="w-6 h-6" /> </div>
               <p className="text-slate-500 font-black text-xs uppercase tracking-widest">{k.label}</p>
            </div>
            <p className={`text-3xl font-black flex items-center gap-1 ${k.color}`}>
              <FaRupeeSign className="text-xl opacity-50" />
              <CountUp end={k.value} duration={2} separator="," />
            </p>
          </motion.div>
        ))}
      </div>

      {/* ===== CHARTS SECTION ===== */}
      <div className="grid xl:grid-cols-3 gap-8">
        {/* LINE TREND */}
        <div className="xl:col-span-2 bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-white font-black uppercase tracking-widest text-sm">30-Day Cashflow</h3>
            <div className="flex gap-4 text-[10px] font-black uppercase tracking-tighter">
              <span className="flex items-center gap-1 text-emerald-400"><div className="w-2 h-2 rounded-full bg-emerald-400"/> Income</span>
              <span className="flex items-center gap-1 text-rose-400"><div className="w-2 h-2 rounded-full bg-rose-400"/> Expense</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="incomeG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="shortDate" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 10, fontWeight: 700 }} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #ffffff10', borderRadius: '16px' }} />
                <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} fill="url(#incomeG)" />
                <Area type="monotone" dataKey="expense" stroke="#fb7185" strokeWidth={3} fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RADIAL BALANCE */}
        <div className="bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
          <h3 className="text-white font-black uppercase tracking-widest text-sm mb-4">Budget Ratio</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <RadialBarChart data={radialData} innerRadius="65%" outerRadius="100%" startAngle={180} endAngle={0}>
                <PolarAngleAxis type="number" domain={[0, max]} tick={false} />
                <RadialBar dataKey="value" cornerRadius={20} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center -mt-20">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Available</p>
             <p className="text-3xl font-black text-white">Rs.{balance.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* ===== CATEGORY & TRANSACTIONS ===== */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5">
          <div className="flex items-center gap-2 mb-8 text-white">
            <PieIcon className="w-5 h-5 text-indigo-400" />
            <h3 className="font-black uppercase tracking-widest text-sm">Top Expenses</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={categoryData} innerRadius={60} outerRadius={85} dataKey="value" paddingAngle={5}>
                  {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {categoryData.slice(0, 3).map((c, i) => (
              <div key={i} className="flex justify-between text-xs font-bold">
                <span className="text-slate-500 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} /> {c.name}
                </span>
                <span className="text-white">Rs.{c.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
          <TransactionCard title="Recent Outflow" transactions={expenseArr} type="expense" />
          <TransactionCard title="Recent Inflow" transactions={incomeArr} type="income" />
        </div>
      </div>
    </div>
  );
}