import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";

/**
 * Premium Dashboard Layout (Foodie Theme)
 * - Cream background (your scheme)
 * - Glass content shell + soft border/shadow
 * - Mobile sidebar toggle button
 * - Clean structure
 *
 * Requires your Tailwind palette:
 * foodie.bg, foodie.bg2, foodie.card, foodie.border, foodie.primary, foodie.accent, foodie.ink, foodie.text, foodie.muted
 */

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-foodie-bg">
      {/* Mobile topbar */}
      <div className="sticky top-0 z-40 border-b border-foodie-border bg-foodie-card/80 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-foodie-border bg-white px-3 py-2 text-sm font-bold text-foodie-ink shadow-foodie2 transition hover:bg-foodie-bg2 active:scale-[0.99]"
          >
            <MenuIcon />
            Menu
          </button>

          <div className="text-center">
            <p className="text-sm font-extrabold text-foodie-ink">
              Dashboard<span className="text-foodie-primary">.</span>
            </p>
            <p className="text-xs text-foodie-muted">Premium Admin UI</p>
          </div>

          <div className="h-10 w-10 rounded-xl border border-foodie-border bg-foodie-bg2" />
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar (desktop) */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Sidebar (mobile overlay) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-[280px] bg-foodie-card border-r border-foodie-border shadow-foodie">
              <div className="flex items-center justify-between px-4 py-4 border-b border-foodie-border">
                <p className="text-sm font-extrabold text-foodie-ink">
                  Menu<span className="text-foodie-primary">.</span>
                </p>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-xl border border-foodie-border bg-white px-3 py-2 text-sm font-bold text-foodie-ink hover:bg-foodie-bg2 transition"
                >
                  Close
                </button>
              </div>
              <Sidebar />
            </div>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 px-4 py-6 lg:px-6">
          {/* content shell */}
          <div className="rounded-3xl border border-foodie-border bg-foodie-card shadow-foodie p-4 sm:p-6">
            <Outlet />
          </div>

          {/* footer */}
          <div className="mt-6 text-center text-xs text-foodie-muted">
            © {new Date().getFullYear()} Foodie. All rights reserved.
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

function MenuIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}