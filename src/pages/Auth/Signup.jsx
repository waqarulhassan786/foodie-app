import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaUser, FaArrowRight } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const isValidEmail = useMemo(() => {
    if (!email.trim()) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }, [email]);

  const strongEnough = useMemo(() => {
    if (!password) return true;
    return password.length >= 6;
  }, [password]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErr("");

    const nm = name.trim();
    const em = email.trim();
    const pw = password.trim();

    if (!nm || !em || !pw) {
      setErr("Please fill all fields.");
      return;
    }
    if (!isValidEmail) {
      setErr("Please enter a valid email address.");
      return;
    }
    if (!strongEnough) {
      setErr("Password should be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Mock signup logic (replace with API later)
      await new Promise((r) => setTimeout(r, 800));
      localStorage.setItem("token", "12345");

      // ✅ After signup go profile
      navigate("/user/profile");
    } catch (error) {
      setErr("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7ed] via-white to-[#f8fafc] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-stretch">
        {/* Left: Promo */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-sm p-8 hidden lg:flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <span className="text-sm font-semibold text-slate-700">
                Create your Foodie account
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900">
              Join and start{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                ordering today
              </span>
            </h1>

            <p className="mt-3 text-slate-600 leading-relaxed">
              Save your favorites, track orders, and checkout faster with a clean experience.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-bold text-slate-900">Order Tracking</p>
                <p className="text-xs text-slate-600 mt-1">See your history anytime</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-bold text-slate-900">Personal Profile</p>
                <p className="text-xs text-slate-600 mt-1">Manage details & settings</p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-xs text-slate-500">
            Tip: This is mock signup — later we can connect backend.
          </div>

          {/* soft blobs */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-orange-300/25 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-amber-300/20 blur-3xl" />
        </div>

        {/* Right: Form */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-sm">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-orange-300/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-amber-300/15 blur-3xl" />

          <div className="relative p-7 sm:p-9">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 shadow-md shadow-orange-500/20" />
              <h2 className="mt-4 text-3xl font-extrabold text-slate-900">Signup</h2>
              <p className="mt-1 text-slate-600 text-sm">
                Create an account to continue.
              </p>
            </div>

            {err && (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-semibold">
                {err}
              </div>
            )}

            <form onSubmit={handleSignup} className="mt-6 space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm font-bold text-slate-700">Full Name</label>
                <div className="mt-2 relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-700
                               focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-300"
                  />
                </div>
              </div>

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
                    placeholder="Enter password"
                    className={[
                      "w-full pl-11 pr-12 py-3 rounded-2xl bg-white border shadow-sm text-slate-700",
                      "focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-300",
                      !strongEnough ? "border-red-300" : "border-slate-200",
                    ].join(" ")}
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

                {!strongEnough && (
                  <p className="mt-2 text-xs text-red-600 font-semibold">
                    Password must be at least 6 characters.
                  </p>
                )}
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
                  {loading ? "Creating..." : "Create Account"}
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
                onClick={() => setErr("Google signup not connected yet.")}
                className="w-full py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-extrabold
                           hover:bg-slate-50 transition shadow-sm"
              >
                Continue with Google
              </button>
            </form>

            <p className="mt-6 text-center text-slate-600 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="font-extrabold text-orange-600 hover:underline">
                Login
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

export default Signup;