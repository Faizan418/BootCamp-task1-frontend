import { motion } from "framer-motion";

export default function TransactionCard({ title, transactions = [], type }) {
  const isIncome = type === "income";

  const total = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="relative rounded-3xl p-6 bg-gradient-to-br from-[#0b1220] to-[#050914] border border-white/10 shadow-2xl overflow-hidden">

      {/* BACK GLOW */}
      <div
        className={`absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-25
        ${isIncome ? "bg-emerald-500" : "bg-rose-500"}`}
      />

      {/* ===== TOP : INSIGHT BAR ===== */}
      <div className="relative z-10 mb-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Total</p>
            <p
              className={`text-3xl font-extrabold
              ${isIncome ? "text-emerald-400" : "text-rose-400"}`}
            >
              {isIncome ? "+" : "-"}${total.toLocaleString()}
            </p>
          </div>

          {/* PULSE BAR */}
          <div className="flex gap-1 items-end h-14">
            {transactions.slice(0, 10).map((t, i) => (
              <motion.span
                key={t._id}
                initial={{ height: 0 }}
                animate={{ height: `${Math.min(t.amount / total * 100 + 20, 100)}%` }}
                transition={{ delay: i * 0.05 }}
                className={`w-2 rounded-full
                ${isIncome ? "bg-emerald-400/70" : "bg-rose-400/70"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ===== DIVIDER ===== */}
      <div className="h-px bg-white/10 mb-5" />

      {/* ===== BOTTOM : TRANSACTIONS ===== */}
      <div className="space-y-4 relative z-10">
        {transactions.length > 0 ? (
          transactions.map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center
                  ${isIncome
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-rose-500/20 text-rose-400"}`}
                >
                  {t.icon || (isIncome ? "💰" : "💸")}
                </div>

                <div>
                  <p className="text-white font-medium text-sm">
                    {isIncome ? t.source : t.category}
                  </p>
                  <p className="text-xs text-slate-400">
                    {new Date(t.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
              </div>

              <span
                className={`font-semibold text-sm
                ${isIncome ? "text-emerald-300" : "text-rose-300"}`}
              >
                {isIncome ? "+" : "-"}${t.amount}
              </span>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-slate-400 py-8">
            No transactions yet
          </div>
        )}
      </div>
    </div>
  );
}
