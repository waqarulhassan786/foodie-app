import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

/**
 * Premium Cart Layout
 * - Modern header + breadcrumb feel
 * - Glass/gradient background
 * - Centered container
 * - Clean, reusable, and readable
 */

const CartLayout = () => {
  const { pathname } = useLocation();
  const isCheckout = pathname.includes("/cart/checkout");

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
              {isCheckout ? "Checkout" : "Shopping Cart"}
            </h1>

            <p className="mt-1 text-white/60">
              {isCheckout
                ? "Complete your order securely."
                : "Review items and proceed when ready."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur transition hover:bg-white/10 active:scale-[0.99]"
            >
              ← Continue shopping
            </Link>

            <Link
              to="/cart"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-extrabold text-slate-950 transition hover:opacity-95 active:scale-[0.99]"
            >
              View cart
            </Link>
          </div>
        </header>

        {/* Content Shell */}
        <main className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_90px_-45px_rgba(0,0,0,0.9)] backdrop-blur sm:p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="mt-8 flex flex-col gap-3 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Your Store. All rights reserved.</p>
          <div className="flex gap-4">
            <Link className="hover:text-white/70 transition" to="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-white/70 transition" to="/terms">
              Terms
            </Link>
            <Link className="hover:text-white/70 transition" to="/support">
              Support
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CartLayout;