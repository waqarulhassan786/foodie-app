import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

/** Demo data — replace with API */
const orders = [
  {
    id: "ORD12345",
    date: "2026-02-28",
    status: "Delivered",
    payment: "Card",
    address: "Gulshan, Karachi",
    items: [
      { name: "Margherita Pizza", quantity: 2, price: 12 },
      { name: "Cheeseburger", quantity: 1, price: 8 },
    ],
  },
  {
    id: "ORD12346",
    date: "2026-02-25",
    status: "Processing",
    payment: "Cash on Delivery",
    address: "DHA, Karachi",
    items: [
      { name: "Spaghetti Carbonara", quantity: 1, price: 10 },
      { name: "Caesar Salad", quantity: 1, price: 10 },
    ],
  },
];

const cx = (...c) => c.filter(Boolean).join(" ");

const STATUS = {
  Delivered: { dot: "bg-emerald-500", chip: "text-emerald-700 bg-emerald-50 ring-emerald-100" },
  Processing: { dot: "bg-amber-500", chip: "text-amber-700 bg-amber-50 ring-amber-100" },
  Cancelled: { dot: "bg-rose-500", chip: "text-rose-700 bg-rose-50 ring-rose-100" },
  Default: { dot: "bg-slate-400", chip: "text-slate-700 bg-slate-50 ring-slate-100" },
};

const money = (n) => `$${Number(n || 0).toFixed(2)}`;

const formatDate = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
};

const calcTotals = (items = []) =>
  items.reduce(
    (acc, it) => {
      const line = it.price * it.quantity;
      acc.subtotal += line;
      acc.count += it.quantity;
      return acc;
    },
    { subtotal: 0, count: 0 }
  );

function StatPill({ label, value }) {
  return (
    <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-slate-200 shadow-sm">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function StatusChip({ status }) {
  const s = STATUS[status] || STATUS.Default;
  return (
    <span className={cx("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1", s.chip)}>
      <span className={cx("h-2 w-2 rounded-full", s.dot)} />
      {status}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-xl overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 7h12l-1 12H7L6 7Z" />
            <path d="M9 7a3 3 0 0 1 6 0" />
          </svg>
        </div>
        <h3 className="mt-5 text-lg font-semibold text-slate-900">No orders yet</h3>
        <p className="mt-2 text-sm text-slate-500">Your order history will appear here once you place an order.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          Start shopping
        </Link>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-amber-400" />
    </div>
  );
}

function OrderCard({ order }) {
  const [open, setOpen] = useState(false);

  const { subtotal, count } = useMemo(() => calcTotals(order.items), [order.items]);
  const total = subtotal; // add tax/delivery if needed

  const status = STATUS[order.status] || STATUS.Default;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow-lg">
      {/* Premium accent */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-orange-500 to-amber-400" />

      <div className="p-6 pl-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-wide text-slate-500">ORDER ID</p>
            <div className="mt-1 flex items-center gap-3">
              <h3 className="text-lg font-semibold text-slate-900">#{order.id}</h3>
              <StatusChip status={order.status} />
            </div>
            <p className="mt-2 text-sm text-slate-500">
              Placed on <span className="font-medium text-slate-700">{formatDate(order.date)}</span>
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs font-medium text-slate-500">TOTAL</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">{money(total)}</p>
            <p className="mt-1 text-xs text-slate-500">
              {count} item{count !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
            <p className="text-xs font-medium text-slate-500">Payment</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{order.payment || "—"}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
            <p className="text-xs font-medium text-slate-500">Delivery Address</p>
            <p className="mt-1 text-sm font-semibold text-slate-900 line-clamp-1">{order.address || "—"}</p>
          </div>
        </div>

        {/* Items (Collapsible) */}
        <div className="mt-5 rounded-2xl ring-1 ring-slate-200 overflow-hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="w-full bg-white px-4 py-3 flex items-center justify-between hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-900">Order items</p>
              <p className="text-xs text-slate-500">{open ? "Hide details" : "View details"}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={cx("h-2 w-2 rounded-full", status.dot)} />
              <svg
                className={cx("h-4 w-4 text-slate-600 transition-transform", open ? "rotate-180" : "rotate-0")}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </button>

          {open && (
            <div className="bg-slate-50 px-4 py-4 space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={`${item.name}-${idx}`}
                  className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 ring-1 ring-slate-200"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{item.name}</p>
                    <p className="text-xs text-slate-500">
                      Qty: <span className="font-medium text-slate-700">{item.quantity}</span> · Unit:{" "}
                      <span className="font-medium text-slate-700">{money(item.price)}</span>
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{money(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            to={`/user/orders/${order.id}`}
            className="inline-flex flex-1 items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            View details
          </Link>

          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(order.id)}
            className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-300"
            title="Copy order ID"
          >
            Copy ID
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Orders() {
  const totalSpent = useMemo(() => orders.reduce((sum, o) => sum + calcTotals(o.items).subtotal, 0), []);
  const deliveredCount = useMemo(() => orders.filter((o) => o.status === "Delivered").length, []);
  const processingCount = useMemo(() => orders.filter((o) => o.status === "Processing").length, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Top bar / header */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">My Orders</h2>
            <p className="text-xs text-slate-500">A quick summary of your recent purchases</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            Continue shopping
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Summary row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatPill label="Total spent" value={money(totalSpent)} />
          <StatPill label="Delivered" value={String(deliveredCount)} />
          <StatPill label="Processing" value={String(processingCount)} />
        </div>

        {/* Orders */}
        <div className="mt-8">
          {orders.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}