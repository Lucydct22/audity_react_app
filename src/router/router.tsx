import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import useWindowSizeReport from "../hooks/useWindowSizeReport";
import { responsiveBreak } from "../utils/componentsConstants";

// LAYOUTS
const BasicLayout = lazy(() => import('../views/layouts/basicLayout'));
const AdminLayout = lazy(() => import('../views/layouts/adminLayout'));

// USER PAGES
const TestPage = lazy(() => import('../views/pages/basic/testPage'));
const MusicPage = lazy(() => import('../views/pages/basic/musicPage'));
const ProfilePage = lazy(() => import('../views/pages/basic/profilePage'))
const AlbumPage = lazy(() => import('../views/pages/basic/albumPage'));
const ArtistPage = lazy(() => import('../views/pages/basic/artistPage'));
const StudioPage = lazy(() => import('../views/pages/basic/studioPage'))
const FavoritesPage = lazy(() => import('../views/pages/basic/favoritesPage'))
const RadioPage = lazy(() => import('../views/pages/basic/radioPage'))
const SearchPage = lazy(() => import('../views/pages/basic/searchPage'))
const PlaylistsPage = lazy(() => import('../views/pages/basic/playlistPage'))

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
        element: <Suspense fallback={<></>}><MusicPage /></Suspense>,
      },
      {
        path: "radio",
        element: <Suspense fallback={<></>}><RadioPage /></Suspense>,
      },
      {
        path: "album",
        element: <Suspense fallback={<></>}><AlbumPage /></Suspense>,
      },
      {
        path: "artist",
        element: <Suspense fallback={<></>}><ArtistPage /></Suspense>,
      },
      {
        path: "favorites",
        element: <Suspense fallback={<></>}><FavoritesPage /></Suspense>
      },
      {
        path: "studio",
        element: <Suspense fallback={<></>}><StudioPage /></Suspense>
      },
      {
        path: "search",
        element:
          <Suspense fallback={<></>}>
            {(innerWidth > responsiveBreak) ? (
              <>
                <MusicPage />
              </>
            ) : (
              <>
                <SearchPage />
              </>
            )}
          </Suspense>
      },
      {
        path: "settings",
        element: <Suspense fallback={<></>}><ProfilePage /></Suspense>
      },
      {
        path: "playlists",
        element: <Suspense fallback={<></>}><PlaylistsPage /></Suspense>
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