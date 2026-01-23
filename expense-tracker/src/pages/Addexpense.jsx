import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add, fetchDashboardData } from "../features/dashboardslice";
import { closeModal } from "../features/modalslice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { X, Calendar, Tag, Minus, ArrowDownRight } from "lucide-react";

const ICONS = ["🍕", "🛒", "🚗", "🏠", "💡", "🛡️", "🏥", "🎓", "🎮", "🍿", "🎁", "📱"];

export default function Addexpense() {
  const [source, setSource] = useState(""); // Hum isay "Category" ya "Item" ke liye use karenge
  const [icon, setIcon] = useState("🍕");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount <= 0) return toast.error("Please enter a valid amount");

    const loadingToast = toast.loading("Recording expense...");

    dispatch(
      add({
        show: "expense",
        payload: { category: source, icon, amount, date }, // Expense mein 'category' label hota hai
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Expense logged!", { id: loadingToast });
        dispatch(fetchDashboardData());
        dispatch(closeModal());
      })
      .catch(() => {
        toast.error("Failed to record expense", { id: loadingToast });
      });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="w-full max-w-lg mx-auto"
    >
      <form
        onSubmit={handleSubmit}
        className="relative bg-[#0a0f1e]/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-4 md:p-6 shadow-2xl overflow-hidden"
      >
        {/* Background Gradient Accents (Rose Theme) */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500/0 via-rose-500 to-rose-500/0" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-rose-500/5 blur-[100px] rounded-full" />

        {/* --- HEADER --- */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500">
               <ArrowDownRight className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Expense Entry</h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Financial Outflow Management</p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(closeModal());
            }}
            className="group relative p-3 rounded-xl bg-white/5 text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 transition-all duration-300 border border-white/5 hover:border-rose-500/30 shadow-lg"
          >
            <div className="absolute inset-0 rounded-xl bg-rose-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <X className="relative z-10 w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="grid grid-cols-1 gap-8">
          
          {/* Amount Section */}
          <div className="space-y-3">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Spent Amount</label>
             <div className="relative group overflow-hidden rounded-3xl bg-white/[0.03] border border-white/5 focus-within:border-rose-500/40 transition-all">
                <div className="flex items-center px-6 py-4">
                  <span className="text-2xl font-black text-rose-500 mr-4">Rs.</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-transparent text-3xl font-black text-white outline-none placeholder:text-slate-800 tracking-tighter"
                    required
                  />
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Icons */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Category Icon</label>
              <div className="flex flex-wrap gap-2 p-3 rounded-[1.5rem] bg-white/[0.02] border border-white/5">
                {ICONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setIcon(emoji)}
                    className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all 
                    ${icon === emoji 
                      ? "bg-rose-500 text-white shadow-lg shadow-rose-500/40 scale-110" 
                      : "hover:bg-white/5 opacity-40 hover:opacity-100"}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Fields */}
            <div className="space-y-5">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Expense Detail</label>
                  <div className="relative group">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-rose-500 transition-colors" />
                    <input
                      type="text"
                      placeholder="Dinner, Fuel, Rent..."
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-11 pr-4 py-4 text-sm font-bold text-white outline-none focus:border-rose-500/40 transition-all"
                      required
                    />
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Date</label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-rose-500 transition-colors" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-11 pr-4 py-4 text-sm font-bold text-white outline-none focus:border-rose-500/40 transition-all [color-scheme:dark]"
                      required
                    />
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* --- SUBMIT --- */}
        <div className="mt-12">
          <button
            type="submit"
            className="w-full py-5 rounded-2xl bg-rose-500 text-white font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl shadow-rose-500/20 hover:bg-rose-600 transition-all active:scale-95"
          >
            Record Expense <Minus className="w-4 h-4" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}