import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/authslice";

export default function SignupPage() {
  const { user, loading, error } = useSelector((state) => state.auth);
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  if (loading) return <p className="text-gray-300 text-center">Checking authentication...</p>;
  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ fullName, emailAddress, password }));
    setFullName("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-2">Create Account</h2>
      <p className="text-gray-400 mb-8">Start tracking like a pro</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-5 py-4 bg-[#0f172a] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter full name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={emailAddress}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 bg-[#0f172a] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@company.com"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 bg-[#0f172a] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Create strong password"
            required
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-400 text-red-300 rounded-xl p-3 text-sm">
            {typeof error === "string" ? error : error.message || "Something went wrong"}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition"
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-gray-400">
        Already have an account?{" "}
        <Link to="/" className="text-indigo-400 hover:underline">
          Log In
        </Link>
      </p>
    </>
  );
}
