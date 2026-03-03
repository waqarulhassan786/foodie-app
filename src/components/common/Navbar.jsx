import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaSearch,
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();

  // ✅ replace with real auth state / context
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const cartCount = cart?.length ?? 0;

  const closeAll = () => {
    setMobileOpen(false);
    setProfileOpen(false);
  };

  // Close on ESC
  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && closeAll();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close profile dropdown on outside click
  const profileRef = useRef(null);
  useEffect(() => {
    const onDown = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const navItems = useMemo(
    () => [
      { to: "/", label: "Home", end: true },
      { to: "/categories", label: "Categories" },
      { to: "/popular", label: "Popular" },
      { to: "/menu", label: "Menu" },
    ],
    []
  );

  const navLinkClass = ({ isActive }) =>
    [
      "px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
      "hover:-translate-y-[1px] hover:shadow-md",
      isActive
        ? "bg-orange-500 text-white shadow-orange-500/20 shadow"
        : "text-slate-700 hover:bg-slate-100",
    ].join(" ");

  const mobileLinkClass = ({ isActive }) =>
    [
      "block px-4 py-3 rounded-xl text-sm font-semibold transition-all",
      isActive ? "bg-orange-500 text-white" : "text-slate-700 hover:bg-slate-50",
    ].join(" ");

  const handleLogout = () => {
    setIsLoggedIn(false);
    closeAll();
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    // ✅ hook this to your search route / logic
    // navigate(`/search?q=${encodeURIComponent(query)}`)
    setQuery("");
    closeAll();
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Glass / modern background */}
      <div className="backdrop-blur-xl bg-white/70 border-b border-white/30 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)]">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-3">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 shadow-md shadow-orange-500/20" />
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Foodie<span className="text-orange-500">.</span>
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((it) => (
                <NavLink
                  key={it.to}
                  to={it.to}
                  end={it.end}
                  className={navLinkClass}
                >
                  {it.label}
                </NavLink>
              ))}
            </div>

            {/* Search (desktop) */}
            <form
              onSubmit={onSearchSubmit}
              className="hidden md:flex items-center flex-1 max-w-md mx-4"
            >
              <div className="w-full relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search burgers, pizza, drinks..."
                  className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-white/80 border border-slate-200
                             focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-300
                             text-sm text-slate-700 shadow-sm"
                />
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Cart */}
              <NavLink
                to="/cart"
                className="relative p-2.5 rounded-2xl bg-white/80 border border-slate-200 hover:shadow-md transition"
                aria-label="Cart"
                onClick={() => setMobileOpen(false)}
              >
                <FaShoppingCart className="text-slate-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 text-[10px] leading-none bg-orange-500 text-white rounded-full px-1.5 py-1 shadow">
                    {cartCount}
                  </span>
                )}
              </NavLink>

              {/* Profile / Login */}
              <div className="hidden md:block relative" ref={profileRef}>
                {isLoggedIn ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setProfileOpen((p) => !p)}
                      className="p-2.5 rounded-2xl bg-white/80 border border-slate-200 hover:shadow-md transition"
                      aria-haspopup="menu"
                      aria-expanded={profileOpen}
                      aria-label="Profile menu"
                    >
                      <FaUser className="text-slate-700" />
                    </button>

                    {profileOpen && (
                      <div
                        className="absolute right-0 mt-3 w-56 rounded-2xl overflow-hidden
                                   bg-white border border-slate-100 shadow-xl"
                        role="menu"
                      >
                        <div className="px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-400 text-white">
                          <p className="text-sm font-bold">Welcome back</p>
                          <p className="text-xs opacity-90">Manage your account</p>
                        </div>

                        <Link
                          to="/user/profile"
                          onClick={closeAll}
                          className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                          role="menuitem"
                        >
                          <FaUser />
                          My Profile
                        </Link>

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full text-left flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                          role="menuitem"
                        >
                          <FaSignOutAlt />
                          Logout
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    className="px-4 py-2.5 rounded-2xl text-sm font-bold text-white
                               bg-gradient-to-r from-orange-500 to-amber-400
                               shadow-md shadow-orange-500/20 hover:shadow-lg transition"
                  >
                    Login
                  </NavLink>
                )}
              </div>

              {/* Mobile button */}
              <button
                onClick={() => setMobileOpen((p) => !p)}
                className="lg:hidden p-2.5 rounded-2xl bg-white/80 border border-slate-200 hover:shadow-md transition"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <FaTimes className="text-slate-700" />
                ) : (
                  <FaBars className="text-slate-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile drawer */}
          {mobileOpen && (
            <div className="lg:hidden pb-5">
              {/* Search mobile */}
              <form onSubmit={onSearchSubmit} className="md:hidden mt-3">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search food..."
                    className="w-full pl-10 pr-3 py-3 rounded-2xl bg-white border border-slate-200
                               focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-300
                               text-sm text-slate-700 shadow-sm"
                  />
                </div>
              </form>

              <div className="mt-4 grid gap-2">
                {navItems.map((it) => (
                  <NavLink
                    key={it.to}
                    to={it.to}
                    end={it.end}
                    className={mobileLinkClass}
                    onClick={closeAll}
                  >
                    {it.label}
                  </NavLink>
                ))}

                {isLoggedIn ? (
                  <>
                    <NavLink
                      to="/user/profile"
                      className={mobileLinkClass}
                      onClick={closeAll}
                    >
                      <span className="inline-flex items-center gap-2">
                        <FaUser /> Profile
                      </span>
                    </NavLink>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      <span className="inline-flex items-center gap-2">
                        <FaSignOutAlt /> Logout
                      </span>
                    </button>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    className="px-4 py-3 rounded-2xl text-sm font-bold text-white
                               bg-gradient-to-r from-orange-500 to-amber-400
                               shadow-md shadow-orange-500/20 hover:shadow-lg transition text-center"
                    onClick={closeAll}
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;