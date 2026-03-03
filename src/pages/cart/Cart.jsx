import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Premium UI Cart (Tailwind)
 * - Glassmorphism + gradient background + subtle grid
 * - Card-based layout (no table)
 * - Sticky summary, premium CTA, micro-interactions
 * - Clean state updates with functional setState
 */

const initialCart = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 12,
    image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
    quantity: 2,
  },
  {
    id: 2,
    name: "Cheeseburger",
    category: "Burgers",
    price: 8,
    image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
    quantity: 1,
  },
];

const money = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export default function Cart() {
  const [items, setItems] = useState(initialCart);
  const [promo, setPromo] = useState("");
  const [toast, setToast] = useState("");

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [items]
  );

  // Demo pricing (connect to real API later)
  const shipping = items.length ? 3.99 : 0;
  const tax = items.length ? subtotal * 0.07 : 0;
  const discount = 0;
  const total = Math.max(0, subtotal - discount) + shipping + tax;

  const showToast = (msg) => {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(""), 2200);
  };

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, quantity: Math.max(1, it.quantity + delta) } : it
      )
    );
  };

  const setQty = (id, raw) => {
    const v = Number(String(raw).replace(/\D/g, "")) || 1;
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, quantity: Math.max(1, v) } : it)));
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    showToast("Removed from cart.");
  };

  const clearCart = () => {
    setItems([]);
    showToast("Cart cleared.");
  };

  const applyPromo = () => {
    if (!promo.trim()) return showToast("Enter a promo code first.");
    showToast(`Promo "${promo.trim()}" applied (demo).`);
    setPromo("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070A12]">
      {/* Premium background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-orange-500/25 blur-[120px]" />
        <div className="absolute -bottom-48 right-[-110px] h-[520px] w-[520px] rounded-full bg-fuchsia-500/20 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:44px_44px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Premium Checkout UI
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Cart
            </h1>
            <p className="mt-1 text-white/60">
              Modern, clean and smooth shopping experience.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur transition hover:bg-white/10 active:scale-[0.99]"
            >
              ← Continue shopping
            </Link>

            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="inline-flex items-center justify-center rounded-2xl bg-rose-500/15 px-4 py-2 text-sm font-semibold text-rose-200 ring-1 ring-rose-400/20 backdrop-blur transition hover:bg-rose-500/20 active:scale-[0.99]"
              >
                Clear cart
              </button>
            )}
          </div>
        </header>

        {/* Empty */}
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Items */}
            <section className="lg:col-span-2">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_90px_-45px_rgba(0,0,0,0.9)] backdrop-blur">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 p-5">
                  <div>
                    <h2 className="text-base font-semibold text-white">
                      Items <span className="text-white/50">({items.length})</span>
                    </h2>
                    <p className="text-sm text-white/55">Update quantity instantly.</p>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">
                    <span className="h-2 w-2 rounded-full bg-orange-400" />
                    Secure • Fast • Fresh
                  </div>
                </div>

                <div className="divide-y divide-white/10">
                  {items.map((it) => (
                    <article key={it.id} className="p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex flex-1 items-center gap-4">
                          <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                            <img
                              src={it.image}
                              alt={it.name}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="truncate text-base font-semibold text-white">
                                {it.name}
                              </h3>
                              <Badge>{it.category}</Badge>
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                              <span className="text-white/70">
                                Price <span className="font-semibold text-white">{money(it.price)}</span>
                              </span>
                              <span className="text-white/20">•</span>
                              <span className="text-white/70">
                                Line{" "}
                                <span className="font-semibold text-white">
                                  {money(it.price * it.quantity)}
                                </span>
                              </span>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                              <Pill>Hot & fresh</Pill>
                              <Pill>Premium quality</Pill>
                              <Pill>Fast delivery</Pill>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 sm:justify-end">
                          <Qty
                            value={it.quantity}
                            onDec={() => updateQty(it.id, -1)}
                            onInc={() => updateQty(it.id, 1)}
                            onChange={(v) => setQty(it.id, v)}
                            label={it.name}
                          />

                          <button
                            type="button"
                            onClick={() => removeItem(it.id)}
                            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/75 backdrop-blur transition hover:bg-white/10 active:scale-[0.99]"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="border-t border-white/10 p-5">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <MiniCard title="Delivery" desc="30–45 min average" />
                    <MiniCard title="Payments" desc="Encrypted & secure" />
                    <MiniCard title="Support" desc="24/7 customer care" />
                  </div>
                </div>
              </div>
            </section>

            {/* Summary */}
            <aside className="lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_90px_-45px_rgba(0,0,0,0.9)] backdrop-blur">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-base font-semibold text-white">Order Summary</h2>
                      <p className="mt-1 text-sm text-white/55">
                        Total updates automatically.
                      </p>
                    </div>

                    <span className="rounded-2xl bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-400/20">
                      Verified
                    </span>
                  </div>

                  <div className="mt-5">
                    <label className="text-sm font-medium text-white/80">Promo code</label>
                    <div className="mt-2 flex gap-2">
                      <input
                        value={promo}
                        onChange={(e) => setPromo(e.target.value)}
                        placeholder="e.g. SAVE10"
                        className="w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/20 focus:ring-4 focus:ring-orange-500/15"
                      />
                      <button
                        type="button"
                        onClick={applyPromo}
                        className="rounded-2xl bg-white px-4 py-2 text-sm font-extrabold text-slate-950 transition hover:opacity-95 active:scale-[0.99]"
                      >
                        Apply
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-white/45">
                      Demo UI (connect promo logic later)
                    </p>
                  </div>

                  <div className="mt-6 space-y-3 text-sm">
                    <Row label="Subtotal" value={money(subtotal)} />
                    <Row label="Discount" value={money(discount)} muted />
                    <Row label="Shipping" value={money(shipping)} />
                    <Row label="Estimated tax" value={money(tax)} />
                  </div>

                  <div className="my-6 h-px bg-white/10" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white/80">Total</span>
                    <span className="text-2xl font-extrabold tracking-tight text-white">
                      {money(total)}
                    </span>
                  </div>

                  <Link
                    to="/cart/checkout"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 px-5 py-3 text-sm font-extrabold text-slate-950 shadow-lg shadow-orange-500/20 transition hover:brightness-95 active:scale-[0.99]"
                  >
                    Checkout
                  </Link>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-white/60">
                    <div className="flex items-center justify-between">
                      <span>Protected checkout</span>
                      <span className="text-white/40">SSL • 256-bit</span>
                    </div>
                    <div className="mt-2 text-white/45">
                      You can review everything on the next step.
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p className="text-sm font-semibold text-white">Need help?</p>
                  <p className="mt-1 text-sm text-white/55">Open FAQs or contact support.</p>
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 active:scale-[0.99]">
                      FAQs
                    </button>
                    <button className="flex-1 rounded-2xl bg-white px-4 py-2 text-sm font-extrabold text-slate-950 transition hover:opacity-95 active:scale-[0.99]">
                      Support
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
            <div className="rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white/90 shadow-lg backdrop-blur">
              {toast}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- UI atoms ---------- */

function EmptyState() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-[0_20px_90px_-45px_rgba(0,0,0,0.9)] backdrop-blur">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-2xl text-white/80 ring-1 ring-white/10">
        🛒
      </div>
      <h2 className="mt-5 text-lg font-semibold text-white">Your cart is empty</h2>
      <p className="mt-1 text-white/55">Add items and come back to checkout.</p>
      <Link
        to="/menu"
        className="mt-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 px-6 py-3 text-sm font-extrabold text-slate-950 shadow-lg shadow-orange-500/20 transition hover:brightness-95 active:scale-[0.99]"
      >
        Browse menu
      </Link>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/70">
      {children}
    </span>
  );
}

function Pill({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
      {children}
    </span>
  );
}

function MiniCard({ title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="text-sm text-white/55">{desc}</p>
    </div>
  );
}

function Row({ label, value, muted }) {
  return (
    <div className="flex items-center justify-between">
      <span className={muted ? "text-white/45" : "text-white/70"}>{label}</span>
      <span className={muted ? "text-white/40" : "font-semibold text-white"}>{value}</span>
    </div>
  );
}

function Qty({ value, onDec, onInc, onChange, label }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 p-1">
      <button
        type="button"
        onClick={onDec}
        className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 text-white/80 transition hover:bg-white/10 active:scale-[0.97]"
        aria-label={`Decrease ${label}`}
      >
        −
      </button>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 bg-transparent text-center text-sm font-extrabold text-white outline-none"
        inputMode="numeric"
        aria-label={`Quantity for ${label}`}
      />

      <button
        type="button"
        onClick={onInc}
        className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 text-white/80 transition hover:bg-white/10 active:scale-[0.97]"
        aria-label={`Increase ${label}`}
      >
        +
      </button>
    </div>
  );
}