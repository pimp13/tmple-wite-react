import React, { useState, useId } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Sparkles } from "lucide-react";
import { AuthForm } from "../components/auth/AuthForm";

export default function AuthPage() {
  return (
    <div
      dir="rtl"
      className="flex min-h-screen w-full bg-slate-50"
      style={{ fontFamily: "'Vazirmatn', 'Inter', sans-serif" }}
    >
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css');
        @keyframes float1 { 0%,100%{ transform: translate(0,0) scale(1);} 50%{ transform: translate(30px,-20px) scale(1.08);} }
        @keyframes float2 { 0%,100%{ transform: translate(0,0) scale(1);} 50%{ transform: translate(-25px,25px) scale(1.05);} }
        .blob1 { animation: float1 9s ease-in-out infinite; }
        .blob2 { animation: float2 11s ease-in-out infinite; }
      `}</style>

      {/* پنل برند - سمت راست چون RTL */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="blob1 absolute -top-24 -right-24 h-80 w-80 rounded-full bg-violet-400/30 blur-3xl" />
        <div className="blob2 absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl" />

        <div className="relative z-10 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
            <Sparkles size={18} className="text-amber-300" />
          </div>
          <span className="text-lg font-bold text-white">نوا</span>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl font-bold leading-relaxed text-white">
            جایی که ایده‌هات، شکل می‌گیرن.
          </h2>
          <p className="mt-4 text-sm leading-7 text-indigo-100">
            به هزاران نفری بپیوند که هر روز با «نوا» پروژه‌هاشون رو سریع‌تر و
            ساده‌تر مدیریت می‌کنن.
          </p>

          <div className="mt-8 flex -space-x-3 space-x-reverse">
            {[
              "from-amber-300 to-orange-400",
              "from-emerald-300 to-teal-400",
              "from-sky-300 to-indigo-400",
              "from-pink-300 to-rose-400",
            ].map((g, i) => (
              <div
                key={i}
                className={`h-9 w-9 rounded-full border-2 border-indigo-600 bg-linear-to-br ${g}`}
              />
            ))}
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-indigo-600 bg-white/20 text-[11px] font-semibold text-white backdrop-blur-sm">
              +۲k
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-indigo-200">
          © ۱۴۰۴ — تمام حقوق محفوظ است
        </p>
      </div>

      {/* پنل فرم - سمت چپ */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:mb-10">
            <h1 className="text-2xl font-bold text-slate-800">خوش اومدی 👋</h1>
            <p className="mt-2 text-sm text-slate-400">
              برای ادامه وارد حسابت شو
            </p>
          </div>

          <AuthForm />

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">یا ادامه با</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.7-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.1-4 1.1-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.3 7.4 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.4 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.4C.5 8.3 0 10.1 0 12s.5 3.7 1.4 5.4l4-3.1z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.8c1.7 0 3.3.6 4.5 1.7l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.6l4 3.1c.9-2.8 3.5-4.9 6.6-4.9z"
                />
              </svg>
              گوگل
            </button>
            <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#181717">
                <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
              </svg>
              گیت‌هاب
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-400">
            حساب کاربری نداری؟{" "}
            <button className="font-semibold text-indigo-600 hover:text-indigo-700">
              ثبت‌نام کن
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
