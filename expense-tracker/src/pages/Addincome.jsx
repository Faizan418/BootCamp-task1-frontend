import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add, fetchDashboardData } from "../features/dashboardslice";
import { closeModal } from "../features/modalslice";
import toast from "react-hot-toast";

const ICONS = ["💼","🏦","🎯","📈","🧾","💸","🏆","🎉","🌟","🚀","👔","🎶"];

export default function Addincome() {
  const [source, setSource] = useState("");
  const [icon, setIcon] = useState("💼");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (amount <= 0) {
      return toast.error("Amount must be greater than 0");
    }

    const loadingToast = toast.loading("Adding income...");

    dispatch(
      add({
        show: "income",
        payload: { source, icon, amount, date },
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Income added successfully", { id: loadingToast });
        dispatch(fetchDashboardData());
        dispatch(closeModal());
      })
      .catch(() => {
        toast.error("Failed to add income", { id: loadingToast });
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto p-5 rounded-2xl
      bg-[#141625] border border-white/10 shadow-2xl"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-green-400 font-semibold text-lg">
          New Income
        </h2>
        <button
          type="button"
          onClick={() => dispatch(closeModal())}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* ICON PREVIEW */}
      <div className="flex justify-center mb-4">
        <div
          className="w-16 h-16 rounded-full bg-green-500/15
          flex items-center justify-center text-3xl
          border border-green-400/30"
        >
          {icon}
        </div>
      </div>

      {/* ICON PICKER */}
      <div className="flex flex-wrap justify-center gap-2 mb-5">
        {ICONS.map((e) => (
          <button
            key={e}
            type="button"
            onClick={() => setIcon(e)}
            className={`w-9 h-9 rounded-full text-lg transition
            ${
              icon === e
                ? "bg-green-500 text-black"
                : "bg-[#1f2238] text-white hover:bg-white/10"
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      {/* AMOUNT */}
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full text-center text-2xl font-semibold
        bg-[#1f2238] py-3 rounded-xl mb-4
        text-white placeholder-gray-500
        focus:ring-2 focus:ring-green-500 outline-none"
        required
      />

      {/* SOURCE */}
      <input
        placeholder="Source (Salary, Freelance)"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="w-full bg-[#1f2238] py-2.5 px-3 rounded-xl mb-3
        text-white placeholder-gray-500
        focus:ring-2 focus:ring-green-500 outline-none"
        required
      />

      {/* DATE */}
      <input
        type="date"
        value={date}
        max={new Date().toISOString().slice(0, 10)}
        onChange={(e) => setDate(e.target.value)}
        className="w-full bg-[#1f2238] py-2.5 px-3 rounded-xl mb-5
        text-white focus:ring-2 focus:ring-green-500 outline-none"
        required
      />

      {/* CTA */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl font-semibold
        bg-green-500 text-black hover:bg-green-400 transition"
      >
        Add Income
      </button>
    </form>
  );
}
