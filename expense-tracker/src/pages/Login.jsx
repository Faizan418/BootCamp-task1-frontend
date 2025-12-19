import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authslice";

export default function LoginPage() {
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) return <Navigate to="/dashboard" replace />;
  if (loading) return <div className="text-center text-gray-300">Signing you in...</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ emailAddress: email, password }));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl lg:text-5xl font-black text-white">
          Welcome back
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          Log in to continue tracking your finances
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-xl transition"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-xl transition"
            placeholder="Enter your password"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-center text-sm">
            {typeof error === "string" ? error : "Invalid email or password"}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Signing In..." : "Log In Securely"}
        </button>
      </form>

      <p className="mt-8 text-center text-gray-400">
        Don't have an account?{" "}
        <Link to="/signup" className="font-semibold text-purple-300 hover:text-purple-200 transition">
          Sign up free
        </Link>
      </p>
    </div>
  );
}