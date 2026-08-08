import React, { useState, useId } from "react";
import {
  User,
  Mail,
  Lock,
  MessageSquare,
  Globe2,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

/* ---------------------------------------------------------
   FancyInput — یک کامپوننت ورودی قابل استفاده مجدد
   پشتیبانی از: text / email / password / textarea / select
--------------------------------------------------------- */
export function FancyInput({
  label,
  type = "text",
  icon: Icon,
  value,
  onChange,
  error,
  success,
  hint,
  required,
  rows = 3,
  options,
  placeholder = " ",
  name = "",
}) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const filled = value !== undefined && value !== null && value !== "";
  const isTextarea = type === "textarea";
  const isSelect = type === "select";
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const stateRing = error
    ? "ring-rose-300 focus-within:ring-rose-400"
    : success
      ? "ring-emerald-300 focus-within:ring-emerald-400"
      : "ring-slate-200 focus-within:ring-indigo-300";

  const underlineColor = error
    ? "from-rose-500 to-rose-400"
    : success
      ? "from-emerald-500 to-emerald-400"
      : "from-indigo-500 via-violet-500 to-amber-400";

  const labelColor = error
    ? "text-rose-500"
    : success
      ? "text-emerald-600"
      : focused
        ? "text-indigo-600"
        : "text-slate-400";

  return (
    <div className="w-full">
      <div
        className={`group relative rounded-2xl bg-white ring-1 transition-all duration-200 ${stateRing} ${
          focused ? "shadow-md" : "shadow-sm"
        }`}
      >
        {/* آیکون */}
        {Icon && !isTextarea && (
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon size={18} strokeWidth={1.75} />
          </div>
        )}

        {/* لیبل شناور */}
        <label
          htmlFor={id}
          className={`pointer-events-none absolute right-4 origin-right transition-all duration-200 ${labelColor} ${
            Icon && !isTextarea ? "right-11" : "right-4"
          } ${
            focused || filled
              ? "top-2.5 text-xs font-medium"
              : `text-sm ${isTextarea ? "top-4" : "top-1/2 -translate-y-1/2"}`
          }`}
        >
          {label} {required && <span className="text-rose-400">*</span>}
        </label>

        {/* فیلد ورودی */}
        {isTextarea ? (
          <textarea
            id={id}
            name={name}
            rows={rows}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full resize-none rounded-2xl bg-transparent px-4 pb-3 pt-7 text-sm text-slate-800 outline-none placeholder:text-transparent"
          />
        ) : isSelect ? (
          <div className="relative">
            <select
              name={name}
              id={id}
              value={value}
              onChange={onChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full appearance-none rounded-2xl bg-transparent px-4 pb-2.5 pt-7 text-sm text-slate-800 outline-none"
            >
              <option value="" disabled hidden></option>
              {options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        ) : (
          <input
            id={id}
            type={inputType}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`w-full rounded-2xl bg-transparent py-2.5 pb-2.5 pt-7 text-sm text-slate-800 outline-none placeholder:text-transparent ${
              Icon ? "pr-11 pl-4" : "px-4"
            } ${type === "password" ? "pl-11" : ""}`}
          />
        )}

        {/* دکمه نمایش رمز عبور */}
        {type === "password" && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((s) => !s)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-indigo-500"
          >
            {showPassword ? (
              <EyeOff size={18} strokeWidth={1.75} />
            ) : (
              <Eye size={18} strokeWidth={1.75} />
            )}
          </button>
        )}

        {/* آیکون وضعیت */}
        {(error || success) && type !== "password" && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {error ? (
              <AlertCircle size={18} className="text-rose-500" />
            ) : (
              <Check size={18} className="text-emerald-500" />
            )}
          </div>
        )}

        {/* خط زیرین متحرک */}
        {/* <div
          className={`absolute bottom-0 right-0 h-0.5 w-full origin-right scale-x-0 rounded-full bg-gradient-to-l transition-transform duration-300 group-focus-within:scale-x-100 ${underlineColor}`}
        /> */}
      </div>

      {/* پیام خطا یا راهنما */}
      {(error || hint) && (
        <p
          className={`mt-1.5 px-1 text-xs ${error ? "text-rose-500" : "text-slate-400"}`}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
}
