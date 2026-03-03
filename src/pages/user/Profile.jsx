import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Ultra Modern Premium Profile Page
 * - Same logic/validation as your code
 * - More premium spacing + glass cards
 * - Unsaved changes indicator
 * - Better toast + micro interactions
 * - Avatar upload preview
 */

const initialUser = {
  name: "Waqar Hassan",
  email: "waqar@example.com",
  phone: "+92 300 1234567",
  address: "123 Street, Lahore, Pakistan",
  avatar: "https://i.pravatar.cc/300?img=5",
};

const cx = (...c) => c.filter(Boolean).join(" ");
const isEmail = (v) => /^\S+@\S+\.\S+$/.test(v || "");

function IconUser(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M20 21a8 8 0 0 0-16 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 13a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 6h16v12H4V6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.06a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.92Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconLocation(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 22s7-4.44 7-11a7 7 0 1 0-14 0c0 6.56 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 11.5a2.5 2.5 0 1 0-2.5-2.5 2.5 2.5 0 0 0 2.5 2.5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
function IconCamera(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 7h3l2-2h6l2 2h3v12H4V7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 17a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
function IconCheck(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconSpark(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 2l1.2 4.3L17.5 8 13.2 9.2 12 13.5 10.8 9.2 6.5 8l4.3-1.7L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M19 13l.8 2.6 2.6.8-2.6.8L19 20l-.8-2.6-2.6-.8 2.6-.8L19 13Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Input({ label, icon: Icon, hint, error, ...props }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-extrabold text-slate-900">{label}</span>
        {hint ? <span className="text-xs text-slate-500 font-medium">{hint}</span> : null}
      </div>

      <div
        className={cx(
          "mt-2 flex items-center gap-3 rounded-2xl px-4 py-3",
          "bg-white/90 backdrop-blur ring-1 shadow-sm transition",
          error ? "ring-rose-200" : "ring-slate-200",
          "focus-within:ring-2 focus-within:ring-orange-300"
        )}
      >
        <span
          className={cx(
            "grid h-10 w-10 place-items-center rounded-2xl",
            "bg-slate-50 text-slate-700 ring-1 ring-slate-200"
          )}
        >
          <Icon className="h-5 w-5" />
        </span>

        <input
          {...props}
          className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
        />
      </div>

      {error ? (
        <p className="mt-2 text-xs font-bold text-rose-600">{error}</p>
      ) : null}
    </label>
  );
}

function Toast({ text }) {
  if (!text) return null;
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="rounded-2xl bg-slate-900/95 px-4 py-3 text-sm font-extrabold text-white shadow-xl backdrop-blur">
        {text}
      </div>
    </div>
  );
}

export default function Profile() {
  const [user, setUser] = useState(initialUser);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const fileRef = useRef(null);

  // ✅ unsaved changes indicator
  const isDirty = useMemo(() => JSON.stringify(user) !== JSON.stringify(initialUser), [user]);

  const errors = useMemo(() => {
    const e = {};
    if (!user.name?.trim()) e.name = "Name is required";
    if (!user.email?.trim()) e.email = "Email is required";
    else if (!isEmail(user.email)) e.email = "Invalid email";
    if (!user.phone?.trim()) e.phone = "Phone is required";
    if (!user.address?.trim()) e.address = "Address is required";
    return e;
  }, [user]);

  const isValid = Object.keys(errors).length === 0;

  const notify = (msg) => {
    setToast(msg);
    window.clearTimeout(notify._t);
    notify._t = window.setTimeout(() => setToast(""), 2200);
  };

  // clean up avatar object url if used
  const lastAvatarUrlRef = useRef(null);
  useEffect(() => {
    return () => {
      if (lastAvatarUrlRef.current?.startsWith("blob:")) {
        URL.revokeObjectURL(lastAvatarUrlRef.current);
      }
    };
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser((p) => ({ ...p, [name]: value }));
  };

  const onAvatarFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // revoke old blob url if exists
    if (lastAvatarUrlRef.current?.startsWith("blob:")) {
      URL.revokeObjectURL(lastAvatarUrlRef.current);
    }

    const url = URL.createObjectURL(file);
    lastAvatarUrlRef.current = url;

    setUser((p) => ({ ...p, avatar: url }));
    notify("Avatar updated ✨");
  };

  const handleSave = async () => {
    if (!isValid) return notify("Please fix errors");
    try {
      setSaving(true);
      await new Promise((r) => setTimeout(r, 700));
      notify("Saved ✅");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setUser(initialUser);
    notify("Reset done");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7ed] via-white to-[#f8fafc]">
      {/* Premium background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-44 -left-44 h-[520px] w-[520px] rounded-full bg-orange-200/45 blur-3xl" />
        <div className="absolute -top-52 -right-44 h-[620px] w-[620px] rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute bottom-[-140px] left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-sky-100/60 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-white/75 ring-1 ring-slate-200 shadow-xl backdrop-blur">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 to-amber-400" />

          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 ring-1 ring-slate-200 shadow-sm">
                  <IconSpark className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-extrabold text-slate-800">
                    Profile Settings
                  </span>
                  {isDirty && (
                    <span className="ml-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-extrabold text-amber-700 ring-1 ring-amber-100">
                      Unsaved changes
                    </span>
                  )}
                </div>

                <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                  My{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                    Profile
                  </span>
                </h1>
                <p className="mt-2 text-sm md:text-base text-slate-600 max-w-2xl">
                  Keep your details updated for smooth checkout and delivery updates.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-2xl bg-white px-4 py-3 text-sm font-extrabold text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50
                             focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className={cx(
                    "rounded-2xl px-5 py-3 text-sm font-extrabold text-white shadow-lg",
                    "bg-gradient-to-r from-orange-500 to-amber-400 hover:brightness-95",
                    "focus:outline-none focus:ring-2 focus:ring-orange-300",
                    saving && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main layout */}
        <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left user card */}
          <div className="lg:col-span-4">
            <div className="group relative overflow-hidden rounded-3xl bg-white/90 shadow-sm ring-1 ring-slate-200 transition hover:shadow-xl">
              <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-gradient-to-br from-orange-200 to-amber-200 blur-3xl opacity-0 transition group-hover:opacity-100" />

              <div className="relative p-6">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-r from-orange-500/30 to-amber-400/30 blur-md" />
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="relative h-20 w-20 rounded-[28px] object-cover ring-1 ring-slate-200"
                    />

                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="absolute -bottom-2 -right-2 grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white shadow-md
                                 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      title="Change avatar"
                    >
                      <IconCamera className="h-5 w-5" />
                    </button>

                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={onAvatarFile}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-lg font-extrabold text-slate-900">
                      {user.name}
                    </p>
                    <p className="truncate text-sm text-slate-500">{user.email}</p>

                    <div className="mt-4 flex items-center gap-2">
                      <span
                        className={cx(
                          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold ring-1",
                          isValid
                            ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                            : "bg-rose-50 text-rose-700 ring-rose-100"
                        )}
                      >
                        <IconCheck className="h-4 w-4" />
                        {isValid ? "Verified" : "Fix required"}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
                        Customer
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick info */}
                <div className="mt-6 grid gap-3">
                  <div className="rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                    <p className="text-[11px] font-extrabold text-slate-500">Phone</p>
                    <p className="mt-1 text-sm font-extrabold text-slate-900">{user.phone}</p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                    <p className="text-[11px] font-extrabold text-slate-500">Address</p>
                    <p className="mt-1 text-sm font-extrabold text-slate-900">{user.address}</p>
                  </div>
                </div>

                {/* Tip */}
                <div className="mt-6 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 p-4 ring-1 ring-amber-100">
                  <p className="text-sm font-extrabold text-slate-900">Pro Tip ✨</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Update your phone number for delivery and order updates.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side form */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl bg-white/90 shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <div className="border-b border-slate-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">
                      Account Information
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Update your details. Changes can be saved anytime.
                    </p>
                  </div>

                  <span
                    className={cx(
                      "w-fit rounded-full px-3 py-1 text-xs font-extrabold ring-1",
                      isValid
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                        : "bg-rose-50 text-rose-700 ring-rose-100"
                    )}
                  >
                    {isValid ? "All good" : "Needs attention"}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Input
                    label="Full name"
                    icon={IconUser}
                    name="name"
                    value={user.name}
                    onChange={onChange}
                    placeholder="Your full name"
                    error={errors.name}
                    hint="As on CNIC"
                  />

                  <Input
                    label="Email"
                    icon={IconMail}
                    name="email"
                    value={user.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    error={errors.email}
                    hint="Used for receipts"
                  />

                  <Input
                    label="Phone"
                    icon={IconPhone}
                    name="phone"
                    value={user.phone}
                    onChange={onChange}
                    placeholder="+92 3xx xxxxxxx"
                    error={errors.phone}
                    hint="Delivery updates"
                  />

                  <Input
                    label="Address"
                    icon={IconLocation}
                    name="address"
                    value={user.address}
                    onChange={onChange}
                    placeholder="Street, City, Country"
                    error={errors.address}
                    hint="Shipping address"
                  />
                </div>

                <div className="mt-7 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <p className="text-xs text-slate-500">
                    Make sure your phone & address are correct for delivery.
                  </p>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="rounded-2xl bg-white px-4 py-3 text-sm font-extrabold text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50
                                 focus:outline-none focus:ring-2 focus:ring-slate-300"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
                      className={cx(
                        "rounded-2xl px-5 py-3 text-sm font-extrabold text-white shadow-lg",
                        "bg-gradient-to-r from-orange-500 to-amber-400 hover:brightness-95",
                        "focus:outline-none focus:ring-2 focus:ring-orange-300",
                        saving && "opacity-70 cursor-not-allowed"
                      )}
                    >
                      {saving ? "Saving..." : "Save changes"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Extra cards */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-sm font-extrabold text-slate-900">Security</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Update your password regularly to keep your account secure.
                </p>
                <button
                  type="button"
                  onClick={() => notify("Open change password modal")}
                  className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white hover:bg-slate-800
                             focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  Change password
                </button>
              </div>

              <div className="rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-sm font-extrabold text-slate-900">Notifications</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Manage order alerts and promotional messages.
                </p>
                <button
                  type="button"
                  onClick={() => notify("Open notification settings")}
                  className="mt-4 w-full rounded-2xl bg-white px-4 py-3 text-sm font-extrabold text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50
                             focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  Manage settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toast text={toast} />
    </div>
  );
}