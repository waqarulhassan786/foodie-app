import React, { useEffect, useRef, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaChevronRight,
  FaUtensils,
  FaFireAlt,
  FaLeaf,
  FaIceCream,
} from "react-icons/fa";

const categories = [
  { id: "all", name: "All Foods", icon: <FaUtensils /> },
  { id: "pizza", name: "Pizza", icon: <FaFireAlt /> },
  { id: "burgers", name: "Burgers", icon: <FaFireAlt /> },
  { id: "pasta", name: "Pasta", icon: <FaUtensils /> },
  { id: "sushi", name: "Sushi", icon: <FaLeaf /> },
  { id: "desserts", name: "Desserts", icon: <FaIceCream /> },
  { id: "salads", name: "Salads", icon: <FaLeaf /> },
];

const MenuLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const asideRef = useRef(null);

  const close = () => setMobileOpen(false);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Close on outside click (mobile)
  useEffect(() => {
    const onDown = (e) => {
      if (!mobileOpen) return;
      if (asideRef.current && !asideRef.current.contains(e.target)) close();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [mobileOpen]);

  const linkClass = ({ isActive }) =>
    [
      "group flex items-center justify-between gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition",
      "border",
      isActive
        ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white border-orange-200 shadow-lg shadow-orange-500/20"
        : "bg-white/80 text-slate-700 border-slate-200 hover:bg-slate-50 hover:-translate-y-[1px] hover:shadow-md",
    ].join(" ");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7ed] via-white to-[#f8fafc]">
      {/* Top bar (mobile) */}
      <div className="lg:hidden sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 shadow-md shadow-orange-500/20" />
            <div>
              <p className="text-sm font-extrabold text-slate-900 leading-tight">
                Menu
              </p>
              <p className="text-[11px] text-slate-500 -mt-0.5">
                Browse categories
              </p>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm"
            aria-label="Toggle categories"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FaTimes className="text-slate-700" /> : <FaBars className="text-slate-700" />}
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/85 shadow-sm">
                {/* soft blobs */}
                <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-orange-300/25 blur-3xl" />
                <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-amber-300/20 blur-3xl" />

                <div className="relative p-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
                    <span className="text-xs font-bold text-slate-700">
                      Premium Categories
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-extrabold text-slate-900">
                    Menu
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                      {" "}
                      Categories
                    </span>
                  </h2>

                  <p className="mt-2 text-sm text-slate-600">
                    Pick a category to filter your menu instantly.
                  </p>

                  <div className="mt-6 space-y-2">
                    {categories.map((cat) => (
                      <NavLink
                        key={cat.id}
                        to={cat.id === "all" ? "/menu" : `/menu/category/${cat.id}`}
                        className={linkClass}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className="w-10 h-10 rounded-2xl flex items-center justify-center
                                       bg-gradient-to-r from-orange-500 to-amber-400 text-white
                                       shadow-md shadow-orange-500/20"
                          >
                            {cat.icon}
                          </span>
                          <span>{cat.name}</span>
                        </span>

                        <FaChevronRight className="opacity-60 group-hover:translate-x-1 transition" />
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Sidebar (mobile drawer) */}
          {mobileOpen && (
            <div className="lg:hidden fixed inset-0 z-50">
              <div className="absolute inset-0 bg-black/30" />
              <aside
                ref={asideRef}
                className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl"
              >
                <div className="p-5 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-9 h-9 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 shadow-md shadow-orange-500/20" />
                      <div>
                        <p className="text-sm font-extrabold text-slate-900 leading-tight">
                          Categories
                        </p>
                        <p className="text-[11px] text-slate-500 -mt-0.5">
                          Choose one to filter
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={close}
                      className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm"
                      aria-label="Close categories"
                    >
                      <FaTimes className="text-slate-700" />
                    </button>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  {categories.map((cat) => (
                    <NavLink
                      key={cat.id}
                      to={cat.id === "all" ? "/menu" : `/menu/category/${cat.id}`}
                      className={linkClass}
                      onClick={close}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className="w-10 h-10 rounded-2xl flex items-center justify-center
                                     bg-gradient-to-r from-orange-500 to-amber-400 text-white
                                     shadow-md shadow-orange-500/20"
                        >
                          {cat.icon}
                        </span>
                        <span>{cat.name}</span>
                      </span>
                      <FaChevronRight className="opacity-60 group-hover:translate-x-1 transition" />
                    </NavLink>
                  ))}
                </div>
              </aside>
            </div>
          )}

          {/* Main Content */}
          <main className="lg:col-span-9">
            <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur shadow-sm p-5 sm:p-7">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MenuLayout;