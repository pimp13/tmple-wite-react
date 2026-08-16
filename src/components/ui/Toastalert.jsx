import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

/* ===========================================================
   ۱) هسته‌ی Toast — این بخش رو توی پروژه‌ات کپی کن
   (مثلاً در فایل src/components/toast.jsx)
=========================================================== */

const ToastContext = createContext(null);

const STYLES = {
  success: {
    icon: CheckCircle2,
    ring: "ring-emerald-100",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    bar: "bg-emerald-400",
  },
  error: {
    icon: XCircle,
    ring: "ring-rose-100",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    bar: "bg-rose-400",
  },
  warning: {
    icon: AlertTriangle,
    ring: "ring-amber-100",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    bar: "bg-amber-400",
  },
  info: {
    icon: Info,
    ring: "ring-indigo-100",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    bar: "bg-indigo-400",
  },
};

function ToastItem({ toast, onClose }) {
  const { type = "info", title, message, duration = 4000 } = toast;
  const s = STYLES[type];
  const Icon = s.icon;
  const [leaving, setLeaving] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const remainingRef = useRef(duration);
  const startRef = useRef(Date.now());

  const close = useCallback(() => {
    setLeaving(true);
    setTimeout(() => onClose(toast.id), 200);
  }, [onClose, toast.id]);

  useEffect(() => {
    if (duration === Infinity) return;
    const tick = () => {
      startRef.current = Date.now();
      timerRef.current = setTimeout(close, remainingRef.current);
    };
    if (!paused) tick();
    return () => clearTimeout(timerRef.current);
  }, [paused, close, duration]);

  const handleMouseEnter = () => {
    if (duration === Infinity) return;
    clearTimeout(timerRef.current);
    remainingRef.current -= Date.now() - startRef.current;
    setPaused(true);
  };
  const handleMouseLeave = () => setPaused(false);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`pointer-events-auto relative w-80 overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-200/70 ring-1 ${s.ring} transition-all duration-200 ${
        leaving ? "translate-y-1 opacity-0" : "animate-toast-in"
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${s.iconBg}`}>
          <Icon size={17} className={s.iconColor} strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          {title && <p className="text-sm font-semibold text-slate-800">{title}</p>}
          {message && <p className="mt-0.5 text-xs leading-5 text-slate-500">{message}</p>}
        </div>
        <button
          onClick={close}
          className="shrink-0 rounded-lg p-1 text-slate-300 transition-colors hover:bg-slate-50 hover:text-slate-500"
        >
          <X size={15} />
        </button>
      </div>

      {duration !== Infinity && (
        <div className="h-1 w-full bg-slate-100">
          <div
            className={`h-full ${s.bar}`}
            style={{
              animation: `toast-shrink ${duration}ms linear forwards`,
              animationPlayState: paused ? "paused" : "running",
            }}
          />
        </div>
      )}
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, ...toast }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const api = {
    show: addToast,
    success: (message, opts) => addToast({ type: "success", message, ...opts }),
    error: (message, opts) => addToast({ type: "error", message, ...opts }),
    warning: (message, opts) => addToast({ type: "warning", message, ...opts }),
    info: (message, opts) => addToast({ type: "info", message, ...opts }),
    dismiss: removeToast,
  };

  return (
    <ToastContext.Provider value={api}>
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(8px) scale(.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes toast-shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-toast-in { animation: toast-in .25s ease-out; }
      `}</style>

      {children}

      <div className="pointer-events-none fixed bottom-5 left-5 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast باید داخل ToastProvider استفاده بشه");
  return ctx;
}

/* ===========================================================
   ۲) نمونه‌ی استفاده
=========================================================== */

export function Demo() {
  const toast = useToast();

  return (
    <div
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-slate-50 px-6"
      style={{ fontFamily: "'Vazirmatn', 'Inter', sans-serif" }}
    >
      <style>{`@import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css');`}</style>

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100">
        <h1 className="text-xl font-bold text-slate-800">تست Toast Alert</h1>
        <p className="mt-1.5 text-sm text-slate-400">
          روی هر دکمه بزن تا نوتیفیکیشن مربوطه گوشه‌ی صفحه ظاهر بشه.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() =>
              toast.success("عملیات با موفقیت انجام شد.", { title: "موفق" })
            }
            className="rounded-2xl bg-emerald-50 py-3 text-sm font-medium text-emerald-600 transition-colors hover:bg-emerald-100"
          >
            موفقیت
          </button>
          <button
            onClick={() =>
              toast.error("مشکلی در ارسال درخواست پیش اومد.", { title: "خطا" })
            }
            className="rounded-2xl bg-rose-50 py-3 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-100"
          >
            خطا
          </button>
          <button
            onClick={() =>
              toast.warning("اتصال اینترنت ناپایدار است.", { title: "هشدار" })
            }
            className="rounded-2xl bg-amber-50 py-3 text-sm font-medium text-amber-600 transition-colors hover:bg-amber-100"
          >
            هشدار
          </button>
          <button
            onClick={() =>
              toast.info("نسخه‌ی جدید در دسترس است.", { title: "اطلاعات" })
            }
            className="rounded-2xl bg-indigo-50 py-3 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-100"
          >
            اطلاعات
          </button>
        </div>

        <button
          onClick={() =>
            toast.show({
              type: "info",
              title: "پیام ماندگار",
              message: "این پیام تا کلیک روی ضربدر باقی می‌مونه.",
              duration: Infinity,
            })
          }
          className="mt-3 w-full rounded-2xl border border-slate-200 py-3 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50"
        >
          پیام بدون تایمر (Infinity)
        </button>
      </div>
    </div>
  );
}


/* ===========================================================
   ۳) راهنمای استفاده در پروژه‌ی خودت
   -----------------------------------------------------------
   1. کل کد بخش (۱) رو در یک فایل جدا (مثلاً toast.jsx) بذار.
   2. کامپوننت اصلی اپلیکیشن رو با <ToastProvider> بپیچون:

        import { ToastProvider } from "./toast";

        function App() {
          return (
            <ToastProvider>
              <YourApp />
            </ToastProvider>
          );
        }

   3. در هر کامپوننتی که نیاز به نمایش toast داری:

        import { useToast } from "./toast";

        function SaveButton() {
          const toast = useToast();

          const handleSave = async () => {
            try {
              await saveData();
              toast.success("ذخیره شد!", { title: "موفق" });
            } catch (e) {
              toast.error("ذخیره‌سازی ناموفق بود.");
            }
          };

          return <button onClick={handleSave}>ذخیره</button>;
        }

   گزینه‌های هر toast:
     - type: "success" | "error" | "warning" | "info"
     - title: عنوان (اختیاری)
     - message: متن پیام
     - duration: زمان به میلی‌ثانیه (پیش‌فرض ۴۰۰۰) — Infinity یعنی خودکار بسته نشه
=========================================================== */