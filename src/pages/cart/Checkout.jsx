import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Premium Checkout UI (Tailwind)
 * - Dark premium background + glass cards
 * - Clean form with sections + better spacing
 * - Sticky order summary
 * - Small UX upgrades (payment method, notes, validation hint, toast)
 */

const initialCart = [
  { id: 1, name: "Margherita Pizza", price: 12, quantity: 2 },
  { id: 2, name: "Cheeseburger", price: 8, quantity: 1 },
];

const money = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    Number(n || 0)
  );

export default function Checkout() {
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    note: "",
    payment: "cod", // cod | card
  });

  const subtotal = useMemo(
    () => initialCart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    []
  );

  // Demo pricing (wire to backend later)
  const shipping = initialCart.length ? 3.99 : 0;
  const tax = initialCart.length ? subtotal * 0.07 : 0;
  const total = subtotal + shipping + tax;

  const showToast = (msg) => {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(""), 2200);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Demo: add real validation + API call
    if (!form.fullName || !form.email || !form.address || !form.city || !form.zip) {
      return showToast("Please fill required fields.");
    }
    showToast("Looks good! Place your order.");
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
              Checkout
            </h1>
            <p className="mt-1 text-white/60">
              Enter shipping details and confirm your order.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/cart"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur transition hover:bg-white/10 active:scale-[0.99]"
            >
              ← Back to cart
            </Link>
          </div>
        </header>

        <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-3">
          {/* Left: Form */}
          <section className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_90px_-45px_rgba(0,0,0,0.9)] backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Shipping Information
                  </h2>
                  <p className="mt-1 text-sm text-white/55">
                    Fields marked * are required.
                  </p>
                </div>
                <span className="rounded-2xl bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-400/20">
                  Secure
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Full name *"
                  name="fullName"
                  value={form.fullName}
                  onChange={onChange}
                  placeholder="John Doe"
                />
                <Field
                  label="Email *"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="john@email.com"
                />
                <Field
                  label="Phone"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="+1 555 000 1234"
                />
                <div className="sm:col-span-2">
                  <Field
                    label="Address *"
                    name="address"
                    value={form.address}
                    onChange={onChange}
                    placeholder="Street, area, house no."
                  />
                </div>
                <Field
                  label="City *"
                  name="city"
                  value={form.city}
                  onChange={onChange}
                  placeholder="New York"
                />
                <Field
                  label="ZIP *"
                  name="zip"
                  value={form.zip}
                  onChange={onChange}
                  placeholder="10001"
                />

                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-white/80">
                    Payment method
                  </label>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <RadioCard
                      title="Cash on delivery"
                      subtitle="Pay when your order arrives"
                      checked={form.payment === "cod"}
                      onClick={() => setForm((p) => ({ ...p, payment: "cod" }))}
                    />
                    <RadioCard
                      title="Card (demo UI)"
                      subtitle="Connect payment gateway later"
                      checked={form.payment === "card"}
                      onClick={() => setForm((p) => ({ ...p, payment: "card" }))}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-white/80">
                    Order note (optional)
                  </label>
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={onChange}
                    rows={3}
                    placeholder="Any delivery instructions?"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/20 focus:ring-4 focus:ring-orange-500/15"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-white/45">
                  We’ll only use your information to deliver your order.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur transition hover:bg-white/10 active:scale-[0.99]"
                >
                  Validate details
                </button>
              </div>
            </div>
          </section>

          {/* Right: Summary */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_90px_-45px_rgba(0,0,0,0.9)] backdrop-blur">
                <h2 className="text-lg font-semibold text-white">Order Summary</h2>

                <div className="mt-5 space-y-3">
                  {initialCart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {item.name}
                        </p>
                        <p className="text-xs text-white/55">
                          Qty: {item.quantity} × {money(item.price)}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        {money(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="my-5 h-px bg-white/10" />

                <div className="space-y-3 text-sm">
                  <Row label="Subtotal" value={money(subtotal)} />
                  <Row label="Shipping" value={money(shipping)} />
                  <Row label="Estimated tax" value={money(tax)} />
                </div>

                <div className="my-5 h-px bg-white/10" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white/80">Total</span>
                  <span className="text-2xl font-extrabold tracking-tight text-white">
                    {money(total)}
                  </span>
                </div>

                <Link
                  to="/cart/success"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 px-5 py-3 text-sm font-extrabold text-slate-950 shadow-lg shadow-orange-500/20 transition hover:brightness-95 active:scale-[0.99]"
                  onClick={(e) => {
                    // If you want to block navigation until form valid, do it here
                    if (!form.fullName || !form.email || !form.address || !form.city || !form.zip) {
                      e.preventDefault();
                      showToast("Fill required fields before placing order.");
                    }
                  }}
                >
                  Place Order
                </Link>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-white/60">
                  <div className="flex items-center justify-between">
                    <span>Protected checkout</span>
                    <span className="text-white/40">SSL • 256-bit</span>
                  </div>
                  <p className="mt-2 text-white/45">
                    You’ll review order details on the next step.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="text-sm font-semibold text-white">Support</p>
                <p className="mt-1 text-sm text-white/55">
                  Need help with delivery or payment?
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 active:scale-[0.99]"
                  >
                    FAQs
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-2xl bg-white px-4 py-2 text-sm font-extrabold text-slate-950 transition hover:opacity-95 active:scale-[0.99]"
                  >
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </form>

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

function Field({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-white/80" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/20 focus:ring-4 focus:ring-orange-500/15"
      />
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/70">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

function RadioCard({ title, subtitle, checked, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full rounded-2xl border p-4 text-left transition active:scale-[0.99]",
        checked
          ? "border-orange-400/40 bg-orange-500/10 ring-4 ring-orange-500/10"
          : "border-white/10 bg-black/20 hover:bg-white/5",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-1 text-xs text-white/55">{subtitle}</p>
        </div>
        <span
          className={[
            "mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border",
            checked ? "border-orange-300 bg-orange-400" : "border-white/20 bg-white/5",
          ].join(" ")}
          aria-hidden="true"
        >
          <span className={checked ? "h-2 w-2 rounded-full bg-slate-950" : ""} />
        </span>
      </div>
    </button>
  );
}