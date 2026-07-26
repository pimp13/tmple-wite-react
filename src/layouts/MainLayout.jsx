import { Outlet, Link } from "react-router-dom";

const menus = [
  {
    label: "خانه",
    href: "/",
  },
  {
    label: "پروفایل",
    href: "/profile",
  },
  {
    label: "درباره ما",
    href: "/about-us",
  },
  {
    label: "داشبورد",
    href: "/dashboard",
  },
];

const MainLayout = () => {
  return (
    <section className="mt-2 bg-stone-100">
      <header className="flex items-center bg-stone-200/20 justify-between mx-4 h-10 shadow-sm rounded-2xl px-4">
        <nav className="flex items-center gap-12">
          {menus.map((m) => (
            <Link key={m.href} to={m.href}>
              {m.label}
            </Link>
          ))}
        </nav>
        <Link to="/">#</Link>
      </header>

      <main className="mt-1">
        <Outlet /> {/* محتوای صفحات اینجا رندر می‌شود */}
      </main>

      <footer>فوتر سایت</footer>
    </section>
  );
};

export default MainLayout;
