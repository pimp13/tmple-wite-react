import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layouts
import MainLayout from "../layouts/MainLayout";
// import AuthLayout from "../layouts/AuthLayout";

// Components
// import ProtectedRoute from "../components/ProtectedRoute";

// Lazy load صفحات (برای بهینه‌سازی و code splitting)
const Home = lazy(() => import("../pages/Home"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Profile = lazy(() => import("../pages/Profile"));
// const About = lazy(() => import("../pages/About"));
// const Dashboard = lazy(() => import("../pages/Dashboard"));
// const Login = lazy(() => import("../pages/Login"));

// کامپوننت لودینگ ساده
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    در حال بارگذاری...
  </div>
);

const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: withSuspense(NotFound), // هندل کردن خطاهای روت
    children: [
      {
        index: true,
        element: withSuspense(Home),
      },
      {
        path: "/profile",
        element: withSuspense(Profile),
      },
      //   {
      //     path: "about",
      //     element: withSuspense(About),
      //   },
      //   {
      //     // مسیرهای محافظت‌شده
      //     element: <ProtectedRoute />,
      //     children: [
      //       {
      //         path: "dashboard",
      //         element: withSuspense(Dashboard),
      //       },
      //       // می‌تونی اینجا routeهای بیشتری اضافه کنی
      //     ],
      //   },
    ],
  },
  //   {
  //     path: "/auth",
  //     element: <AuthLayout />,
  //     children: [
  //       {
  //         path: "login",
  //         element: withSuspense(Login),
  //       },
  //       {
  //         index: true,
  //         element: <Navigate to="/auth/login" replace />,
  //       },
  //     ],
  //   },
  {
    path: "*",
    element: withSuspense(NotFound),
  },
]);
