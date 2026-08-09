import React, { useState, useEffect } from "react";
import { Eye, EyeOff, ArrowRight, Github, Mail } from "lucide-react";

// ---------------------------------------------------------------------------
// Design tokens (Meridian — a travel/timezone product)
// bg night:   #0B1120   panel:    #121A2C   line:     #24304A
// horizon:    #F5A867   horizon2: #E8734B   text hi:  #F8FAFC
// text lo:    #93A4C3   focus:    #7DD3C0
// ---------------------------------------------------------------------------

function useLocalClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function HorizonPanel() {
  const now = useLocalClock();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const cities = [
    { name: "Lisbon", offset: 0 },
    { name: "Nairobi", offset: 3 },
    { name: "Jakarta", offset: 7 },
  ];

  return (
    <div
      className="relative hidden lg:flex lg:w-1/2 flex-col justify-between overflow-hidden px-14 py-12"
      style={{ backgroundColor: "#0B1120" }}
    >
      {/* faint longitude grid */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.07]"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1={`${(i / 11) * 100}%`}
            y1="0"
            x2={`${(i / 11) * 100}%`}
            y2="100%"
            stroke="#F8FAFC"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* horizon glow */}
      <svg
        viewBox="0 0 600 700"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <radialGradient id="sunGlow" cx="50%" cy="100%" r="65%">
            <stop offset="0%" stopColor="#F5A867" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#E8734B" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#E8734B" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sunBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FBCB8F" />
            <stop offset="100%" stopColor="#E8734B" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="600" height="700" fill="url(#sunGlow)" />
        <g className="motion-safe:animate-[drift_16s_ease-in-out_infinite]">
          <circle
            cx="300"
            cy="560"
            r="120"
            fill="url(#sunBody)"
            opacity="0.9"
          />
        </g>
        <line
          x1="0"
          y1="560"
          x2="600"
          y2="560"
          stroke="#24304A"
          strokeWidth="1.5"
        />
        {Array.from({ length: 23 }).map((_, i) => (
          <line
            key={i}
            x1={(i + 1) * 25}
            y1="556"
            x2={(i + 1) * 25}
            y2="564"
            stroke="#7DD3C0"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
        ))}
      </svg>

      <style>{`
        @keyframes drift {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
      `}</style>

      {/* top brand mark */}
      <div className="relative z-10 flex items-center gap-2.5">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
          style={{ backgroundColor: "#F5A867", color: "#0B1120" }}
        >
          M
        </span>
        <span
          className="text-sm font-medium tracking-[0.2em] uppercase"
          style={{ color: "#93A4C3" }}
        >
          Meridian
        </span>
      </div>

      {/* headline */}
      <div className="relative z-10 max-w-sm">
        <p
          className="mb-4 font-mono text-xs tracking-[0.25em] uppercase"
          style={{ color: "#7DD3C0" }}
        >
          38.9° N · local time {time}
        </p>
        <h1
          className="text-4xl leading-[1.15] text-white"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 480 }}
        >
          Every hour,
          <br />
          somewhere is dawn.
        </h1>
        <p
          className="mt-4 text-sm leading-relaxed"
          style={{ color: "#93A4C3" }}
        >
          Sign in to keep every trip, teammate, and timezone lined up on one
          horizon.
        </p>
      </div>

      {/* world clock footer */}
      <div
        className="relative z-10 flex gap-8 font-mono text-xs"
        style={{ color: "#93A4C3" }}
      >
        {cities.map((c) => {
          const t = new Date(
            now.getTime() +
              c.offset * 3600 * 1000 -
              now.getTimezoneOffset() * 60000,
          );
          return (
            <div key={c.name}>
              <div
                className="tracking-widest uppercase"
                style={{ color: "#5A6B8C" }}
              >
                {c.name}
              </div>
              <div className="mt-1" style={{ color: "#F8FAFC" }}>
                {t.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TextField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  rightSlot,
}) {
  return (
    <label className="block">
      <span
        className="mb-1.5 block text-xs font-medium tracking-wide"
        style={{ color: "#475569" }}
      >
        {label}
      </span>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:ring-2"
          style={{ borderColor: "#E2E8F0" }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#7DD3C0";
            e.currentTarget.style.boxShadow =
              "0 0 0 3px rgba(125,211,192,0.25)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#E2E8F0";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        {rightSlot && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightSlot}
          </div>
        )}
      </div>
    </label>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 1200);
  };

  return (
    <div
      className="flex min-h-screen w-full"
      style={{ backgroundColor: "#F8FAFC" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
      `}</style>

      <HorizonPanel />

      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-10 lg:w-1/2 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          {/* mobile brand mark */}
          <div className="mb-10 flex items-center gap-2.5 lg:hidden">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
              style={{ backgroundColor: "#0B1120", color: "#F5A867" }}
            >
              M
            </span>
            <span
              className="text-sm font-medium tracking-[0.2em] uppercase"
              style={{ color: "#475569" }}
            >
              Meridian
            </span>
          </div>

          <h2
            className="text-2xl text-slate-900"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
          >
            Welcome back
          </h2>
          <p className="mt-2 text-sm" style={{ color: "#64748B" }}>
            New here?{" "}
            <a
              href="#"
              className="font-medium underline-offset-4 hover:underline"
              style={{ color: "#E8734B" }}
            >
              Create an account
            </a>
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              autoComplete="current-password"
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-slate-400 transition hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            <div className="flex items-center justify-between text-sm">
              <label
                className="flex items-center gap-2 select-none"
                style={{ color: "#475569" }}
              >
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300"
                  style={{ accentColor: "#E8734B" }}
                />
                Remember me
              </label>
              <a
                href="#"
                className="font-medium hover:underline"
                style={{ color: "#E8734B" }}
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-white transition disabled:opacity-70"
              style={{ backgroundColor: "#0B1120" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#1E293B")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0B1120")
              }
            >
              {submitting ? "Signing in…" : "Sign in"}
              {!submitting && (
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              )}
            </button>
          </form>

          <div className="my-7 flex items-center gap-3">
            <div
              className="h-px flex-1"
              style={{ backgroundColor: "#E2E8F0" }}
            />
            <span className="text-xs" style={{ color: "#94A3B8" }}>
              or continue with
            </span>
            <div
              className="h-px flex-1"
              style={{ backgroundColor: "#E2E8F0" }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              style={{ borderColor: "#E2E8F0" }}
            >
              <Github size={16} />
              GitHub
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              style={{ borderColor: "#E2E8F0" }}
            >
              <Mail size={16} />
              Google
            </button>
          </div>

          <p className="mt-10 text-center text-xs" style={{ color: "#94A3B8" }}>
            By signing in you agree to our{" "}
            <a href="#" className="underline hover:text-slate-600">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-slate-600">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
