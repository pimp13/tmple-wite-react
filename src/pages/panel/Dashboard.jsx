import React, { useState } from "react";
import {
  Home,
  GraduationCap,
  UserCircle2,
  Search,
  Bell,
  Menu,
  X,
  Sparkles,
  Clock,
  Award,
  Flame,
  BookOpen,
  Lock,
  ChevronLeft,
  LogOut,
  CircleDollarSign,
} from "lucide-react";

const navItems = [
  { key: "home", label: "خانه", icon: Home },
  { key: "courses", label: "دوره‌های من", icon: GraduationCap },
  { key: "profile", label: "پروفایل", icon: UserCircle2 },
];

const stats = [
  { label: "دوره‌های فعال", value: 12, icon: BookOpen },
  { label: "ساعت یادگیری", value: 12, icon: Clock },
  { label: "گواهینامه", value: 12, icon: Award },
  { label: "روز پیاپی", value: 12, icon: Flame },
];

const upcomingCourses = [
  { title: "مبانی هوش مصنوعی", tag: "فناوری" },
  { title: "مهارت‌های ارتباط مؤثر", tag: "مهارت‌های نرم" },
  { title: "مدیریت زمان حرفه‌ای", tag: "بهره‌وری" },
];

export default function Dashboard() {
  const [active, setActive] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full bg-[#F5F8FD] font-[Vazirmatn] text-slate-800"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800&display=swap');
        .font-\\[Vazirmatn\\] { font-family: 'Vazirmatn', sans-serif; }
      `}</style>

      {/* ---------- Mobile top bar ---------- */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100 lg:hidden sticky top-0 z-30">
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="p-2 rounded-lg text-[#1C3A82] hover:bg-[#E5EDF8] transition-colors"
          aria-label={sidebarOpen ? "بستن منو" : "باز کردن منو"}
        >
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#1C3A82]">
            آکادمی ایرانسل
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#1C3A82] flex items-center justify-center">
            <GraduationCap size={16} className="text-white" />
          </div>
        </div>
      </div>

      <div className="flex mx-auto">
        {/* ---------- Sidebar ---------- */}
        {/* حالا سایدبار همیشه fixed هست و به سمت راست چسبیده،
            حتی موقع اسکرول کردن صفحه هم جابه‌جا نمی‌شه */}
        <aside
          className={`fixed top-0 bottom-0 h-screen inset-y-0 right-0 z-40 w-72 bg-white border-l border-slate-100 flex flex-col transition-transform duration-300 ease-out
  ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}
        >
          <div className="flex items-center justify-between px-6 py-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#1C3A82] flex items-center justify-center shrink-0">
                <GraduationCap size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1C3A82] leading-tight">
                  آکادمی ایرانسل
                </p>
                <p className="text-[11px] text-slate-400">
                  یادگیری، هر جا هستی
                </p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-50"
              aria-label="بستن منو"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 mt-2 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setActive(item.key);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${
                    isActive
                      ? "bg-[#1C3A82] text-white shadow-lg shadow-[#1C3A82]/20"
                      : "text-slate-500 hover:bg-[#E5EDF8] hover:text-[#1C3A82]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} />
                    {item.label}
                  </span>
                  {isActive && <ChevronLeft size={16} className="opacity-80" />}
                </button>
              );
            })}
          </nav>

          <div className="p-4 mx-4 mb-4 rounded-2xl bg-[#E5EDF8]">
            <p className="text-xs font-semibold text-[#1C3A82] mb-1">
              پیشرفت این هفته
            </p>
            <div className="w-full h-1.5 rounded-full bg-white overflow-hidden mb-2">
              <div className="h-full w-[20%] rounded-full bg-[#1C3A82]" />
            </div>
            <p className="text-[11px] text-slate-500">
              هنوز شروع نکرده‌ای، همین امروز شروع کن!
            </p>
          </div>

          <div className="px-4 pb-6">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-50 hover:text-red-500 transition-colors">
              <LogOut size={18} />
              خروج از حساب
            </button>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/30 z-30 lg:hidden"
          />
        )}

        {/* ---------- Main content ---------- */}
        {/* lg:mr-72 برای رزرو کردن فضای سایدبار ثابت اضافه شد */}
        <main className="flex-1 min-w-0 lg:mr-72">
          {/* Desktop header */}
          <header className="hidden lg:flex items-center justify-between px-8 py-3 bg-slate-200/60 mb-4">
            <div>
              <p className="text-xs text-slate-400 mb-0.5">خانه</p>
              <h1 className="text-lg font-bold text-slate-800">
                سلام، پویا 👋
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="جستجوی دوره..."
                  className="w-64 bg-white border border-slate-100 rounded-xl py-2.5 pr-10 pl-4 text-sm outline-none focus:border-[#1C3A82] transition-colors placeholder:text-slate-350"
                />
              </div>
              <button className="relative w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-500 hover:text-[#1C3A82] transition-colors">
                <Bell size={18} />
                <span className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-red-500" />
              </button>
              <div className="flex items-center gap-2.5 pr-3 border-r border-slate-100">
                <div>
                  <p className="text-sm font-semibold text-slate-700 leading-tight">
                    پویا غضنفری نیا
                  </p>
                  <p className="text-[11px] text-slate-400">دانشجوی آکادمی</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#1C3A82] text-white flex items-center justify-center text-sm font-bold">
                  م
                </div>
              </div>
            </div>
          </header>

          <div className="px-4 lg:px-8 pb-10 space-y-6 pt-4 lg:pt-0">
            {/* Hero / empty state */}
            <section className="relative overflow-hidden rounded-3xl bg-[#1C3A82] px-6 py-10 lg:px-14 lg:py-14">
              <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/5" />
              <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-[#E5EDF8]/10 translate-y-1/3" />

              <div className="relative flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#E5EDF8] flex items-center justify-center">
                  <Sparkles size={28} className="text-[#1C3A82]" />
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-white">
                  منتظر اولین دوره‌ات باش!
                </h2>
                <p className="text-sm lg:text-base text-[#C9D8F2] max-w-md leading-7">
                  به‌زودی دوره‌های جدید اینجا قرار داده می‌شن و می‌تونی یادگیری
                  رو شروع کنی.
                </p>
                <button className="mt-2 px-6 py-3 rounded-xl bg-[#E5EDF8] text-[#1C3A82] text-sm font-bold hover:bg-white transition-colors">
                  مشاهده دوره‌های به‌زودی
                </button>
              </div>
            </section>

            {/* Quick access / main navigation */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-800">
                  دسترسی سریع
                </h3>
              </div>
              {/* <SectionMainNav
                pageFeatures={pageFeatures}
                sectionFeatures={sectionFeatures}
              /> */}
            </section>

            {/* Stats */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 hover:shadow-md hover:shadow-slate-200/60 transition-shadow"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#E5EDF8] flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-[#1C3A82]" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-800 leading-tight">
                        {s.value.toLocaleString("fa-IR")}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
                    </div>
                  </div>
                );
              })}
            </section>

            {/* Upcoming courses */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-800">
                  دوره‌های در راه
                </h3>
                <span className="text-xs text-[#1C3A82] font-medium">
                  به‌زودی تکمیل می‌شود
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 3 }).flatMap(() =>
                  upcomingCourses.map((c, index) => (
                    <div
                      key={`${c.title}-${index}`}
                      className="relative bg-white rounded-2xl border border-slate-100 overflow-hidden group"
                    >
                      <div className="h-28 bg-[#E5EDF8] flex items-center justify-center relative">
                        <GraduationCap
                          size={30}
                          className="text-[#1C3A82]/40"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-[#1C3A82]/0 group-hover:bg-[#1C3A82]/5 transition-colors">
                          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1C3A82] bg-white/90 px-3 py-1.5 rounded-full">
                            <Lock size={12} />
                            به‌زودی
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <span className="text-[11px] font-medium text-[#1C3A82] bg-[#E5EDF8] px-2 py-0.5 rounded-md">
                          {c.tag}
                        </span>

                        <p className="mt-2.5 text-sm font-semibold text-slate-700">
                          {c.title}
                        </p>
                      </div>
                    </div>
                  )),
                )}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* ---------- Mobile bottom nav ---------- */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-100 flex items-center justify-around py-2 z-30">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl text-[11px] font-medium transition-colors ${
                isActive ? "text-[#1C3A82]" : "text-slate-400"
              }`}
            >
              <Icon size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="h-16 lg:hidden" />
    </div>
  );
}
