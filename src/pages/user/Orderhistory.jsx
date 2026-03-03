import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaSearch, FaFileInvoiceDollar, FaArrowRight } from "react-icons/fa";

/**
 * ✅ Premium Order History (Clean + Modern)
 * - Premium header card
 * - Search + status filter
 * - Status pills
 * - Clean table + responsive
 */

const ordersData = [
  { id: "#001", food: "Margherita Pizza", customer: "Ali Khan", date: "2026-03-01", status: "Delivered", total: 12 },
  { id: "#002", food: "Veggie Burger", customer: "Sara Ahmed", date: "2026-03-02", status: "Pending", total: 8 },
  { id: "#003", food: "Chocolate Cake", customer: "Omar Malik", date: "2026-03-02", status: "Delivered", total: 15 },
  { id: "#004", food: "Spaghetti Carbonara", customer: "Hassan Raza", date: "2026-03-03", status: "Cancelled", total: 10 },
  { id: "#005", food: "California Roll", customer: "Ayesha Noor", date: "2026-03-03", status: "Pending", total: 20 },
];

const formatDate = (iso) => {
  // Keep simple + consistent (no external libs)
  // Example: 2026-03-01 -> Mar 01, 2026
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
};

const statusPillClass = (status) => {
  const base = "inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-extrabold border";
  if (status === "Delivered") return `${base} bg-emerald-50 text-emerald-700 border-emerald-200`;
  if (status === "Pending") return `${base} bg-amber-50 text-amber-700 border-amber-200`;
  return `${base} bg-rose-50 text-rose-700 border-rose-200`;
};

export default function OrderHistory() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");

  const orders = useMemo(() => {
    const text = q.trim().toLowerCase();
    return ordersData.filter((o) => {
      const matchesStatus = status === "All" ? true : o.status === status;
      const matchesText = !text
        ? true
        : `${o.id} ${o.food} ${o.customer}`.toLowerCase().includes(text);
      return matchesStatus && matchesText;
    });
  }, [q, status]);

  const totalSpent = useMemo(
    () => orders.reduce((sum, o) => sum + (o.status !== "Cancelled" ? o.total : 0), 0),
    [orders]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7ed] via-white to-[#f8fafc] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-sm">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-orange-300/25 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-amber-300/20 blur-3xl" />

          <div className="relative p-6 sm:p-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm
                           text-slate-700 font-bold hover:bg-slate-50 transition"
              >
                <FaArrowLeft /> Back
              </Link>

              <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900">
                Order{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                  History
                </span>
              </h1>
              <p className="mt-2 text-slate-600">
                Track your recent orders with a clean premium UI.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-xl">
              {/* Search */}
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by ID, food, or customer..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200
                             focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-300
                             shadow-sm"
                />
              </div>

              {/* Filter */}
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-4 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-300
                           text-sm font-extrabold text-slate-700"
              >
                <option value="All">All</option>
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Summary row */}
          <div className="relative px-6 sm:px-8 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-4">
                <p className="text-xs font-bold text-slate-500">Orders</p>
                <p className="mt-1 text-2xl font-extrabold text-slate-900">{orders.length}</p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-4">
                <p className="text-xs font-bold text-slate-500">Total Spent</p>
                <p className="mt-1 text-2xl font-extrabold text-orange-600">${totalSpent}</p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-slate-500">Invoices</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    Download receipts
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 text-white flex items-center justify-center shadow-md shadow-orange-500/20">
                  <FaFileInvoiceDollar />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-md overflow-hidden">
          <div className="p-6 sm:p-7 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Orders</h2>
              <p className="text-sm text-slate-600 mt-1">Latest activity and statuses.</p>
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
                  <th className="py-4 px-6 font-bold">Order</th>
                  <th className="py-4 px-6 font-bold">Food</th>
                  <th className="py-4 px-6 font-bold">Customer</th>
                  <th className="py-4 px-6 font-bold">Date</th>
                  <th className="py-4 px-6 font-bold">Status</th>
                  <th className="py-4 px-6 font-bold">Total</th>
                  <th className="py-4 px-6 font-bold text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 px-6 text-center text-slate-600">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((o, idx) => (
                    <tr
                      key={o.id}
                      className={[
                        "border-b border-slate-100 hover:bg-slate-50 transition",
                        idx === orders.length - 1 ? "border-b-0" : "",
                      ].join(" ")}
                    >
                      <td className="py-4 px-6 font-extrabold text-slate-900">{o.id}</td>
                      <td className="py-4 px-6 text-slate-700 font-semibold">{o.food}</td>
                      <td className="py-4 px-6 text-slate-700">{o.customer}</td>
                      <td className="py-4 px-6 text-slate-700">{formatDate(o.date)}</td>
                      <td className="py-4 px-6">
                        <span className={statusPillClass(o.status)}>{o.status}</span>
                      </td>
                      <td className="py-4 px-6 font-extrabold text-slate-900">${o.total}</td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          to="/"
                          className="inline-flex items-center gap-2 text-sm font-extrabold text-orange-600 hover:text-orange-700 transition"
                        >
                          View <FaArrowRight />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Small note */}
        <p className="mt-4 text-xs text-slate-500">
          Note: This is UI demo data. Connect your API to load real orders.
        </p>
      </div>
    </div>
  );
}