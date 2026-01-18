import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authslice";

export default function LoginPage() {
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ emailAddress: email, password }));
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-extrabold text-white tracking-tight">
          Welcome back
        </h2>
        <p className="text-gray-400 text-sm">
          Sign in to continue managing your money
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/15 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/15 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <div className="text-right text-sm mr-3 text-gray-400">
        
        <Link to="/forgot-password" className="text-purple-300 hover:text-purple-200 font-medium">
          Forgot Password?
        </Link>
      </div>

        {error && (
          <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center">
            Invalid email or password
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/25 transition disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login In"}
        </button>
      </form>

      {/* FOOTER */}
      <div className="text-center text-sm text-gray-400">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-purple-300 hover:text-purple-200 font-medium">
          Create account
        </Link>
      </div>
    </div>
  );
}
