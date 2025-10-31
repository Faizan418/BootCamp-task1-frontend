import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add, fetchDashboardData } from "../features/dashboardslice";
import { closeModal } from "../features/modalslice";

const ICONS = [
  "🍔",
  "🏠",
  "🚗",
  "🎁",
  "☕",
  "🛒",
  "🚌",
  "💊",
  "🎬",
  "💸",
  "👔",
  "📱",
  "🛍️",
  "⚡",
  "🥗",
  "🧾",
];

export default function Addexpense() {
  const [category, setCategory] = useState("");
  const [icon, setIcon] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const dispatch = useDispatch();

  const handleIconClick = (emoji) => setIcon(emoji);

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = { category, icon, amount, date };
    dispatch(add({ show: "expense", payload: obj }))
      .unwrap()
      .then(() => {
        dispatch(fetchDashboardData());
        dispatch(closeModal());
      })
      .catch((err) => console.error("Add expense failed:", err));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Add Expense
      </h2>

      <div>
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Category
        </label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Food, Rent, Fuel..."
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl 
                     text-gray-800 placeholder-gray-400 focus:outline-none 
                     focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Choose Icon
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {ICONS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => handleIconClick(emoji)}
              className={`text-2xl w-10 h-10 rounded-lg border transition-all 
                ${
                  icon === emoji
                    ? "bg-blue-100 border-blue-400 scale-105"
                    : "bg-white border-gray-300 hover:bg-blue-50"
                }`}
            >
              {emoji}
            </button>
          ))}
        </div>
        <input
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="💸"
          maxLength={1}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-2xl
                     text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-blue-400 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Amount
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          type="number"
          min="0"
          step="0.01"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl 
                     text-gray-800 placeholder-gray-400 focus:outline-none 
                     focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Date
        </label>
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          max={new Date().toISOString().slice(0, 10)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl 
                     text-gray-800 focus:outline-none focus:ring-2 
                     focus:ring-blue-400 focus:border-transparent transition-all"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 mt-2 rounded-xl font-semibold text-white 
                   bg-blue-500 hover:bg-blue-600 transition-all shadow-sm"
      >
        Add Expense
      </button>
    </form>
  );
}
