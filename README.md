# Audity - Frontend

Frontend for **Audity**, a music streaming web platform built with React and TypeScript. Browse music, create playlists, like content, and manage tracks through an admin panel.

**Live**: https://audity.dtpf.es/

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Create React App (react-scripts 5)
- **State Management**: React Context API + useReducer
- **Routing**: React Router v6 (lazy-loaded routes)
- **Styling**: SCSS/Sass + Ant Design 5
- **Authentication**: Auth0
- **Internationalization**: i18next (English, Spanish)
- **PWA**: Workbox service worker
- **Carousels**: Swiper.js
- **Analytics**: Google Analytics (via GTM)
- **SEO**: react-helmet-async

## Prerequisites

- Node.js (v16+)
- npm
- Backend API running (see [audity_node_app](https://github.com/Lucydct22/audity_node_app))
- Auth0 tenant configured

## Installation

```bash
git clone https://github.com/Lucydct22/audity_react_app.git
cd audity_react_app
npm install
```

## Environment Setup

Create a `.env` file in the root directory based on the example:

```bash
cp .example.env .env
```

### Environment Variables

| Variable | Description |
|---|---|
| `REACT_APP_AUTH0_DOMAIN` | Auth0 tenant domain |
| `REACT_APP_DEVELOPMENT_AUTH0_CLIENT_ID` | Auth0 client ID for local development |
| `REACT_APP_PRODUCTION_AUTH0_CLIENT_ID` | Auth0 client ID for production |
| `REACT_APP_AUTH0_AUDIENCE_DEVELOPMENT` | Auth0 audience for local dev (e.g., `http://localhost:4000`) |
| `REACT_APP_AUTH0_AUDIENCE_PRODUCTION` | Auth0 audience for production (e.g., `http://localhost:4001`) |
| `REACT_APP_PUBLIC_URL` | Public URL of the deployed app |
| `PORT` | Dev server port (default: `5100`) |

The app automatically selects between development and production Auth0 credentials based on whether it is running on localhost.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 5100 |
| `npm run build` | Create production build (outputs to `build/`) |

The backend API must be running separately on port 4000 for local development.

## Project Structure

```
src/
  api/                     # API layer (plain fetch, no axios)
    music/                 # Music resource APIs (tracks, albums, artists, playlists, genres)
    utils/                 # API config, shared request helpers
  assets/
    img/                   # Images (albums, gradients, PNGs, WebPs, GIFs)
    locale/                # i18n translation files (en, es)
  context/                 # React Context providers
    admin/                 # Admin-only contexts (album, artist, genre, playlist, statistic, track, user)
    currentTrack/          # Currently playing track state
    currentTracklist/      # Current tracklist/queue state
    language/              # Language preference
    myLibrary/             # User library state
    theme/                 # Light/dark theme
    user/                  # User profile and auth state
  hooks/                   # Custom hooks (useWindowSizeReport)
  interfaces/              # TypeScript interfaces (music, user, global)
  reducers/                # Reducer logic per domain
    admin/                 # Admin reducers (album, artist, genre, playlist, statistic, track, user)
    currentTrack/          # Track playback reducer
    currentTracklist/      # Tracklist queue reducer
    myLibrary/             # Library reducer
    user/                  # User reducer
  router/                  # React Router config and middleware
  sass/                    # Global styles (_variables, _mixins, _animation)
  utils/                   # Utilities (i18n, isLocalhost, componentsConstants, track helpers)
  views/
    components/
      admin/               # Admin CRUD components and forms
      basic/
        desktop/           # Desktop-only components (player, sidebar, top bar, track list)
        mobile/            # Mobile-only components (player, sidebar, top bar, search, explore)
        renders/           # Reusable render components (track, album, artist, playlist, genres)
        ...                # Shared basic components
      SwiperCarousel/      # Carousel components (music page, library, tracks)
    layouts/               # Layout wrappers (basic, admin, library)
    pages/
      admin/               # Admin pages (home, users, tracks, playlists, albums, artists, genres)
      basic/               # User pages (music, album, artist, playlist, genre, search, library, profile)
      errors/              # Error page
    UI/                    # Reusable UI components (spinner, theme, language, modals, swiper settings)
    utils/                 # View utilities (HelmetSEO, joinArtistsName)
public/                    # CRA public assets (favicon, manifest, index.html)
```

## Application Routes

### Public Routes

| Path | Page |
|---|---|
| `/` | Music home page |
| `/albums` | All albums |
| `/albums/:albumId` | Album detail |
| `/artists` | All artists |
| `/artists/:artistId` | Artist detail |
| `/playlists` | All playlists |
| `/playlists/:playlistId` | Playlist detail |
| `/genres` | All genres |
| `/genres/:genreId` | Genre detail |
| `/search` | Search page |
| `/explore` | Explore page (mobile) |

### Protected Routes (requires authentication)

| Path | Page |
|---|---|
| `/library` | Library highlights |
| `/library/favorites` | Favorite tracks |
| `/library/playlists` | User playlists |
| `/library/uploads` | User uploaded tracks |
| `/settings` | Profile settings |
| `/offers` | Login required page |

### Admin Routes (requires admin role)

| Path | Page |
|---|---|
| `/admin/home` | Admin dashboard |
| `/admin/users` | User management |
| `/admin/tracks` | Track management |
| `/admin/track-form/:trackId?` | Track create/edit form |
| `/admin/albums` | Album management |
| `/admin/album-form/:albumId?` | Album create/edit form |
| `/admin/artists` | Artist management |
| `/admin/artist-form/:artistId?` | Artist create/edit form |
| `/admin/genres` | Genre management |
| `/admin/genre-form/:genreId?` | Genre create/edit form |
| `/admin/playlists` | Playlist management |
| `/admin/playlist-form/:playlistId?` | Playlist create/edit form |

## Responsive Design

The app uses a breakpoint of **815px** to switch between desktop and mobile layouts. Components under `desktop/` and `mobile/` directories render entirely separate component trees based on window width (detected via `useWindowSizeReport()` hook).

## Theming

Supports light and dark themes via `html[data-theme='light|dark']` attribute with CSS custom properties defined in `src/sass/_variables.scss`. Primary accent color: `#ef5466`.

## Authors

- [David T. Pizarro](https://github.com/DTPF) - Fullstack Developer, Scrum Master
- [Joe Joy Alt](https://github.com/joejoyjoy) - Fullstack Developer
- [Iuliia Shikhanova](https://github.com/IuliiaNova) - Fullstack Developer
- [Javier Pascual](https://github.com/Javier-jpt) - Fullstack Developer
- [Lucia del Cacho](https://github.com/Lucydct22) - Fullstack Developer

## License

MIT
