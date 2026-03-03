import React, { useMemo, useState } from "react";

/**
 * Ultra Premium Settings UI (clean + attractive)
 * - Premium hero header with soft gradient + blur
 * - Glass cards + subtle glow
 * - Better toggle (icon + animated knob)
 * - “Save bar” feel (sticky actions)
 * - Password section with strength indicator + show/hide
 * - Toast feedback
 *
 * NOTE: This is still ONLY the settings section (no sidebar/top navbar).
 */

const cx = (...c) => c.filter(Boolean).join(" ");
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

function Toast({ text }) {
  if (!text) return null;
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-xl">
        {text}
      </div>
    </div>
  );
}

function IconMoon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M21 14.3A8.2 8.2 0 0 1 9.7 3a7.5 7.5 0 1 0 11.3 11.3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
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
function IconShield(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 2 20 6v7c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V6l8-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconEye(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 15a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function IconEyeOff(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M6.2 6.2C3.7 8.1 2 12 2 12s3.5 7 10 7c2 0 3.7-.6 5.1-1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9.9 4.2A11 11 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.3 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10.6 10.6A2 2 0 0 0 12 14a2 2 0 0 0 1.4-.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 backdrop-blur">
      {children}
    </span>
  );
}

function Card({ title, desc, right, children }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white/70 shadow-sm ring-1 ring-slate-200 backdrop-blur transition hover:shadow-lg">
      {/* glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-orange-200/70 to-amber-200/70 blur-3xl opacity-0 transition group-hover:opacity-100" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200/60 p-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            {desc ? <p className="mt-1 text-sm text-slate-600">{desc}</p> : null}
          </div>
          {right}
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function ToggleRow({ icon: Icon, title, subtitle, checked, onToggle }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200 shadow-sm">
      <div className="flex gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-50 text-slate-700 ring-1 ring-slate-200">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onToggle}
        className={cx(
          "relative mt-1 h-7 w-12 rounded-full transition focus:outline-none focus:ring-2 focus:ring-orange-300",
          checked ? "bg-gradient-to-r from-orange-500 to-amber-400" : "bg-slate-200"
        )}
      >
        <span
          className={cx(
            "absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition",
            checked ? "left-6" : "left-1"
          )}
        />
      </button>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text", right, error }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-900">{label}</span>
      <div
        className={cx(
          "mt-2 flex items-center gap-2 rounded-2xl bg-white px-4 py-3",
          "ring-1 shadow-sm transition",
          error ? "ring-rose-200" : "ring-slate-200",
          "focus-within:ring-2 focus-within:ring-orange-300"
        )}
      >
        <input
          className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
        />
        {right}
      </div>
      {error ? <p className="mt-2 text-xs font-medium text-rose-600">{error}</p> : null}
    </label>
  );
}

function strengthScore(pw) {
  let s = 0;
  if (pw.length >= 8) s += 25;
  if (/[A-Z]/.test(pw)) s += 20;
  if (/[a-z]/.test(pw)) s += 20;
  if (/[0-9]/.test(pw)) s += 20;
  if (/[^A-Za-z0-9]/.test(pw)) s += 15;
  return clamp(s, 0, 100);
}

export default function Settings() {
  const [settings, setSettings] = useState({
    darkMode: true,
    emailNotifications: true,
    smsNotifications: false,
  });

  const [pw, setPw] = useState({ next: "", confirm: "" });
  const [showPw, setShowPw] = useState({ next: false, confirm: false });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [dirty, setDirty] = useState(false);

  const notify = (msg) => {
    setToast(msg);
    window.clearTimeout(notify._t);
    notify._t = window.setTimeout(() => setToast(""), 2200);
  };

  const toggle = (field) => {
    setDirty(true);
    setSettings((p) => ({ ...p, [field]: !p[field] }));
  };

  const pwErrors = useMemo(() => {
    const e = {};
    if (pw.next && pw.next.length < 8) e.next = "Password must be at least 8 characters.";
    if (pw.confirm && pw.confirm !== pw.next) e.confirm = "Passwords do not match.";
    return e;
  }, [pw]);

  const canUpdatePassword =
    pw.next.length > 0 && pw.confirm.length > 0 && Object.keys(pwErrors).length === 0;

  const score = useMemo(() => strengthScore(pw.next), [pw.next]);
  const strengthLabel =
    score >= 80 ? "Strong" : score >= 55 ? "Good" : score >= 30 ? "Weak" : "Very weak";

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      // await api.saveSettings(settings);
      await new Promise((r) => setTimeout(r, 650));
      setDirty(false);
      notify("Settings saved ✅");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!canUpdatePassword) return notify("Fix password fields first.");
    try {
      setSaving(true);
      // await api.updatePassword(pw.next);
      await new Promise((r) => setTimeout(r, 650));
      setPw({ next: "", confirm: "" });
      notify("Password updated 🔒");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Premium background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[460px] w-[460px] rounded-full bg-orange-200/50 blur-3xl" />
        <div className="absolute -top-52 -right-40 h-[560px] w-[560px] rounded-full bg-amber-200/50 blur-3xl" />
        <div className="absolute bottom-[-140px] left-1/2 h-[420px] w-[780px] -translate-x-1/2 rounded-full bg-sky-100/70 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-white/70 shadow-xl ring-1 ring-slate-200 backdrop-blur">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 to-amber-400" />
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-orange-200/70 to-amber-200/70 blur-3xl" />

          <div className="relative p-6 md:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>Account</Badge>
                  <Badge>Preferences</Badge>
                  <Badge>Security</Badge>
                </div>
                <h1 className="mt-3 text-2xl md:text-3xl font-semibold text-slate-900">
                  Settings
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  Control notifications, appearance, and keep your account secure.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSaveSettings}
                disabled={saving || !dirty}
                className={cx(
                  "rounded-2xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg",
                  "bg-gradient-to-r from-orange-500 to-amber-400 hover:brightness-95",
                  "focus:outline-none focus:ring-2 focus:ring-orange-300",
                  (saving || !dirty) && "opacity-60 cursor-not-allowed"
                )}
              >
                {saving ? "Saving..." : dirty ? "Save changes" : "Saved"}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Preferences */}
          <div className="lg:col-span-7">
            <Card
              title="Preferences"
              desc="Choose how you want updates and how the app looks."
              right={<Badge>Premium</Badge>}
            >
              <div className="space-y-4">
                <ToggleRow
                  icon={IconMoon}
                  title="Dark Mode"
                  subtitle="Reduce eye strain in low-light environments."
                  checked={settings.darkMode}
                  onToggle={() => toggle("darkMode")}
                />
                <ToggleRow
                  icon={IconMail}
                  title="Email Notifications"
                  subtitle="Order updates, receipts and important messages."
                  checked={settings.emailNotifications}
                  onToggle={() => toggle("emailNotifications")}
                />
                <ToggleRow
                  icon={IconPhone}
                  title="SMS Notifications"
                  subtitle="Fast delivery alerts via SMS (recommended)."
                  checked={settings.smsNotifications}
                  onToggle={() => toggle("smsNotifications")}
                />

                <div className="rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 p-4 ring-1 ring-amber-100">
                  <p className="text-sm font-semibold text-slate-900">Tip ✨</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Enable SMS notifications to get instant delivery updates.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Security */}
          <div className="lg:col-span-5">
            <Card
              title="Security"
              desc="Update your password and keep your account safe."
              right={
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                  <IconShield className="h-4 w-4" />
                  Protected
                </span>
              }
            >
              <div className="space-y-4">
                <Input
                  label="New password"
                  value={pw.next}
                  onChange={(e) => setPw((p) => ({ ...p, next: e.target.value }))}
                  placeholder="Minimum 8 characters"
                  type={showPw.next ? "text" : "password"}
                  error={pwErrors.next}
                  right={
                    <button
                      type="button"
                      onClick={() => setShowPw((p) => ({ ...p, next: !p.next }))}
                      className="grid h-9 w-9 place-items-center rounded-xl bg-slate-50 text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
                      title={showPw.next ? "Hide" : "Show"}
                    >
                      {showPw.next ? <IconEyeOff className="h-5 w-5" /> : <IconEye className="h-5 w-5" />}
                    </button>
                  }
                />

                {/* Strength */}
                <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">Strength</p>
                    <span
                      className={cx(
                        "rounded-full px-3 py-1 text-xs font-semibold ring-1",
                        score >= 80
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                          : score >= 55
                          ? "bg-amber-50 text-amber-700 ring-amber-100"
                          : "bg-rose-50 text-rose-700 ring-rose-100"
                      )}
                    >
                      {strengthLabel}
                    </span>
                  </div>
                  <div className="mt-3 h-2 w-full rounded-full bg-slate-100 ring-1 ring-slate-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Use upper/lowercase, numbers, and symbols for a strong password.
                  </p>
                </div>

                <Input
                  label="Confirm password"
                  value={pw.confirm}
                  onChange={(e) => setPw((p) => ({ ...p, confirm: e.target.value }))}
                  placeholder="Re-enter password"
                  type={showPw.confirm ? "text" : "password"}
                  error={pwErrors.confirm}
                  right={
                    <button
                      type="button"
                      onClick={() => setShowPw((p) => ({ ...p, confirm: !p.confirm }))}
                      className="grid h-9 w-9 place-items-center rounded-xl bg-slate-50 text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
                      title={showPw.confirm ? "Hide" : "Show"}
                    >
                      {showPw.confirm ? <IconEyeOff className="h-5 w-5" /> : <IconEye className="h-5 w-5" />}
                    </button>
                  }
                />

                <button
                  type="button"
                  onClick={handleUpdatePassword}
                  disabled={saving || !canUpdatePassword}
                  className={cx(
                    "w-full rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-lg",
                    "bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300",
                    (saving || !canUpdatePassword) && "opacity-60 cursor-not-allowed"
                  )}
                >
                  {saving ? "Updating..." : "Update password"}
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Toast text={toast} />
    </div>
  );
}