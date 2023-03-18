import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// LAYOUTS
const UserLayout = lazy(() => import('../views/layouts/userLayout'));
const AdminLayout = lazy(() => import('../views/layouts/adminLayout'));

// USER PAGES
const HomePage = lazy(() => import('../views/pages/user/homePage'));
const MusiPage = lazy(() => import('../views/pages/music/musicPage'));

// ADMIN PAGES
const HomeAdmin = lazy(() => import('../views/pages/admin/homeAdminPage'));

// MESSAGES PAGES
const Error = lazy(() => import('../views/pages/errors'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<></>}><UserLayout /></Suspense>,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<></>}><HomePage /></Suspense>,
      },
      {
        path: "music",
        element: <Suspense fallback={<></>}><MusiPage /></Suspense>
      },
      {
        path: "*",
        element: <Suspense fallback={<></>}><Error /></Suspense>
      }
    ],
  },
  {
    path: "admin",
    element: <Suspense fallback={<></>}><AdminLayout /></Suspense>,
    children: [
      {
        path: "home",
        element: <Suspense fallback={<></>}><HomeAdmin /></Suspense>
      },
      {
        path: "*",
        element: <Suspense fallback={<></>}><Error /></Suspense>
      }
    ],
  }
]);

export default router;