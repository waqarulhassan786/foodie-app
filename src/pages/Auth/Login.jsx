import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaArrowRight } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const isValidEmail = useMemo(() => {
    if (!email.trim()) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }, [email]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");

    const em = email.trim();
    const pw = password.trim();

    if (!em || !pw) {
      setErr("Please enter email and password.");
      return;
    }
    if (!isValidEmail) {
      setErr("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Mock login logic (replace with API later)
      await new Promise((r) => setTimeout(r, 700));
      localStorage.setItem("token", "12345");

      // ✅ Tumhara route: /user/profile (ya /user)
      navigate("/user/profile");
    } catch (error) {
      setErr("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7ed] via-white to-[#f8fafc] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-stretch">
        {/* Left: Promo / Branding */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-sm p-8 hidden lg:flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <span className="text-sm font-semibold text-slate-700">
                Welcome back to Foodie
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900">
              Login to continue{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                ordering
              </span>
            </h1>

            <p className="mt-3 text-slate-600 leading-relaxed">
              Explore categories, add items to cart, checkout quickly — all in one clean UI.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-bold text-slate-900">Fast Checkout</p>
                <p className="text-xs text-slate-600 mt-1">Smooth cart → checkout flow</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-bold text-slate-900">Premium Menu</p>
                <p className="text-xs text-slate-600 mt-1">Search, filter, categories</p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-xs text-slate-500">
            Tip: Use any email/password for now (mock auth).
          </div>

          {/* soft blobs */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-orange-300/25 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-amber-300/20 blur-3xl" />
        </div>

        {/* Right: Form */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-sm">
          {/* blobs */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-orange-300/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-amber-300/15 blur-3xl" />

          <div className="relative p-7 sm:p-9">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 shadow-md shadow-orange-500/20" />
              <h2 className="mt-4 text-3xl font-extrabold text-slate-900">Login</h2>
              <p className="mt-1 text-slate-600 text-sm">
                Enter your credentials to continue.
              </p>
            </div>

            {err && (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-semibold">
                {err}
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              {/* Email */}
              <div>
                <label className="text-sm font-bold text-slate-700">Email</label>
                <div className="mt-2 relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={[
                      "w-full pl-11 pr-4 py-3 rounded-2xl bg-white border shadow-sm text-slate-700",
                      "focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-300",
                      !isValidEmail ? "border-red-300" : "border-slate-200",
                    ].join(" ")}
                  />
                </div>
                {!isValidEmail && (
                  <p className="mt-2 text-xs text-red-600 font-semibold">
                    Please enter a valid email.
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-bold text-slate-700">Password</label>
                <div className="mt-2 relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-12 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-700
                               focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl hover:bg-slate-50 text-slate-600"
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Min 6 characters recommended</span>
                  <button
                    type="button"
                    className="text-xs font-bold text-orange-600 hover:underline"
                    onClick={() => setErr("Forgot password feature not added yet.")}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={[
                  "w-full mt-2 py-3.5 rounded-2xl font-extrabold text-white transition",
                  "bg-gradient-to-r from-orange-500 to-amber-400 shadow-md shadow-orange-500/20",
                  "hover:shadow-lg hover:-translate-y-[1px]",
                  loading ? "opacity-70 cursor-not-allowed" : "",
                ].join(" ")}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  {loading ? "Logging in..." : "Login"}
                  <FaArrowRight />
                </span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 pt-1">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-500 font-semibold">OR</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Social button UI only */}
              <button
                type="button"
                onClick={() => setErr("Google login not connected yet.")}
                className="w-full py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-extrabold
                           hover:bg-slate-50 transition shadow-sm"
              >
                Continue with Google
              </button>
            </form>

            <p className="mt-6 text-center text-slate-600 text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="font-extrabold text-orange-600 hover:underline">
                Signup
              </Link>
            </p>

            <p className="mt-2 text-center text-xs text-slate-500">
              By continuing, you agree to our Terms & Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;