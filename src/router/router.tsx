import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { responsiveBreak } from "utils/componentsConstants";

// LAYOUTS
const BasicLayout = lazy(() => import('views/layouts/basicLayout'));
const AdminLayout = lazy(() => import('views/layouts/adminLayout'));

// USER PAGES
const MusicPage = lazy(() => import('views/pages/basic/musicPage'));
const ProfilePage = lazy(() => import('views/pages/basic/profilePage'))
const AlbumsPage = lazy(() => import('views/pages/basic/albumsPage'));
const AlbumPage = lazy(() => import('views/pages/basic/albumPage'));
const ArtistsPage = lazy(() => import('views/pages/basic/artistsPage'));
const ArtistPage = lazy(() => import('views/pages/basic/artistPage'));
const StudioPage = lazy(() => import('views/pages/basic/studioPage'))
const FavoritesPage = lazy(() => import('views/pages/basic/favoritesPage'))
const RadioPage = lazy(() => import('views/pages/basic/radioPage'))
const SearchPage = lazy(() => import('views/pages/basic/searchPage'))
const PlaylistPage = lazy(() => import('views/pages/basic/playlistPage'))

// ADMIN PAGES
const HomeAdminPage = lazy(() => import('views/pages/admin/homeAdminPage'));

// MESSAGES PAGES
const ErrorPage = lazy(() => import('views/pages/errors'));

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
        path: "albums",
        element: <Suspense fallback={<></>}><AlbumsPage /></Suspense>,
        children: [
          {
            path: ":albumId",
            element: <Suspense fallback={<></>}><AlbumPage /></Suspense>,
          },
        ]
      },
      {
        path: "artists",
        element: <Suspense fallback={<></>}><ArtistsPage /></Suspense>,
        children: [
          {
            path: ":artistId",
            element: <Suspense fallback={<></>}><ArtistPage /></Suspense>,
          },
        ]
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
            {(innerWidth > responsiveBreak) ? <MusicPage /> : <SearchPage />}
          </Suspense>
      },
      {
        path: "settings",
        element: <Suspense fallback={<></>}><ProfilePage /></Suspense>
      },
      {
        path: "playlists",
        element: <Suspense fallback={<></>}><PlaylistPage /></Suspense>
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