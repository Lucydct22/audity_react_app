import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedAdminRoute } from "./router.middelware";

// LAYOUTS
const BasicLayout = lazy(() => import('views/layouts/basicLayout'));
const AdminLayout = lazy(() => import('views/layouts/adminLayout'));
const LibraryLayout = lazy(() => import('views/layouts/libraryLayout'));

// USER PAGES
const MusicPage = lazy(() => import('views/pages/basic/musicPage'));
const ProfilePage = lazy(() => import('views/pages/basic/profilePage'))
const AlbumsPage = lazy(() => import('views/pages/basic/albumsPage'));
const AlbumPage = lazy(() => import('views/pages/basic/albumPage'));
const ArtistsPage = lazy(() => import('views/pages/basic/artistsPage'));
const ArtistPage = lazy(() => import('views/pages/basic/artistPage'));
const PlaylistsPage = lazy(() => import('views/pages/basic/playlistsPage'));
const PlaylistPage = lazy(() => import('views/pages/basic/playlistPage'));
const SearchPage = lazy(() => import('views/pages/basic/searchPage'))
const ExplorePage = lazy(() => import('views/pages/basic/explorePage'))

// ADMIN PAGES
const HomeAdminPage = lazy(() => import('views/pages/admin/homeAdminPage'));

// LIBRARY PAGES
const LibraryHighlights = lazy(() => import('views/pages/basic/libraryPages/highlightPage/HighlightPage'))
const LibraryFavorites = lazy(() => import('views/pages/basic/libraryPages/favoritePage/favoritePage'))
// const LibrarySelfPlaylists = lazy(() => import('views/pages/basic/libraryPages'))
// const LibraryUploads = lazy(() => import('views/pages/basic/libraryPages'))

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
        path: "playlists",
        element: <Suspense fallback={<></>}><PlaylistsPage /></Suspense>,
        children: [
          {
            path: ":playlistId",
            element: <Suspense fallback={<></>}><PlaylistPage /></Suspense>,
          },
        ]
      },
      {
        path: "library",
        element: <Suspense fallback={<></>}><LibraryLayout /></Suspense>,
        children: [
          {
            index: true,
            element: <Suspense fallback={<></>}><LibraryHighlights /></Suspense>
          },
          {
            path: "favorites",
            element: <Suspense fallback={<></>}><LibraryFavorites /></Suspense>,
          },
          {
            path: "*",
            element: <Suspense fallback={<></>}><LibraryHighlights /></Suspense>
          }
        ]
      },
      {
        path: "search",
        element:
          <Suspense fallback={<></>}><SearchPage /></Suspense>
      },
      {
        path: "explore",
        element:
          <Suspense fallback={<></>}><ExplorePage /></Suspense>
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
    element: (
      <Suspense fallback={<></>}>
        <ProtectedAdminRoute>
          <AdminLayout />
        </ProtectedAdminRoute>
      </Suspense>
    ),
    children: [
      {
        path: "home",
        element: (
          <Suspense fallback={<></>}>
            <ProtectedAdminRoute>
              <HomeAdminPage />
            </ProtectedAdminRoute>
          </Suspense>
        )
      },
      {
        path: "*",
        element: <Suspense fallback={<></>}><ErrorPage /></Suspense>
      }
    ],
  }
]);

export default router;