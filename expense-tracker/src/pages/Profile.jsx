import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authslice";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth || {});

  const fullName = user?.fullName || "—";
  const email = user?.emailAddress || user?.email || "—";
  const profileImg =
    user?.profileImg || "https://cdn-icons-png.flaticon.com/512/847/847969.png";
  const createdAt = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "—";
  const updatedAt = user?.updatedAt
    ? new Date(user.updatedAt).toLocaleDateString()
    : "—";

  return (
    <div className="space-y-8 text-gray-900 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
        <img
          src={profileImg}
          alt="avatar"
          className="h-24 w-24 rounded-full ring-2 ring-emerald-200 object-cover hover:scale-105 transition-transform duration-300"
        />

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">
            {fullName}
          </h1>
          <p className="text-gray-500">{email}</p>
        </div>

        <button
          onClick={() => dispatch(logout())}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600 text-center font-medium shadow-sm">
          {String(error)}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all">
          <p className="text-sm text-gray-500">Member since</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-600">
            {createdAt}
          </p>
        </div>
        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all">
          <p className="text-sm text-gray-500">Last updated</p>
          <p className="mt-1 text-2xl font-semibold text-blue-600">
            {updatedAt}
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 tracking-tight">
          Account Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={fullName}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-2">Email</label>
            <input
              type="email"
              defaultValue={email}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}
