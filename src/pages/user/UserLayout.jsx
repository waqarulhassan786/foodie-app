import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";

/**
 * PREMIUM UI UserLayout (clean + modern)
 * - Light premium theme (matches your orange brand)
 * - Glass top bar + subtle background
 * - Content sits in a premium card (no dark dashboard look)
 * - Sidebar only once (fixes double nav)
 *
 * IMPORTANT: Profile/Orders/Settings pages should NOT render Sidebar.
 */

const cx = (...c) => c.filter(Boolean).join(" ");

const pageTitle = (pathname) => {
  if (pathname.includes("/profile")) return "Profile";
  if (pathname.includes("/orders")) return "My Orders";
  if (pathname.includes("/settings")) return "Settings";
  return "Dashboard";
};

function IconSearch(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="m21 21-4.35-4.35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconBell(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M13.73 21a2 2 0 0 1-3.46 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSpark(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 2l1.4 4.8L18 9l-4.6 1.2L12 15l-1.4-4.8L6 9l4.6-2.2L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M19 12l.8 2.8L22 16l-2.2.7L19 19l-.8-2.3L16 16l2.2-1.2L19 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function UserLayout() {
  const { pathname } = useLocation();
  const title = pageTitle(pathname);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* premium background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[460px] w-[460px] rounded-full bg-orange-200/45 blur-3xl" />
        <div className="absolute -top-52 -right-44 h-[560px] w-[560px] rounded-full bg-amber-200/45 blur-3xl" />
        <div className="absolute bottom-[-140px] left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-sky-100/70 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        {/* Sidebar (only once) */}
        <Sidebar />

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topbar (premium / clean) */}
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/70 backdrop-blur">
            <div className="px-4 py-4 md:px-8">
              <div className="flex items-center justify-between gap-4">
                {/* Left */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <IconSpark className="h-4 w-4 text-orange-500" />
                      User Dashboard
                    </span>
                    <span className="text-slate-300">/</span>
                    <span className="truncate text-slate-700">{title}</span>
                  </div>
                  <h1 className="mt-1 truncate text-xl font-semibold tracking-tight text-slate-900">
                    {title}
                  </h1>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center gap-2 rounded-2xl bg-white px-3 py-2 ring-1 ring-slate-200 shadow-sm">
                    <IconSearch className="h-4 w-4 text-slate-500" />
                    <input
                      placeholder="Search..."
                      className="w-56 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    className="grid h-11 w-11 place-items-center rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    title="Notifications"
                  >
                    <IconBell className="h-5 w-5 text-slate-700" />
                  </button>

                  <div className="hidden sm:flex items-center gap-2 rounded-2xl bg-white px-3 py-2 ring-1 ring-slate-200 shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-semibold text-slate-800">
                      Waqar
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent line */}
            <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-amber-400" />
          </header>

          {/* Page container */}
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
            <div className="mx-auto w-full max-w-6xl">
              {/* Premium content card */}
              <div className="relative overflow-hidden rounded-[28px] bg-white/80 ring-1 ring-slate-200 shadow-[0_30px_80px_-55px_rgba(15,23,42,0.35)] backdrop-blur">
                {/* soft glow */}
                <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-gradient-to-br from-orange-200/60 to-amber-200/50 blur-3xl" />

                <div className="relative p-4 sm:p-6 md:p-8">
                  <Outlet />
                </div>
              </div>

              {/* spacing */}
              <div className="h-10" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}