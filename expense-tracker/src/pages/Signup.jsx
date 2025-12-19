import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/authslice";

export default function SignupPage() {
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preview, setPreview] = useState(null);

  if (user) return <Navigate to="/dashboard" replace />;
  if (loading) return <div className="text-center text-gray-300">Creating your account...</div>;

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("emailAddress", email);
    formData.append("password", password);
    if (e.target.profileImage.files[0]) {
      formData.append("profileImage", e.target.profileImage.files[0]);
    }
    dispatch(register(formData));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl lg:text-5xl font-black text-white">
          Start tracking smarter
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          Join 30,000+ professionals already using ExpensePro
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Photo */}
        <div className="flex justify-center">
          <label className="cursor-pointer group">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white/10 group-hover:ring-purple-400 transition">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white/70" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-xl transition"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-xl transition"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-xl transition"
            placeholder="Create a strong password"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-center text-sm">
            {typeof error === "string" ? error : error.message || "Something went wrong"}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70"
        >
          {loading ? "Creating Account..." : "Create Free Account"}
        </button>
      </form>

      <p className="mt-8 text-center text-gray-400">
        Already have an account?{" "}
        <Link to="/" className="font-semibold text-purple-300 hover:text-purple-200 transition">
          Log in
        </Link>
      </p>
    </div>
  );
}