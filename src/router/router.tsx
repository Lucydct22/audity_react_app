import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// LAYOUTS
const BasicLayout = lazy(() => import('../views/layouts/basicLayout'));
const AdminLayout = lazy(() => import('../views/layouts/adminLayout'));

// USER PAGES
const TestPage = lazy(() => import('../views/pages/basic/testPage'));
const MusicPage = lazy(() => import('../views/pages/basic/musicPage'));
const ProfilePage = lazy(()=> import('../views/pages/basic/profilePage'))

// ADMIN PAGES
const HomeAdminPage = lazy(() => import('../views/pages/admin/homeAdminPage'));

// MESSAGES PAGES
const ErrorPage = lazy(() => import('../views/pages/errors'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<></>}><BasicLayout /></Suspense>,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<></>}><TestPage /></Suspense>,
      },
      {
        path: "music",
        element: <Suspense fallback={<></>}><MusicPage /></Suspense>
      },
      {
        path: "settings",
        element: <Suspense fallback={<></>}><ProfilePage /></Suspense>
      },
      {
        path: "*",
        element: <Suspense fallback={<></>}><ErrorPage /></Suspense>
      }
    ],
  },
  {
    path: "admin",
    element: <Suspense fallback={<></>}><AdminLayout /></Suspense>,
    children: [
      {
        path: "home",
        element: <Suspense fallback={<></>}><HomeAdminPage /></Suspense>
      },
      {
        path: "*",
        element: <Suspense fallback={<></>}><ErrorPage /></Suspense>
      }
    ],
  }
]);

export default router;