import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedAdminRoute } from "./router.middelware";
import { ProtectedUser, ProtectedUserSettings } from "./user.middelware";

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
const GenresPage = lazy(() => import('views/pages/basic/genresPage/GenresPage'));
const GenrePage = lazy(() => import('views/pages/basic/genrePage/GenrePage'));

// ADMIN PAGES
const HomeAdminPage = lazy(() => import('views/pages/admin/homeAdminPage'));
const UsersAdminPage = lazy(() => import('views/pages/admin/usersAdminPage'));
const TracksAdminPage = lazy(() => import('views/pages/admin/tracksAdminPage'));
const PlaylistsAdminPage = lazy(() => import('views/pages/admin/playlistsAdminPage'));
const AlbumsAdminPage = lazy(() => import('views/pages/admin/albumsAdminPage'));
const ArtistsAdminPage = lazy(() => import('views/pages/admin/artistsAdminPage'));
const GenresAdminPage = lazy(() => import('views/pages/admin/genresAdminPage'));
// Admin Forms
const GenreForm = lazy(() => import('views/components/admin/forms/genreForm'));
const ArtistForm = lazy(() => import('views/components/admin/forms/artistForm'));
const AlbumForm = lazy(() => import('views/components/admin/forms/albumForm'));
const TrackForm = lazy(() => import('views/components/admin/forms/trackForm'));
const PlaylistForm = lazy(() => import('views/components/admin/forms/playlistForm'));

// LIBRARY PAGES
const LibraryHighlights = lazy(() => import('views/pages/basic/libraryPages/highlightPage/HighlightPage'))
const LibraryFavorites = lazy(() => import('views/pages/basic/libraryPages/favoritePage/FavTracksPage'))
// const LibrarySelfPlaylists = lazy(() => import('views/pages/basic/libraryPages'))
const LibraryUploads = lazy(() => import('views/pages/basic/libraryPages/uploadPage/UploadPage'))
const LibraryPlaylists = lazy(() => import('views/pages/basic/libraryPages/playlistsPage/PlaylistPage'))

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
        path: "genres",
        element: <Suspense fallback={<></>}><GenresPage /></Suspense>,
        children: [
          {
            path: ":genreId",
            element: <Suspense fallback={<></>}><GenrePage /></Suspense>,
          },
        ]
      },
      {
        path: "library",
        element: <ProtectedUser><Suspense fallback={<></>}><LibraryLayout /></Suspense></ProtectedUser>,
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
            path: "playlists",
            element: <Suspense fallback={<></>}><LibraryPlaylists /></Suspense>,
          },
          {
            path: "uploads",
            element: <Suspense fallback={<></>}><LibraryUploads /></Suspense>,
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
        element: (
          <Suspense fallback={<></>}>
            <ProtectedUserSettings>
              <ProfilePage />
            </ProtectedUserSettings>
          </Suspense>
        )
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
        <ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>
      </Suspense>
    ),
    children: [
      {
        path: "home",
        element: (
          <Suspense fallback={<></>}>
            <ProtectedAdminRoute><HomeAdminPage /></ProtectedAdminRoute>
          </Suspense>
        )
      },
      {
        path: "users",
        element: (
          <Suspense fallback={<></>}>
            <ProtectedAdminRoute><UsersAdminPage /></ProtectedAdminRoute>
          </Suspense>
        )
      },
      {
        path: "tracks",
        element: (
          <Suspense fallback={<></>}>
            <ProtectedAdminRoute><TracksAdminPage /></ProtectedAdminRoute>
          </Suspense>
        )
      },
      {
        path: "track-form",
        element: (
          <Suspense fallback={<></>}>
            <ProtectedAdminRoute><TrackForm /></ProtectedAdminRoute>
          </Suspense>
        ),
        children: [
          {
            path: ":trackId",
            element: <Suspense fallback={<></>}><TrackForm /></Suspense>,
          },
        ]
      },
      {
        path: "playlists",
        element: (
          <Suspense fallback={<></>}>
            <ProtectedAdminRoute><PlaylistsAdminPage /></ProtectedAdminRoute>
          </Suspense>
        )
      },
      {
        path: "playlist-form",
        element: (
          <Suspense fallback={<></>}>
            <ProtectedAdminRoute><PlaylistForm /></ProtectedAdminRoute>
          </Suspense>
        ),
        children: [
          {
            path: ":playlistId",
            element: <Suspense fallback={<></>}><PlaylistForm /></Suspense>,
          },
        ]
      },
      {
        path: "albums",
        element: (
          <Suspense fallback={<></>}>
            <ProtectedAdminRoute><AlbumsAdminPage /></ProtectedAdminRoute>
          </Suspense>
        )
      },
      {
        path: "album-form",
        element: (
          <Suspense fallback={<></>}>
            <ProtectedAdminRoute><AlbumForm /></ProtectedAdminRoute>
          </Suspense>
        ),
        children: [
          {
            path: ":albumId",
            element: (
              <Suspense fallback={<></>}>
                <ProtectedAdminRoute><AlbumForm /></ProtectedAdminRoute>
              </Suspense>
            ),
          },
        ]
      },
      {
        path: "artists",
        element: (
          <Suspense fallback={<></>}>
            <ProtectedAdminRoute><ArtistsAdminPage /></ProtectedAdminRoute>
          </Suspense>
        )
      },
      {
        path: "artist-form",
        element: (
          <Suspense fallback={<></>}>
            <ProtectedAdminRoute><ArtistForm /></ProtectedAdminRoute>
          </Suspense>
        ),
        children: [
          {
            path: ":artistId",
            element: (
              <Suspense fallback={<></>}>
                <ProtectedAdminRoute><ArtistForm /></ProtectedAdminRoute>
              </Suspense>
            ),
          },
        ]
      },
      {
        path: "genres",
        element: (
          <Suspense fallback={<></>}>
            <ProtectedAdminRoute><GenresAdminPage /></ProtectedAdminRoute>
          </Suspense>
        ),
        children: [
          {
            path: "form",
            element: (
              <Suspense fallback={<></>}>
                <ProtectedAdminRoute><GenreForm /></ProtectedAdminRoute>
              </Suspense>
            ),
          },
        ]
      },
      {
        path: "genre-form",
        element: (
          <Suspense fallback={<></>}>
            <ProtectedAdminRoute><GenreForm /></ProtectedAdminRoute>
          </Suspense>
        ),
        children: [
          {
            path: ":genreId",
            element: (
              <Suspense fallback={<></>}>
                <ProtectedAdminRoute><GenreForm /></ProtectedAdminRoute>
              </Suspense>
            ),
          },
        ]
      },


      {
        path: "*",
        element: <Suspense fallback={<></>}><ErrorPage /></Suspense>
      }
    ],
  }
]);

export default router;