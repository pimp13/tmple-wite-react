import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  // <section className="mt-2 bg-stone-100">
  //   <header className="flex items-center bg-stone-200/20 justify-between mx-4 h-10 shadow-sm rounded-2xl px-4">
  //     <nav className="flex items-center gap-12">
  //         <Link to={'/'}>
  //           خانه
  //         </Link>
  //     </nav>
  //     <Link to="/">#</Link>
  //   </header>

  //   <main className="mt-2">
  //     <Outlet /> {/* محتوای صفحات اینجا رندر می‌شود */}
  //   </main>

  //   <footer>فوتر سایت</footer>
  // </section>
  return (
    <section className="bg-[#F5F8FD]">
      <Outlet />
      {/* <footer className="bg-neutral-200 p-10">Footer</footer> */}
    </section>
  );
}
