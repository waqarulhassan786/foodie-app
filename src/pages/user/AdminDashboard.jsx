import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaSignOutAlt,
  FaShoppingBag,
  FaDollarSign,
  FaUsers,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

/**
 * ✅ Premium Admin Dashboard (Clean + Modern)
 * - Elegant header + gradient accent
 * - Stats cards with icons + hover
 * - Recent orders table with status pills
 * - Clean, readable code (data-driven rendering)
 */

export default function AdminDashboard() {
  const stats = useMemo(
    () => [
      {
        label: "Total Orders",
        value: "1,245",
        icon: <FaShoppingBag />,
        tone: "from-orange-500 to-amber-400",
      },
      {
        label: "Total Revenue",
        value: "$8,420",
        icon: <FaDollarSign />,
        tone: "from-emerald-500 to-teal-400",
      },
      {
        label: "Active Users",
        value: "320",
        icon: <FaUsers />,
        tone: "from-sky-500 to-indigo-400",
      },
      {
        label: "Pending Orders",
        value: "18",
        icon: <FaClock />,
        tone: "from-rose-500 to-pink-400",
      },
    ],
    []
  );

  const orders = useMemo(
    () => [
      { id: "#101", customer: "Ali Khan", item: "Pizza", amount: "$25", status: "Delivered" },
      { id: "#102", customer: "Ahmed", item: "Burger", amount: "$15", status: "Pending" },
      { id: "#103", customer: "Usman", item: "Pasta", amount: "$20", status: "Cancelled" },
      { id: "#104", customer: "Hassan", item: "Sushi", amount: "$30", status: "Delivered" },
      { id: "#105", customer: "Ayesha", item: "Dessert", amount: "$12", status: "Pending" },
    ],
    []
  );

  const statusPill = (status) => {
    const base =
      "inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-extrabold border";
    if (status === "Delivered")
      return `${base} bg-emerald-50 text-emerald-700 border-emerald-200`;
    if (status === "Pending")
      return `${base} bg-amber-50 text-amber-700 border-amber-200`;
    return `${base} bg-rose-50 text-rose-700 border-rose-200`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7ed] via-white to-[#f8fafc] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-sm">
          {/* subtle blobs */}
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-orange-300/25 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-amber-300/20 blur-3xl" />

          <div className="relative p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
                <span className="text-sm font-semibold text-slate-700">
                  Admin • Dashboard
                </span>
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold">
                Food Delivery{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                  Dashboard
                </span>
              </h1>

              <p className="mt-2 text-slate-600">
                Track orders, revenue, users and recent activity.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm
                           font-extrabold text-slate-700 hover:bg-slate-50 transition"
              >
                Go to site <FaArrowRight />
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 text-white font-extrabold
                           hover:bg-slate-800 transition shadow-md"
              >
                <FaSignOutAlt />
                Logout
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md
                         hover:shadow-2xl hover:-translate-y-1 transition"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute -left-1/3 top-0 h-full w-1/2 rotate-12 bg-slate-900/5 blur-xl" />
              </div>

              <div className="p-6 relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">{s.label}</p>
                    <p className="mt-2 text-3xl font-extrabold text-slate-900">
                      {s.value}
                    </p>
                  </div>

                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white
                                bg-gradient-to-r ${s.tone} shadow-md`}
                    aria-hidden="true"
                  >
                    {s.icon}
                  </div>
                </div>

                <div className="mt-4 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full w-2/3 rounded-full bg-gradient-to-r ${s.tone}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-md overflow-hidden">
          <div className="p-6 sm:p-7 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Recent Orders</h2>
              <p className="text-sm text-slate-600 mt-1">
                Latest orders and their current status.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm
                         font-extrabold text-slate-700 hover:bg-slate-50 transition"
            >
              Export
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-t border-b border-slate-200">
                <tr className="text-sm text-slate-600">
                  <th className="py-4 px-6 font-bold">Order ID</th>
                  <th className="py-4 px-6 font-bold">Customer</th>
                  <th className="py-4 px-6 font-bold">Item</th>
                  <th className="py-4 px-6 font-bold">Amount</th>
                  <th className="py-4 px-6 font-bold">Status</th>
                  <th className="py-4 px-6 font-bold text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o, idx) => (
                  <tr
                    key={o.id}
                    className={[
                      "border-b border-slate-100",
                      "hover:bg-slate-50 transition",
                      idx === orders.length - 1 ? "border-b-0" : "",
                    ].join(" ")}
                  >
                    <td className="py-4 px-6 font-extrabold text-slate-900">{o.id}</td>
                    <td className="py-4 px-6 text-slate-700 font-semibold">{o.customer}</td>
                    <td className="py-4 px-6 text-slate-700">{o.item}</td>
                    <td className="py-4 px-6 font-extrabold text-slate-900">{o.amount}</td>
                    <td className="py-4 px-6">
                      <span className={statusPill(o.status)}>{o.status}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-extrabold text-orange-600 hover:text-orange-700 transition"
                      >
                        View <FaArrowRight />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}