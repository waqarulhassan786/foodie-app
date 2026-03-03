import React from "react";
import { Link } from "react-router-dom";

const order = {
  id: "ORD-1024",
  items: [
    { id: 1, name: "Margherita Pizza", qty: 2, price: 12 },
    { id: 2, name: "Cheeseburger", qty: 1, price: 8 },
  ],
};

const money = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export default function OrderSuccess() {
  const subtotal = order.items.reduce((s, it) => s + it.qty * it.price, 0);
  const total = subtotal; // connect shipping/tax if needed

  return (
    <div className="min-h-screen bg-foodie-bg px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-xl">
        {/* Premium card */}
        <div className="rounded-[28px] bg-foodie-card border border-foodie-border shadow-foodie overflow-hidden">
          {/* top accent */}
          <div className="h-2 bg-gradient-to-r from-foodie-primary to-foodie-accent" />

          <div className="p-8 text-center">
            {/* icon */}
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-foodie-bg2 border border-foodie-border">
              <svg
                className="h-9 w-9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFA403"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
              </svg>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold text-foodie-ink">
              Order Successful 🎉
            </h1>
            <p className="mt-2 text-foodie-text">
              Your order has been placed successfully. You’ll receive a confirmation email shortly.
            </p>

            {/* meta */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 text-left">
              <Meta label="Order ID" value={order.id} />
              <Meta label="Status" value="Confirmed" />
            </div>

            {/* summary */}
            <div className="mt-6 rounded-2xl bg-foodie-bg2 border border-foodie-border p-5 text-left">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foodie-ink">Order Summary</h2>
                <span className="text-xs font-semibold text-foodie-text bg-foodie-card border border-foodie-border px-3 py-1 rounded-full">
                  {order.items.length} items
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {order.items.map((it) => (
                  <div key={it.id} className="flex justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-foodie-ink truncate">{it.name}</p>
                      <p className="text-sm text-foodie-muted">
                        Qty {it.qty} × {money(it.price)}
                      </p>
                    </div>
                    <p className="font-semibold text-foodie-ink">{money(it.qty * it.price)}</p>
                  </div>
                ))}
              </div>

              <div className="my-4 h-px bg-foodie-border" />

              <div className="flex justify-between font-extrabold text-foodie-ink">
                <span>Total</span>
                <span>{money(total)}</span>
              </div>
            </div>

            {/* buttons */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Link
                to="/"
                className="rounded-xl py-3 font-bold text-white bg-foodie-primary hover:bg-foodie-accent transition shadow-foodie2"
              >
                Back to Home
              </Link>

              <Link
                to="/user/orders"
                className="rounded-xl py-3 font-bold text-foodie-primary bg-white border border-foodie-border hover:bg-foodie-bg2 transition"
              >
                View My Orders
              </Link>
            </div>

            <p className="mt-5 text-xs text-foodie-muted">
              Need help? Visit Support or check your order history anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div className="rounded-xl bg-foodie-bg2 border border-foodie-border p-4">
      <p className="text-xs font-semibold text-foodie-muted">{label}</p>
      <p className="mt-1 font-bold text-foodie-ink">{value}</p>
    </div>
  );
}