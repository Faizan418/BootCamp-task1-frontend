import { useDispatch, useSelector } from "react-redux";
import { Download, Trash2 } from "lucide-react";
import CountUp from "react-countup";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { motion } from "framer-motion";
import {
  handleDownloadExcel,
  deleteIncomeExpense,
  fetchDashboardData,
} from "../features/dashboardslice";

export default function Expenses() {
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboard);

  const loading = dashboard?.loading;
  const error = dashboard?.error;

  if (!dashboard) return null;

  const totalExpense = dashboard.totalExpense || 0;
  const expenses = dashboard.expense || [];

  const categories = [...new Set(expenses.map((t) => t.category || "Other"))];
  const colors = ["#fb7185", "#f43f5e", "#fca5a5", "#f87171", "#f97316"];

  const chartData = categories.map((cat, i) => ({
    name: cat,
    value: expenses
      .filter((t) => (t.category || "Other") === cat)
      .reduce((acc, curr) => acc + Number(curr.amount), 0),
    fill: colors[i % colors.length],
  }));

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      dispatch(deleteIncomeExpense({ id, show: "expense" }))
        .unwrap()
        .then(() => dispatch(fetchDashboardData()))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="space-y-10 text-white">

      {/* HEADER + KPI */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">Expense Dashboard</h1>
          <p className="mt-1 text-gray-400">
            Your spending & category distribution for the last 30 days
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-5 text-right shadow-lg hover:shadow-rose-500/20 transition">
            <p className="text-sm text-gray-300">Total Expense</p>
            <p className="text-3xl sm:text-4xl font-extrabold text-rose-400 mt-1">
              <CountUp end={totalExpense} duration={1.5} separator="," prefix="$" />
            </p>
          </div>

          <button
            onClick={() => handleDownloadExcel(expenses, "expense")}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-rose-500/40 transition-all active:scale-95 w-full sm:w-auto"
          >
            <Download className="w-5 h-5" />
            Download Excel
          </button>
        </div>
      </div>

      {/* LOADING / ERROR */}
      {loading && (
        <div className="rounded-xl border border-slate-700/60 bg-white/5 backdrop-blur-xl px-4 py-3 text-gray-300 text-center shadow-inner">
          Loading...
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-300 text-center shadow-inner">
          {String(error)}
        </div>
      )}

      {/* CATEGORY DONUT CHART */}
      <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-xl flex flex-col lg:flex-row items-center gap-6 transition hover:shadow-rose-500/20">
        <div className="w-full lg:w-1/2 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#020617",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "white",
                }}
                formatter={(value) => [`$${value.toLocaleString()}`, "Amount"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-2">
          <h3 className="text-xl font-semibold text-white text-center lg:text-left">
            Category-wise Expenses
          </h3>
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {chartData.map((c, i) => (
              <div
                key={c.name}
                className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-xl shadow hover:shadow-rose-500/30 transition-all"
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: c.fill }}
                ></span>
                <span className="text-gray-300 text-sm">{c.name}</span>
                <span className="text-rose-400 font-semibold text-sm">
                  ${c.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT EXPENSES */}
      <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 sm:p-6 shadow-xl transition hover:shadow-rose-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            💸 Recent Expenses
          </h2>
          <span className="text-sm text-gray-300 text-right sm:text-left">
            {expenses?.length} items
          </span>
        </div>

        <ul className="divide-y divide-white/10">
          {expenses?.length === 0 ? (
            <li className="text-gray-400 py-8 text-center">
              No expense records found.
            </li>
          ) : (
            expenses.map((t, index) => (
              <motion.li
                key={t._id || Math.random()}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 px-3 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-rose-500/20">
                    <span className="text-rose-400 text-2xl">{t.icon}</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{t.category}</p>
                    <p className="text-xs text-gray-400">
                      {t.createdAt
                        ? new Date(t.createdAt).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  <motion.p
                    initial={{ scale: 0.95, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    className="font-semibold text-rose-400 text-lg bg-rose-500/10 px-3 py-1 rounded-full shadow-sm"
                  >
                    -${t.amount.toLocaleString()}
                  </motion.p>

                  <motion.button
                    onClick={() => handleDelete(t._id)}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-400/30 text-rose-300 hover:text-rose-200 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
