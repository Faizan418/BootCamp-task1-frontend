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
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl hover:shadow-purple-500/30 transition-all">
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
            Welcome Back
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base">
            Log in to continue tracking your finances
          </p>
        </div>

        {/* FORM */}
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
              placeholder="you@company.com"
              className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-lg transition"
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
              placeholder="Enter your password"
              className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-lg transition"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-center text-sm">
              {typeof error === "string" ? error : "Invalid email or password"}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 sm:py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Log In Securely"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="mt-6 text-center text-gray-400 text-sm sm:text-base">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-purple-300 hover:text-purple-200 transition"
          >
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
