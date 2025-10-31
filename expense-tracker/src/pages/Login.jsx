import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authslice";

export default function LoginPage() {
  const { user, loading } = useSelector((state) => state.auth);
  const [emailAddress, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  if (loading) return <p className="text-center text-gray-300">Checking authentication...</p>;
  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ emailAddress, password }));
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
      <p className="text-gray-400 mb-8">Log in to manage your finances</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={emailAddress}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 bg-[#0f172a] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-5 py-4 bg-[#0f172a] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition"
        >
          Login Securely
        </button>
      </form>

      <p className="mt-6 text-center text-gray-400">
        New here?{" "}
        <Link to="/signup" className="text-indigo-400 hover:underline">
          Create Account
        </Link>
      </p>
    </>
  );
}
