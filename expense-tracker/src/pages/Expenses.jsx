import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Download, Trash2 } from "lucide-react";
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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      dispatch(deleteIncomeExpense({ id, show: "expense" }))
        .unwrap()
        .then(() => dispatch(fetchDashboardData()))
        .catch((err) => console.error("Error deleting expense:", err));
    }
  };

  return (
    <div className="space-y-8 text-gray-800 max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expense Overview</h1>
          <p className="mt-1 text-gray-500">
            Your spending summary for the last 30 days
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none rounded-2xl bg-white border border-gray-200 px-6 py-4 shadow-sm text-right">
            <p className="text-sm text-gray-500">Total Expense (This Month)</p>
            <p className="text-3xl font-extrabold text-rose-500 mt-1">
              ${totalExpense.toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => handleDownloadExcel(expenses, "expense")}
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 
                       text-white font-medium px-5 py-3 rounded-xl transition-all 
                       shadow-sm active:scale-95 w-full sm:w-auto"
          >
            <Download className="w-5 h-5" />
            Download Excel
          </button>
        </div>
      </div>

      {loading && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-600 text-center">
          Loading...
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-rose-700 text-center">
          {String(error)}
        </div>
      )}

      <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            💸 Recent Expenses
          </h2>
          <span className="text-sm text-gray-500">
            {expenses?.length} items
          </span>
        </div>

        <ul className="divide-y divide-gray-200">
          {expenses?.length === 0 ? (
            <li className="text-gray-500 py-6 text-center">
              No expense records found.
            </li>
          ) : (
            expenses.map((t) => (
              <li
                key={t._id || Math.random()}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 hover:bg-gray-50 rounded-xl px-3 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <p className="font-medium text-gray-800">{t.category}</p>
                    <p className="text-xs text-gray-500">
                      {t.createdAt
                        ? new Date(t.createdAt).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  <p className="font-semibold text-rose-500 text-lg">
                    -${t.amount.toLocaleString()}
                  </p>

                  <button
                    onClick={() => handleDelete(t._id)}
                    className="p-2 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-600 
                               border border-rose-300 transition-all active:scale-95"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
