import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import TransactionCard from "../components/Transactioncard";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Tooltip as RadialBarTooltip,
  PolarAngleAxis,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { openModal, closeModal } from "../features/modalslice";
import Addexpense from "./Addexpense";
import Addincome from "./Addincome";

function formatDateKey(d) {
  const dt = new Date(d);
  const yyyy = dt.getFullYear();
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

const COLORS = {
  income: "#16a34a",
  expense: "#e11d48",
  accent: "#3b82f6",
};

const Home = () => {
  const dispatch = useDispatch();
  const dashboard = useSelector((s) => s.dashboard);
  const modal = useSelector((s) => s.modal);

  const { totalIncome = 0, totalExpense = 0, balance = 0 } = dashboard || {};
  const incomeArr = dashboard?.income || [];
  const expenseArr = dashboard?.expense || [];

  const chartData = useMemo(() => {
    const today = new Date();
    const dateKeys = [];

    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      dateKeys.push(formatDateKey(d));
    }

    const byDate = Object.fromEntries(
      dateKeys.map((k) => [
        k,
        {
          date: k,
          income: 0,
          expense: 0,
          shortDate: new Date(k).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        },
      ])
    );

    for (const t of incomeArr) {
      const k = formatDateKey(t.createdAt || t.date || new Date());
      if (byDate[k]) byDate[k].income += Number(t.amount || 0);
    }

    for (const t of expenseArr) {
      const k = formatDateKey(t.createdAt || t.date || new Date());
      if (byDate[k]) byDate[k].expense += Number(t.amount || 0);
    }

    return dateKeys.map((k) => byDate[k]);
  }, [incomeArr, expenseArr]);

  const max = Math.max(totalIncome, totalExpense, 1);
  const radialData = [
    { name: "Income", value: totalIncome, fill: COLORS.income },
    { name: "Expense", value: totalExpense, fill: COLORS.expense },
  ];

  const recentExpenses = expenseArr
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const recentIncome = incomeArr
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#f9fafb] p-6 sm:p-8 lg:p-10 space-y-8 text-gray-800">
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg transition-colors"
              onClick={() => dispatch(closeModal())}
            >
              ✕
            </button>
            {modal.type === "expense" && <Addexpense />}
            {modal.type === "income" && <Addincome />}
          </div>
        </div>
      )}

      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-900">
          Financial Dashboard
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Track your income and expenses over the last 30 days
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => dispatch(openModal("income"))}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md w-full sm:w-auto"
        >
          + Add Income
        </button>
        <button
          onClick={() => dispatch(openModal("expense"))}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md w-full sm:w-auto"
        >
          + Add Expense
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: "Total Income", value: totalIncome, color: "green" },
          { label: "Total Expense", value: totalExpense, color: "rose" },
          { label: "Balance", value: balance, color: "blue" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col items-start"
          >
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              {item.label}
            </h3>
            <p className={`text-3xl font-bold text-${item.color}-600`}>
              ${item.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Income vs Expense
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="40%"
                outerRadius="90%"
                data={radialData}
                startAngle={180}
                endAngle={0}
              >
                <PolarAngleAxis type="number" domain={[0, max]} tick={false} />
                <RadialBar
                  minAngle={15}
                  background
                  clockWise
                  dataKey="value"
                  cornerRadius={8}
                />
                <RadialBarTooltip
                  formatter={(value) => [
                    `$${value.toLocaleString()}`,
                    "Amount",
                  ]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    color: "#111827",
                  }}
                />
                <text
                  x="50%"
                  y="45%"
                  textAnchor="middle"
                  fill="#111827"
                  fontSize="18"
                  fontWeight="bold"
                >
                  ${balance.toLocaleString()}
                </text>
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  fill="#6b7280"
                  fontSize="13"
                >
                  Balance
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            30-Day Trend
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="shortDate" stroke="#9ca3af" fontSize={11} />
                <YAxis stroke="#9ca3af" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    color: "#111827",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#16a34a"
                  strokeWidth={2}
                  dot={{ fill: "#16a34a" }}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#e11d48"
                  strokeWidth={2}
                  dot={{ fill: "#e11d48" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TransactionCard
          title="Recent Expenses"
          transactions={recentExpenses}
          type="expense"
          color="rose"
        />
        <TransactionCard
          title="Recent Income"
          transactions={recentIncome}
          type="income"
          color="green"
        />
      </div>
    </div>
  );
};

export default Home;
