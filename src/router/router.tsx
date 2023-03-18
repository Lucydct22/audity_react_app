import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// LAYOUTS
const UserLayout = lazy(() => import('../views/layouts/basicLayout'));
const AdminLayout = lazy(() => import('../views/layouts/adminLayout'));

// USER PAGES
const TestPage = lazy(() => import('../views/pages/basic/testPage'));
const MusiPage = lazy(() => import('../views/pages/basic/musicPage'));

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
        element: <Suspense fallback={<></>}><TestPage /></Suspense>,
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