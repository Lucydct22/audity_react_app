import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// LAYOUTS
const UserLayout = lazy(() => import('../views/layouts/userLayout'));
const AdminLayout = lazy(() => import('../views/layouts/adminLayout'));

// USER PAGES
const HomeUser = lazy(() => import('../views/pages/user/homeUserPage'));

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
        element: <Suspense fallback={<></>}><HomeUser /></Suspense>,
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
  },
]);

export default router;