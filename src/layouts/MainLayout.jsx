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
    <section className="my-4">
      <header className="flex items-center justify-between mx-4 h-8 shadow-md rounded-2xl px-4 pb-2">
        <nav className="flex items-center gap-12">
          {menus.map((m) => (
            <Link key={m.href} to={m.href}>
              {m.label}
            </Link>
          ))}
        </nav>
        <Link to="/">#</Link>
      </header>

      <main className="mt-2">
        <Outlet /> {/* محتوای صفحات اینجا رندر می‌شود */}
      </main>

      <footer>فوتر سایت</footer>
    </section>
  );
};

export default MainLayout;
