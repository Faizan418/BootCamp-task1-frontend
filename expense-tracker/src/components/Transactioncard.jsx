import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, TrendingUp, TrendingDown, ArrowRight, Wallet, History } from "lucide-react";

export default function TransactionCard({ title, transactions = [], type }) {
  const isIncome = type === "income";
  const total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
  const [search, setSearch] = useState("");

  // Filter logic
  const filteredTransactions = transactions
    .filter((t) => {
      const text = isIncome ? t.source : t.category;
      return text?.toLowerCase().includes(search.toLowerCase());
    })
    .slice(0, 5); // Sirf top 5 dikhayenge dashboard par

  return (
    <div className="group relative overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/10 p-6 shadow-2xl backdrop-blur-md transition-all hover:bg-white/[0.04]">
      
      {/* Background Decorative Glow */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 blur-[60px] rounded-full opacity-20 transition-colors ${isIncome ? 'bg-emerald-500' : 'bg-rose-500'}`} />

      {/* --- HEADER --- */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${isIncome ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
            <History className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-black text-white tracking-tight">{title}</h3>
        </div>
        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg border ${
          isIncome ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border-rose-500/20 text-rose-400"
        }`}>
          {type}
        </span>
      </div>
#050816
      {/* --- TOTAL STAT CARD --- */}
      <div className={`relative overflow-hidden rounded-3xl p-6 mb-6 transition-all ${
        isIncome ? "bg-gradient-to-br from-emerald-500/20 to-emerald-500/5" : "bg-gradient-to-br from-rose-500/20 to-rose-500/5"
      }`}>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aggregate {title}</p>
            <p className={`text-3xl font-black mt-1 ${isIncome ? "text-emerald-400" : "text-rose-400"}`}>
              {isIncome ? "+" : "-"}${total.toLocaleString()}
            </p>
          </div>
          <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${isIncome ? 'text-emerald-400' : 'text-rose-400'}`}>
             {isIncome ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
          </div>
        </div>
      </div>

      {/* --- SEARCH BAR --- */}
      <div className="relative mb-6 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-white transition-colors" />
        <input
          type="text"
          placeholder="Quick find..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl bg-white/5 border border-white/5 pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:bg-white/10 focus:border-white/20 transition-all placeholder:text-slate-600"
        />
      </div>

      {/* --- TRANSACTION LIST --- */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((t, i) => (
              <motion.div
                key={t._id || i}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="group/item flex items-center justify-between rounded-2xl p-3 border border-transparent hover:border-white/5 hover:bg-white/[0.03] transition-all cursor-default"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-inner bg-slate-900 border border-white/5`}>
                    {t.icon || (isIncome ? "💰" : "💸")}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white group-hover/item:text-indigo-400 transition-colors">
                      {isIncome ? t.source : t.category}
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">
                      {new Date(t.createdAt).toLocaleDateString("en-US", { day: "2-digit", month: "short" })}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-sm font-black ${isIncome ? "text-emerald-400" : "text-rose-400"}`}>
                    {isIncome ? "+" : "-"}${Number(t.amount).toLocaleString()}
                  </p>
                  <ArrowRight className="w-3 h-3 text-slate-700 ml-auto mt-1 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-6">
               <p className="text-xs font-bold text-slate-600 italic">No matches found</p>
            </div>
          )}
        </AnimatePresence>
      </div>


    </div>
  );
}