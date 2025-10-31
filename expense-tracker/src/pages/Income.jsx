import { useDispatch, useSelector } from "react-redux";
import { Download, Trash2 } from "lucide-react";
import {
  handleDownloadExcel,
  deleteIncomeExpense,
  fetchDashboardData,
} from "../features/dashboardslice";

export default function Income() {
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.dashboard);
  const loading = dashboard?.loading;
  const error = dashboard?.error;

  if (!dashboard) return null;

  const totalIncome = dashboard.totalIncome || 0;
  const incomes = dashboard.income || [];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this income?")) {
      dispatch(deleteIncomeExpense({ id, show: "income" }))
        .unwrap()
        .then(() => {
          dispatch(fetchDashboardData());
        })
        .catch((err) => {
          console.error("Error deleting income:", err);
        });
    }
  };

  return (
    <div className="space-y-8 text-gray-900">
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Income Overview
          </h1>
          <p className="mt-1 text-gray-500">
            Your earning summary for the last 30 days
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none rounded-2xl bg-white border border-gray-200 px-5 py-4 text-right shadow-sm">
            <p className="text-sm text-gray-500">Total Income (This Month)</p>
            <p className="text-3xl font-extrabold text-emerald-600 mt-1">
              ${totalIncome.toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => handleDownloadExcel(incomes, "income")}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-3 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 w-full sm:w-auto"
          >
            <Download className="w-5 h-5" />
            Download Excel
          </button>
        </div>
      </div>

      {loading && (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-600 text-center shadow-sm">
          Loading...
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600 text-center shadow-sm">
          {String(error)}
        </div>
      )}

      <div className="rounded-2xl bg-white border border-gray-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
            💰 Recent Incomes
          </h2>
          <span className="text-sm text-gray-500 text-right sm:text-left">
            {incomes?.length} items
          </span>
        </div>

        <ul className="divide-y divide-gray-200">
          {incomes?.length === 0 ? (
            <li className="text-gray-500 py-6 text-center">
              No income records found.
            </li>
          ) : (
            incomes.map((t) => (
              <li
                key={t._id || Math.random()}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 hover:bg-gray-50 transition-colors rounded-xl px-3"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <p className="font-medium text-gray-800">{t.source}</p>
                    <p className="text-xs text-gray-500">
                      {t.createdAt
                        ? new Date(t.createdAt).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  <p className="font-semibold text-emerald-600 text-lg">
                    +${t.amount.toLocaleString()}
                  </p>

                  <button
                    onClick={() => handleDelete(t._id)}
                    className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-600 hover:text-emerald-700 transition-all active:scale-95"
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
