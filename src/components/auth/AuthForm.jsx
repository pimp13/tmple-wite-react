import { useId, useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
  MailIcon,
} from "lucide-react";
import useDataProvider from "../../hooks/useDataProvider";

/* ---------- فیلد ورودی با لیبل شناور ---------- */
function Field({
  label,
  type = "text",
  icon: Icon,
  value,
  onChange,
  error,
  required,
}) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);
  const filled = value?.length > 0;
  const inputType = type === "password" ? (show ? "text" : "password") : type;

  return (
    <div className="w-full">
      <div
        className={`group relative rounded-2xl bg-white ring-1 transition-all duration-200 ${
          error
            ? "ring-rose-300"
            : focused
              ? "ring-indigo-300 shadow-md shadow-indigo-100"
              : "ring-slate-200"
        }`}
      >
        {Icon && (
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon size={17} strokeWidth={1.75} />
          </div>
        )}
        <label
          htmlFor={id}
          className={`pointer-events-none absolute right-11 origin-right transition-all duration-200 ${
            focused || filled
              ? "top-2.5 text-xs font-medium text-indigo-600"
              : "top-1/2 -translate-y-1/2 text-sm text-slate-400"
          }`}
        >
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=" "
          className={`w-full rounded-2xl bg-transparent py-2.5 pt-7 text-sm text-slate-800 outline-none placeholder:text-transparent ${
            type === "password" ? "pl-11 pr-11" : "pr-11 pl-4"
          }`}
        />
        {type === "password" && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShow((s) => !s)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-indigo-500"
          >
            {show ? (
              <EyeOff size={17} strokeWidth={1.75} />
            ) : (
              <Eye size={17} strokeWidth={1.75} />
            )}
          </button>
        )}
        {/* <div
          className={`absolute bottom-0 right-0 h-0.5 w-full origin-right scale-x-0 rounded-full bg-gradient-to-l from-indigo-500 via-violet-500 to-amber-400 transition-transform duration-300 group-focus-within:scale-x-100`}
        /> */}
      </div>
      {error && <p className="mt-1.5 px-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

export const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});

  const {
    reload: login,
    loading,
    error: requestError,
  } = useDataProvider({
    urlPrefix: "http://localhost:4040",
    provider: "/auth/login-register",
    method: "POST",
    autoLoad: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "ایمیل معتبر وارد کنید";
    }

    if (password.length < 6) {
      errs.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";
    }

    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      return;
    }

    try {
      const response = await login({
        method: "POST",
        body: {
          email,
          password,
          remember,
        },
      });

      console.log("Login response:", response);

      // اینجا بعد از login موفق کارهای لازم را انجام بده
      // مثلا:
      // navigate("/dashboard");
    } catch (error) {
      console.log("requestError", requestError);
      console.error("Login failed:", error);
      setErrors(
        error?.message ?? "ورود ناموفق بود. لطفاً اطلاعات خود را بررسی کنید.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field
        label="ایمیل"
        type="email"
        icon={MailIcon}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        required
      />

      <Field
        label="رمز عبور"
        type="password"
        icon={Lock}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        required
      />

      <div className="flex items-center justify-between pt-1 text-sm">
        <label className="flex cursor-pointer items-center gap-2 text-slate-500">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-400"
          />
          مرا به خاطر بسپار
        </label>

        <button
          type="button"
          className="font-medium text-indigo-600 hover:text-indigo-700"
        >
          رمز عبور را فراموش کردی؟
        </button>
      </div>

      {/* خطای API */}
      {requestError && (
        <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
          {requestError?.message ??
            "ورود ناموفق بود. لطفاً اطلاعات خود را بررسی کنید."}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-indigo-600 to-violet-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:shadow-indigo-300 active:scale-[0.98] disabled:opacity-70"
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        ) : (
          <>
            ورود
            <ArrowLeft size={16} />
          </>
        )}
      </button>
    </form>
  );
};
