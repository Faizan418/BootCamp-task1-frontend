import { motion } from "framer-motion";

export default function TransactionCard({
  title,
  transactions,
  type = "income",
  color = "green",
}) {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-white/10 shadow-xl w-full">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <h3 className={`text-lg sm:text-xl font-bold text-${color}-400`}>
          {title}
        </h3>
        <span className="text-xs sm:text-sm text-slate-400 bg-slate-700/40 px-3 py-1 rounded-full mt-2 sm:mt-0 self-start sm:self-auto">
          Recent 5 transactions
        </span>
      </div>

      {/* Transaction List */}
      {transactions?.length > 0 ? (
        <div className="space-y-3">
          {transactions.map((t, index) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300 shadow-sm overflow-hidden"
            >
              {/* Spark effect */}
              <motion.span
                className="absolute w-1 h-1 bg-white rounded-full top-2 left-2 opacity-50"
                animate={{ x: [0, 20, -10, 0], y: [0, -10, 5, 0], opacity: [0.5, 1, 0.3, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />

              {/* Left: Icon + Info */}
              <div className="flex items-center gap-3 mb-2 sm:mb-0">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className={`w-10 h-10 bg-${color}-500/20 rounded-xl flex items-center justify-center`}
                >
                  <span className={`text-${color}-400 text-xl`}>{t.icon}</span>
                </motion.div>
                <div>
                  <p className="text-white font-medium text-sm sm:text-base">
                    {type === "income" ? t.source : t.category}
                  </p>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    {new Date(t.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Right: Amount */}
              <motion.p
                initial={{ x: -5, opacity: 0.8 }}
                animate={{ x: 0, opacity: 1 }}
                whileHover={{ scale: 1.1, x: 2 }}
                className={`text-sm sm:text-base font-semibold px-3 py-1 rounded-full 
                ${type === "income"
                    ? `bg-gradient-to-r from-green-400 to-emerald-400 text-white shadow-lg`
                    : `bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg`
                }`}
              >
                {type === "income" ? "+" : "-"}${t.amount.toLocaleString()}
              </motion.p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-slate-400 text-sm sm:text-base">
          No {type} recorded yet
        </div>
      )}
    </div>
  );
}
